from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import SessionLocal, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    db = SessionLocal()

    if db.query(User).filter_by(username=data['username']).first():
        db.close()
        return jsonify({'error': 'Username already exists'}), 409

    hashed_pw = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password_hash=hashed_pw)
    db.add(new_user)
    db.commit()
    db.close()
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    db = SessionLocal()

    user = db.query(User).filter_by(username=data['username']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id  # Optional, if you still want session tracking
        user_data = {
            'id': user.id,
            'username': user.username
        }
        db.close()
        return jsonify({'message': 'Login successful', 'user': user_data}), 200

    db.close()
    return jsonify({'error': 'Invalid credentials'}), 401

