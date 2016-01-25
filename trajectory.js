asdasd = [];
asdasd[0] = ["000000","333333","666666","999999","CCCCCC","FFFFFF"];
asdasd[1] = ["FF0000","FF6666","990000","FF3300","FF6633","993300"];
asdasd[2] = ["00ff00","66ff66","009900","ffff00","ffff66","999900"];
asdasd[3] = ["0000ff","6666ff","000099","00ffff","66ffff","009999"];
asdasd[4] = ["ff00ff","ff66ff","990099","9900CC","9966FF","330066"];
asdasd[5] = ["","","","","",""];

colourtext = '<div class="colourselectbox">';
for(i=0;i<6;i++){
  for(j=0;j<5;j++){
    colourtext += '<div class="colourselect" style="background-color:#'+asdasd[j][i]+'"></div>';
  }
}
colourtext += '</div>'

aT = 1;

charging = false;

storedTrajs = 1;

currentTrajs = [true,false,false,false,false,false,false,false,false];

startColours = ["#00ffff","#ffff00","#ff00ff","#FF6633","#6666ff","#66ff66","#9966FF","#999999","#ffffff"];

//trajectoryObject(trajFrozen,mouseXMelee,mouseYMelee,mouseXMeleeF,mouseYMeleeF,curHitbox,version,character,percent,crouch,reverse,chargeInterrupt,charging,chargeF,staleQueue,curPositions)

function trajectoryObject(){
  this.trajFrozen = false;
  this.mouseXMelee = 0;
  this.mouseYMelee = 0;
  this.mouseXMeleeF = 0;
  this.mouseYMeleeF = 0;
  this.tdiMouseXMelee = 0;
  this.tdiMouseYMelee = 0;
  this.tdiMouseXReal = 65.4;
  this.tdiMouseYReal = 65.4;
  this.sdiMouseXMelee = 0;
  this.sdiMouseYMelee = 0;
  this.sdiMouseXReal = 65.4;
  this.sdiMouseYReal = 65.4;
  this.adiMouseXMelee = 0;
  this.adiMouseYMelee = 0;
  this.adiMouseXReal = 65.4;
  this.adiMouseYReal = 65.4;
  this.curHitbox = chars.Fx.NS.id0;
  this.cHName = ["Fx","NS",false,"id0"];
  this.character = "Fox";
  this.percent = 80;
  this.version = "NTSC";
  this.crouch = false;
  this.reverse = false;
  this.chargeInterrupt = false;
  this.chargeF = 0;
  this.staleQueue = [false,false,false,false,false,false,false,false,false];
  this.curPositions = 0;
  this.colour;
  this.labelX = 0;
  this.labelY = 0;
}

t = {};
for (i=0;i<9;i++){
  t["t"+(i+1)] = new trajectoryObject();
  t["t"+(i+1)].colour = startColours[i];
}

sakurai = 0;
pointerfrozen = false;
activeDI = "t";
diPointerFrozen = {};
diPointerFrozen.t = false;
diPointerFrozen.a = false;
diPointerFrozen.s = false;
mouseX = 0;
mouseY = 0;
diMouseX = {};
diMouseY = {};
diMouseX.t = 0;
diMouseY.t = 0;
diMouseX.s = 0;
diMouseY.s = 0;
diMouseX.a = 0;
diMouseY.a = 0;
/*trajFrozen = false;

mouseXMelee = [0,0,0,0,0,0,0,0,0];
mouseYMelee = [0,0,0,0,0,0,0,0,0];

mouseXMeleeF = [0,0,0,0,0,0,0,0,0];
mouseYMeleeF = [0,0,0,0,0,0,0,0,0];*/

isKilled = false;

bzTop = 200;
bzBottom = -108.8;
bzLeft = -224;
bzRight = 224;

/*crouch = false;

reverse = false;

chargeInterrupt = false;

charging = false;
chargeF = 0;*/

//each surface is put into an element in the array. The surface is broken down into arrays of far left point X and y, and far right point X and Y. Use .length to find the number of surfaces to check

surfaces = [[[-68.4,0],[68.4,0]],[[-57.6,27.2],[-20.0,27.2]],[[20,27.2],[57.6,27.2]],[[-18.8,54.4],[18.8,54.4]]];

snapping = true;

/*staleQueue = [false,false,false,false,false,false,false,false,false];

curPositions = [0,0,0,0,0,0,0,0,0];*/



centreOffset = [bzRight*10+50,bzTop*10+50];

/*curHitbox = [chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0,chars.Fx.NS.id0];

percent = [80,80,80,80,80,80,80,80,80];

charging = [false,false,false,false,false,false,false,false,false];
chargeF = [0,0,0,0,0,0,0,0,0];

chargeInterrupt = [false,false,false,false,false,false,false,false,false];
reverse = [false,false,false,false,false,false,false,false,false];
crouch = [false,false,false,false,false,false,false,false,false];


var percent = 120;
version = "NTSC";
var character = "Fox";*/

//"a0=00000000&a1=00000000&a2=00000000&a3=00000000&a4=chars.fx.ns.id0&a5=Fox&a6=080&a7=00&a8=00&a9=000&a10=00000000

function diSelector(){
  $("#tdiSelector").unbind("mousemove");

}

function getStickAngle(x,y){
  var diAngle = 0;
  if (x < 0.2875 && x > -0.2875){
    x = 0;
  }
  if (y < 0.2875 && y > -0.2875){
    y = 0;
  }

  if (x == 0 && y < 0){
    diAngle = 270;
  }
  else if (x == 0 && y > 0){
    diAngle = 90;
  }
  else if (x == 0 && y == 0){
    diAngle = "deadzone";
  }
  else {
    diAngle = Math.atan(y/x) * (180 / Math.PI) * 1;
    if (x < 0){
      diAngle += 180;
    }
    else if (y < 0) {
      diAngle += 360;
    }
  }
  return diAngle;
}

