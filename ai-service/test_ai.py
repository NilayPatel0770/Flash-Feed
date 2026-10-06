import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from services.news_fetcher import fetch_bbc_news

news = fetch_bbc_news()


print("\n==========================")

print(f"Inserted {len(news)} articles")

print("==========================")