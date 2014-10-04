import json
import threading
import re
import tornado.ioloop
import tornado.web
import tornado.wsgi
import tornado.websocket
from flask import Flask, send_from_directory

app = Flask("mitm")
app_wsgi = tornado.wsgi.WSGIContainer(app)

@app.route("/image/<id>")
def serve_image(id):
    resp = flows[id].response
    return resp.content, resp.code, resp.headers

@app.route("/")
def main():
    return send_from_directory("static", "index.html")

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


app = None
app_thread = None
ws = None




def start(ctx, argv):
    global app, app_thread
    app = tornado.web.Application([
        (r'/events', WebSocketHandler),
        (r".*", tornado.web.FallbackHandler, dict(fallback=app_wsgi))
    ])
    app.listen(8085)

    app_thread = threading.Thread(target=tornado.ioloop.IOLoop.instance().start)
    app_thread.start()
    print "started"

flows = {}


def handle_image(flow):
    WebSocketHandler.broadcast("image", "/image/%s" % flow.id)


def response(ctx, flow):
    """
    @param flow: libmproxy.protocol.http.HTTPFlow
    """
    flows[flow.id] = flow
    WebSocketHandler.broadcast("flow", flow.get_state(short=True))
    print "Received flow: %s" % flow

    is_image = (
        re.search(r"jpe?g|png|gif|webm", flow.request.path) or
        "image" in flow.response.headers.get_first("content-type", "")
    )
    if is_image:
        handle_image(flow)