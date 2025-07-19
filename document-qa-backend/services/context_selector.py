from services.session_state import vector_store
from services.openai_service import get_embeddings

def get_top_chunks(query, top_k=3):
    print("🔎 Searching with:", query)
    print("📦 Chunk count in store:", vector_store.collection.count())
    
    query_embedding = get_embeddings([query])[0]
    top_chunks = vector_store.search(query_embedding, k=top_k)
    
    print("📚 Retrieved chunks:", top_chunks)
    return top_chunks
