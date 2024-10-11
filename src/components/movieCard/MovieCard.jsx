import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data , mediaType}) => {

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const posterUrl = data?.poster_path
        ? url.poster + data.poster_path
        : PosterFallback ;

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data?.media_type || mediaType}/${data?.id}`)
            }
         >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                        <CircleRating rating={data?.vote_average?.toFixed(1)} />
                        <Genres data={ data?.genre_ids?.slice(0, 2) } />
            </div>

            <div className="textBlock">
                <div className="title"> {data?.title || data?.name} </div>
                <div className="date">
                    {dayjs(data?.release_date).format("MMM D, YYYY")}
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
