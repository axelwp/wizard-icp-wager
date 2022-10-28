
export function wager1 () {
    document.getElementById("wager-1").classList.toggle('selected');
  //remove selected class from other buttons
    document.getElementById("wager-4").classList.remove('selected');
    document.getElementById("wager-2").classList.remove('selected');
    document.getElementById("wager-3").classList.remove('selected');
  }
  export function wager2 () {
    document.getElementById("wager-2").classList.toggle('selected');
  
    //remove selected class from other buttons
    document.getElementById("wager-1").classList.remove('selected');
    document.getElementById("wager-4").classList.remove('selected');
    document.getElementById("wager-3").classList.remove('selected');
  }
  export function wager3 () {
    document.getElementById("wager-3").classList.toggle('selected');
    //remove selected class from other buttons
    document.getElementById("wager-2").classList.remove('selected');
    document.getElementById("wager-4").classList.remove('selected');
    document.getElementById("wager-1").classList.remove('selected');
  }
  export function wager4 () {
    document.getElementById("wager-4").classList.toggle('selected');
  //remove selected class from other buttons
    document.getElementById("wager-2").classList.remove('selected');
    document.getElementById("wager-3").classList.remove('selected');
    document.getElementById("wager-1").classList.remove('selected');
  }