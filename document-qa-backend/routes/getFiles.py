from flask import Blueprint, request, jsonify, session
from models.models import SessionLocal, UploadedFile

getFiles_bp = Blueprint('getFiles', __name__)

@getFiles_bp.route('/my-files', methods=['GET'])
def list_user_files():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    db = SessionLocal()
    files = db.query(UploadedFile).filter_by(user_id=user_id).all()
    db.close()

    return jsonify({'files': [
        {
            'id': f.id,
            'filename': f.filename,
            'upload_time': f.upload_time.isoformat()
        } for f in files
    ]})
