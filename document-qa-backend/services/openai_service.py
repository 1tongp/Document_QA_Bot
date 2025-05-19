from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
