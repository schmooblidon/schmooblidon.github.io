
function deleteNonNumbers(text,allowNegative,allowPoint,allowZeros){
  var newtext = "";
  var hasPoint = false;
  for (i=0;i<text.length;i++){
    var asc = text[i].charCodeAt();
    if (asc >= 48 && asc <= 57){
       newtext += text[i];
    }
    else if (allowPoint && asc == 46){
      for (j=0;j<newtext.length;j++){
        if (newtext[j] == "."){
          hasPoint = true;
        }
      }
      if (!hasPoint){
        newtext += text[i];
      }
    }
    else if (allowNegative && asc == 45){
      newtext += text[i];
    }
  }
  if (newtext == ""){
    newtext = 0;
  }
  else {
    if (!allowPoint && !allowZeros){
      newtext = parseInt(newtext);
    }
  }
  return newtext;
}


function calculatePercents(){
  starter,ocp1,ocp2,ycp1,ycp2
  // B O 3
  $("#bo3set1").empty().append(Math.round(twoZero(starter,ocp1,ocp2,ycp1,ycp2)*100));
  $("#bo3set2").empty().append(Math.round(twoOne(starter,ocp1,ocp2,ycp1,ycp2)*100));
  $("#bo3set3").empty().append(Math.round(oneTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
  $("#bo3set4").empty().append(Math.round(zeroTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
  $("#bo3win").empty().append(Math.round(win3(starter,ocp1,ocp2,ycp1,ycp2)*100));
  $("#bo3lose").empty().append(Math.round(lose3(starter,ocp1,ocp2,ycp1,ycp2)*100));

  // B O 5
  if ((yRepick == true) && (oRepick == true) && (ycp1 >= ycp2) && (ocp1 <= ocp2)){
    console.log("t1");
    $("#bo5set1").empty().append(Math.round(rThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set2").empty().append(Math.round(rThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set3").empty().append(Math.round(rThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set4").empty().append(Math.round(rTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set5").empty().append(Math.round(rOneThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set6").empty().append(Math.round(rZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5win").empty().append(Math.round(rWin5(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5lose").empty().append(Math.round(rLose5(starter,ocp1,ocp2,ycp1,ycp2)*100));
  }
  else if (((yRepick == true) && (oRepick == false) && (ycp1 > ycp2)) || ((yRepick == true) && (oRepick == true) && (ycp1 > ycp2) && (ocp1 > ocp2))){
    console.log("t2");
    $("#bo5set1").empty().append(Math.round(yRThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set2").empty().append(Math.round(yRThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set3").empty().append(Math.round(yRThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set4").empty().append(Math.round(yRTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set5").empty().append(Math.round(yROneThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set6").empty().append(Math.round(yRZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5win").empty().append(Math.round(yRWin5(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5lose").empty().append(Math.round(yRLose5(starter,ocp1,ocp2,ycp1,ycp2)*100));
  }
  else if (((oRepick == true) && (yRepick == false) && (ocp1 < ocp2)) || ((oRepick == true) && (yRepick == true) && (ocp1<ocp2) && (ycp1<ycp2))){
    console.log("t3");
    $("#bo5set1").empty().append(Math.round(eRThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set2").empty().append(Math.round(eRThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set3").empty().append(Math.round(eRThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set4").empty().append(Math.round(eRTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set5").empty().append(Math.round(eROneThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set6").empty().append(Math.round(eRZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5win").empty().append(Math.round(eRWin5(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5lose").empty().append(Math.round(eRLose5(starter,ocp1,ocp2,ycp1,ycp2)*100));
  }
  else if (((yRepick == false) && (oRepick == false)) || ((ycp1 <= ycp2) && (ocp1 >= ocp2))){
    console.log("t4");
    $("#bo5set1").empty().append(Math.round(threeZero(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set2").empty().append(Math.round(threeOne(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set3").empty().append(Math.round(threeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set4").empty().append(Math.round(twoThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set5").empty().append(Math.round(oneThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5set6").empty().append(Math.round(zeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5win").empty().append(Math.round(win5(starter,ocp1,ocp2,ycp1,ycp2)*100));
    $("#bo5lose").empty().append(Math.round(lose5(starter,ocp1,ocp2,ycp1,ycp2)*100));
  }
}

function changePercent(t){
  var id = $(t).attr("id");
  id = id.substr(5,1);
  var value = parseInt($("#percent"+id).val());
  if ($(t).hasClass("plus")){
    value++;
    if (value > 100){
      value = 100;
    }
  }
  else {
    value--;
    if (value < 0){
      value = 0;
    }
  }
  $("#percent"+id).val(value);
  id = parseInt(id);
  switch (id){
    case 1:
      starter = value/100;
      console.log(value);
      break;
    case 2:
      ycp1 = value/100;
      break;
    case 3:
      ycp2 = value/100;
      break;
    case 4:
      ocp1 = value/100;
      break;
    case 5:
      ocp2 = value/100;
      break;
    default:
      break;
  }
  //console.log(starter);
  calculatePercents();
}

$(document).ready(function(){

  /*$(".percentButton").click(function(){

    changePercent(this);
  });*/

  $(".repickReal").click(function(){
    var id = $(this).attr("id");
    id = id.substr(0,1);
    if (id == "y"){
      if (yRepick){
        yRepick = false;
        $("#yourepick").children("p").empty().append("✖");
      }
      else {
        yRepick = true;
        $("#yourepick").children("p").empty().append("✔");
      }
    }
    else if (id == "o"){
      if (oRepick){
        oRepick = false;
        $("#opprepick").children("p").empty().append("✖");
      }
      else {
        oRepick = true;
        $("#opprepick").children("p").empty().append("✔");
      }
    }
    calculatePercents();
  });

  var percentHold = 0;

  $(".percentButton").mousedown(function() {
    t = this;
    percentHold = setInterval(function() {
      //prompt(this);
      changePercent(t);
    }, 50);
  }).bind("mouseup mouseleave", function() {
    clearInterval(percentHold);
  });

  $(".percent").on("keyup blur", function() {
    var value = deleteNonNumbers($(this).val(),false,false,false);
    if (value > 100){
      value = 100;
    }
    var id = $(this).attr("id");
    id = parseInt(id.substr(7,1));
    value = Math.abs(value);
    $(this).val(value);
    switch (id){
      case 1:
        starter = value/100;
        break;
      case 2:
        ycp1 = value/100;
        break;
      case 3:
        ycp2 = value/100;
        break;
      case 4:
        ocp1 = value/100;
        break;
      case 5:
        ocp2 = value/100;
        break;
      default:
        break;
    }
    calculatePercents();
  });

  calculatePercents();

});
