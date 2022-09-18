export function topLeftClicked () {
    document.getElementById("topLeftOption").classList.toggle('selected');
    //remove selected class from other buttons
    document.getElementById("topCenterOption").classList.remove('selected');
    document.getElementById("topRightOption").classList.remove('selected');
    document.getElementById("bottomRightOption").classList.remove('selected');
    document.getElementById("bottomLeftOption").classList.remove('selected');
    document.getElementById("bottomCenterOption").classList.remove('selected');
  }
  
export function topCenterClicked () {
    document.getElementById("topCenterOption").classList.toggle('selected');
    //remove selected class from other buttons
    document.getElementById("topLeftOption").classList.remove('selected');
    document.getElementById("topRightOption").classList.remove('selected');
    document.getElementById("bottomRightOption").classList.remove('selected');
    document.getElementById("bottomLeftOption").classList.remove('selected');
    document.getElementById("bottomCenterOption").classList.remove('selected');
  }
export function topRightClicked () {
    document.getElementById("topRightOption").classList.toggle('selected');
  //remove selected class from other buttons
    document.getElementById("topLeftOption").classList.remove('selected');
    document.getElementById("topCenterOption").classList.remove('selected');
    document.getElementById("bottomRightOption").classList.remove('selected');
    document.getElementById("bottomLeftOption").classList.remove('selected');
    document.getElementById("bottomCenterOption").classList.remove('selected');
  }
  export function bottomLeftClicked () {
    document.getElementById("bottomLeftOption").classList.toggle('selected');
  
    //remove selected class from other buttons
    document.getElementById("topRightOption").classList.remove('selected');
    document.getElementById("topLeftOption").classList.remove('selected');
    document.getElementById("topCenterOption").classList.remove('selected');
    document.getElementById("bottomRightOption").classList.remove('selected');
    document.getElementById("bottomCenterOption").classList.remove('selected');
  }
  export function bottomCenterClicked () {
    document.getElementById("bottomCenterOption").classList.toggle('selected');
    //remove selected class from other buttons
    document.getElementById("bottomLeftOption").classList.remove('selected');
    document.getElementById("bottomRightOption").classList.remove('selected');
    document.getElementById("topRightOption").classList.remove('selected');
    document.getElementById("topLeftOption").classList.remove('selected');
    document.getElementById("topCenterOption").classList.remove('selected');
  }
  export function bottomRightClicked () {
    document.getElementById("bottomRightOption").classList.toggle('selected');
  //remove selected class from other buttons
    document.getElementById("bottomLeftOption").classList.remove('selected');
    document.getElementById("bottomCenterOption").classList.remove('selected');
    document.getElementById("topRightOption").classList.remove('selected');
    document.getElementById("topLeftOption").classList.remove('selected');
    document.getElementById("topCenterOption").classList.remove('selected');
  }