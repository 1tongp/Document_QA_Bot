from flask import Blueprint, request, jsonify, session
from services.pdf_service import extract_text_from_pdf, chunk_text
from services.openai_service import get_embeddings
from services.session_state import vector_store
from models.models import SessionLocal, UploadedFile
import os
from datetime import datetime

upload_blueprint = Blueprint('upload', __name__)
UPLOAD_FOLDER = 'uploaded_files'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@upload_blueprint.route('/upload', methods=['POST'])
def upload_pdf():
    try:
        user_id = request.form.get('user_id')
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401

        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Save to database
        db = SessionLocal()
        uploaded = UploadedFile(
            filename=filename,
            filepath=filepath,
            upload_time=datetime.utcnow(),
            user_id=user_id
        )
        db.add(uploaded)
        db.commit()
        db.close()

        # Extract and chunk text
        text = extract_text_from_pdf(file)
        chunks = chunk_text(text)
        if not chunks:
            return jsonify({'error': 'No text chunks found in PDF'}), 400

        # Embed chunks
        embeddings = get_embeddings(chunks)

        # Reset vector store
        vector_store.client.delete_collection("vectorstore")
        vector_store.collection = vector_store.client.get_or_create_collection("vectorstore")
        vector_store.counter = 0
        vector_store.add(embeddings, chunks)

        return jsonify({
            'message': f'{len(chunks)} chunks indexed.',
            'chunks': chunks
        })

    except Exception as e:
        print("🔥 /upload failed:", e)
        return jsonify({'error': str(e)}), 500
