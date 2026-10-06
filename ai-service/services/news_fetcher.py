import feedparser
from newspaper import Article
from services.ai_pipeline import process_article
from services.rss_service import RSS_FEEDS
from services.article_service import (
    article_exists,
    save_article
)

# BBC_RSS = "https://feeds.bbci.co.uk/news/rss.xml"


def fetch_news():
    saved_articles = []
    MAX_NEW_ARTICLES = 20
    saved_count = 0

    for rss in RSS_FEEDS:
        print("\n==============================")
        print(f"Fetching {rss['source']}")
        print("==============================")

        try:
            feed = feedparser.parse(rss["url"])
            print(f"Found {len(feed.entries)} articles")
        except Exception as e:
            print(f"Failed to parse feed for {rss['source']}: {e}")
            continue

        for item in feed.entries:
            try:
                link = getattr(item, "link", None)
                title = getattr(item, "title", "No Title")

                if not link:
                    continue

                # Skip duplicate articles
                if article_exists(link):
                    print(f"Already Exists: {title}")
                    continue

                print(f"Downloading: {title}")

                try:
                    article = Article(link)
                    article.download()
                    article.parse()
                    content = article.text.strip()
                    top_image = article.top_image
                    author = ", ".join(article.authors) if article.authors else "Unknown"
                except Exception as dl_err:
                    print(f"Newspaper parse warning for {link}: {dl_err}")
                    content = ""
                    top_image = ""
                    author = "Unknown"

                description = getattr(item, "summary", "") or getattr(item, "description", "")
                if not content:
                    content = description or title

                published_at = getattr(item, "published", None) or getattr(item, "updated", None)

                article_data = {
                    "title": title,
                    "description": description,
                    "content": content,
                    "image": top_image or "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800",
                    "author": author,
                    "source": rss["source"],
                    "sourceUrl": link,
                    "category": rss["category"],
                    "publishedAt": published_at,
                    # AI Fields
                    "summary": [],
                    "keywords": [],
                    "embedding": [],
                    "sentiment": "Neutral",
                    # Statistics
                    "views": 0,
                    "likes": 0,
                    "bookmarks": 0,
                }

                article_data = process_article(article_data)
                save_article(article_data)
                saved_count += 1
                saved_articles.append(article_data)

                print(f"Saved: {title}")

                if saved_count >= MAX_NEW_ARTICLES:
                    print("Processing limit reached.")
                    return saved_articles

            except Exception as e:
                print("-----------------------------------")
                print(f"Failed: {getattr(item, 'link', 'unknown')}")
                print(e)
                print("-----------------------------------")

    print(f"\nTotal New Articles Saved: {len(saved_articles)}")
    return saved_articles


fetch_bbc_news = fetch_news