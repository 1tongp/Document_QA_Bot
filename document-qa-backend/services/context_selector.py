import re
import numpy as np
from services.session_state import document_chunks, embedding_model, faiss_index, id_to_chunk


def get_top_chunks(query, top_k=3):
    # Normalize query terms
    query_terms = set(re.findall(r'\w+', query.lower()))

    scored_chunks = []
    for chunk in document_chunks:
        chunk_terms = set(re.findall(r'\w+', chunk.lower()))
        score = len(query_terms.intersection(chunk_terms))
        scored_chunks.append((score, chunk))

    # Sort by score descending
    scored_chunks.sort(reverse=True, key=lambda x: x[0])
    return [chunk for score, chunk in scored_chunks[:top_k]]

# def get_semantic_top_chunks(query, k=3):
#     query_vec = embedding_model.encode([query])
#     _, I = faiss_index.search(np.array(query_vec), k)
#     return [id_to_chunk[i] for i in I[0]]
