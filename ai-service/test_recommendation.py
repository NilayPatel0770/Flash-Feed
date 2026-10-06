import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from services.recommendation_service import recommend_articles
from config.database import articles

sample = articles.find_one({"embedding": {"$exists": True, "$ne": []}})
if not sample:
    print("No articles with embeddings found in database.")
    sys.exit(0)

ARTICLE_ID = str(sample["_id"])
print(f"Testing recommendations for article: {sample.get('title', 'Unknown')} (ID: {ARTICLE_ID})")

result = recommend_articles(ARTICLE_ID)

print("=" * 50)
print("Recommendations")
print("=" * 50)

for article in result:
    print(article["title"])
    print(f"Score: {article['score']:.4f}")
    print()