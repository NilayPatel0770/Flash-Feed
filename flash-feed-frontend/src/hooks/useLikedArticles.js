import { useEffect, useState } from "react";
import { getLikedArticles } from "../services/likedService";

const useLikedArticles = () => {

    const [likedArticles, setLikedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLikedArticles();
    }, []);

    const loadLikedArticles = async () => {

        try {

            const res = await getLikedArticles();

            setLikedArticles(res.data.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return {
        likedArticles,
        loading,
        refreshLikedArticles: loadLikedArticles
    };

};

export default useLikedArticles;