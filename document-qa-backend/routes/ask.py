from flask import Blueprint, request, jsonify
from services.openai_service import get_openai_answer
from services.context_selector import get_top_chunks  # or get_semantic_top_chunks

ask_blueprint = Blueprint('ask', __name__)

@ask_blueprint.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        messages = data.get("messages", [])

        if not messages:
            return jsonify({'error': 'No messages provided'}), 400

        user_query = messages[-1]["content"]

        # ✅ DEBUG print
        print("🧠 User query:", user_query)

        # 🔍 Use chunk selector
        top_chunks = get_top_chunks(user_query, top_k=3)
        print("📚 Selected chunks:", top_chunks)

        context = "\n\n".join(top_chunks)
        answer = get_openai_answer(messages, context)

        return jsonify({
            'answer': answer,
            'context': context,
            'context_chunks': top_chunks
        })

    except Exception as e:
        print("🔥 /ask crashed:", e)
        return jsonify({'error': str(e)}), 500
