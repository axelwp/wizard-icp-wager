import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import {Howl, Howler} from 'howler';
import { wizard_backend } from "../../../declarations/wizard_backend";
import {topLeftClicked, topCenterClicked, topRightClicked, bottomLeftClicked, bottomCenterClicked, bottomRightClicked, wager2, wager3, wager4, wager1} from "../functions/priceOptions";

var gameSong = new Howl ({
  src: ['audio/gamba_song_4.mp3'],
  autoplay: true,
  loop: true,
  volume: 0,
  onend: function() {
      console.log('Finished!');
    }
})


const Game = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [selectedAmount, setSelectedAmount] = React.useState(null)
  const [houseChoice, setHouseChoice] = React.useState('')

  const [outcome, setOutcome] = React.useState(null)


  function convertAmountID (id_string) {
    var amount = 0;
    switch(id_string){
      case 'wager-1': 
        amount = 0.5;
        break;
      case 'wager-2': 
        amount= 1;
        break;
      case 'wager-3': 
        amount = 2;
        break;
      case 'wager-4': 
        amount = 5;
        break;
      default: 
      break;
    }
    return amount;
  }

  async function getHouseChoice() {
    console.log(selectedAmount)
    const choice = await wizard_backend.get_choice();
    console.log(choice);
    setHouseChoice(choice);
  }

  function amountClicked (id) {
    switch(id){
      case 'wager-1': 
        wager1()
        if(selectedAmount != 0.5)
          setSelectedAmount(0.5)
        else
          setSelectedAmount(null)
        break;
      case 'wager-2': 
        wager2()
        if(selectedAmount != 1)
          setSelectedAmount(1)
        else
          setSelectedAmount(null)
        break;
      case 'wager-3': 
        wager3()
        if(selectedAmount != 2)
          setSelectedAmount(2)
        else
          setSelectedAmount(null)
        break;
      case 'wager-4':
        wager4()
        if(selectedAmount != 5)
          setSelectedAmount(5)
        else
          setSelectedAmount(null)
        break;
      default: 
      break;
    }
  }


  async function rockClicked() {
    if(selectedAmount){
      document.getElementById("rock").classList.add("chosen");
      document.getElementById("paper").classList.remove("chosen");
      document.getElementById("scissors").classList.remove("chosen");
      const choice = await wizard_backend.get_choice();
      console.log("got response");
      switch (choice){
        case '0':
          setOutcome(-1);
          break;
        case '1':
          setOutcome(0);
          break;
        case '2':
          setOutcome(1);
          break;
        default:
          console.log("something went wrong", choice)
      }
    }
  }

  async function paperClicked() {
    if(selectedAmount){
      document.getElementById("paper").classList.add("chosen");
      document.getElementById("rock").classList.remove("chosen");
      document.getElementById("scissors").classList.remove("chosen");
      const choice = await wizard_backend.get_choice();
      console.log("got response");
      switch (choice){
        case '0':
          setOutcome(1);
          break;
        case '1':
          setOutcome(-1);
          break;
        case '2':
          setOutcome(0);
          break;
        default:
          console.log("something went wrong", choice)
      }
    }
  }

  async function scissorsClicked() {
    if(selectedAmount){
      document.getElementById("scissors").classList.add("chosen");
      document.getElementById("paper").classList.remove("chosen");
      document.getElementById("rock").classList.remove("chosen");

      const choice = await wizard_backend.get_choice();
      console.log("got response");
      switch (choice){
        case '0':
          setOutcome(0);
          break;
        case '1':
          setOutcome(1);
          break;
        case '2':
          setOutcome(-1);
          break;
        default:
          console.log("something went wrong", choice)
      }
    }
  }
  function toggleMute () {
    if(Howler.volume() == 0){
        Howler.volume(1)
    }else 
        Howler.volume(0)
    
}
  //<div id="topLeftOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>0.1</div>
  //<div id="topCenterOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>0.25</div>
  return (
    <div id="game-page">

        <div className="gameArea">
            <div className="wagerAmountArea">
                <div className="topRow">
                    <div id="wager-1" className="deselected" onClick={ e => amountClicked(e.target.id) }/>
                    <div id="wager-2" className="deselected" onClick={ e => amountClicked(e.target.id) }/>
                    <div id="wager-3" className="deselected" onClick={ e => amountClicked(e.target.id) }/>
                    <div id="wager-4" className="deselected" onClick={ e => amountClicked(e.target.id) }/>
                </div>
                </div>
            <div className="choiceArea">
              <div id="choicebuttons">
                <div id="rock" value="Rock" onClick={ rockClicked }/>
                <div id="paper" value="Paper" onClick={ paperClicked }/>
                <div id="scissors" value="Scissors" onClick={ scissorsClicked }/>
              </div>
            </div>
            <div className="outcomeArea"> {outcome} </div>
        </div>
        <div id="game-panel"/>
        <div id ="toggle-music-button" onClick={toggleMute}/>
    </div>
  );
};

export default Game;
export var gameSong;
