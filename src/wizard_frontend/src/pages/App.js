import * as React from "react";
import { useState } from "react";
import Landing from "./Landing";
import Game from "./Game";
import NotFound from "./NotFound";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

async function plugIsConnected() {
  return await window.ic.plug.isConnected();
}

export default function App () {

  return(
    <div id="app-wrapper">
      <Landing/>
      <Game/>
    </div>

  )
  
}