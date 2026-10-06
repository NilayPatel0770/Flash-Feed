import { useEffect, useState } from "react";
import { getBookmarks } from "../services/bookmarkService";

const useBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookmarks();

    }, []);

    const fetchBookmarks = async () => {

        try {

            const res = await getBookmarks();

            setBookmarks(res.data.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return {
        bookmarks,
        loading,
        refreshBookmarks: fetchBookmarks
    };

};

export default useBookmarks;