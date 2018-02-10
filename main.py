#utils
import datetime
import flask
from flask import Flask
from utils.db_connection import mysql
from flask import request
from flask import session
from flask import redirect, url_for
from werkzeug.utils import secure_filename

#blueprints
from blueprints.authors import authors_flask
from blueprints.posts import posts_flask
from blueprints.simple_login import simple_login

app = Flask(__name__, static_url_path="")

app.secret_key = "SECRET_KEY"

UPLOAD_FOLDER = '../static/media/images/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysqlserver'
app.config['MYSQL_DATABASE_DB'] = 'maindb'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)

app.register_blueprint(authors_flask)
app.register_blueprint(posts_flask)
app.register_blueprint(simple_login)

@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    return app.send_static_file("index.html")

app.run("0.0.0.0", 80, threaded=True)
