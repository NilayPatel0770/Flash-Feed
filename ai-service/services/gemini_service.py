import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_article(content):

    prompt = f"""
You are an AI News Analyzer.

Analyze the following news article.

Return ONLY valid JSON.

{{
    "summary": [
        "Point 1",
        "Point 2",
        "Point 3"
    ],
    "keywords": [
        "keyword1",
        "keyword2",
        "keyword3",
        "keyword4",
        "keyword5"
    ],
    "sentiment": "Positive",
    "category": "Technology"
}}

Choose category ONLY from:

Technology
Business
Sports
Health
Science
Politics
Entertainment
Artificial Intelligence
Cyber Security
Startups
General

Article:

{content}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        clean_text = (response.text or "").strip()
        if "```json" in clean_text:
            clean_text = clean_text.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_text:
            clean_text = clean_text.split("```")[1].split("```")[0].strip()
        return json.loads(clean_text)
    except Exception as e:
        print(f"Gemini API warning: {e}")
        first_sentence = content.strip().split(".")[0] if content else "Latest update."
        return {
            "summary": [first_sentence[:120] + "."],
            "keywords": ["News", "Trending"],
            "sentiment": "Neutral",
            "category": "General"
        }

            "category": "General"
        }


def generate_summary(content):
    result = analyze_article(content)
    summary_pts = result.get("summary", [])
    if isinstance(summary_pts, list):
        return "\n".join(f"- {pt}" for pt in summary_pts)
    return str(summary_pts)


def generate_keywords(content):
    result = analyze_article(content)
    keywords = result.get("keywords", [])
    if isinstance(keywords, list):
        return ", ".join(keywords)
    return str(keywords)


def analyze_sentiment(content):
    result = analyze_article(content)
    return result.get("sentiment", "Neutral")