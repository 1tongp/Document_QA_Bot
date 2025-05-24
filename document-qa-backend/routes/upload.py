from flask import Blueprint, request, jsonify
from services.session_state import document_chunks
from services.pdf_service import extract_text_from_pdf, chunk_text

upload_blueprint = Blueprint('upload', __name__)

@upload_blueprint.route('/upload', methods=['POST'])
def upload_pdf():
    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    text = extract_text_from_pdf(file)
    document_chunks.clear()
    document_chunks.extend(chunk_text(text))
    return jsonify({'message': f'{len(document_chunks)} chunks indexed.'})