import json
import threading
import tornado.ioloop
import tornado.web
import tornado.websocket

class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(request):
        request.render("index.html")

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
    app = tornado.web.Application([(r'/events', WebSocketHandler), (r'/', IndexHandler)])
    app.listen(8085)

    app_thread = threading.Thread(target=tornado.ioloop.IOLoop.instance().start)
    app_thread.start()
    print "started"


def response(ctx, flow):
    WebSocketHandler.broadcast("flow", flow.get_state(short=True))
    print "Received flow: %s" % flow