import Card from "../component/UI/Card";
import useBookmarks from "../hooks/useBookmarks";

const SavedNews = () => {

    const {
        bookmarks,
        loading
    } = useBookmarks();

    if (loading)
        return (
            <p className="text-center mt-10">
                Loading...
            </p>
        );

    return (

        <div className="max-w-7xl mx-auto px-4 py-8">

            <h1 className="text-4xl font-bold text-main-text mb-8">

                Saved News

            </h1>

            {bookmarks.length === 0 ? (

                <div className="text-center py-20">

                    <p className="text-muted-text">

                        No bookmarked articles.

                    </p>

                </div>

            ) : (

                bookmarks.map(news => (

                    <Card
                        key={news._id}
                        news={news}
                    />

                ))

            )}

        </div>

    );

};

export default SavedNews;