import openai
import os

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_embeddings(text_list, model="text-embedding-3-small"):
    """
    Embeds a list of text chunks using OpenAI's embedding API.
    """
    response = openai.embeddings.create(
        model=model,
        input=text_list
    )
    return [record.embedding for record in response.data]


def get_openai_answer(messages, context=""):
    if context:
        messages.insert(0, {
            "role": "system",
            "content": f"You are a helpful assistant. Use the following document to answer questions:\n\n{context}"
        })

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.3,
        max_tokens=300
    )
    
    return response.choices[0].message.content.strip()

def ask_llm(prompt, model="gpt-4"):
    system_prompt = """
You are an expert assistant designed for document-based question answering using a combination of internal knowledge and user-provided documents (retrieval-augmented generation).

Your goal is to help users understand or extract information from documents.

Instructions:
- Always prioritize using the provided document context if it is relevant and sufficient.
- Use your general knowledge only to clarify, explain, or define concepts—not to fabricate specific answers.
- Be accurate, evidence-based, and avoid assumptions or speculation.
- If the context does not support a definitive answer, say: "I'm not sure based on the document provided."
- If the question is unrelated to the document, say: "This question doesn't appear to be related to the document provided."
- Keep responses clear, concise, and helpful.
"""

    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()
