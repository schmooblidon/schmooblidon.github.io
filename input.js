document.onkeydown = overrideKeyboardEvent;
document.onkeyup = overrideKeyboardEvent;
console.log(navigator.getGamepads());
console.log("update2");
var keys = {};
keyBind = 0;
keyBinding = false;
function overrideKeyboardEvent(e){
  if (e.keyCode != 122 && e.keyCode != 116){
    switch(e.type){
      case "keydown":
        if(!keys[e.keyCode]){
          keys[e.keyCode] = true;
          keyBind = e.keyCode;
          keyBinding = true;
          // do key down stuff here
        }
      break;
      case "keyup":
        delete(keys[e.keyCode]);
        // do key up stuff here
      break;
    }
    disabledEventPropagation(e);
    e.preventDefault();
    return false;
  }
  else {
    return true;
  }
}
function disabledEventPropagation(e){
  if(e){
    if(e.stopPropagation){
      e.stopPropagation();
    } else if(window.event){
      window.event.cancelBubble = true;
    }
  }
}


function mapButton(usedButtons){
  var gps = navigator.getGamepads();
  for (var i=0;i<gps.length;i++){
    if (typeof gps[i] !== 'undefined' && gps[i] !== null && gps[i] !== undefined){
      for (var j=0;j<gps[i].buttons.length;j++){
        var used = false;
        for (var n=0;n<usedButtons.length;n++){
          if (usedButtons[n][0] == i && usedButtons[n][1] == j){
            used = true;
          }
        }
        if (!used){
          if (gps[i].buttons[j].pressed){
            return [i,j];
          }
        }
      }
    }
  }
  var k = Object.keys(keys);
  for (var i=0;i<k.length;i++){
    var used = false;
    for (var n=0;n<usedButtons.length;n++){
      if (usedButtons[n][0] == "keyboard" && usedButtons[n][1] == k[i]){
        used = true;
      }
    }
    if (!used){
      if (keys[k[i]]){
        return ["keyboard",k[i]];
      }
    }
  }
  return false;
}

function mapAxis(usedAxes){
  var gps = navigator.getGamepads();
  for (var i=0;i<gps.length;i++){
    if (typeof gps[i] !== 'undefined' && gps[i] !== null && gps[i] !== undefined){
      for (var j=0;j<2;j++){
        var used = false;
        for (var n=0;n<usedAxes.length;n++){
          if (usedAxes[n][0] == i && usedAxes[n][1] == j){
            used = true;
          }
        }
        if (!used){
          if (Math.abs(gps[i].axes[j]) >= 0.7){
            return [i,j,Math.sign(gps[i].axes[j])];
          }
        }
      }
    }
  }
  return false;
}

buttons = {
  "left" : false,
  "up" : false,
  "right" : false,
  "down" : false
}

axes = {
  "x" : false,
  "y" : false
}

mapButtonNum = 0;
mapAxisNum = 0;
function mappingButtons(){
  var usedButtons = [];
  var keys = Object.keys(buttons);
  for (var i=0;i<keys.length;i++){
    if (buttons[keys[i]]){
      usedButtons.push(buttons[keys[i]]);
    }
  }
  var m = mapButton(usedButtons);
  if (mapButtonNum == 0){
    if (m){
      buttons.left = m;
      $("#promptTextEdit").text("Press Up Button");
      mapButtonNum++;
    }
  }
  else if (mapButtonNum == 1){
    if (m){
      buttons.up = m;
      $("#promptTextEdit").text("Press Right Button");
      mapButtonNum++;
    }
  }
  else if (mapButtonNum == 2){
    if (m){
      buttons.right = m;
      $("#promptTextEdit").text("Press Down Button");
      mapButtonNum++;
    }
  }
  else if (mapButtonNum == 3){
    if (m){
      buttons.down = m;
      $("#promptContainer").hide();
      mapButtonNum = 0;
      mode = 3;
    }
  }
}

