import * as React from "react";
import { Outlet, Link } from "react-router-dom";

async function connectPlug() {
    try {
      const publicKey = await window.ic.plug.requestConnect();
      console.log(`The connected user's public key is:`, publicKey);
      closeLanding()
      return publicKey;
    } catch (e) {
      console.log(e);
    }
}

function openModal() {
    var x = document.getElementById("connect-wallet-container")
    let prevState = x.style.display
    if(prevState === "" || prevState === "none")
        x.style.display = "block"
    else    
        x.style.display = "none"
}
function closeLanding() {
    var wallets = document.getElementById("connect-wallet-container")
    var page = document.getElementById("landing-page")
    var game = document.getElementById("game-page")

    wallets.style.display = "none"
    
    page.className = "fade-out-landing"
    setTimeout(function() {
        game.style.animation = "fadeIn 2.5s"
        page.style.display = "none"
    }, 2500);
    setTimeout(function() {
        game.style.display = "block"
    }, 2500);
    console.log("closed the landing")
}

const WalletModal = () => {
    return (
        <div id="connect-wallet-container">
            <div>
                <div id="plug-connect-button" onClick={connectPlug}></div>
            </div>
            <div>
                <div id="stoic-connect-button" ></div>
            </div>
            <div>
                <div id="infinity-connect-button"></div>
            </div>
        </div>
    )
}

const Landing = () => {
    return (
    <div id="landing-page">
        <img src="WW-font.png" className="fade-in-logo-landing"></img>
        <WalletModal/>
        <div id="connect-wallet-button" onClick={openModal}>Connect</div>
    </div>
    );
  };
  
  export default Landing;