import flask
from flask import Blueprint
from flask import request
import datetime

from utils.db_connection import mysql

posts_flask = Blueprint("posts_flask", __name__)


@posts_flask.route("/getPosts", methods=["GET"])
def posts():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM maindb.posts")
    all_posts = cursor.fetchall()
    return flask.jsonify(all_posts)

@posts_flask.route("/addPost", methods=["POST"])
def add_post():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    posts(path,Users_idUsers,likes,date,tag,title,info)
    VALUES(%s, %s, %s, %s, %s, %s, %s)'''

    data["likes"] = 1
    
    cursor.execute(q, (data["path"], data["author_id"],data["likes"], data["date"],
                       data["tag"], data["title"], data["info"]))

    db.commit()
    return flask.jsonify({"status": "done"}), 201

@posts_flask.route("/posts/<int:idPost>", methods=["GET"])
def get_post(idPost):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM posts WHERE idPosts=%s",idPost)
    data = cursor.fetchone()
    if data is None:
        return "", 404
    return flask.jsonify(data)

@posts_flask.route("/posts/<int:idPost>", methods=["DELETE"])
def delete_post(idPost):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM posts WHERE idPosts=%s",idPost)
    db.commit()
    return ""

@posts_flask.route("/posts/<int:idPost>", methods=["PUT"])
def edit_post(idPost):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE posts SET title=%s, info=%s, tag=%s, date=%s WHERE idPosts=%s'''
    
    data["date"] = datetime.datetime.strptime(data["date"], "%a, %d %b %Y %H:%M:%S %Z")
    cursor.execute(q, (data["title"], data["info"], data["tag"], data["date"], idPost))
    db.commit()
    return ""
            