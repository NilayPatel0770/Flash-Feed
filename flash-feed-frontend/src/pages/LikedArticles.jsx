import Card from "../component/UI/Card";
import useLikedArticles from "../hooks/useLikedArticles";

const LikedArticles = () => {

    const {
        likedArticles,
        loading
    } = useLikedArticles();

    if (loading) {
        return (
            <p className="text-center py-10">
                Loading...
            </p>
        );
    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-8">

            <h1 className="text-4xl font-bold text-main-text mb-8">

                Liked Articles

            </h1>

            {likedArticles.length === 0 ? (

                <div className="text-center py-20">

                    <p className="text-muted-text">

                        You haven't liked any articles yet.

                    </p>

                </div>

            ) : (

                likedArticles.map(article => (

                    <Card
                        key={article._id}
                        news={article}
                    />

                ))

            )}

        </div>

    );

};

export default LikedArticles;