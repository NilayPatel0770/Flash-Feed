import Card from "../component/UI/Card";
import useHistory from "../hooks/useHistory";

const ReadingHistory = () => {

    const {
        history,
        loading
    } = useHistory();
    
    if (loading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-8">

            <h1 className="text-4xl font-bold text-main-text mb-8">
                Reading History
            </h1>

            {history.length === 0 ? (

                <p className="text-muted-text">
                    No reading history yet.
                </p>

            ) : (

              history
  .filter(item => item.article !== null)
  .map(item => (
    <Card
      key={item._id}
      news={item.article}
    />
))

            )}

        </div>

    );

};

export default ReadingHistory;