import pdfplumber
import nltk
from nltk.tokenize import sent_tokenize

def extract_text_from_pdf(file):
    text = ''
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def chunk_text(text, max_chunk_chars=1000):
    import textwrap
    chunks = textwrap.wrap(text, max_chunk_chars)
    return chunks


nltk.download("punkt")

def advanced_chunk_text(text, max_sentences=5, stride=3):
    sentences = sent_tokenize(text)
    chunks = []

    for i in range(0, len(sentences), stride):
        chunk = " ".join(sentences[i:i + max_sentences])
        if chunk:
            chunks.append(chunk)

    return chunks
