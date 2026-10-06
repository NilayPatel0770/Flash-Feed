import { useEffect, useState } from "react";
import { getPersonalizedNews } from "../services/personalizedService";

const usePersonalizedNews = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRecommendations();

    }, []);

    const loadRecommendations = async () => {

        try {

            const res = await getPersonalizedNews();

            setNews(res.data.recommendations || []);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return {
        news,
        loading
    };

};

export default usePersonalizedNews;