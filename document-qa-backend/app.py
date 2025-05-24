from flask import Flask
from flask_cors import CORS
from routes.ask import ask_blueprint
from routes.upload import upload_blueprint
from dotenv import load_dotenv

load_dotenv()

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

if __name__ == '__main__':
    app.run(debug=True)
