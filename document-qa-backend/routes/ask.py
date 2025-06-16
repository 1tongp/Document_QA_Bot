# from flask import Blueprint, request, jsonify
# from services.openai_service import get_openai_answer
# from services.context_selector import get_top_chunks  # or get_semantic_top_chunks

# ask_blueprint = Blueprint('ask', __name__)

# @ask_blueprint.route('/ask', methods=['POST'])
# def ask_question():
#     try:
#         data = request.get_json()
#         messages = data.get("messages", [])

#         if not messages or "content" not in messages[-1]:
#             return jsonify({'error': 'Invalid or missing messages'}), 400

#         user_query = messages[-1]["content"]

#         # ✅ DEBUG print
#         print("🧠 User query:", user_query)

#         # 🔍 Use chunk selector
#         top_chunks = get_top_chunks(user_query, top_k=3)
#         print("📚 Selected chunks:", top_chunks)

#         context = "\n\n".join(top_chunks)
#         try:
#             answer = get_openai_answer(messages, context)
#         except Exception as e:
#             print("⚠️ LLM call failed:", e)
#             return jsonify({'error': 'LLM failed', 'context': context}), 500

#         return jsonify({
#             'answer': answer,
#             'context': context,
#             'context_chunks': top_chunks
#         })

#     except Exception as e:
#         print("🔥 /ask crashed:", e)
#         return jsonify({'error': str(e)}), 500

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

        # 🚨 Check if FAISS has any data
        if len(vector_store.text_chunks) == 0:
            return jsonify({'error': 'No document data indexed. Please upload a PDF first.'}), 400

        # 1. Embed user query
        question_embedding = get_embeddings([user_query])[0]

        # 2. Search FAISS
        top_chunks = vector_store.search(question_embedding, k=5)
        if not top_chunks:
            return jsonify({'error': 'No relevant context found'}), 200

        # 3. Build prompt
        context = "\n\n".join(top_chunks)
        prompt = f"""You are a helpful assistant. Use the following context to answer the question.

Context:
{context}

Question: {user_query}
Answer:"""

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