function changeUserStick(x,y,type,di){
  diAngle = di || getStickAngle(x,y);
  if (diAngle == "deadzone"){
    $("#"+type+"diUser").hide();
    $("#"+type+"diUserCentre").show();
  }
  else {
    $("#"+type+"diUserCentre").hide();
    if (type == "t"){
      var attackAngle = 0;
      if (t["t"+aT].curHitbox.angle == 361){
        attackAngle = sakurai;
      }
      else {
        attackAngle = t["t"+aT].curHitbox.angle;
      }
      if (t["t"+aT].reverse){
        attackAngle = 180 - attackAngle;
          if (attackAngle < 0){
            attackAngle = 360 + attackAngle;
          }
      }
      var rAngle = attackAngle - diAngle;
      if (rAngle > 180){
        rAngle -= 360;
      }
    }
    var y = -Math.sin(diAngle * (Math.PI / 180));
    var x = Math.cos(diAngle * (Math.PI / 180));

    t["t"+aT][type+"diMouseXMelee"] = Math.round(x*80)/80;
    t["t"+aT][type+"diMouseYMelee"] = Math.round(-y*80)/80;

    t["t"+aT][type+"diMouseXReal"] = Math.round(((t["t"+aT][type+"diMouseXMelee"]/0.0125)+80)*(130/161));
    t["t"+aT][type+"diMouseYReal"] = Math.round(((-t["t"+aT][type+"diMouseYMelee"]/0.0125)+80)*(130/161));
    if (type == "t"){
      var pDistance = Math.sin(rAngle * (Math.PI / 180)) * Math.sqrt(t["t"+aT][type+"diMouseXMelee"]*t["t"+aT][type+"diMouseXMelee"]+t["t"+aT][type+"diMouseYMelee"]*t["t"+aT][type+"diMouseYMelee"]);

      var angleOffset = pDistance * pDistance * 18;
      if (angleOffset > 18){
        angleOffset = 18;
      }

      if (rAngle < 0 && rAngle > -180){
          angleOffset *= -1;
      }
      angleOffset = Math.abs(angleOffset);
      //$("#tdiDebug").empty().append(angleOffset);
      //$("#tdirAngle").empty().append(rAngle);

      $("#tdiOffsetPercent").empty().append(Math.round(angleOffset/18*100));
      calculateStickColor(angleOffset, type);
    }
    $("#"+type+"diDiAngle").empty().append(Math.round(diAngle));
    $("#"+type+"diUser").show().css({
        "-moz-transform":"rotate("+(diAngle * -1)+"deg)",
        "-ms-transform":"rotate("+(diAngle * -1)+"deg)",
        "-o-transform":"rotate("+(diAngle * -1)+"deg)",
        "transform":"rotate("+(diAngle * -1)+"deg)"
    });
  }
}

function calculateStickColor(angleOffset, type){
  var red = 255;
  var green = 0;
  var num = Math.floor(angleOffset * (512/18));
  if (num > 256){
    red -= (num - 256);
    green = 255;
  }
  else {
    green = num;
  }
  $("#"+type+"diUSolid").css("background-color","rgb("+red+", "+green+", 0)");
}


function convertPixelsToStick(pixelX,pixelY){
  var widthRatio = 130/161;
  var heightRatio = 130/161;
  var x = Math.round(((pixelX/widthRatio)-80))*0.0125;
  var y = Math.round(((pixelY/heightRatio)-80))*(-0.0125);
  var x2 = "";
  var y2 = "";
  if (x > 1){
    x = 1;
  }
  else if (x < -1){
    x = -1;
  }
  if (y > 1){
    y = 1;
  }
  else if (y < -1){
    y = -1;
  }
  if (x >= 1 || x <= -1){
    x2 = x.toPrecision(5);
  }
  else if (x >= 0.1 || x <= -0.1){
    x2 = x.toPrecision(4);
  }
  else {
    x2 = x.toPrecision(3);
  }
  if (y >= 1 || y <= -1){
    y2 = y.toPrecision(5);
  }
  else if (y >= 0.1 || y <= -0.1){
    y2 = y.toPrecision(4);
  }
  else {
    y2 = y.toPrecision(3);
  }

  return [x,y,x2,y2];
}



function GetQueryStringParams(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
          return sParameterName[1];
        }
    }
}

function readQueryString(){
  var queryExist = false;
  for (m=1;m<10;m++){
    var qEx = GetQueryStringParams(m+"a");
    if (qEx){
      queryExist = true;
      break;
    }
  }
  if (queryExist){
    storedTrajs = 0;
    $("#trajBox1").remove();
    $("#trajGroup1").remove();
    for (p=1;p<10;p++){
      var exists = GetQueryStringParams(p+"a");
      if (exists){
        currentTrajs[p-1] = true;
        t["t"+p].trajFrozen = true;
        for (j=0;j<11;j++){
          var ja = String.fromCharCode(97 + j);
          var temp = GetQueryStringParams(p+ja);

          switch (ja){
            case "a":
              t["t"+p].mouseXMeleeF = parseFloat(temp);
              break;
            case "b":
              t["t"+p].mouseYMeleeF = parseFloat(temp);
              break;
            case "c":
              t["t"+p].tdiMouseXReal = parseFloat(temp);
              break;
            case "d":
              t["t"+p].tdiMouseYReal = parseFloat(temp);
              var xy = convertPixelsToStick(t["t"+p].tdiMouseXReal,t["t"+p].tdiMouseYReal);
              t["t"+p].tdiMouseXMelee = xy[0];
              t["t"+p].tdiMouseYMelee = xy[1];
              break;
            case "e":
              t["t"+p].cHName = temp.split(',');
              if (t["t"+p].cHName[2] == "false"){
                t["t"+p].cHName[2] = false;
                t["t"+p].curHitbox = chars[t["t"+p].cHName[0]][t["t"+p].cHName[1]][t["t"+p].cHName[3]];
              }
              else {
                t["t"+p].curHitbox = chars[t["t"+p].cHName[0]][t["t"+p].cHName[1]][t["t"+p].cHName[2]][t["t"+p].cHName[3]];
              }
              break;
            case "f":
              t["t"+p].character = temp;
              break;
            case "g":
              t["t"+p].percent = parseInt(temp);
              break;
            case "h":
              if (Boolean(parseInt(temp[0]))){
                t["t"+p].version = "PAL";
              }
              else {
                t["t"+p].version = "NTSC";
              }
              t["t"+p].crouch = Boolean(parseInt(temp[1]));
              t["t"+p].reverse = Boolean(parseInt(temp[2]));
              t["t"+p].chargeInterrupt = Boolean(parseInt(temp[3]));
              break;
            case "i":
              t["t"+p].chargeF = parseInt(temp);
              break;
            case "j":
              for(k=0;k<9;k++){
                t["t"+p].staleQueue[k] = Boolean(parseInt(temp[k]));
              }
              break;
            case "k":
              if (temp.length == 6){
                t["t"+p].colour = "#"+temp;
              }
              else {
                t["t"+p].colour = temp;
              }
              //prompt(t["t"+p].colour);
              break;
            default:
              break;
          }
        }

        aT = p;
        drawTrajectory();
        $("#trajAdd").before('<div id="trajBox'+p+'" class="trajBox"><div id="trajNum'+p+'" class="trajNum"><p>'+p+'</p></div><div id="trajColour'+p+'" class="trajColour" style="background-color:'+t["t"+p].colour+'"></div><div id="trajLabel'+p+'" class="trajLabel"><p>Add label</p></div><div id="trajDelete'+p+'" class="trajDelete"><p>x</p></div></div>');
        storedTrajs++;
      }
      else {
        currentTrajs[p-1] = false;
      }
    }
    for (l=0;l<9;l++){
      if (currentTrajs[l]){
        aT = l+1;
        $("#trajBox"+aT).addClass("trajBoxSelected");
        break;
      }
    }
    swapOptions();
    trajBoxHover();
    trajBoxClick();
    trajColourClick();
    trajColourHover();
    trajDeleteHover();
    trajDeleteClick();
    if (storedTrajs == 1){
      $(".trajDelete").addClass("trajDeleteDisable");
    }
    diPointerFrozen.t = true;
    diPointerFrozen.s = true;
    diPointerFrozen.a = true;
  }
}

