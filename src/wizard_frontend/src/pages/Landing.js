import * as React from "react";
import { Outlet, Link } from "react-router-dom";
const Landing = () => {
    return (
    <div className="landing-page">
        <Link to="/game">Game</Link>
    </div>
    );
  };
  
  export default Landing;