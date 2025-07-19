from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
document_chunks = []
id_to_chunk = {}

from services.vector_store import VectorStore
vector_store = VectorStore(dim=1536)
