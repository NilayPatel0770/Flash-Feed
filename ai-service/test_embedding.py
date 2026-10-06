from config.database import articles

article = articles.find_one({
    "embedding": {
        "$exists": True,
        "$ne": []
    }
})

if article and "embedding" in article:
    print(f"Embedding length: {len(article['embedding'])}")
    print(article["embedding"])
else:
    print("No embedded articles found.")