# 🧠 Document QA Bot

A full-stack AI-powered chatbot that answers questions based on user-uploaded documents using semantic search and OpenAI's GPT.

---

## 🚀 Features

* Upload PDFs and extract document content.
* Embed document content using SentenceTransformers.
* Use FAISS for fast semantic search.
* Ask questions and get contextually relevant answers from OpenAI.

---

## 💠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/1tongp/Document_QA_Bot.git
cd document-qa-bot
```

---

### 2. Set up the backend (Flask + Python)

```bash
cd document-qa-backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

#### Add a `.env` file:

```env for backend
DATABASE_URL=postgresql://<postgresuser>:<password>@localhost:5432/docqa
OPENAI_API_KEY=sk-xxxxxxxx
CORS_ORIGINS=http://localhost:3000
```

``` env for frontend
REACT_APP_API_BASE=http://127.0.0.1:5000
```

#### Initialize the DB (Local only for first time)

```bash
python init_db.py
```

---

### 3. Set up the frontend (React)

```bash
cd ../document-qa-frontend
npm install
```

---

### 4. Start both servers

From the project root (`document-qa-bot`):

```bash
npm install
npm start
```

This runs:

* Flask backend at: `http://127.0.0.1:5000`
* React frontend at: `http://localhost:3000`

---

## 🧪 Test the App

1. Open your browser at `http://localhost:3000`.
2. Upload a PDF.
3. Ask a question about the document.
4. The app performs semantic search on the uploaded content and generates a GPT-powered answer.

---

## ⚙️ Tech Stack

| Layer    | Tech                           |
| -------- | ------------------------------ |
| Frontend | React, Axios                   |
| Backend  | Flask, SQLAlchemy, Flask-Login |
| AI       | OpenAI Chat API, Embedding API |
| DB       | PostgreSQL (local + Render)    |
| VectorDB | Chroma                  |


---

## 🔐 Production Setup

### 🚣 PostgreSQL on Render

* Create PostgreSQL instance on Render
* Copy internal DB URL and set as:

```env
DATABASE_URL=postgresql://<user>:<pw>@<host>/<db>
```

* Add same to Render’s **Environment Variables**

### 🟢 Frontend on Vercel

* In Vercel project settings:

  ```env
  REACT_APP_API_BASE=https://document-qa-bot-wcfp.onrender.com/
  ```

---

## 🧼 Troubleshooting

* If you get CORS errors, ensure Flask has `flask-cors` configured correctly.
* Use `Ctrl+Shift+R` to hard refresh your frontend after backend changes.
* Ensure your `.env` is loaded before running Flask.
If something is already running on 3000
Solution 1: list of projects running on 3000 `lsof -i :3000` 
            Then kill the project `kill -9 <PID>`

Solution 2: `PORT=3001 npm start` Run on another port 
---

## 📌 Notes

* This version uses in-memory ChromaDB index. In production, you should use a persistent store or per-user indexing.
* Chunking is basic; you can improve it by using sentence/paragraph splitters.

---

## 📄 License

MIT License
