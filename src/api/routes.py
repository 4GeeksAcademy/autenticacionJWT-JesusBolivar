"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():
    try:
        body = request.json
        firstName = body.get('firstName')
        lastName = body.get('lastName')
        email = body.get('email')
        username = body.get('username')
        password = body.get('password')
        rol = "general"
        

        if firstName is None or lastName is None or email is None or username is None or password is None:
            return jsonify('Se requieren todos los campos para el registro'), 400
        else:
            user = User()
            user_exist = user.query.filter_by(email=email).first()

            if user_exist is not None:
                return jsonify('El usuario ya existe'),400
            
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = generate_password_hash(f'{password}{salt}')

            user.firstName = firstName
            user.lastName = lastName
            user.username = username
            user.email = email
            user.password = password
            user.salt = salt
            user.rol = rol
            db.session.add(user)

            try:
                db.session.commit()
                return jsonify("Creado con exito"),201
            except Exception as err:
                return jsonify({'error': str(err)}),500

    except Exception as err:
        return jsonify({'error': str(err)}),500


@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.json
        username = body.get('username')
        password = body.get('password')

        if username is None or password is None:
            return jsonify('Todos los campos son requeridos'),400
        else:
            user = User().query.filter_by(username=username).first()
            
            if user is None:
                return jsonify('No encontrado el usuario'),404
            else:
                if check_password_hash(user.password,f'{password}{user.salt}'):
                    token=create_access_token(identity=str(user.id))
                    return jsonify({"token":token,"currentUser":user.serialize()}),200
                else:
                    return jsonify("Credenciales invalidas"),401
                
    except Exception as err:
        return jsonify({'error': str(err)}),500
    