/*
0-mouseXMeleeF
1-mouseFMeleeF
2-tdiMouseXReal
3-tdiMouseYReal
4-curHitbox
5-character
6-percent
7-version,crouch,reverse,chargeInterrupt
8-chargeF
9-staleQueue
10-colour*/

function writeQueryString(){
  var qstring = "?";
  for (i=1;i<10;i++){
    if (currentTrajs[i-1]){
      for (j=0;j<11;j++){
        var temp = "";
        switch (j){
          case 0:
            temp = t["t"+i].mouseXMeleeF;
            break;
          case 1:
            temp = t["t"+i].mouseYMeleeF;
            break;
          case 2:
            temp = t["t"+i].tdiMouseXReal;
            break;
          case 3:
            temp = t["t"+i].tdiMouseYReal;
            break;
          case 4:
            temp = t["t"+i].cHName;
            break;
          case 5:
            temp = t["t"+i].character;
            break;
          case 6:
            temp = t["t"+i].percent;
            break;
          case 7:
            var temp1 = t["t"+i].version;
            if (temp1 == "NTSC"){
              temp1 = "0";
            }
            else {
              temp1 = "1";
            }
            var temp2 = t["t"+i].crouch;
            if (temp2){
              temp2 = "1";
            }
            else {
              temp2 = "0";
            }
            var temp3 = t["t"+i].reverse;
            if (temp3){
              temp3 = "1";
            }
            else {
              temp3 = "0";
            }
            var temp4 = t["t"+i].chargeInterrupt;
            if (temp4){
              temp4 = "1";
            }
            else {
              temp4 = "0";
            }
            temp = temp1+temp2+temp3+temp4;
            break;
          case 8:
            temp = t["t"+i].chargeF;
            break;
          case 9:
            var tem = t["t"+i].staleQueue;
            for (k=0;k<9;k++){
              if (tem[k]){
                temp += "1";
              }
              else {
                temp += "0";
              }
            }
            break;
          case 10:
            temp = t["t"+i].colour;
            if (temp[0] == "#"){
              temp = temp.substr(1,temp.length);
            }
            else {
              temp = temp.split(',');
              temp[0] = parseInt(temp[0].substr(4,temp[0].length)).toString(16);
              temp[1] = parseInt(temp[1].substr(1,temp[1].length)).toString(16);
              temp[2] = parseInt(temp[2].substr(1,temp[2].length-2)).toString(16);
              temp = ""+temp[0]+temp[1]+temp[2];
            }
            break;
          default:
            break;
        }

        jt = String.fromCharCode(97 + j);
        qstring += i+jt+"="+temp+"&";
      }
    }
  }
  qstring = qstring.substr(0,qstring.length - 1);
  return qstring;
}

function drawAngle(){
  var ang = t["t"+aT].curHitbox.angle;
  if (ang == 361){
    ang = sakurai;

  }
  if (t["t"+aT].reverse){
    ang = 180 - ang;
      if (ang < 0){
        ang = 360 + ang;
      }
  }
  $("#tdiLAngle").css({
    "-moz-transform":"rotate("+(ang * -1)+"deg)",
    "-ms-transform":"rotate("+(ang * -1)+"deg)",
    "-o-transform":"rotate("+(ang * -1)+"deg)",
    "transform":"rotate("+(ang * -1)+"deg)"
  });

  $("#tdiPAngle").css({
    "-moz-transform":"rotate("+(ang * -1)+"deg)",
    "-ms-transform":"rotate("+(ang * -1)+"deg)",
    "-o-transform":"rotate("+(ang * -1)+"deg)",
    "transform":"rotate("+(ang * -1)+"deg)"
  });
  //tdiSelector();
  changeUserStick(t["t"+aT].tdiMouseXMelee, t["t"+aT].tdiMouseYMelee, "t");
}


function trajBoxHover(){
  $(".trajBox").unbind("mouseenter").unbind("mouseleave");
  $(".trajBox").hover(function(){
    $(this).toggleClass("trajBoxHighlight");
  });
}

function characterClick(){
  $(".character").click(function(){
    $(".attack").unbind("click").remove();
    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(".idstats").unbind("click").remove();

    id = $(this).attr("id");
    //prompt(t["t1"].cHName);
    //prompt(aT);

    t["t"+aT].cHName[0] = id;

    //prompt(t["t1"].cHName);
    var keys = Object.keys(chars[id]);
    for (i=0;i<keys.length;i++){
      $(this).after('<div id="'+keys[i]+'" class="attack '+id+'"><p>'+keys[i]+'</p></div>');
    }
    $(".attack").hover(function(){
      $(this).toggleClass("attackhighlight");
    });
    attackClick();
  });
}

