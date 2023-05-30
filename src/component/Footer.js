import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
           
            
            <Link to="/"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/timetracker"><span className="material-symbols-outlined">timer</span></Link>
            <Link to="/create"><span className="material-symbols-outlined">add_circle</span></Link>
            <Link to="/logg"><span className="material-symbols-outlined">list</span></Link>
        </footer>
      )
}

export default Footer

 

