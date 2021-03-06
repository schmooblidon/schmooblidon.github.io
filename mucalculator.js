mode = 0;

bf=50;
fd=50;
dl=50;
ys=50;
fod=50;
ps=50;

stages = [bf,fd,dl,ys,fod,ps];

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

function calculateStagePercent(num,value){
  num = parseInt(num);
  switch (num){
    case 1:
      bf = value;
      break;
    case 2:
      fd = value;
      break;
    case 3:
      ys = value;
      break;
    case 4:
      dl = value;
      break;
    case 5:
      fod = value;
      break;
    case 6:
      ps = value;
    default:
      break;
  }
  stages = [bf,fd,dl,ys,fod];
  stages.sort(function(a, b){return a-b});
  starter=stages[2]/100;
  stages.push(ps);
  stages.sort(function(a, b){return a-b});
  ocp1=stages[0]/100;
  ocp2=stages[1]/100;
  ycp1=stages[5]/100;
  ycp2=stages[4]/100;
}

function calculatePercents(){
  //starter,ocp1,ocp2,ycp1,ycp2
  // B O 3
  $("#bo3set1").empty().append((twoZero(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  $("#bo3set2").empty().append((twoOne(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  $("#bo3set3").empty().append((oneTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  $("#bo3set4").empty().append((zeroTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  $("#bo3win").empty().append((win3(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  $("#bo3lose").empty().append((lose3(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));

  // B O 5
  if (yRepick && oRepick && (ycp1 >= ycp2) && (ocp1 <= ocp2)){
    $("#bo5set1").empty().append((rThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set2").empty().append((rThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set3").empty().append((rThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set4").empty().append((rTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set5").empty().append((rOneThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set6").empty().append((rZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5win").empty().append((rWin5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5lose").empty().append((rLose5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  }
  else if ((yRepick && !oRepick && (ycp1 > ycp2)) || (yRepick && oRepick && (ycp1 > ycp2) && (ocp1 > ocp2))){
    $("#bo5set1").empty().append((yRThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set2").empty().append((yRThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set3").empty().append((yRThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set4").empty().append((yRTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set5").empty().append((yROneThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set6").empty().append((yRZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5win").empty().append((yRWin5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5lose").empty().append((yRLose5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  }
  else if ((oRepick && !yRepick && (ocp1 < ocp2)) || (oRepick && yRepick && (ocp1<ocp2) && (ycp1<ycp2))){
    $("#bo5set1").empty().append((eRThreeZero(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set2").empty().append((eRThreeOne(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set3").empty().append((eRThreeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set4").empty().append((eRTwoThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set5").empty().append((eROneThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set6").empty().append((eRZeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5win").empty().append((eRWin5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5lose").empty().append((eRLose5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  }
  else {
    $("#bo5set1").empty().append((threeZero(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set2").empty().append((threeOne(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set3").empty().append((threeTwo(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set4").empty().append((twoThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set5").empty().append((oneThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5set6").empty().append((zeroThree(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5win").empty().append((win5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
    $("#bo5lose").empty().append((lose5(starter,ocp1,ocp2,ycp1,ycp2)*100).toPrecision(3));
  }
}

function changePercent(t){
  var id = $(t).attr("id");
  id = id.substr(5,1);
  if (mode){
    var value = parseInt($("#percent"+id).val());
  }
  else {
    var value = parseInt($("#stagePercent"+id).val());
  }
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
  if (mode){
    $("#percent"+id).val(value);
    id = parseInt(id);
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
  }
  else {
    $("#stagePercent"+id).val(value);
    calculateStagePercent(id,value);
  }
  calculatePercents();
}

$(document).ready(function(){
  $("#inputs").hide();
  $("#pagetitle").append('<p id="credits">calculations by Jib</p>');
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
    if (mode){
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
    }
    else {
      id = parseInt(id.substr(12,1));
      value = Math.abs(value);
      $(this).val(value);
      calculateStagePercent(id,value);
    }
    calculatePercents();
  });

  $(".mode").click(function(){
    $(".mode").removeClass("activemode");
    $(this).addClass("activemode");
    var id = $(this).attr("id");
    id = parseInt(id.substr(4,1));
    if (id){
      mode = 1;
      $("#stages").hide();
      $("#inputs").show().css("display","inline-block");
      starter = parseInt($("#percent1").val())/100;
      ycp1 = parseInt($("#percent2").val())/100;
      ycp2 = parseInt($("#percent3").val())/100;
      ocp1 = parseInt($("#percent4").val())/100;
      ocp2 = parseInt($("#percent5").val())/100;
      calculatePercents();
    }
    else {
      mode = 0;
      $("#inputs").hide();
      $("#stages").show().css("display","inline-block");
      stages = [bf,fd,dl,ys,fod];
      stages.sort(function(a, b){return a-b});
      starter=stages[2]/100;
      stages.push(ps);
      stages.sort(function(a, b){return a-b});
      ocp1=stages[0]/100;
      ocp2=stages[1]/100;
      ycp1=stages[5]/100;
      ycp2=stages[4]/100;
      calculatePercents();
    }
  });

  calculatePercents();

});
