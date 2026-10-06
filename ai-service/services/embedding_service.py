import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_embedding(text):
    if not text or not str(text).strip():
        return [0.0] * 384

    try:
        content = str(text)[:2000]
        res = client.models.embed_content(
            model="gemini-embedding-001",
            contents=content,
            config={"output_dimensionality": 384}
        )
        return list(res.embeddings[0].values)
    except Exception as e:
        print(f"Embedding error: {e}")
        return [0.0] * 384