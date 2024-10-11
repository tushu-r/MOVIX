"use client"
import React, { useState }  from 'react' ;
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom" ;
import { useSelector } from 'react-redux';
import "./style.scss" ;
import { useFetch } from '../../../hooks/useFetch' ;
import { isPlainObject } from '@reduxjs/toolkit' ;
import Img from '../../../components/lazyLoadImage/Img' ;
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper' ;


const HeroBanner = () => {

     

    const { data , loading } =  useFetch("/movie/upcoming") ;
    const { url } = useSelector((state)=> state.home) ;

    console.log(data) ;


    const navigate = useNavigate() ;

    const [background , setbackground] = useState("") ;
    const [query ,setquery] =useState("") ;

    const queryHandler = (e)=>{
        
        console.log("Query submitted:", query);

        // Navigate to a different page , for example, search results page
        if (query.trim() && e.key === "Enter" ) {
            console.log(e.key)
            navigate(`/search/${query}`);
        }
        
    }

    useEffect(()=>{
        if( data != null )
        {
            if( Object.keys(data).length > 0 ){
                const bg = url?.backdrop + data?.results?.[Math.floor( Math.random() *20 )].backdrop_path ;
                console.log( bg ) ;
                setbackground(bg) ;
            }
        }
    },[data,url]) ;


  return (
    <div className='heroBanner' onClick={(e)=>{
        navigate("/");
    }}>
        { !loading && <div className='backdrop-img'>
            <div className='lazy-load-image-background'>
                <Img src={background} />
            </div> 
        </div> }
    <div className= "opacity-layer"></div>
    <ContentWrapper>
    <div className='wrapper'>
    <div className='heroBannerContent'>
        <span className='title'>Welcome</span>
        <span className="subtitle">
        Millions of movies , TV shows and people
        to discover .
        Explore NOW 
        </span>
        <div className='searchInput'>
            <input id="input"
                onKeyUp={queryHandler}
                onInput={ (e)=>{
                    setquery(e.target.value) ;
                    console.log("query",query);
                }}
                type="text"
                placeholder="Search for a movie or tv show ...."
            />
            <a  href={`/search/${query}`} onClick={()=>{
                    document.getElementById("input").value = "" ;
            }} >
             Search
            </a>
        </div>
        
    </div>
    </div>
    </ContentWrapper>
    </div>
    
    
  )
}

export default HeroBanner