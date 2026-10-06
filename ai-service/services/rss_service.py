import feedparser

RSS_FEEDS = [
    {
        "source": "BBC",
        "category": "General",
        "url": "https://feeds.bbci.co.uk/news/rss.xml"
    },
    {
        "source": "TechCrunch",
        "category": "Technology",
        "url": "https://techcrunch.com/feed/"
    },
    {
        "source": "The Guardian",
        "category": "General",
        "url": "https://www.theguardian.com/world/rss"
    },
    {
        "source": "ESPN",
        "category": "Sports",
        "url": "https://www.espn.com/espn/rss/news"
    },
    {
        "source": "NDTV",
        "category": "General",
        "url": "https://feeds.feedburner.com/ndtvnews-top-stories"
    },
    {
        "source": "The Hindu",
        "category": "General",
        "url": "https://www.thehindu.com/news/national/feeder/default.rss"
    }
]


def fetch_rss_news():
    articles = []

    for rss in RSS_FEEDS:
        try:
            feed = feedparser.parse(rss["url"])

            for entry in feed.entries:
                article = {
                    "title": entry.get("title", ""),
                    "description": entry.get("summary", ""),
                    "url": entry.get("link", ""),
                    "publishedAt": entry.get("published", ""),
                    "source": rss["source"],
                    "category": rss["category"],
                }
                articles.append(article)

        except Exception as e:
            print(f"Error fetching {rss['source']}: {e}")

    return articles