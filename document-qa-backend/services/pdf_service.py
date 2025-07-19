import pdfplumber
import nltk
from nltk.tokenize import sent_tokenize
import ssl
from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktParameters

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('punkt')

def extract_text_from_pdf(file):
    text = ''
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def chunk_text(text, max_tokens=500, overlap=50):
    tokenizer = PunktSentenceTokenizer()
    sentences = tokenizer.tokenize(text)
    chunks, current_chunk = [], []
    current_length = 0

    for sentence in sentences:
        tokens = sentence.split()
        if current_length + len(tokens) > max_tokens:
            chunks.append(" ".join(current_chunk))
            current_chunk = current_chunk[-overlap:]  # Overlap
            current_length = len(current_chunk)
        current_chunk.extend(tokens)
        current_length += len(tokens)

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks
