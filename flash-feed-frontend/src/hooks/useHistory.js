import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";

const useHistory = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const res = await getHistory();

            setHistory(res.data.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return {
        history,
        loading,
        refreshHistory: loadHistory
    };
};

export default useHistory;