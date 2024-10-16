import React from 'react' ;
import { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import "./style.scss" ;
import { useFetch } from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
    const [endpoint , setEndpoint ] = useState("movie") ;
    const {data,loading} = useFetch(`/${endpoint}/popular`) ;
    console.log("Populkar" , data ) ;
    const onTabChange = (tab) =>{
            setEndpoint( tab === "Movies" ? "movie" :"tv")  ;
    };
  return (
    <div className='carouselSection'>
    <ContentWrapper>
    <span className='carouselTitle'>What's Popular</span>
    <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange} index={0} />
    </ContentWrapper>
    <Carousel  data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default Popular ;