import React, { useEffect } from 'react' ;
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { fetchDataFromApi } from "./utils/api" ;
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


import {getApiConfiguration , getGenres} from "./store/homeSlice" ;


import Header from "./components/header/Header" ;
import Footer from "./components/footer/Footer" ;
import Home from "./pages/home/Home" ;
import Details from "./pages/details/Details" ;
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore" ;
import PageNotFound from "./pages/404/PageNotFound" ;


const App = () => {
    const dispatch = useDispatch() ;
    const { url } = useSelector((state)=> state.home) ;
    
    console.log(url) ;
    
    //Images URL SETTINGS
    const fetchApiConfig = ()=>{
      fetchDataFromApi("/configuration").then((res)=>{
        console.log(res) ;
        const url = {
          backdrop:res.images.secure_base_url + "original" ,
          poster:res.images.secure_base_url + "original" ,
          profile:res.images.secure_base_url+ "original" ,
        }
        dispatch(getApiConfiguration(url)) ;
      })
    } ;

    //GENRES LIST OPTIONS
    const genresCall = async () =>{
      let promises = [] ;
      let  endpoint = ["tv","movie"] ;
      let allGenres = {} ;
      endpoint.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`)) ;
      }) ;
      const data = await Promise.all(promises) ;
      console.log(data) ;
      data.map(({genres})=>{
        console.log(genres) ;
        return genres.map((item)=>(allGenres[item.id] = item)) ;
      })
      console.log(allGenres);
      dispatch(getGenres(allGenres)) ;
    } ;

    useEffect(()=>{
      fetchApiConfig() ;
      genresCall() ;
    },[]) ;

  
   
  return (
   <BrowserRouter>
   <Header />
   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/:mediaType/:id" element={<Details />} />
   <Route path="/search/:query" element={<SearchResult />} />
   <Route path="/explore/:mediaType" element={<Explore />} />
   <Route path="*" element={<PageNotFound/>} />
   </Routes>
   <Footer />
   </BrowserRouter>

  )
}

export default App