function mappingAxes(){
  var usedAxes = [];
  var keys = Object.keys(axes);
  for (var i=0;i<keys.length;i++){
    if (axes[keys[i]]){
      usedAxes.push(axes[keys[i]]);
    }
  }
  var m = mapAxis(usedAxes);
  if (mapAxisNum == 0){
    if (m){
      axes.x = m;
      $("#promptTextEdit").text("Move Analog Up");
      mapAxisNum++;
    }
  }
  else if (mapAxisNum == 1){
    if (m){
      axes.y = m;
      $("#promptContainer").hide();
      mapAxisNum = 0;
      mode = 3;
    }
  }
}

var inputs = {
  "left":false,
  "up":false,
  "right":false,
  "down":false,
  "x":0,
  "y":0
}

frame = 0;
sdi = {
  x : 0,
  y : 0
}
firstInputTimer = 0;
lastInputTimer = 0;
properTimer = 0;
sdiCount = 0;

function displayInputs(){
  var lastInput = {};
  lastInput.x = inputs.x;
  lastInput.y = inputs.y;
  $(".button").removeClass("pressed");
  var bKeys = Object.keys(buttons);
  var bText = frame+"- ";
  for (var i=0;i<bKeys.length;i++){
    if (buttons[bKeys[i]][0] == "keyboard"){
      if (keys[buttons[bKeys[i]][1]]){
        $("#button"+bKeys[i]).addClass("pressed");
        inputs[bKeys[i]] = true;
        bText += bKeys[i]+" ";
      }
      else {
        inputs[bKeys[i]] = false;
      }
    }
    else if (buttons[bKeys[i]]){
      var gamepad = navigator.getGamepads()[buttons[bKeys[i]][0]];
      if (typeof gamepad !== 'undefined' && gamepad !== null && gamepad !== undefined){
        if (gamepad.buttons[buttons[bKeys[i]][1]].pressed){
          $("#button"+bKeys[i]).addClass("pressed");
          inputs[bKeys[i]] = true;
          bText += bKeys[i]+" ";
        }
        else {
          inputs[bKeys[i]] = false;
        }
      }
      else {
        inputs[bKeys[i]] = false;
      }
    }
  }

  var aKeys = Object.keys(axes);
  var aText = frame+"- ";
  inputs.x = 0;
  inputs.y = 0;
  for (var i=0;i<aKeys.length;i++){
    if (axes[aKeys[i]]){
      var gamepad = navigator.getGamepads()[axes[aKeys[i]][0]];
      if (typeof gamepad !== 'undefined' && gamepad !== null && gamepad !== undefined){
        inputs[aKeys[i]] = gamepad.axes[axes[aKeys[i]][1]] / 0.75 * axes[aKeys[i]][2];
        if (Math.abs(inputs[aKeys[i]]) > 1){
          inputs[aKeys[i]] = 1*Math.sign(inputs[aKeys[i]]);
        }
      }
    }
    if (aKeys[i] == "x"){
      if (inputs.left){
        inputs.x += -1;
      }
      if (inputs.right){
        inputs.x += 1;
      }
    }
    else {
      if (inputs.down){
        inputs.y += -1;
      }
      if (inputs.up){
        inputs.y += 1;
      }
    }

  }

  var norm = Math.sqrt(inputs.x*inputs.x + inputs.y*inputs.y);
  if (norm < 1) {
  }
  else {
    inputs.x = inputs.x/norm;
    inputs.y = inputs.y/norm;
  }

  inputs.x = (Math.round(80*inputs.x)/80);
  if (Math.abs(inputs.x) < 0.28){
     inputs.x = 0;
  }
  inputs.y = (Math.round(80*inputs.y)/80);
  if (Math.abs(inputs.y) < 0.28){
     inputs.y = 0;
  }

  performedDI = false;
  if (playing){

    performDI = false;

    if (Math.sign(lastInput.x) == Math.sign(inputs.x)*-1 && Math.sign(inputs.x) != 0){
      performDI = true;
    }
    else if (Math.sign(lastInput.y) == Math.sign(inputs.y)*-1 && Math.sign(inputs.y) != 0){
      performDI = true;
    }
    else if (Math.abs(inputs.x) > 0 && lastInput.x == 0){
      performDI = true;
    }
    else if (Math.abs(inputs.y) > 0 && lastInput.y == 0){
      performDI = true;
    }
    
    if (performDI){
      if (!((inputs.x * inputs.x) + (inputs.y * inputs.y) < 0.49)){
          sdi.x += inputs.x;
          sdi.y += inputs.y;
          performedDI = true;
      }
    }

    if (firstInputTimer == 0){
      if (inputs.x != 0 || inputs.y != 0){
        firstInputTimer++;
        lastInputTimer++;
        properTimer++;
      }
    }
    else {
      firstInputTimer++;
      if (inputs.x != 0 || inputs.y != 0){
        lastInputTimer = firstInputTimer;
      }
      if (performedDI){
        properTimer = firstInputTimer;
      }
    }
    if (performedDI){
      sdiCount++;
    }
  }

  inputs.x = inputs.x.toFixed(5);
  inputs.y = inputs.y.toFixed(5);

  $("#analogPointer").css({
    "top" : (140+inputs.y*-1*140)+"px",
    "left" : (140+inputs.x*140)+"px"
  });
  $("#analogXEdit").text(inputs.x);
  $("#analogYEdit").text(inputs.y);
  $("#sdiInputEdit").text(sdiCount);
  $("#sdiXEdit").text(sdi.x.toFixed(3));
  $("#sdiYEdit").text(sdi.y.toFixed(3));
  $("#distXEdit").text((sdi.x*6).toFixed(2)+" Mm");
  $("#distYEdit").text((sdi.y*6).toFixed(2)+" Mm");
  $("#properTimer").text(properTimer);
  $("#firstInputTimer").text(lastInputTimer);
  $("#totalTimer").text(frame);
  aText += "X: "+inputs.x+" | Y: "+inputs.y;
  if (playing){
    $("#analogResults").append(aText+(performedDI?" <span class='sdi'>SDI</span>":"")+"<br>");
    $("#buttonResults").append(bText+(performedDI?" <span class='sdi'>SDI</span>":"")+"<br>");
    frame++;
  }
}

