import React, { useRef } from "react";



import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

//Componenets
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


import "./style.scss";

const Carousel = ({ data , loading , endpoint , title}) => {
   console.log("Crousel",data);
    const carouselContainer = useRef() ;

    const {url} = useSelector((state)=>{
       return state.home ;
    }) ;

    const navigate = useNavigate() ;

    const skItem = () =>{
        return(
            <div className="skeletonItem">
            <div className="posterBlock skeleton">
            </div>
            <div className="textBlock ">
            <div className="title"></div>
            <div className="date"></div>
            </div>
            </div>
        )
    }

    
    return (
        <div className="carousel" >
        <ContentWrapper>
        <div className="sectionHeading">{title}</div>
        { !loading ? (
            <div className="carouselItems" ref={carouselContainer}>
            
            {data?.map((item)=>{
                const posterUrl = item?.poster_path ? url.poster + item.poster_path : PosterFallback  ;
                
                return (
                    <div key={item?.id} onClick={(()=>{
                        navigate(`/${item?.media_type || endpoint }/${item?.id}`) ;
                    })}
                    className="carouselItem" >
                            <div className="posterBlock">
                                    <Img src={posterUrl} />
                                    <CircleRating rating={item?.vote_average.toFixed(1)} />
                                    <Genres data={item?.genre_ids.slice(0,2)} />
                            </div>
                            <div className="textBlock">
                                <span className="title">
                                { item?.title}
                                 </span>
                            <span className="date">
                            {dayjs(item?.release_Date).format("MMM D ,YYYY")}
                            </span>
                        </div>
                    </div>
                );
            })}
            </div>
            
        ):(
            <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            </div>
        )}
        </ContentWrapper>
        </div>
    );
};

export default Carousel;