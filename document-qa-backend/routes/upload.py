from flask import Blueprint, request, jsonify
from services.pdf_service import extract_text_from_pdf

upload_blueprint = Blueprint('upload', __name__)

@upload_blueprint.route('/upload', methods=['POST'])
def upload_pdf():
    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    text = extract_text_from_pdf(file)
    return jsonify({'text': text})
