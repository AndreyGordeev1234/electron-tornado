import tornado.ioloop
import tornado.web
from datetime import datetime
import base64


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        with open("just_image.png", "rb") as image_file:
            img_data = base64.b64encode(image_file.read()).decode('utf-8')
        self.write({
            "text": "Test task",
            "date": datetime.now().strftime('%H:%M:%S'),
            "img": img_data
        })
        self.set_header('Content-Type', 'application/json')


def make_app():
    return tornado.web.Application([
        (r"/api/data", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
