import React from 'react' ;
import "./style.scss" ;
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Genres = ({data}) => {

  const {genres} = useSelector((state)=>{
       return state.home ;
  }) ;

 console.log("Genres", genres) ;

  return (

    <div className='genres'>

      {data?.map((g)=>{
          if(!genres[g]?.name) return ;
          return (
              <div className='genre' key={g} >
              {genres[g]?.name} 
              </div>
          );
      })}
    </div>
  )
}

export default Genres ;