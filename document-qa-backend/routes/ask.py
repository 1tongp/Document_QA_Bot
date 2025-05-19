from flask import Blueprint, request, jsonify
from services.openai_service import get_openai_answer

ask_blueprint = Blueprint('ask', __name__)

@ask_blueprint.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        messages = data.get("messages", [])
        context = data.get("context", "")

        if not messages:
            return jsonify({'error': 'No messages provided'}), 400

        answer = get_openai_answer(messages, context)
        return jsonify({'answer': answer})

    except Exception as e:
        print("🔥 Error in /ask:", e)
        return jsonify({'error': str(e)}), 500
