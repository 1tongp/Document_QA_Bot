# import faiss
# import numpy as np

# class VectorStore:
#     def __init__(self, dim):
#         self.dim = dim
#         self.index = faiss.IndexFlatL2(dim)
#         self.text_chunks = []

#     def add(self, embeddings, texts):
#         vectors = np.array(embeddings).astype("float32")
#         self.index.add(vectors)
#         self.text_chunks.extend(texts)

#     def search(self, query_embedding, k=5):
#         query_vector = np.array([query_embedding]).astype("float32")
#         distances, indices = self.index.search(query_vector, k)
#         return [self.text_chunks[i] for i in indices[0]]


import chromadb
from chromadb.config import Settings

class VectorStore:
    def __init__(self, dim):
        self.dim = dim
        self.client = chromadb.Client(Settings())
        self.collection = self.client.get_or_create_collection("vectorstore")
        self.counter = 0

    def add(self, embeddings, texts):
        ids = [f"chunk_{self.counter + i}" for i in range(len(texts))]
        self.counter += len(texts)
        metadatas = [{"index": i} for i in range(len(texts))]
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )

    def search(self, query_embedding, k=5):
        results = self.collection.query(query_embeddings=[query_embedding], n_results=k)
        return results["documents"][0]