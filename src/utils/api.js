import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmNjOTNhMzc3OTdmMDYzM2U0ZmQxODkxNzhhMzU2MCIsInN1YiI6IjY1Y2IzMjEzYTA2ZWZlMDE4NDc2YmFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5XpvKGuGbZbHGKf5_464w_PbTT0vYKXD25rzEjfz8AY";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
