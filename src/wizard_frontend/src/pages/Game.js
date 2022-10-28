import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import {Howl, Howler} from 'howler';
import { wizard_backend } from "../../../declarations/wizard_backend";
import {topLeftClicked, topCenterClicked, topRightClicked, bottomLeftClicked, bottomCenterClicked, bottomRightClicked, wager2, wager3, wager4, wager1} from "../functions/priceOptions";

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
                <button id="rock" type="submit" value="Rock" onClick={ rockClicked }/>
                <button id="paper" type="submit" value="Paper" onClick={ paperClicked }/>
                <button id="scissors" type="submit" value="Scissors" onClick={ scissorsClicked }/>
              </div>
            </div>
            <div className="outcomeArea"> {outcome} </div>
        </div>
        <div id="game-panel"/>
    </div>
  );
};

export default Game;
export var gameSong;
