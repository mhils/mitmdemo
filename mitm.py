import json
import threading
import tornado.ioloop
import tornado.web
import tornado.websocket

clients = []


class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(request):
        request.render("index.html")


class WebSocketChatHandler(tornado.websocket.WebSocketHandler):
    def open(self, *args):
        print("open", "WebSocketChatHandler")
        clients.append(self)

    @classmethod
    def broadcast(cls, type, data):
        message = json.dumps({
            "type": type,
            "data": data
        })
        for client in clients:
            client.write_message(message)

    def on_close(self):
        clients.remove(self)


app = None
app_thread = None
ws = None

def start(ctx, argv):
    global app, app_thread
    app = tornado.web.Application([(r'/events', WebSocketChatHandler), (r'/', IndexHandler)])
    app.listen(8085)

    app_thread = threading.Thread(target=tornado.ioloop.IOLoop.instance().start)
    app_thread.start()
    print "started"


def response(ctx, flow):
    WebSocketChatHandler.broadcast("flow", flow.get_state(short=True))
    print "Received flow: %s" % flow