import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import {StoicIdentity} from "ic-stoic-identity";

const CHAIN_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai"
const URL = "http://localhost:8080/"

async function connectPlug() {
    try {

      const publicKey = await window.ic.plug.requestConnect();
      console.log(`The connected user's public key is: `, publicKey);
      closeLanding()
    } catch (e) {
      console.log(e);
    }
}

async function connectStoic () {
    try {
        StoicIdentity.load().then(async identity => {
            if (identity !== false) {
              //ID is a already connected wallet!
            } else {
              //No existing connection, lets make one!
              identity = await StoicIdentity.connect();
            }
            
            //Lets display the connected principal!
            console.log(`The connected user's public key is: `, identity.getPrincipal().toText());
            closeLanding()

            //Create an actor canister -- not sure what this does or how to make it work
            const actor = Actor.createActor(idlFactory, {
              agent: new HttpAgent({
                identity,
              }),
              canisterId,
            });
            
            //Disconnect after
            StoicIdentity.disconnect();
          })
    } catch (e) {
        console.log(e)
    }
}

async function connectInfinity() {
    try {
        const publicKey = await window.ic.infinityWallet.requestConnect();
        console.log(`The connected user's public key is:`, publicKey);
        const isConnected = await window.ic.infinityWallet.isConnected();
        if(isConnected)
            closeLanding()
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
        game.style.animation = "fadeIn 1s"
        page.style.display = "none"
        setTimeout(function() {
            game.style.display = "block"
            console.log("closed the landing")
        }, 1000);
    }, 1000);
}

const WalletModal = () => {
    return (
        <div id="connect-wallet-container">
            <div>
                <div id="plug-connect-button" onClick={connectPlug}></div>
            </div>
            <div>
                <div id="stoic-connect-button" onClick={connectStoic}></div>
            </div>
            <div>
                <div id="infinity-connect-button" onClick={connectInfinity}></div>
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