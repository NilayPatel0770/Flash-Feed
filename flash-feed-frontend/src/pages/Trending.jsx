import Card from "../component/UI/Card";
import useTrendingNews from "../hooks/useTrendingNews";

const Trending = () => {

    const {
        news,
        loading
    } = useTrendingNews();

    if (loading)
        return (
            <p className="text-center py-10">
                Loading...
            </p>
        );

    return (

        <div className="max-w-7xl mx-auto py-8">

            <h1 className="text-4xl font-bold text-main-text mb-8">

                Trending News

            </h1>

            {news.map(article => (

                <Card
                    key={article._id}
                    news={article}
                />

            ))}

        </div>

    );

};

export default Trending;