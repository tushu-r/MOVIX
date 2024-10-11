import React, { useState } from "react";

import "./style.scss";
import Carousel from "../../../components/carousel/Carousel";
import { useFetch } from "../../../hooks/useFetch";

const Similar = ({ mediaType , id }) => {
    const {data,loading,error} = useFetch(`/${mediaType}/${id}/similar`) ;
    const title = mediaType === "tv" ? "Similar Tv Shows" :"Similar Movies" ;

    return (
        <Carousel 
        title={title} 
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
        />

    );
}
export default Similar;
