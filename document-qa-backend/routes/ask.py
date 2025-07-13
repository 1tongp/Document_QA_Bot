from flask import Blueprint, request, jsonify
from services.session_state import vector_store
from services.openai_service import get_embeddings, ask_llm

ask_blueprint = Blueprint('ask', __name__)

@ask_blueprint.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        messages = data.get("messages", [])
        if not messages or "content" not in messages[-1]:
            return jsonify({'error': 'Invalid or missing messages'}), 400

        user_query = messages[-1]["content"]
        print("🧠 User query:", user_query)

        # 🧠 No document uploaded: respond with special message instead of error
        if len(vector_store.text_chunks) == 0:
            return jsonify({
                "answer": "⚠️ Please upload a document before asking a question.",
                "context": "",
                "chunks_used": [],
                "warning": "no_document"
            }), 200

        # 1. Embed user query
        question_embedding = get_embeddings([user_query])[0]

        # 2. Search FAISS
        top_chunks = vector_store.search(question_embedding, k=5)
        if not top_chunks:
            return jsonify({
                'answer': "🤔 No relevant context found in the document.",
                'context': "",
                'chunks_used': [],
                'warning': "no_context"
            }), 200

        # 3. Build prompt
        context = "\n\n".join(top_chunks)
        prompt = f"""
Context:
{context}

Question: {user_query}
"""
        # 4. Call OpenAI
        answer = ask_llm(prompt)

        return jsonify({
            "answer": answer,
            "context": context,
            "chunks_used": top_chunks
        })

    except Exception as e:
        print("🔥 /ask crashed:", e)
        return jsonify({'error': str(e)}), 500
