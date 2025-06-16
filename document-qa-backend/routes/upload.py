from flask import Blueprint, request, jsonify
from services.pdf_service import extract_text_from_pdf, chunk_text
from services.openai_service import get_embeddings
from services.session_state import vector_store

upload_blueprint = Blueprint('upload', __name__)

@upload_blueprint.route('/upload', methods=['POST'])
def upload_pdf():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        # Extract and chunk text
        text = extract_text_from_pdf(file)
        chunks = chunk_text(text)
        if not chunks:
            return jsonify({'error': 'No text chunks found in PDF'}), 400

        # Embed chunks
        embeddings = get_embeddings(chunks)

        # Clear previous content, add new
        vector_store.index.reset()
        vector_store.text_chunks.clear()
        vector_store.add(embeddings, chunks)

        return jsonify({
            'message': f'{len(chunks)} chunks indexed.',
            'chunks': chunks
        })

    except Exception as e:
        print("🔥 /upload failed:", e)
        return jsonify({'error': str(e)}), 500

