from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
faiss_index = None
document_chunks = []
id_to_chunk = {}
