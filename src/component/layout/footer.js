import React from "react";
import "./footer.css"

const Footer = (props) => {
    return (
        <header className="footer">
            <img className="head_img" alt="headerimg" src="img/home_img.png"  onClick={() => {
              props.setMode("MAIN");
            }}/>
            <img className="head_img" alt="headerimg" src="img/map_img.png"/>
            <img className="head_img" alt="headerimg" src="img/start_img.png"/>
        </header>
    )
}

export default Footer