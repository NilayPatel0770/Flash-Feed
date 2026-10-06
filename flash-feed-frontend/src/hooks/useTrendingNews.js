import { useEffect, useState } from "react";
import { getTrendingNews } from "../services/trendingService";

const useTrendingNews = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTrending();

    }, []);

    const loadTrending = async () => {

        try {

            const res = await getTrendingNews();

            setNews(res.data.data);

        } finally {

            setLoading(false);

        }

    };

    return {
        news,
        loading
    };

};

export default useTrendingNews;