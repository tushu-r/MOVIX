import { useEffect, useState } from "react" ;

import { fetchDataFromApi } from "../utils/api" ;


export const useFetch = (url) => {

    const [data, setData] = useState(null) ;
    const [loading, setLoading] = useState(true) ;
    const [error, setError] = useState(null) ;

    useEffect(() => {

        setLoading(true);
        setData(null);
        setError("");

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false) ;
                setData(res) ;
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
            
    }, [url]);

    return { data, loading, error };
};


