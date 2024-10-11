import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {

    const [show , setShow] = useState("top") ;

    const [lastScrollY , setLastScrollY] = useState(0)  ;
   
    
    
    const navigate = useNavigate() ;
    const location = useLocation() ;

    

  

    useEffect(()=>{
        window.scrollTo(0,0) ;
    },[location])

    const controlNavbar = () =>{
        console.log(window.scrollY) ;
        if( window.scrollY > 200 ){
            if( window.scrollY > lastScrollY ){
                setShow("hide") ;
            }else{
                setShow("show") ;
            } 
        }else{
            setShow("top") ;
        }
        setLastScrollY(window.scrollY);
    }
    
    useEffect(()=>{
        window.addEventListener("scroll",controlNavbar) 
        return ()=>{
            window.removeEventListener("scroll" , controlNavbar) ;
        }
    },[lastScrollY]) 

  
    const navigateHandler = (type)=>{
        if( type === "movie"){
            navigate("/explore/movie") ;
        }else {
            navigate("/explore/tv") ;
        }
    }

    return(
        <header className={`header  ${show}`}>
        <ContentWrapper>
            <div className="logo" onClick={(e)=>{
                navigate("/");
            }}>
            <img src={logo} alt="" />
            </div>
            
            <ul className="menuItems">
            <li className="menuItem" onClick={()=>{
                navigate("/explore/movie");
            }}>MOVIES</li>
            <li className="menuItem" onClick={(()=>{
                navigate("/explore/tv");
            })}>TV SHOWS</li>
            </ul>

           
        </ContentWrapper>
       
        </header>
    )
};

export default Header;