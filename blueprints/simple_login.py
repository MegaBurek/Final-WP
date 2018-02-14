import flask
from flask import Blueprint
from flask import request
from flask import session
from flask import jsonify

# Da ne bi doslo do ciklicnih zavisnosti uveden je novi modul
# koji sadrzi objekat koji predstavlja konekciju ka bazi podataka.
from utils.db_connection import mysql

simple_login = Blueprint("simple_login", __name__)

@simple_login.route("/login", methods=["POST"])
def login():
    login_user = request.json
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()

    if user is not None:
        session["user"] = user
        return jsonify({"success": True})

    return jsonify({"success": False})

@simple_login.route("/isLoggedin", methods=["GET"])
def is_loggedin():
    return jsonify(session.get("user") is not None)

@simple_login.route("/returnLogged", methods=["GET"])
def returnLogged():
    return jsonify(session.get("user"))

@simple_login.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return jsonify({"success": True})
