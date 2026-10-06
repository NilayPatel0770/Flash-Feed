import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

const useCategories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await getCategories();
                setCategories([
                    {
                        name: "All News",
                        slug: "all"
                    },
                    ...res.data.data
                ]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);
    return {
        categories,
        loading
    };
};

export default useCategories;