mode = 0;
playing = false;

function loop(){
  // nothing
  if (mode == 0){

  }
  // map buttons
  else if (mode == 1){
    if (keys[27]){
      mode = 3;
      $("#promptContainer").hide();
      mapButtonNum = 0;
      mode = 3;
    }
    else {
      mappingButtons();
    }
  }
  // map axes
  else if (mode == 2){
    if (keys[27]){
      $("#promptContainer").hide();
      mapAxisNum = 0;
      mode = 3;
    }
    else {
      mappingAxes();
    }
  }
  // display
  else if (mode == 3){
    displayInputs();
  }

  setTimeout(loop,16.6667);
}

$(document).ready(function(){

  $("#setButton").click(function(){
    mode = 1;
    mapButtonNum = 0;
    mapAxisNum = 0;
    buttons = {
      "up" : false,
      "left" : false,
      "right" : false,
      "down" : false
    }
    $("#promptContainer").show();
    $("#promptTextEdit").text("Press Left Button");
  });

  $("#setAnalog").click(function(){
    mode = 2;
    mapButtonNum = 0;
    mapAxisNum = 0;
    axes = {
      "x" : false,
      "y" : false
    }
    $("#promptContainer").show();
    $("#promptTextEdit").text("Move Analog Right");
  });

  $("#pauseButton").click(function(){
    playing ^= true;
    if (playing){
      $("#pauseButton p").text("Pause");
    }
    else {
      $("#pauseButton p").text("Play");
    }
  });

  $("#clearButton").click(function(){
    frame = 0;
    firstInputTimer = 0;
    lastInputTimer = 0;
    properTimer = 0;
    sdi.x = 0;
    sdi.y = 0;
    sdiCount = 0;
    $("#sdiXEdit").text(0);
    $("#sdiYEdit").text(0);
    $("#distXEdit").text(0+" Mm");
    $("#distYEdit").text(0+" Mm");
    $("#buttonResults").empty();
    $("#analogResults").empty();
  });

  loop();

});