function attackClick(){
  $(".attack").click(function(){
    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(".idstats").unbind("click").remove();
    id2 = $(this).attr("id");
    t["t"+aT].cHName[1] = id2;
    var keys2 = Object.keys(chars[id][id2]);
    if (keys2[0][0] == "i" && keys2[0][1] == "d"){
      for (j=0;j<keys2.length;j++){
        $(this).after('<div id="'+keys2[j]+'" class="id '+id2+' '+id+'"><p>'+keys2[j]+'</p></div>');
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick2();
    }
    else {
      for (k=0;k<keys2.length;k++){
        $(this).after('<div id="'+keys2[k]+'" class="subattack '+id2+' '+id+'"><p>'+keys2[k]+'</p></div>');
      }
      $(".subattack").hover(function(){
        $(this).toggleClass("subattackhighlight");
      });
      subattackClick();
    }
    //prompt(t["t1"].cHName);
  });
}

function subattackClick(){
  $(".subattack").click(function(){
    $(".id").unbind("click").remove();
    $(".idstats").unbind("click").remove();
    id3 = $(this).attr("id");
    t["t"+aT].cHName[2] = id3;
    var keys3 = Object.keys(chars[id][id2][id3]);
    for (l=0;l<keys3.length;l++){
      $(this).after('<div id="'+keys3[l]+'" class="id '+id3+' '+id2+' '+id+'"><p>'+keys3[l]+'</p></div>');
    }
    $(".id").hover(function(){
      $(this).toggleClass("idhighlight");
    });
    idClick();
  });
}

function idClick(){
  $(".id").click(function(){
    $(".id").removeClass("idcurrent");
    $(this).addClass("idcurrent");
    $(".idstats").remove();
    id4 = $(this).attr("id");
    t["t"+aT].cHName[3] = id4;
    var hb = chars[id][id2][id3][id4];
    $(this).after('<div id="'+id4+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
    t["t"+aT].curHitbox = hb;
    if (id2.substr(1,id2.length) == "smash"){
      charging = true;
      $("#disableCharge").hide();
    }
    else {
      charging = false;
      $("#disableCharge").show();
    }
    drawTrajectory();
    drawAngle();
  });
}

function idClick2(){
  $(".id").click(function(){
    $(".id").removeClass("idcurrent");
    $(this).addClass("idcurrent");
    $(".idstats").remove();
    id4 = $(this).attr("id");
    t["t"+aT].cHName[2] = false;
    t["t"+aT].cHName[3] = id4;
    var hb = chars[id][id2][id4];
    $(this).after('<div id="'+id4+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
    t["t"+aT].curHitbox = hb;
    if (id2.substr(1,id2.length) == "smash"){
      charging = true;
      $("#disableCharge").hide();
    }
    else {
      charging = false;
      $("#disableCharge").show();
    }
    drawTrajectory();
    drawAngle();
  });
}

function trajBoxClick(){
  $(".trajBox").unbind("click");
  $(".trajBox").click(function(){
    $(".trajBox").removeClass("trajBoxSelected");
    $(this).addClass("trajBoxSelected");
    var pT = aT;
    aT = parseInt($(this).attr("id").substr(7,8));
    //prompt(aT);
    //prompt(t["t"+aT].cHName);
    swapOptions();
  });
}

function swapOptions(){
    $(".verButton").removeClass("verButtonOn");
    if (t["t"+aT].version == "PAL"){
      $("#PALButton").addClass("verButtonOn");
    }
    else {
      $("#NTSCButton").addClass("verButtonOn");
    }

    $(".staleQbutton").removeClass("staleQon");
    for(n=0;n<t["t"+aT].staleQueue.length;n++){
      if (t["t"+aT].staleQueue[n]){
        $("#staleQ"+(n+1)).addClass("staleQon");
      }
    }

    $("#chargingNumberEdit").empty().append(t["t"+aT].chargeF);

    $(".posButton").removeClass("posButtonSelected");
    if (t["t"+aT].reverse){
      $("#posButtonLeft").addClass("posButtonSelected");
    }
    else {
      $("#posButtonRight").addClass("posButtonSelected");
    }

    $("#victimcharname").empty().append(t["t"+aT].character);

    $("#percentNumberEdit").empty().append(t["t"+aT].percent);

    $("#tdiSvgPointer").attr("cx",t["t"+aT].tdiMouseXReal/(130/161)).attr("cy",t["t"+aT].tdiMouseYReal/(130/161));

    var x = t["t"+aT].tdiMouseXMelee;
    if (x >= 1 || x <= -1){
      x = x.toPrecision(5);
    }
    else if (x >= 0.099 || x <= -0.099){
      x = x.toPrecision(4);
    }
    else if (x == 0){
      x = "0.0000";
    }
    else {
      x = x.toPrecision(3);
    }
    $("#tdiXInput").empty().append(x);
    var y = t["t"+aT].tdiMouseYMelee;
    if (y >= 1 || y <= -1){
      y = y.toPrecision(5);
    }
    else if (y >= 0.099 || y <= -0.099){
      y = y.toPrecision(4);
    }
    else if (y == 0){
      y = "0.0000";
    }
    else {
       y = y.toPrecision(3);
    }
    $("#tdiYInput").empty().append(y);

    if (t["t"+aT].crouch){
      $("#cSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#cSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }

    if (t["t"+aT].chargeInterrupt){
      $("#hwcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#hwcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }




    $(".attack").unbind("click").remove();
    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(".idstats").remove();
    id = t["t"+aT].cHName[0];
    var keys = Object.keys(chars[id]);
    for (i=0;i<keys.length;i++){
      $("#"+id).after('<div id="'+keys[i]+'" class="attack '+id+'"><p>'+keys[i]+'</p></div>');
    }
    $(".attack").hover(function(){
      $(this).toggleClass("attackhighlight");
    });
    attackClick();
    id2 = t["t"+aT].cHName[1];
    var keys2 = Object.keys(chars[id][id2]);
    if (!t["t"+aT].cHName[2]){
      for (j=0;j<keys2.length;j++){
        $("#"+id2).after('<div id="'+keys2[j]+'" class="id '+id2+' '+id+'"><p>'+keys2[j]+'</p></div>');
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick2();
      id4 = t["t"+aT].cHName[3];
      $("#"+id4).addClass("idcurrent");
      hb = t["t"+aT].curHitbox;
      $("#"+id4).after('<div id="'+id4+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
      if (id2.substr(1,id2.length) == "smash"){
        charging = true;
        $("#disableCharge").hide();
      }
      else {
        charging = false;
        $("#disableCharge").show();
      }
      drawTrajectory();
    }
    else {
      for (k=0;k<keys2.length;k++){
        $("#"+id2).after('<div id="'+keys2[k]+'" class="subattack '+id2+' '+id+'"><p>'+keys2[k]+'</p></div>');
      }
      $(".subattack").hover(function(){
        $(this).toggleClass("subattackhighlight");
      });
      subattackClick();
      id3 = t["t"+aT].cHName[2];
      var keys3 = Object.keys(chars[id][id2][id3]);
      for (l=0;l<keys3.length;l++){
        $("#"+id3).after('<div id="'+keys3[l]+'" class="id '+id3+' '+id2+' '+id+'"><p>'+keys3[l]+'</p></div>');
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick();
      id4 = t["t"+aT].cHName[3];
      $("#"+id4).addClass("idcurrent");
      hb = t["t"+aT].curHitbox;
      $("#"+id4).after('<div id="'+id4+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
      t["t"+aT].curHitbox = hb;
      if (id2.substr(1,id2.length) == "smash"){
        charging = true;
        $("#disableCharge").hide();
      }
      else {
        charging = false;
        $("#disableCharge").show();
      }
      drawTrajectory();

    }
    drawAngle();
}

function trajColourClick(){
  $(".trajColour").unbind("click");
  $(".trajColour").click(function(){
    var id = $(this).attr("id").substr(10,11);
    if (!$(this).children(".colourselectbox").length){
      $(".colourselectbox").remove();
      $(this).append(colourtext);
      colourChange(id);
    }
    else {
      $(".colourselectbox").remove();
    }
  });
}

function trajColourHover(){
  $(".trajColour").unbind("mouseenter").unbind("mouseleave");
  $(".trajColour").hover(function(){
    $(this).addClass("trajBoxHighlight");
  },function(){
    $(this).removeClass("trajBoxHighlight");
  });
}

var colourChange = function(id){
  $(".colourselect").click(function(){
    newcolour = $(this).css("background-color");
    $("#trajColour"+id).css("background-color",newcolour);
    $("#start"+id).css({"fill":newcolour,"stroke":newcolour});
    t["t"+aT].colour = newcolour;
    $(".colourselectbox").remove();
  });
}

function trajDeleteHover(){
  $(".trajDelete").unbind("mouseenter").unbind("mouseleave");
  $(".trajDelete").hover(function(){
    $(this).toggleClass("trajDeleteHighlight");
  });
}

function trajDeleteClick(){
  $(".trajDelete").unbind("click");
  $(".trajDelete").click(function(){
    var id = parseInt($(this).attr("id").substr(10,11));
    $("#trajBox"+id+", #trajGroup"+id+", #trajGroup-t"+id).remove();
    currentTrajs[id-1] = false;
    if (id == aT){
      for (i=0;i<9;i++){
        if (currentTrajs[i]){
          aT = i+1;
          $("#trajBox"+aT).addClass("trajBoxSelected");
          swapOptions();
          break;
        }
      }
    }
    storedTrajs--;
    if (storedTrajs == 1){
      $(".trajDelete").addClass("trajDeleteDisable");
    }

  });
}

function attackTable(){
  var id = "";
  var id2 = "";
  var id3 = "";
  characterClick();
}

function SVG(tag)
{
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function drawTrajectory(onlyDrawWhenUnfrozen){
  //tried changing positions instead of redrawing, but didnt help firefox and created many other issues that'd have to be resolved in more code
  onlyDrawWhenUnfrozen = onlyDrawWhenUnfrozen || false;

  var totalstale = 1.00;
  var damage = t["t"+aT].curHitbox.dmg;
  for(i=0;i<9;i++){
    if(t["t"+aT].staleQueue[i]){
      totalstale -= (10-(i+1))/100;
    }
  }
  damage *= totalstale;
  if (charging){
    damage *= 1 + (t["t"+aT].chargeF * (0.4/59));
  }
  var xPos = 0;
  var yPos = 0;
  if (t["t"+aT].trajFrozen){
    if (!onlyDrawWhenUnfrozen){
      xPos = t["t"+aT].mouseXMeleeF;
      yPos = t["t"+aT].mouseYMeleeF;
    }
  }
  else {
    xPos = t["t"+aT].mouseXMelee;
    yPos = t["t"+aT].mouseYMelee;
  }

	var hit = new Hit(t["t"+aT].percent,damage,t["t"+aT].curHitbox.kg,t["t"+aT].curHitbox.bk,t["t"+aT].curHitbox.wbk,t["t"+aT].curHitbox.angle,t["t"+aT].character,t["t"+aT].version,xPos,yPos,t["t"+aT].crouch,t["t"+aT].reverse,t["t"+aT].chargeInterrupt,t["t"+aT].tdiMouseXMelee,t["t"+aT].tdiMouseYMelee);
	var positions = hit.positions;
	t["t"+aT].curPositions = positions;
	var cla = "tLineS";
  var temX = ((xPos*10)+centreOffset[0]);
  var temY = ((-yPos*10)+centreOffset[1]);
  var lineText = "M"+temX+" "+temY+" ";
  /*if ($("#trajGroup"+aT).length > 0){
    $("#start"+aT).attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z");
    $("#start-t"+aT).attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z");
  }
  else {*/
    $("#trajGroup"+aT+", #trajGroup-t"+aT).remove();
    $(SVG("g")).attr("id","trajGroup"+aT).appendTo("#trajectory");
    $(SVG("g")).attr("id","trajGroup-t"+aT).appendTo("#trajectory-t");

    $(SVG("path")).attr("id","start"+aT).attr("class","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",t["t"+aT].colour).attr("stroke",t["t"+aT].colour).prependTo("#trajGroup"+aT);
    $(SVG("path")).attr("id","start-t"+aT).attr("class","start-t").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajGroup-t"+aT);
  //}
  //$("#trajGroup"+aT+" .framePos").css("fill","#25d041");
  for (i=0;i<positions.length;i++){
  	var x = positions[i][0];
  	var y = positions[i][1];
  	if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){
  		var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
  		lineText += tempText;
      /*if ($("#"+aT+"f"+(i+1)).length > 0){
        $("#"+aT+"f"+(i+1)).attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]);
        $("#"+aT+"f"+(i+1)+"-t").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]);
      }*/
      //else {
        $(SVG("circle")).attr("id",aT+"f"+(i+1)).attr("class","framePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajGroup"+aT);
        $(SVG("circle")).attr("id",aT+"f"+(i+1)+"-t").attr("class","framePos-t").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajGroup-t"+aT);
      //}
  	}
  	else {
      //$("#"+aT+"f"+(i+1)+", #"+aT+"f"+(i+1)+"-t").remove();
      //checks if vertical knockback velocity is greater or equal to 2.4 when above the top blastzone
      if (x >= bzRight || x <= bzLeft || y <= bzBottom || (y >= bzTop && positions[i][3] >= 2.4)){

        cla = "tLineK";
        isKilled = true;
        $("#trajGroup"+aT+" .framePos").css("fill","#df3c3c");
      }
  	}

  }
  //$("#trajLine"+aT).remove();
  $(SVG("path")).attr("id","trajLine"+aT).attr("class","trajLine "+cla).attr("d",lineText).prependTo("#trajGroup"+aT);

  if (!onlyDrawWhenUnfrozen){
    trajPosInfo();
  }
  if (t["t"+aT].curHitbox.angle == 361){
    drawAngle();
  }
}

function trajPosInfo(){
  $(".framePos-t").hover(function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).attr("r",30);
    $("#trajCanvas").after('<div class="framePosInfoBox">Frame of hitstun: '+fid+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20)});
  }, function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).attr("r",15);
    $(".framePosInfoBox").remove();
  });

  $(".start-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(7,8));
    $("#start"+id).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox">Position Hit<br>X: '+((Math.round(t["t"+id].mouseXMeleeF*100))/100)+' Y: '+((Math.round(t["t"+id].mouseYMeleeF*100))/100)+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20)});

  }, function(){
    $(".start").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });
}

$(document).ready(function(){
  $("#header").hide();
  attackTable();
	$(document).on('mousemove', function(e){
		mouseX = e.pageX - trajOffset.left;
		mouseY = e.pageY - trajOffset.top;
    diMouseX = e.pageX - diOffset.left;
    diMouseY = e.pageY - diOffset.top;
    //diMouseX.s = e.pageX - diOffset.s.left;
    //diMouseY.s = e.pageY - diOffset.s.top;
    //diMouseX.a = e.pageX - diOffset.a.left;
    //diMouseY.a = e.pageY - diOffset.a.top;
    //(disWidth/4580)*100 gives width in pixels of blastzone

	});

  $("#tdiUser").hide();
  $("#sdiUser").hide();
  $("#adiUser").hide();
  $("#sdiBox").hide();
  $("#adiBox").hide();

  $(".diSelector").mousemove(function(){
    var id = $(this).attr("id");
    var type = id[0];
    var widthRatio = 130/161;
    var heightRatio = 130/161;
    var xy = convertPixelsToStick(diMouseX,diMouseY);

    if (!diPointerFrozen[type]){
      t["t"+aT][type+"diMouseXReal"] = diMouseX;
      t["t"+aT][type+"diMouseYReal"] = diMouseY;
      t["t"+aT][type+"diMouseXMelee"] = xy[0];
      t["t"+aT][type+"diMouseYMelee"] = xy[1];
      changeUserStick(xy[0],xy[1],type);
      //var xy = convertPixelsToStick(t["t"+aT].tdiMouseXReal,t["t"+aT].tdiMouseYReal);
      var xy = convertPixelsToStick(t["t"+aT][type+"diMouseXReal"],t["t"+aT][type+"diMouseYReal"]);
      $("#"+type+"diXInput").empty().append(xy[2]);
      $("#"+type+"diYInput").empty().append(xy[3]);
      $("#"+type+"diSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));
      drawTrajectory();
    }
  });


  $(".diSelector").click(function(){
    var type = $(this).attr("id");
    diPointerFrozen[type[0]] ^= true;
  });

  $(".diPrecise").hover(function(){
    $(this).toggleClass("tdiPreciseHighlight");
  });

  $(".diPrecise").click(function(){
    diPointerFrozen.t = true;
    var id = $(this).attr("id");
    var type = id[0];
    if (id[3] == "R" || id[3] == "L"){
      var x = "";
      if (id[3] == "L" && !(t["t"+aT][type+"diMouseXMelee"] < -0.999)){
        t["t"+aT][type+"diMouseXMelee"] -= 0.0125;
      }
      else if (id[3] == "R" && !(t["t"+aT][type+"diMouseXMelee"] > 0.999)){
        t["t"+aT][type+"diMouseXMelee"] += 0.0125;
      }
      if (t["t"+aT][type+"diMouseXMelee"] >= 1 || t["t"+aT][type+"diMouseXMelee"] <= -1){
        x = t["t"+aT][type+"diMouseXMelee"].toPrecision(5);
      }
      else if (t["t"+aT][type+"diMouseXMelee"] >= 0.099 || t["t"+aT][type+"diMouseXMelee"] <= -0.099){
        x = t["t"+aT][type+"diMouseXMelee"].toPrecision(4);
      }
      else if (t["t"+aT][type+"diMouseXMelee"] == 0){
        x = "0.0000";
      }
      else {
        x = t["t"+aT][type+"diMouseXMelee"].toPrecision(3);
      }
      //t["t"+aT].tdiMouseXMelee = parseFloat(x);
      $("#tdiXInput").empty().append(x);
      t["t"+aT][type+"diMouseXReal"] = ((t["t"+aT][type+"diMouseXMelee"]/0.0125)+80)*(130/161);
    }
    if (id[3] == "U" || id[3] == "D"){
      var y = "";
      if (id[3] == "U" && !(t["t"+aT][type+"diMouseYMelee"] > 0.999)){
        t["t"+aT][type+"diMouseYMelee"] += 0.0125;
      }
      else if (id[3] == "D" && !(t["t"+aT][type+"diMouseYMelee"] < -0.999)){
        t["t"+aT][type+"diMouseYMelee"] -= 0.0125;
      }
      if (t["t"+aT][type+"diMouseYMelee"] >= 1 || t["t"+aT][type+"diMouseYMelee"] <= -1){
        y = t["t"+aT][type+"diMouseYMelee"].toPrecision(5);
      }
      else if (t["t"+aT][type+"diMouseYMelee"] >= 0.099 || t["t"+aT][type+"diMouseYMelee"] <= -0.099){
        y = t["t"+aT][type+"diMouseYMelee"].toPrecision(4);
      }
      else if (t["t"+aT][type+"diMouseYMelee"] == 0){
        y = "0.0000";
      }
      else {
         y = t["t"+aT][type+"diMouseYMelee"].toPrecision(3);
      }
      $("#tdiYInput").empty().append(y);
      t["t"+aT][type+"diMouseYReal"] = ((t["t"+aT][type+"diMouseYReal"]/-0.0125)+80)*(130/161);
    }
    changeUserStick(t["t"+aT][type+"diMouseXMelee"],t["t"+aT][type+"diMouseYMelee"],"tdi");
    $("#tdiSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));
    drawTrajectory();
  });

  $(".diTurn").hover(function(){
    $(this).toggleClass("diPreciseHighlight");
  });

  $(".diTurn").click(function(){
    var id = $(this).attr("id");
    var type = id[0];
    var diAngle = parseInt($("#"+type+"diDiAngle").text());
    if (id[3] == "A"){
      if (diAngle == 0 || diAngle == 90 || diAngle == 180 || diAngle == 270){
        diAngle += 16;
      }
      diAngle++;
      if (diAngle >= 360){
        diAngle -= 360;
      }
    }
    else {
      if (diAngle == 0 || diAngle == 90 || diAngle == 180 || diAngle == 270){
        diAngle -= 16;
      }
      diAngle--;
      if (diAngle < 0){
        diAngle += 360;
      }
    }
    if (diAngle > 73 && diAngle < 107){
      diAngle = 90;
    }
    else if (diAngle > 163 && diAngle < 197){
      diAngle = 180;
    }
    else if (diAngle > 253 && diAngle < 287){
      diAngle = 270;
    }
    else if (diAngle > 343 || diAngle < 17){
      diAngle = 0.1;
    }
    changeUserStick(0,0,type,diAngle);
    var xy = convertPixelsToStick(t["t"+aT][type+"diMouseXReal"],t["t"+aT][type+"diMouseYReal"]);
    $("#"+type+"diXInput").empty().append(xy[2]);
    $("#"+type+"diYInput").empty().append(xy[3]);
    $("#"+type+"diSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));
    drawTrajectory();
  });

  $(".diCentre").hover(function(){
    $(this).toggleClass("diPreciseHighlight");
  });

  $(".diCentre").click(function(){
    var id = $(this).attr("id");
    var type = id[0];
    t["t"+aT][type+"diMouseXMelee"] = 0;
    t["t"+aT][type+"diMouseYMelee"] = 0;
    t["t"+aT][type+"diMouseXReal"] = 65.4;
    t["t"+aT][type+"diMouseYReal"] = 65.4;
    $("#"+type+"diXInput").empty().append("0.0000");
    $("#"+type+"diYInput").empty().append("0.0000");
    $("#"+type+"diDiAngle").empty().append("0");
    $("#"+type+"diOffsetPercent").empty().append("0");
    $("#"+type+"diSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));
    $("#"+type+"diUser").hide();
    $("#"+type+"diUserCentre").show();
    drawTrajectory();
  });

  $("#diSwitchButton").hover(function(){
    $(this).toggleClass("diPreciseHighlight");
  });

  $("#diSwitchButton").click(function(){
    if (activeDI == "t"){
      $("#tdiBox").hide();
      $("#sdiBox").show();
      activeDI = "s";
    }
    else if (activeDI == "s"){
      $("#sdiBox").hide();
      $("#adiBox").show();
      activeDI = "a";
    }
    else {
      $("#adiBox").hide();
      $("#tdiBox").show();
      activeDI = "t";
    }
    diOffset = $("#"+activeDI+"diSelector").offset();
  });

  $("#trajectory-t").mousemove(function(){
    var widthRatio = disWidth/4580;
    var heightRatio = disHeight/3188;
    t["t"+aT].mouseXMelee = (Math.round(((mouseX/widthRatio)-2290)*10))/100;
    t["t"+aT].mouseYMelee = (Math.round(((mouseY/heightRatio)-2050)*-10))/100;
    $("#mPosX").empty().append(t["t"+aT].mouseXMelee);
    $("#mPosY").empty().append(t["t"+aT].mouseYMelee);
    if (t["t"+aT].trajFrozen == false){
      if (snapping){
        //will have to do some more maths for slanted surfaces like yoshis
        for (i=0;i<surfaces.length;i++){
          //if X position is in line with surface or within 10Mm on either side
          if (t["t"+aT].mouseXMelee >= surfaces[i][0][0] - 10 && t["t"+aT].mouseXMelee <= surfaces[i][1][0] + 10){

            //if Y is within 10Mm of surface on either side
            if (t["t"+aT].mouseYMelee <= surfaces[i][0][1] + 10 && t["t"+aT].mouseYMelee >= surfaces[i][0][1] - 10){
              //if X is just outside of the plat X plane, snap to the edge (left)
              if (t["t"+aT].mouseXMelee >= surfaces[i][0][0] - 10 && t["t"+aT].mouseXMelee < surfaces[i][0][0]){
                t["t"+aT].mouseXMelee = surfaces[i][0][0];
              }
              //(right)
              if (t["t"+aT].mouseXMelee <= surfaces[i][1][0] + 10 && t["t"+aT].mouseXMelee > surfaces[i][1][0]){
                t["t"+aT].mouseXMelee = surfaces[i][1][0];

              }
              t["t"+aT].mouseYMelee = surfaces[i][0][1];
            }
          }
        }
      }
      drawTrajectory(true);
    }
  });

  $("#trajectory-t").click(function(){
    if (t["t"+aT].trajFrozen == false){
      t["t"+aT].trajFrozen = true;
      t["t"+aT].mouseXMeleeF = t["t"+aT].mouseXMelee;
      t["t"+aT].mouseYMeleeF = t["t"+aT].mouseYMelee;
      trajPosInfo();
    }
    else {
      t["t"+aT].trajFrozen = false;
      $(".framePosInfoBox").remove();
    }
  });

	drawTrajectory();

	$("#victim-char").hover(function(){
		$(".hbcharselect").css("opacity",0.7);
		$("#chardropdown").show();
	}, function(){
		$("#chardropdown").hide();
	});

	$(".hbcharselect").hover(function(){
		$(".hbcharselect").css("opacity",0.7);
		$(this).css("opacity",1);
	});

	$(".hbcharselect").click(function(){
		var newchar = $(this).children("p").text();
		$("#victimcharname").empty().append(newchar);
		t["t"+aT].character = newchar;
    drawTrajectory();
	});

	var percentHold = 0;

	$(".percentButton").mousedown(function() {
		var id = $(this).attr("id");
		percentHold = setInterval(function() {
			var curNum = parseInt($("#percentNumberEdit").text());
			if (id == "percentPlus"){
				var newnum = curNum + 1;
				t["t"+aT].percent = newnum;
			}
			else {
				var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
				t["t"+aT].percent = newnum;
      }
			$("#percentNumberEdit").empty().append(newnum);
      drawTrajectory();
		}, 50);
	}).bind("mouseup mouseleave", function() {
    clearInterval(percentHold);
	});

  var chargingHold = 0;

  $(".chargingButton").mousedown(function() {
    var id = $(this).attr("id");
    chargingHold = setInterval(function() {
      var curNum = parseInt($("#chargingNumberEdit").text());
      if (id == "chargingPlus"){
        var newnum = curNum + 1;
        if (newnum > 59){
          newnum = 59;
        }
        t["t"+aT].chargeF = newnum;
      }
      else {
        var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
        t["t"+aT].chargeF = newnum;
      }
      $("#chargingNumberEdit").empty().append(newnum);
      drawTrajectory();
    }, 50);
  }).bind("mouseup mouseleave", function() {
    clearInterval(chargingHold);
  });

  $(".staleQbutton").hover(function(){
    $(this).toggleClass("staleQbuttonhighlight");
  });

  $(".staleQbutton").click(function(){
    var id = $(this).attr("id");
    id = parseInt(id[6]);
    if (t["t"+aT].staleQueue[id-1]){
      t["t"+aT].staleQueue[id-1] = false;
      $(this).removeClass("staleQon");
    }
    else {
      t["t"+aT].staleQueue[id-1] = true;
      $(this).addClass("staleQon");
    }
    drawTrajectory();

  });

  $(".posButton").hover(function(){
    $(this).toggleClass("posButtonHighlight");
  });

  $(".posButton").click(function(){
    var id = $(this).attr("id");
    $(".posButton").removeClass("posButtonSelected");
    $(this).addClass("posButtonSelected");
    if (id[9] == "L"){
      t["t"+aT].reverse = true;
    }
    else {
      t["t"+aT].reverse = false;
    }
    drawAngle();
    drawTrajectory();
  });

  $("#stsRealButton").click(function(){
    if (snapping){
      $("#stsSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("Off");
      snapping = false;
    }
    else {
      $("#stsSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("On");
      snapping = true;
    }
  });

  $("#hwcRealButton").click(function(){
    if (t["t"+aT].chargeInterrupt){
      $("#hwcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].chargeInterrupt = false;
    }
    else {
      $("#hwcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].chargeInterrupt = true;
    }
    drawTrajectory();
  });

  $("#cRealButton").click(function(){
    if (t["t"+aT].crouch){
      $("#cSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].crouch = false;
    }
    else {
      $("#cSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].crouch = true;
    }
    drawTrajectory();
  });

  $(".verButton").hover(function(){
    $(this).toggleClass("verButtonHighlight");
  });

  $(".verButton").click(function(){
    $(".verButton").removeClass("verButtonOn");
    var id = $(this).attr("id").substr(0,3);
    if (id == "PAL"){
      t["t"+aT].version = "PAL";
    }
    else {
      t["t"+aT].version = "NTSC";
    }
    $(this).addClass("verButtonOn");
    drawTrajectory();
  });

  $(".stageselect").hover(function(){
    $(this).toggleClass("stagehighlight");
  });

  $(".stageselect").click(function(){
    $(".stageselect").removeClass("stageselected");
    $(this).addClass("stageselected");
  });

  $(".controlcollapsetb").hover(function(){
    $(this).toggleClass("controlcollapsetbhighlight");
  });

  $(".controlcollapselr").hover(function(){
    $(this).toggleClass("controlcollapselrhighlight");
  });

  $(".controlcollapse").click(function(){
    var id = $(this).attr("id").substr(0,1);
    $(this).toggleClass("controlarrowrotate");
    if (collapsed[id]){
      $("#"+id+"controls").show();
      collapsed[id] = false;
    }
    else {
      $("#"+id+"controls").hide();
      collapsed[id] = true;
    }
    resizing();
    setTimeout(resizing,500);
  });

  $("#homebutton").hover(function(){
    $(this).toggleClass("homehighlight");
  });

  $("#homebutton").click(function(){
    $("#header").toggle();
    resizing();
    setTimeout(resizing,500);
  });

  $('html').click(function(e) {
    if(!$(e.target).hasClass("colourselect") && !$(e.target).hasClass("trajColour"))
    {
      $(".colourselectbox").remove();
    }
  });



  trajBoxHover();
  trajBoxClick();
  trajColourClick();
  trajColourHover();
  trajDeleteHover();
  trajDeleteClick();

  $("#trajAdd").click(function(){
    $(".trajBox").removeClass("trajBoxSelected");
    var highestTraj = 0;
    var newTraj = 0;
    var foundNew = false;

    for (i=0;i<9;i++){
      if (currentTrajs[i]){
        highestTraj = i+1;
      }
      else if (!foundNew){
        newTraj = i+1;
        foundNew = true;
      }
    }
    if (foundNew){
      if (newTraj > 1){
        $("#trajBox"+(newTraj-1)).after('<div id="trajBox'+newTraj+'" class="trajBox trajBoxSelected"><div id="trajNum'+newTraj+'" class="trajNum"><p>'+newTraj+'</p></div><div id="trajColour'+newTraj+'" class="trajColour" style="background-color:'+t["t"+newTraj].colour+'"></div><div id="trajLabel'+newTraj+'" class="trajLabel"><p>Add label</p></div><div id="trajDelete'+newTraj+'" class="trajDelete"><p>x</p></div></div>');
      }
      else {
        $("#trajBoxContainer").prepend('<div id="trajBox1" class="trajBox trajBoxSelected"><div id="trajNum1" class="trajNum"><p>1</p></div><div id="trajColour1" class="trajColour" style="background-color:'+t["t1"].colour+'"></div><div id="trajLabel1" class="trajLabel"><p>Add label</p></div><div id="trajDelete1" class="trajDelete"><p>x</p></div></div>');
      }

      currentTrajs[newTraj-1] = true;

      storedTrajs++;
      //finally found a way to deep copy objects. fukin pointers man
      $.extend(true,t["t"+newTraj],t["t"+aT]);

      t["t"+newTraj].colour = startColours[newTraj-1];
      aT = newTraj;

      drawTrajectory();

      trajBoxHover();
      trajBoxClick();
      trajColourClick();
      trajColourHover();
      $(".trajDelete").removeClass("trajDeleteDisable");
      trajDeleteHover();
      trajDeleteClick();
    }

  });

  $("#trajAdd").hover(function(){
    $(this).toggleClass("trajAddBoxHighlight");
  });

  $(".character").hover(function(){
    $(this).toggleClass("characterhighlight");
  });

  $("#trajShare").click(function(){
    var qstring = writeQueryString();

    //$("#popout, #popoutOverlay").show();
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="popoutShare"><div id="ppSTitle"><p>Share this URL</p></div><div id="ppSClose" class="ppSClose"><p>x</p></div><div id="ppSUrl"><p id="shareUrlEdit">http://ikneedata.com/trajectory'+qstring+'</p></div></div></div>');
    //$("#shareUrlEdit").empty().append(qstring);
    $("#ppSClose").unbind("mouseover click");
    $("#ppSClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $("#ppSClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });

  });

  $(".trajLabel").hover(function(){
    $(this).toggleClass("trajLabelHighlight");
  });

  $(document).mouseup(function (e)
{
    var container = $(".labelOptions");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});

  $(".trajLabel").click(function(){
    var id = $(this).attr("id").substr(9,10);
    $("#display").append('<textarea id="labelBox'+id+'" class="labelBox" name="label'+id+'" cols="30" rows="3"></textarea><div id="labelOptions'+id+'" class="labelOptions"><div id="labelFontSize'+id+'" class="labelFontSize"><div class="labelFontIcon"></div><div class="labelFontChange"><div class="labelFontUp labelControl"><p>+</p></div><div class="labelFontDown labelControl"><p>-</p></div></div></div><div id="labelOpacity'+id+'" class="labelOpacity"><div class="labelOpacityIcon"></div><div class="labelOpacityChange"><div class="labelOpacityUp labelControl"><p>+</p></div><div class="labelOpacityDown labelControl"><p>-</p></div></div></div><div class="labelColor labelControl"><p>Add color box</p></div><div class="labelHitbox labelControl"><p>Add hitbox</p></div></div>');
    $("#labelBox"+id).click(function(){
      var x = $("#labelBox"+id).css("width");
      x = parseInt(x.substr(0,x.length - 2));
      var a = $("#labelBox"+id).css("left");
      a = parseInt(a.substr(0,a.length - 2));
      /*var y = $("#labelBox"+id).css("height");
      y = parseInt(y.substr(0,y.length - 2));*/
      var b = $("#labelBox"+id).css("top");
      b = parseInt(b.substr(0,b.length - 2));
      $("#labelOptions"+id).show().css({"top":b+10,"left":x+a+16});
      $("#labelOptions"+id+" .labelControl").hover(function(){
        $(this).toggleClass("labelControlHighlight");
      });
      $("#labelOptions"+id+" .labelFontChange .labelControl").click(function(){
        var temp = $("#labelBox"+id).css("font-size");
        temp = parseInt(temp.substr(0,temp.length - 2));
        if ($(this).hasClass("labelFontUp")){
          temp++;
          if (temp > 40){
            temp = 40;
          }
        }
        else {
          temp--;
          if (temp < 5){
            temp = 5;
          }
        }
        $("#labelBox"+id).css("font-size",temp+"px");
      });
      $("#labelOptions"+id+" .labelOpacityChange .labelControl").click(function(){
        var temp = parseFloat($("#labelBox"+id).css("opacity"));
        //temp = parseInt(temp.substr(0,temp.length - 2));
        if ($(this).hasClass("labelOpacityUp")){
          temp += 0.1;
          if (temp > 1){
            temp = 1;
          }
        }
        else {
          temp -= 0.1;
          if (temp < 0.1){
            temp = 0.1;
          }
        }
        $("#labelBox"+id).css("opacity",temp);
      });
      //$("#labelOptions"+id).hide();
    });
    $("#labelBox"+id).draggable({cancel: '',containment: "parent",start:function(){
      $("#labelBox"+id).unbind("mouseenter").unbind("mouseleave");
      $(".labelControl").unbind("mouseenter").unbind("mouseleave");
      $("#labelOptions"+id+" .labelOpacityChange .labelControl").unbind("click");
      $("#labelOptions"+id+" .labelFontChange .labelControl").unbind("click");
      $("#labelOptions"+id).hide();
    },stop:function(){
      var posx = $("#labelBox"+id).css("left");
      var posy = $("#labelBox"+id).css("top");
      posx = parseInt(posx.substr(0,posx.length - 2));
      posy = parseInt(posy.substr(0,posy.length - 2));
      t["t"+id].labelX = posx/disMagnification;
      t["t"+id].labelY = posy/disMagnification;
      $("#labelBox"+id).click(function(){
        var x = $("#labelBox"+id).css("width");
        x = parseInt(x.substr(0,x.length - 2));
        var a = $("#labelBox"+id).css("left");
        a = parseInt(a.substr(0,a.length - 2));
        /*var y = $("#labelBox"+id).css("height");
        y = parseInt(y.substr(0,y.length - 2));*/
        var b = $("#labelBox"+id).css("top");
        b = parseInt(b.substr(0,b.length - 2));
        $("#labelOptions"+id).show().css({"top":b+10,"left":x+a+16});
        $("#labelOptions"+id+" .labelControl").hover(function(){
          $(this).toggleClass("labelControlHighlight");
        });
        //$("#labelOptions"+id).hide();
      });
    }});
  });

  readQueryString();
  //thingy();

});
