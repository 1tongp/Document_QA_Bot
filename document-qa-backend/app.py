from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.ask import ask_blueprint
from routes.upload import upload_blueprint
from dotenv import load_dotenv
import smtplib
import os
import random

load_dotenv()
global current_code
current_code = "123456"
app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# Register endpoints
app.register_blueprint(ask_blueprint)
app.register_blueprint(upload_blueprint)

@app.route('/')
def home():
    return "✅ Flask backend running"

# below code not in use, but kept for reference
@app.route('/generate-code', methods=['GET'])
def generate_code():
    global current_code
    current_code = "123456"  # 🔐 Hardcoded 6-digit code for testing
    print("Generated code:", current_code)
    return jsonify({'success': True, 'message': 'Code generated.'})

# def generate_code():
#     global current_code
#     current_code = str(random.randint(100000, 999999))
#     print("Generated code:", current_code)  # 👈 DEBUG
#     send_email(current_code)
#     return jsonify({'success': True})

# def send_email(code):
#     sender = os.getenv("GMAIL_USER")  # Use your Gmail address
#     receiver = os.getenv("GMAIL_USER")
#     password = os.getenv("GMAIL_APP_PASSWORD")  # Use app password
#     subject = "Your access code"
#     message = f"Subject: {subject}\n\nYour code is: {code}"

#     with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
#         smtp.starttls()
#         smtp.login(sender, password)
#         smtp.sendmail(sender, receiver, message)
@app.route('/verify-code', methods=['POST'])
def verify_code():
    data = request.get_json()
    user_code = data.get('code')

    print(f"Received code from frontend: {user_code}")  # 👈 DEBUG
    print(f"Current code on server: {current_code}")
    if not user_code:
        return jsonify({'success': False, 'message': 'Code missing'}), 400

    if user_code == current_code:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 403



if __name__ == '__main__':
    app.run(debug=True)
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
