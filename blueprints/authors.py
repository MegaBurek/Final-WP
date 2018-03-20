import flask
from flask import Blueprint
from flask import request

from utils.db_connection import mysql

authors_flask = Blueprint("authors_flask", __name__)

@authors_flask.route("/getAuthors", methods=["GET"])
def authors():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@authors_flask.route("/addAuthor", methods=["POST"])
def add_user():

    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    users(Username,Password,Name,Surname,Email,Type)
    VALUES(%s, %s, %s, %s, %s, %s)'''
    
    cursor.execute(q, (data["username"], data["password"],
                       data["name"], data["surname"], data["email"],data["type"]))
    db.commit()
    return flask.jsonify({"status": "done"}), 201

@authors_flask.route("/authors/<int:idUser>", methods=["PUT"])
def edit_user(idUser):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE users SET Name=%s, Surname=%s, Email=%s WHERE idUsers=%s'''
    
    cursor.execute(q, (data["Name"], data["Surname"], data["Email"], idUser))
    db.commit()
    return ""