import React from "react";
import "./header.css"

const Header = (props) => {
    return (
        <header className="header">
            <div className="bar"/>
            <div className="img_wrapper">
             <img className="head_img" alt="headerimg" src="img/header_img_1.png" onClick={() => {
              props.setMode("MAIN");
            }}/>
             <h3 className="main_title">율슐랭가이드</h3>
            </div>

            <img className="login_img" alt="loginimg" src="img/login_img.png" onClick={() => {
              props.setMode("LOGIN");
            }}/>
            
        </header>
    )
}

export default Header