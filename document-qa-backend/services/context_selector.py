import re
import numpy as np
from services.session_state import document_chunks, embedding_model, faiss_index, id_to_chunk

from services.session_state import vector_store
from services.openai_service import get_embeddings

def get_top_chunks(query, top_k=3):
    print("🔎 Searching with:", query)
    print("📦 Chunk count in store:", len(vector_store.text_chunks))
    query_embedding = get_embeddings([query])[0]
    top_chunks = vector_store.search(query_embedding, k=top_k)
    print("📚 Retrieved chunks:", top_chunks)
    return top_chunks


# def get_top_chunks(query, top_k=3):
#     # Normalize query terms
#     query_terms = set(re.findall(r'\w+', query.lower()))

#     scored_chunks = []
#     for chunk in document_chunks:
#         chunk_terms = set(re.findall(r'\w+', chunk.lower()))
#         score = len(query_terms.intersection(chunk_terms))
#         scored_chunks.append((score, chunk))

#     # Sort by score descending
#     scored_chunks.sort(reverse=True, key=lambda x: x[0])
#     return [chunk for score, chunk in scored_chunks[:top_k]]

# def get_semantic_top_chunks(query, k=3):
#     query_vec = embedding_model.encode([query])
#     _, I = faiss_index.search(np.array(query_vec), k)
#     return [id_to_chunk[i] for i in I[0]]
