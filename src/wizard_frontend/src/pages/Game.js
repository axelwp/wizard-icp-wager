import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import {Howl, Howler} from 'howler';
import { wizard_backend } from "../../../declarations/wizard_backend";
import {topLeftClicked, topCenterClicked, topRightClicked, bottomLeftClicked, bottomCenterClicked, bottomRightClicked} from "../functions/priceOptions";

var gameSong = new Howl ({
  src: ['audio/2nd_game_page.wav'],
  autoplay: true,
  loop: true,
  volume: 0,
  onend: function() {
      console.log('Finished!');
    }
})

var scissorsSong = new Howl ({
  src: ['audio/Chosing_Scissors.wav'],
  autoplay: true,
  loop: true,
  volume: 0,
  onend: function() {
      console.log('Finished!');
    }
})

var rockSong = new Howl ({
  src: ['audio/Choosing_Rock.wav'],
  autoplay: true,
  loop: true,
  volume: 0,
  onend: function() {
      console.log('Finished!');
    }
})

var paperSong = new Howl ({
  src: ['audio/Choosing_Paper.wav'],
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
      case 'topLeftOption': 
        amount = 0.1;
        break;
      case 'topCenterOption': 
        amount = 0.25;
        break;
      case 'topRightOption': 
        amount = 0.5;
        break;
      case 'bottomLeftOption': 
        amount= 1;
        break;
      case 'bottomCenterOption': 
        amount = 2;
        break;
      case 'bottomRightOption': 
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
      case 'topLeftOption': 
        topLeftClicked()
        if(selectedAmount != 0.1)
          setSelectedAmount(0.1)
        else
          setSelectedAmount(null)
        break;
      case 'topCenterOption': 
        topCenterClicked()
        if(selectedAmount != 0.25)
          setSelectedAmount(0.25)
        else
          setSelectedAmount(null)
        break;
      case 'topRightOption': 
        topRightClicked()
        if(selectedAmount != 0.5)
          setSelectedAmount(0.5)
        else
          setSelectedAmount(null)
        break;
      case 'bottomLeftOption': 
        bottomLeftClicked()
        if(selectedAmount != 1)
          setSelectedAmount(1)
        else
          setSelectedAmount(null)
        break;
      case 'bottomCenterOption': 
        bottomCenterClicked()
        if(selectedAmount != 2)
          setSelectedAmount(2)
        else
          setSelectedAmount(null)
        break;
      case 'bottomRightOption': 
        bottomRightClicked()
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
    rockSong.fade(0, 1, 1)
    scissorsSong.fade(1, 0, 1)
    paperSong.fade(1, 0, 1)
    gameSong.fade(1, 0, 1)
    const choice = await wizard_backend.get_choice();

      if(choice == '0'){
        console.log("you Tied")
        setOutcome("You Tied...")
      } else if(choice == '1'){
        console.log("You Lost.")
        setOutcome("You Lost.")
      } else if (choice == '2'){
        console.log("You Won!")
        setOutcome("You Won!")
      }
      else 
        console.log("something went wrong", choice)
  }

  async function paperClicked() {
    paperSong.fade(0, 1, 1)
    gameSong.fade(1, 0, 1)
    rockSong.fade(1, 0, 1)
    scissorsSong.fade(1, 0, 1)
    const choice = await wizard_backend.get_choice();

      if(choice == '0'){
        console.log("You Won!")
        setOutcome("You Won!")
      } else if(choice == '1'){
        console.log("You Tied...")
        setOutcome("You Tied...")
      } else if (choice == '2'){
        console.log("You Lost.")
        setOutcome("You Lost.")
      }
      else 
        console.log("something went wrong", choice)
  }

  async function scissorsClicked() {
    scissorsSong.fade(0, 1, 1)
    gameSong.fade(1, 0, 1)
    rockSong.fade(1, 0, 1)
    paperSong.fade(1, 0, 1)
    const choice = await wizard_backend.get_choice();
      if(choice == '0'){
        console.log("you lost")
        setOutcome("You Lost.")
      } else if(choice == '1'){
        console.log("You won!")
        setOutcome("You Won!")
      } else if (choice == '2'){
        console.log("You Tied...")
        setOutcome("You Tied...")
      }
      else 
        console.log("something went wrong", choice)
  }
  //<div id="topLeftOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>0.1</div>
  //<div id="topCenterOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>0.25</div>
  return (
    <div id="game-page">
      <div id="game-animation-area"/>
        <div className="gameArea">
            <div className="wagerAmountArea">
                <div className="topRow">
                    <div id="topRightOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>0.5</div>

                    <div id="bottomLeftOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>1</div>
                    <div id="bottomCenterOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>2</div>
                    <div id="bottomRightOption" className="deselected" onClick={ e => amountClicked(e.target.id) }>5</div>
                </div>
                </div>
            <div className="choiceArea">
              <div id="choicebuttons">
                <button type="submit" value="Rock" onClick={ rockClicked }>Rock</button>
                <button type="submit" value="Paper" onClick={ paperClicked }>Paper</button>
                <button type="submit" value="Scissors" onClick={ scissorsClicked }>Scissors</button>
              </div>
            </div>
            <div className="outcomeArea"> {outcome} </div>
        </div>
    </div>
  );
};

export default Game;
export var gameSong;
