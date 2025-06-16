import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim):
        self.dim = dim
        self.index = faiss.IndexFlatL2(dim)
        self.text_chunks = []

    def add(self, embeddings, texts):
        vectors = np.array(embeddings).astype("float32")
        self.index.add(vectors)
        self.text_chunks.extend(texts)

    def search(self, query_embedding, k=5):
        query_vector = np.array([query_embedding]).astype("float32")
        distances, indices = self.index.search(query_vector, k)
        return [self.text_chunks[i] for i in indices[0]]
