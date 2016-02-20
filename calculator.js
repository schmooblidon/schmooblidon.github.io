aT = 1;

charging = false;

storedTrajs = 1;

currentTrajs = [true,false,false,false,false,false,false,false,false];

startColours = ["#00ffff","#ffff00","#ff00ff","#FF6633","#6666ff","#66ff66","#9966FF","#999999","#ffffff"];

savedPalettes = [0,1,2,3,4,5,6,7,8];

palettes = [["#fe3a3a","#fe7f7f","#bb2828"],
["#fa5d36","#ffaa7a","#d04703"],
["#fff508","#fcfc8d","#b9b91c"],
["#08fb08","#89fe89","#299f29"],
["#00bdf9","#77ffff","#009999"],
["#4040ff","#8787fc","#2d2da2"],
["#813ffc","#ac82ff","#5b2293"],
["#fa36fa","#fa7afa","#990099"],
["#9e9e9e","#FFFFFF","#595959"]];

//trajectoryObject(trajFrozen,mouseXMelee,mouseYMelee,mouseXMeleeF,mouseYMeleeF,curHitbox,version,character,percent,crouch,reverse,chargeInterrupt,charging,chargeF,staleQueue,curPositions)

function trajectoryObject(){
  this.trajFrozen = true;
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
  this.curHitbox = chars.Fx.neutralSpecial.id0;
  this.cHName = ["Fx","neutralSpecial",false,"id0"];
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
  this.hasLabel = false;
  this.fadeIn = true;
  this.doubleJump = false;
  this.hitstun = 0;
  this.meteorCancel = false;
  this.vcancel = false;
  this.palette = 0;
  this.useFractionals = false;
  this.fractional = "00000";
  this.grounded = true;
  this.knockback = 0;
  this.yDisplacement = 0;
  this.newDamage = 3;
}

t = {};
for (i=0;i<9;i++){
  t["t"+(i+1)] = new trajectoryObject();
  t["t"+(i+1)].colour = startColours[i];
}

sakurai = 0;
pointerfrozen = true;
hoverDropdown = false;
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

diSwitch = {};
diSwitch.t = 0;
diSwitch.s = 0;
diSwitch.a = 0;

titleX = 0;
titleY = 0;

//each surface is put into an element in the array. The surface is broken down into arrays of far left point X and y, and far right point X and Y. Use .length to find the number of surfaces to check

surfaces = {};
surfaces.bf = [[[-68.4,0],[68.4,0]],[[-57.6,27.2],[-20.0,27.2]],[[20,27.2],[57.6,27.2]],[[-18.8,54.4],[18.8,54.4]]];
surfaces.fd = [[[-85.56570,0],[85.56570,0]]];
surfaces.dl = [[[-77.2713,0.0089],[77.2713,0.0089]],[[-61.3929,30.1422],[-31.7254,30.1422]],[[31.7036,30.2426],[63.0745,30.2426]],[[-19.0181,51.4254],[19.0171,51.4254]]];
surfaces.ps = [[[-87.75,0],[87.75,0]],[[-55,25],[-25,25]],[[25,25],[55,25]]];
surfaces.ys = [[[-56,0],[56,0]],[[-59.5,23.45],[-28,23.45]],[[28,23.45],[59.5,23.45]],[[-15.75,42],[15.75,42]]];
surfaces.fo = [[[-63.34755,0.00288],[63.34755,0.00288]],[[-14.25,42.75],[14.25,42.75]]];


snapping = true;
centreOffset = [-bzLeft*10+50,bzTop*10+50];

function changeHitboxVersions(newver){
  //missing kirby, and sheik dthrow
  if (newver == "PAL"){
    chars.CF.fair.late.id0 = new hitbox(3,361,80,0,30,'Normal');
    chars.CF.fair.late.id1 = new hitbox(3,361,80,0,30,'Normal');
    chars.Fc.dair.late.id0 = new hitbox(9,361,100,0,20,'Normal');
    chars.Fc.dair.late.id1 = new hitbox(9,361,100,0,20,'Normal');
    chars.Fx.dsmash.id0 = new hitbox(13,30,65,0,20,'Normal');
    chars.Fx.dsmash.id1 = new hitbox(13,30,65,0,20,'Normal');
    chars.Fx.usmash.clean.id0 = new hitbox(17,80,108,0,26,'Normal');
    chars.Fx.usmash.clean.id1 = new hitbox(17,80,108,0,26,'Normal');
    chars.Fx.upSpecial.launch.id0 = new hitbox(12,80,60,0,60,'Flame');
    chars.Gn.dair.id0 = new hitbox(21,270,100,0,40,'Electric');
    chars.Gn.dair.id1 = new hitbox(21,270,100,0,40,'Electric');
    chars.Gn.dair.id2 = new hitbox(21,270,100,0,40,'Electric');
    chars.Gn.fair.id0 = new hitbox(17,361,80,0,40,'Normal');
    chars.Gn.fair.id1 = new hitbox(17,361,80,0,40,'Normal');
    chars.Gn.fair.id2 = new hitbox(17,361,80,0,40,'Normal');
    chars.Lk.upSpecial.ground_late.id0 = new hitbox(5,361,100,0,55,'Slash');
    chars.Lk.upSpecial.ground_late.id1 = new hitbox(5,361,100,0,55,'Slash');
    chars.Lk.upSpecial.ground_late.id2 = new hitbox(5,361,100,0,55,'Slash');
    chars.Ms.dair.id0 = new hitbox(13,270,70,0,40,'Slash');
    chars.Sh.usmash.hit1.id0 = new hitbox(16,90,102,0,50,'Slash');
    chars.Sh.usmash.hit1.id1 = new hitbox(16,90,102,0,50,'Slash');
    chars.Sh.uair.clean.id0 = new hitbox(10,80,110,0,15,'Normal');
    chars.Sh.uair.clean.id1 = new hitbox(10,80,110,0,15,'Normal');
    chars.Sh.uair.late.id0 = new hitbox(8,70,110,0,10,'Normal');
    chars.Sh.uair.late.id1 = new hitbox(8,70,110,0,10,'Normal');
    chars.Ys.fsmash.id0 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.fsmash.id1 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.fsmash.id2 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.usmash.id0 = new hitbox(15,75,108,0,30,'Normal');
    chars.Ys.usmash.id1 = new hitbox(15,75,108,0,30,'Normal');
    chars.Ys.dair.id0 = new hitbox(3,270,90,0,5,'Normal');
    chars.Ys.dair.id1 = new hitbox(3,270,90,0,5,'Normal');
  }
  else {
    chars.CF.fair.late.id0 = new hitbox(6,361,80,0,35,'Normal');
    chars.CF.fair.late.id1 = new hitbox(6,361,80,0,35,'Normal');
    chars.Fc.dair.late.id0 = new hitbox(9,290,100,0,20,'Normal');
    chars.Fc.dair.late.id1 = new hitbox(9,290,100,0,20,'Normal');
    chars.Fx.dsmash.id0 = new hitbox(15,25,65,0,20,'Normal');
    chars.Fx.dsmash.id1 = new hitbox(15,25,65,0,20,'Normal');
    chars.Fx.usmash.clean.id0 = new hitbox(18,80,112,0,30,'Normal');
    chars.Fx.usmash.clean.id1 = new hitbox(18,80,112,0,30,'Normal');
    chars.Fx.upSpecial.launch.id0 = new hitbox(14,80,60,0,60,'Flame');
    chars.Gn.dair.id0 = new hitbox(22,270,100,0,50,'Electric');
    chars.Gn.dair.id1 = new hitbox(22,270,100,0,50,'Electric');
    chars.Gn.dair.id2 = new hitbox(22,270,100,0,50,'Electric');
    chars.Gn.fair.id0 = new hitbox(17,361,80,0,60,'Normal');
    chars.Gn.fair.id1 = new hitbox(17,361,80,0,60,'Normal');
    chars.Gn.fair.id2 = new hitbox(17,361,80,0,60,'Normal');
    chars.Lk.upSpecial.ground_late.id0 = new hitbox(5,0,100,0,60,'Slash');
    chars.Lk.upSpecial.ground_late.id1 = new hitbox(5,0,100,0,60,'Slash');
    chars.Lk.upSpecial.ground_late.id2 = new hitbox(5,0,100,0,60,'Slash');
    chars.Ms.dair.id0 = new hitbox(13,290,70,0,40,'Slash');
    chars.Sh.usmash.hit1.id0 = new hitbox(17,90,105,0,50,'Slash');
    chars.Sh.usmash.hit1.id1 = new hitbox(17,90,105,0,50,'Slash');
    chars.Sh.uair.clean.id0 = new hitbox(12,80,120,0,15,'Normal');
    chars.Sh.uair.clean.id1 = new hitbox(12,80,120,0,15,'Normal');
    chars.Sh.uair.late.id0 = new hitbox(9,70,120,0,10,'Normal');
    chars.Sh.uair.late.id1 = new hitbox(9,70,120,0,10,'Normal');
    chars.Ys.fsmash.id0 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.fsmash.id1 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.fsmash.id2 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.usmash.id0 = new hitbox(14,75,108,0,26,'Normal');
    chars.Ys.usmash.id1 = new hitbox(14,75,108,0,26,'Normal');
    chars.Ys.dair.id0 = new hitbox(4,270,90,0,5,'Normal');
    chars.Ys.dair.id1 = new hitbox(4,270,90,0,5,'Normal');
  }
}


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

function changeStage(id){
  $("#trajBackground").attr("src","assets/trajectory/stages/"+id+".png").attr("width",dimensions[id][0]).attr("height",dimensions[id][1]);
  bzTop = bz[id][0];
  bzRight = bz[id][1];
  bzBottom = bz[id][2];
  bzLeft = bz[id][3];
  $("#bzTopText").empty().append(bzTop);
  $("#bzBottomText").empty().append(bzBottom);
  $("#bzRightText").empty().append(bzRight);
  $("#bzLeftText").empty().append(bzLeft);

  disWidth = dimensions[id][0];
  disHeight = dimensions[id][1];
  ratio = disWidth/disHeight;
  centreOffset = [-bzLeft*10+50,bzTop*10+50];

  //viewBox attribute is weird and had to use vanilla javascript and also avoid changing the di selector svg elements
  var svg = document.getElementsByTagName("svg")[0];
  var svg2 = document.getElementsByTagName("svg")[1];

  $("#trajectory, #trajectory-t").attr("width",disWidth).attr("height",disHeight).attr("enable-background","new 0 0 "+disWidth+" "+disHeight);
  svg.setAttribute("viewBox","0 0 "+disWidth+" "+disHeight);
  svg2.setAttribute("viewBox","0 0 "+disWidth+" "+disHeight);

  resizing();
}

function trajectoryHover(){
  $("#trajectory-t").unbind("mouseenter").unbind("mouseleave");
  $("#trajectory-t").mousemove(function(){
    var widthRatio = disWidth/dimensions[activeStage][0];
    var heightRatio = disHeight/dimensions[activeStage][1];
    t["t"+aT].mouseXMelee = (Math.round(((mouseX/widthRatio)-(-bzLeft*10+50))*10))/100;
    t["t"+aT].mouseYMelee = (Math.round(((mouseY/heightRatio)-(bzTop*10+50))*-10))/100;
    $("#mPosX").val(t["t"+aT].mouseXMelee);
    $("#mPosY").val(t["t"+aT].mouseYMelee);

    if (t["t"+aT].trajFrozen == false){
      t["t"+aT].grounded = false;
      if (snapping){
        //will have to do some more maths for slanted surfaces like yoshis
        for (i=0;i<surfaces[activeStage].length;i++){
          //if X position is in line with surface or within 10Mm on either side
          if (t["t"+aT].mouseXMelee >= surfaces[activeStage][i][0][0] - 10 && t["t"+aT].mouseXMelee <= surfaces[activeStage][i][1][0] + 10){

            //if Y is within 10Mm of surface on either side
            if (t["t"+aT].mouseYMelee <= surfaces[activeStage][i][0][1] + 10 && t["t"+aT].mouseYMelee >= surfaces[activeStage][i][0][1] - 10){
              //if X is just outside of the plat X plane, snap to the edge (left)
              if (t["t"+aT].mouseXMelee >= surfaces[activeStage][i][0][0] - 10 && t["t"+aT].mouseXMelee < surfaces[activeStage][i][0][0]){
                t["t"+aT].mouseXMelee = surfaces[activeStage][i][0][0];
              }
              //(right)
              if (t["t"+aT].mouseXMelee <= surfaces[activeStage][i][1][0] + 10 && t["t"+aT].mouseXMelee > surfaces[activeStage][i][1][0]){
                t["t"+aT].mouseXMelee = surfaces[activeStage][i][1][0];

              }

              //moving the Y position up or down for slanted parts of the stages
              if (i == 0 && activeStage == "ys" && t["t"+aT].mouseXMelee > 39.2){
                var angle = Math.atan(3.5/16.8);
                var x = t["t"+aT].mouseXMelee - 39.2;
                t["t"+aT].mouseYMelee = -x * Math.tan(angle);
              }
              else if (i == 0 && activeStage == "ys" && t["t"+aT].mouseXMelee < -39.2){
                var angle = Math.atan(3.5/16.8);
                var x = -t["t"+aT].mouseXMelee - 39.2;
                t["t"+aT].mouseYMelee = -x * Math.tan(angle);
              }
              else if (i == 0 && activeStage == "fo" && t["t"+aT].mouseXMelee > 51.261 && t["t"+aT].mouseXMelee < 53.583){
                var angle = Math.atan(0.621/2.322);
                var x = t["t"+aT].mouseXMelee - 51.261;
                t["t"+aT].mouseYMelee = x * Math.tan(angle);
              }
              else if (i == 0 && activeStage == "fo" && t["t"+aT].mouseXMelee < -51.261 && t["t"+aT].mouseXMelee > -53.583){
                var angle = Math.atan(0.621/2.322);
                var x = -t["t"+aT].mouseXMelee - 51.261;
                t["t"+aT].mouseYMelee = x * Math.tan(angle);
              }
              else if (i == 0 && activeStage == "fo" && (t["t"+aT].mouseXMelee >= 53.583 || t["t"+aT].mouseXMelee <= -53.583)){
                t["t"+aT].mouseYMelee = 0.62388
              }
              else {
                t["t"+aT].mouseYMelee = surfaces[activeStage][i][0][1];
              }
              t["t"+aT].grounded = true;
            }
          }
        }
      }
      if (t["t"+aT].grounded){
        $("#groundedBox").show();
        $("#attemptCCDisable").hide();
      }
      else {
        $("#groundedBox").hide();
        $("#attemptCCDisable").show();
      }
      drawTrajectory(true);
    }
  });
}

function trajectoryClick(){
  $("#trajectory-t").unbind("click");
  $("#trajectory-t").click(function(){
    //if ($(".labelOptions").css("display") == "none"){
    $("#tutorial").fadeOut();
      if (t["t"+aT].trajFrozen == false){
        $("#trajBox"+aT+" .trajFreeze").removeClass("freezeOff").addClass("freezeOn");
        t["t"+aT].trajFrozen = true;
        t["t"+aT].mouseXMeleeF = t["t"+aT].mouseXMelee;
        t["t"+aT].mouseYMeleeF = t["t"+aT].mouseYMelee;
        trajPosInfo();
        $("#mousePosition").css("z-index",28);
      }
      else {
        $("#trajBox"+aT+" .trajFreeze").removeClass("freezeOn").addClass("freezeOff");
        t["t"+aT].trajFrozen = false;
        $(".framePosInfoBox").remove();
        $("#mousePosition").css("z-index",1);
      }
    //}
  });
}

function translateText(temp){
  var translated = "";
  for (v=0;v<temp.length;v++){
    if (temp[v] == "_"){
      translated += " ";
    }
    else if (temp[v] == "%"){
      translated += String.fromCharCode(parseInt(temp[v+1]+temp[v+2], 16));
      v+=2;
    }
    else {
      translated += temp[v];
    }
  }
  return translated;
}

function makeTextCompatible(i){
  var temp1 = $("#textarea"+i).val();
  var temp2 = "";
  for (v=0;v<temp1.length;v++){
    switch(temp1[v]){
      case " ":
        temp2 += "_";
        break;

      /*case "#":
      case "%":
      case "{":
      case "}":
      case "|":
      case "^":
      case "~":
      case "[":
      case "]":
      case "`":
      case "'":
      case ";":
      case "/":
      case ":":
      case "=":
      case "&":
      case "+":
      case '"':
        temp2 += "%";
        temp2 += temp1[v].charCodeAt(0).toString(16);
        break;*/
      default:
        if ((temp1[v].charCodeAt(0) >= 65 && temp1[v].charCodeAt(0) <= 90) || (temp1[v].charCodeAt(0) >= 97 && temp1[v].charCodeAt(0) <= 122) || (temp1[v].charCodeAt(0) >= 48 && temp1[v].charCodeAt(0) <= 57)){
          temp2 += temp1[v];
        }
        else {
          temp2 += "%";
          temp2 += temp1[v].charCodeAt(0).toString(16);
        }
        break;
    }
  }

  return temp2;
}

function labelBoxResize(id){
  $("#labelBox"+id).resizable();
}

function labelBoxDrag(id){
  $("#labelBox"+id).draggable({cancel: "text",containment: "parent",start:function(){
    $("#labelBox"+id).unbind("click");
    $(".labelControl").unbind("mouseenter").unbind("mouseleave");
    $("#labelOptions"+id+" .labelOpacityChange .labelControl").unbind("click");
    $("#labelOptions"+id+" .labelFontChange .labelControl").unbind("click");
    $("#labelOptions"+id).hide();
    $("#textarea"+id).focus();
  },stop:function(){
    $("#textarea"+id).focus();
    var posx = $("#labelBox"+id).css("left");
    var posy = $("#labelBox"+id).css("top");
    posx = parseInt(posx.substr(0,posx.length - 2));
    posy = parseInt(posy.substr(0,posy.length - 2));
    if (id == 0){
      titleX = posx/disMagnification;
      titleY = posy/disMagnification;
    }
    else{
      t["t"+id].labelX = posx/disMagnification;
      t["t"+id].labelY = posy/disMagnification;
    }
    labelBoxClick(id);
  }});
}

function trajLabelHover(){
  $(".trajLabel").unbind("mouseenter").unbind("mouseleave");
  $(".trajLabel").hover(function(){
    $(this).toggleClass("trajLabelHighlight");
  });
}

function trajLabelClick(){
  $(".trajLabel").unbind("click");
  $(".trajLabel").click(function(){
    var id = $(this).attr("id").substr(9,10);
    if ($(this).hasClass("removeLabel")){
      $(this).removeClass("removeLabel").children("p").empty().append("Add Label");
      $("#labelBox"+id+", #labelOptions"+id).remove();
      t["t"+id].hasLabel = false;
    }
    else {
      $(this).addClass("removeLabel").children("p").empty().append("Remove Label");
      $("#display").append('<div id="labelBox'+id+'" class="labelBox"><textarea id="textarea'+id+'" class="textarea" name="label'+id+'" cols="30" rows="3"></textarea></div><div id="labelOptions'+id+'" class="labelOptions"><div id="labelFontSize'+id+'" class="labelFontSize"><div class="labelFontIcon"></div><div class="labelFontChange"><div class="labelFontUp labelControl"><p>+</p></div><div class="labelFontDown labelControl"><p>-</p></div></div></div><div id="labelOpacity'+id+'" class="labelOpacity"><div class="labelOpacityIcon"></div><div class="labelOpacityChange"><div class="labelOpacityUp labelControl"><p>+</p></div><div class="labelOpacityDown labelControl"><p>-</p></div></div></div></div>');
      t["t"+id].hasLabel = true;
      $("#labelBox"+id).css("border-color",palettes[t["t"+id].palette][0]);

      labelBoxClick(id);
      labelBoxDrag(id);
      labelBoxResize(id);
    }
  });
}

function labelColorClick(id){
  /*$("#labelOptions"+id+" .labelColor").unbind("click");
  $("#labelOptions"+id+" .labelColor").click(function(){
    //$("#labelBox"+id).css({"background-color":"white","border":"3px solid "+t["t"+id].color});
    $("#labelBox"+id).css("border-color",t["t"+id].colour);
  });*/
}

function labelOpacityClick(id){
  $("#labelOptions"+id+" .labelOpacityChange .labelControl").unbind("click");
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
}

function labelFontClick(id){
  $("#labelOptions"+id+" .labelFontChange .labelControl").unbind("click");
  $("#labelOptions"+id+" .labelFontChange .labelControl").click(function(){
    var temp = $("#textarea"+id).css("font-size");
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
    $("#textarea"+id).css("font-size",temp+"px");
  });
}

function labelControlHover(id){
  $("#labelOptions"+id+" .labelControl").unbind("mouseenter").unbind("mouseleave");
  $("#labelOptions"+id+" .labelControl").hover(function(){
    $(this).toggleClass("labelControlHighlight");
  });
}

function labelBoxClick(id){
  $("#labelBox"+id).unbind("click");
  $("#labelBox"+id).click(function(){
    var x = $("#labelBox"+id).css("width");
    x = parseInt(x.substr(0,x.length - 2));
    var a = $("#labelBox"+id).css("left");
    a = parseInt(a.substr(0,a.length - 2));
    /*var y = $("#labelBox"+id).css("height");
    y = parseInt(y.substr(0,y.length - 2));*/
    var b = $("#labelBox"+id).css("top");
    b = parseInt(b.substr(0,b.length - 2));
    $(".labelOptions").hide();
    $("#labelOptions"+id).show().css({"top":b+10,"left":x+a+16});
    labelControlHover(id);
    labelFontClick(id);
    labelOpacityClick(id);
    labelColorClick(id);
    //$("#labelOptions"+id).hide();
  });
}

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

    if (!diSwitch[type]){
      y = -Math.sin(diAngle * (Math.PI / 180));
      x = Math.cos(diAngle * (Math.PI / 180));
    }
    else {
      y = -y;
    }

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
        "-webkit-transform":"rotate("+(diAngle * -1)+"deg)",
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
    $("#tutorial").remove();
    storedTrajs = 0;
    $("#trajBox1").remove();
    $("#trajGroup1").remove();
    activeStage = GetQueryStringParams("stage");
    $(".stageselect").removeClass("stageselected");
    $("#"+activeStage+"stageselect").addClass("stageselected");
    changeStage(activeStage);

    if (GetQueryStringParams("tt")){
      titleX = GetQueryStringParams("tx");
      titleY = GetQueryStringParams("ty");
      $("#trajTitle").addClass("activeTitle").children("p").empty().append("Remove Title");
      $("#display").append('<div id="labelBox0" class="labelBox"><textarea id="textarea0" class="textarea" name="label0" cols="30" rows="3"></textarea></div><div id="labelOptions0" class="labelOptions"><div id="labelFontSize0" class="labelFontSize"><div class="labelFontIcon"></div><div class="labelFontChange"><div class="labelFontUp labelControl"><p>+</p></div><div class="labelFontDown labelControl"><p>-</p></div></div></div><div id="labelOpacity0" class="labelOpacity"><div class="labelOpacityIcon"></div><div class="labelOpacityChange"><div class="labelOpacityUp labelControl"><p>+</p></div><div class="labelOpacityDown labelControl"><p>-</p></div></div></div><div class="labelHitbox labelControl"><p>Add hitbox text</p></div></div>');

      $("#textarea0").val(translateText(GetQueryStringParams("tt"))).css("font-size",GetQueryStringParams("tf")+"px");
      $("#labelBox0").css({"opacity":GetQueryStringParams("to"),"width":GetQueryStringParams("tw"),"height":GetQueryStringParams("th"),"top":titleY*disMagnification,"left":titleX*disMagnification});
      labelBoxClick(0);
      labelBoxDrag(0);
      labelBoxResize(0);
    }
    for (p=1;p<10;p++){
      var exists = GetQueryStringParams(p+"a");
      if (exists){
        currentTrajs[p-1] = true;
        t["t"+p].trajFrozen = true;
        for (j=0;j<25;j++){
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
              diSwitch["t"] = parseInt(temp[0]);
              diSwitch["s"] = parseInt(temp[1]);
              diSwitch["a"] = parseInt(temp[2]);
              if (diSwitch["t"]){
                $("#tdiSwitch").children("p").empty().append("Precise");
              }
              if (diSwitch["s"]){
                $("#sdiSwitch").children("p").empty().append("Precise");
              }
              if (diSwitch["a"]){
                $("#adiSwitch").children("p").empty().append("Precise");
              }
              break;
            case "d":
              t["t"+p].tdiMouseXReal = parseFloat(temp);
              break;
            case "e":
              t["t"+p].tdiMouseYReal = parseFloat(temp);
              var xy = convertPixelsToStick(t["t"+p].tdiMouseXReal,t["t"+p].tdiMouseYReal);
              t["t"+p].tdiMouseXMelee = xy[0];
              t["t"+p].tdiMouseYMelee = xy[1];
              break;
            case "f":
              t["t"+p].cHName = temp.split(',');
              if (t["t"+p].cHName[2] == "false"){
                t["t"+p].cHName[2] = false;
                t["t"+p].curHitbox = chars[t["t"+p].cHName[0]][t["t"+p].cHName[1]][t["t"+p].cHName[3]];
              }
              else {
                t["t"+p].curHitbox = chars[t["t"+p].cHName[0]][t["t"+p].cHName[1]][t["t"+p].cHName[2]][t["t"+p].cHName[3]];
              }
              break;
            case "g":
              t["t"+p].character = temp;
              break;
            case "h":
              t["t"+p].percent = parseInt(temp);
              break;
            case "i":
              if (Boolean(parseInt(temp[0]))){
                t["t"+p].version = "PAL";
              }
              else {
                t["t"+p].version = "NTSC";
              }
              t["t"+p].crouch = Boolean(parseInt(temp[1]));
              t["t"+p].reverse = Boolean(parseInt(temp[2]));
              t["t"+p].chargeInterrupt = Boolean(parseInt(temp[3]));
              t["t"+p].meteorCancel = Boolean(parseInt(temp[4]));
              t["t"+p].fadeIn = Boolean(parseInt(temp[5]));
              t["t"+p].doubleJump = Boolean(parseInt(temp[6]));
              t["t"+p].vcancel = Boolean(parseInt(temp[7]));
              t["t"+p].useFractionals = Boolean(parseInt(temp[8]));
              t["t"+p].grounded = Boolean(parseInt(temp[9]));
              break;
            case "j":
              t["t"+p].chargeF = parseInt(temp);
              break;
            case "k":
              for(k=0;k<9;k++){
                t["t"+p].staleQueue[k] = Boolean(parseInt(temp[k]));
              }
              break;
            case "l":
              t["t"+p].palette = parseInt(temp);
              break;
            case "m":
              if (temp == 1){
                var id = p;
                t["t"+p].hasLabel = true;
                $("#display").append('<div id="labelBox'+p+'" class="labelBox"><textarea id="textarea'+p+'" class="textarea" name="label'+p+'" cols="30" rows="3"></textarea></div><div id="labelOptions'+p+'" class="labelOptions"><div id="labelFontSize'+p+'" class="labelFontSize"><div class="labelFontIcon"></div><div class="labelFontChange"><div class="labelFontUp labelControl"><p>+</p></div><div class="labelFontDown labelControl"><p>-</p></div></div></div><div id="labelOpacity'+p+'" class="labelOpacity"><div class="labelOpacityIcon"></div><div class="labelOpacityChange"><div class="labelOpacityUp labelControl"><p>+</p></div><div class="labelOpacityDown labelControl"><p>-</p></div></div></div><div class="labelHitbox labelControl"><p>Add hitbox text</p></div></div>');
                $("#labelBox"+p).css("border-color",palettes[t["t"+p].palette][0]);
              }
              else {
                t["t"+p].hasLabel = false;
              }
              break;
            case "n":
              //label text
              if (t["t"+p].hasLabel){
                $("#textarea"+p).val(translateText(temp));
              }
              break;
            case "o":
              if (t["t"+p].hasLabel){
                $("#labelBox"+p).css("opacity",temp);
              }
              //label opacity
              break;
            case "p":
              if (t["t"+p].hasLabel){
                $("#textarea"+p).css("font-size",temp+"px");
              }
              //label font size
              break;
            case "q":
              if (t["t"+p].hasLabel){
                $("#labelBox"+p).width(temp);
              }
              //label width
              break;
            case "r":
              if (t["t"+p].hasLabel){
                $("#labelBox"+p).height(temp);
              }
              //label height
              break;
            case "s":
              if (t["t"+p].hasLabel){
                t["t"+p].labelX = temp;
                $("#labelBox"+p).css("left",temp*disMagnification);
              }
              // label x
              break;
            case "t":
              if (t["t"+p].hasLabel){
                t["t"+p].labelY = temp;
                $("#labelBox"+p).css("top",temp*disMagnification);
              }
              // label y
              break;
            case "u":
              t["t"+p].sdiMouseXReal = parseFloat(temp);
              break;
            case "v":
              t["t"+p].sdiMouseYReal = parseFloat(temp);
              var xy = convertPixelsToStick(t["t"+p].sdiMouseXReal,t["t"+p].sdiMouseYReal);
              t["t"+p].sdiMouseXMelee = xy[0];
              t["t"+p].sdiMouseYMelee = xy[1];
              break;
            case "w":
              t["t"+p].adiMouseXReal = parseFloat(temp);
              break;
            case "x":
              t["t"+p].adiMouseYReal = parseFloat(temp);
              var xy = convertPixelsToStick(t["t"+p].adiMouseXReal,t["t"+p].adiMouseYReal);
              t["t"+p].adiMouseXMelee = xy[0];
              t["t"+p].adiMouseYMelee = xy[1];
              break;
            case "y":
              t["t"+p].fractional = temp;
              if (t["t"+p].useFractionals){
                t["t"+p].percent = parseFloat(t["t"+p].percent+"."+t["t"+p].fractional);
              }
              break;
            default:
              break;
          }
        }

        aT = p;
        changeHitboxVersions(t["t"+aT].version);
        if (t["t"+aT].cHName[2]){
          t["t"+aT].curHitbox = chars[t["t"+aT].cHName[0]][t["t"+aT].cHName[1]][t["t"+aT].cHName[2]][t["t"+aT].cHName[3]];
        }
        else {
                t["t"+aT].curHitbox = chars[t["t"+aT].cHName[0]][t["t"+aT].cHName[1]][t["t"+aT].cHName[3]];
        }
        drawTrajectory();
        $("#trajAdd").before('<div id="trajBox'+p+'" class="trajBox"><div id="trajNum'+p+'" class="trajNum"><div class="trajFreeze freezeOn"></div><p>'+p+'</p></div><div id="trajColour'+p+'" class="trajColour"><div id="t'+p+'minicolour1" class="tminicolour" style="background-color:'+palettes[t["t"+p].palette][0]+'"></div><div id="t'+p+'minicolour2" class="tminicolour" style="background-color:'+palettes[t["t"+p].palette][1]+'"></div><div id="t'+p+'minicolour3" class="tminicolour" style="background-color:'+palettes[t["t"+p].palette][2]+'"></div></div><div id="trajLabel'+p+'" class="trajLabel"><p>Add label</p></div><div id="trajDelete'+p+'" class="trajDelete"><p>x</p></div></div>');
        if (t["t"+p].hasLabel){
          var id = p;
          $("#trajLabel"+p).addClass("removeLabel").children("p").empty().append("Remove Label");
          labelBoxClick(id);
          labelBoxDrag(id);
          labelBoxResize(id);
        }
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
    trajLabelHover();
    trajLabelClick();
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
  qstring += "version=100&stage="+activeStage+"&";
  if ($("#trajTitle").hasClass("activeTitle")){
    var tt = makeTextCompatible(0);
    var to = $("#labelBox0").css("opacity");
    var tf = $("#textarea0").css("font-size");
    tf = tf.substr(0,tf.length-2);
    var tw = $("#labelBox0").width();
    var th = $("#labelBox0").height();
    qstring += "tt="+tt+"&to="+to+"&tf="+tf+"&tw="+tw+"&th="+th+"&tx="+Math.round(titleX)+"&ty="+Math.round(titleY)+"&";
  }
  for (i=1;i<10;i++){
    if (currentTrajs[i-1]){
      for (j=0;j<25;j++){
        var temp = "";
        switch (j){
          case 0:
            temp = t["t"+i].mouseXMeleeF;
            break;
          case 1:
            temp = t["t"+i].mouseYMeleeF;
            break;
          case 2:
            temp = "";
            temp += diSwitch["t"];
            temp += diSwitch["s"];
            temp += diSwitch["a"];
            break;
          case 3:
            temp = t["t"+i].tdiMouseXReal;
            break;
          case 4:
            temp = t["t"+i].tdiMouseYReal;
            break;
          case 5:
            temp = t["t"+i].cHName;
            break;
          case 6:
            temp = t["t"+i].character;
            break;
          case 7:
            temp = Math.floor(t["t"+i].percent);
            break;
          case 8:
            var temp1 = t["t"+i].version;
            if (temp1 == "NTSC"){
              temp1 = "0";
            }
            else {
              temp1 = "1";
            }
            var temp2 = ~~t["t"+i].crouch;
            var temp3 = ~~t["t"+i].reverse;
            var temp4 = ~~t["t"+i].chargeInterrupt;
            var temp5 = ~~t["t"+i].meteorCancel;
            var temp6 = ~~t["t"+i].fadeIn;
            var temp7 = ~~t["t"+i].doubleJump;
            var temp8 = ~~t["t"+i].vcancel;
            var temp9 = ~~t["t"+i].useFractionals;
            var temp10 = ~~t["t"+i].grounded;
            temp = temp1+temp2+temp3+temp4+temp5+temp6+temp7+temp8+temp9+temp10;
            break;
          case 9:
            temp = t["t"+i].chargeF;
            break;
          case 10:
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
          case 11:
            temp = t["t"+i].palette;
            break;
          case 12:
            if (t["t"+i].hasLabel){
              temp = "1";
            }
            else {
              temp = "0";
            }
            break;
          case 13:
            if (t["t"+i].hasLabel){
              temp = makeTextCompatible(i);
            }
            else {
              temp = "0";
            }
            break;
          case 14:
            if (t["t"+i].hasLabel){
              temp = $("#labelBox"+i).css("opacity");
            }
            else {
              temp = "0";
            }
            break;
          case 15:
            if (t["t"+i].hasLabel){
              temp = $("#textarea"+i).css("font-size");
              temp = temp.substr(0,temp.length - 2);
            }
            else {
              temp = "0";
            }
            break;
          case 16:
            if (t["t"+i].hasLabel){
              temp = $("#labelBox"+i).width();
            }
            else {
              temp = "0";
            }
            break;
          case 17:
            if (t["t"+i].hasLabel){
              temp = $("#labelBox"+i).height();
            }
            else {
              temp = "0";
            }
            break;
          case 18:
            if (t["t"+i].hasLabel){
              temp = Math.round(t["t"+i].labelX);
            }
            else {
              temp = "0";
            }
            break;
          case 19:
            if (t["t"+i].hasLabel){
              temp = Math.round(t["t"+i].labelY);
            }
            else {
              temp = "0";
            }
            break;
          case 20:
            temp = t["t"+i].sdiMouseXReal;
            break;
          case 21:
            temp = t["t"+i].sdiMouseYReal;
            break;
          case 22:
            temp = t["t"+i].adiMouseXReal;
            break;
          case 23:
            temp = t["t"+i].adiMouseYReal;
            break;
          case 24:
            temp = t["t"+i].fractional;
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
    "-webkit-transform":"rotate("+(ang * -1)+"deg)",
    "-moz-transform":"rotate("+(ang * -1)+"deg)",
    "-ms-transform":"rotate("+(ang * -1)+"deg)",
    "-o-transform":"rotate("+(ang * -1)+"deg)",
    "transform":"rotate("+(ang * -1)+"deg)"
  });

  $("#tdiPAngle").css({
    "-webkit-transform":"rotate("+(ang * -1)+"deg)",
    "-moz-transform":"rotate("+(ang * -1)+"deg)",
    "-ms-transform":"rotate("+(ang * -1)+"deg)",
    "-o-transform":"rotate("+(ang * -1)+"deg)",
    "transform":"rotate("+(ang * -1)+"deg)"
  });
  //tdiSelector();
  changeUserStick(t["t"+aT].tdiMouseXMelee, t["t"+aT].tdiMouseYMelee, "t");
}

function convertCharName(name){
  var newname;
  switch (name){
    case "Fx":
      newname = "Fox";
      break;
    case "Fc":
      newname = "Falco";
      break;
    case "Ms":
      newname = "Marth";
      break;
    case "Sh":
      newname = "Sheik";
      break;
    case "Jp":
      newname = "Puff";
      break;
    case "Pc":
      newname = "Peach";
      break;
    case "Po":
      newname = "ICs";
      break;
    case "CF":
      newname = "Falcon";
      break;
    case "Pk":
      newname = "Pika";
      break;
    case "Sm":
      newname = "Samus";
      break;
    case "DM":
      newname = "Doc";
      break;
    case "Ys":
      newname = "Yoshi";
      break;
    case "Lg":
      newname = "Luigi";
      break;
    case "Gn":
      newname = "Ganon";
      break;
    case "Ma":
      newname = "Mario";
      break;
    case "YL":
      newname = "Y.Link";
      break;
    case "DK":
      newname = "DK";
      break;
    case "Lk":
      newname = "Link";
      break;
    case "GW":
      newname = "MrG&W";
      break;
    case "Ry":
      newname = "Roy";
      break;
    case "Mw":
      newname = "Mewtwo";
      break;
    case "Zd":
      newname = "Zelda";
      break;
    case "Ns":
      newname = "Ness";
      break;
    case "Pi":
      newname = "Pichu";
      break;
    case "Bw":
      newname = "Bowser";
      break;
    case "Kb":
      newname = "Kirby";
      break;
    default:
      newname = "NoName";
      break;
  }
  return newname;
}


function trajBoxHover(){
  $(".trajBox").unbind("mouseenter").unbind("mouseleave");
  $(".trajBox").hover(function(){
    $(this).addClass("trajBoxHighlight");
    var id = $(this).attr("id");
    id = id[7];
    var left = $(this).offset().left;
    var top = $(this).offset().top;
    var attackText = "";
    var victimText = "";
    for(i=0;i<4;i++){
      if (t["t"+id].cHName[i]){
        if (i == 0){
          attackText += convertCharName(t["t"+id].cHName[i]);
        }
        else {
          attackText += t["t"+id].cHName[i];
        }
        if (i != 3){
          attackText += " ";
        }
      }
    }
    victimText += t["t"+id].character+" "+t["t"+id].percent;
    $("body").append('<div id="trajBoxInfo'+id+'" class="trajBoxInfo"><div class="attackSection"><p class="sectionTitle">Attack</p><p>'+attackText+'</p></div><div class="trajBoxInfoDivider"></div><div class="victimSection"><p class="sectionTitle">Victim</p><p>'+victimText+'%</p></div></div>');
    $("#trajBoxInfo"+id).css({"top":(top-115)+"px","left":left+"px"});

  },
  function(){
    var id = $(this).attr("id");
    id = id[7];
    $(this).removeClass("trajBoxHighlight");
    $("#trajBoxInfo"+id).remove();
  });
}

function characterClick(){
  $(".character").click(function(){

    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(".idstats").unbind("click").remove();
    $(".expandcharacter").removeClass("expandtrue").addClass("expandfalse");

    id = $(this).attr("id");
    //prompt(t["t1"].cHName);
    //prompt(aT);

    if ($("."+id).length > 0){
      $("."+id).remove();
      $(this).children(".expandcharacter").removeClass("expandtrue").addClass("expandfalse");
    }
    else {
      $(".attack").unbind("click").remove();
      $(this).children(".expandcharacter").removeClass("expandfalse").addClass("expandtrue");

      //t["t"+aT].cHName[0] = id;
      //prompt(t["t1"].cHName);
      var keys = Object.keys(chars[id]);
      for (i=0;i<keys.length;i++){
        $(this).after('<div id="'+keys[i]+'" class="attack '+id+'"><div class="expandattack expandfalse"></div><p>'+keys[i]+'</p></div>');
      }
      $(".attack").hover(function(){
        $(this).toggleClass("attackhighlight");
      });
      attackClick();
    }
  });
}

function attackClick(){
  $(".attack").click(function(){
    $(".idstats").unbind("click").remove();
    $(".expandattack").removeClass("expandtrue").addClass("expandfalse");
    id2 = $(this).attr("id");
    if ($("."+id2).length > 0){
      $("."+id2).remove();
      $(this).children(".expandattack").removeClass("expandtrue").addClass("expandfalse");
    }
    else {
    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(this).children(".expandattack").removeClass("expandfalse").addClass("expandtrue");


    //t["t"+aT].cHName[1] = id2;
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
        $(this).after('<div id="'+keys2[k]+'" class="subattack '+id2+' '+id+'"><div class="expandsubattack expandfalse"></div><p>'+keys2[k]+'</p></div>');
        if (keys2[k].length > 10){
          if (keys2[k].length > 15){
            $("#"+keys2[k]).children("p").css("font-size","9px");
          }
          else {
            $("#"+keys2[k]).children("p").css("font-size","12px");
          }
        }
      }
      $(".subattack").hover(function(){
        $(this).toggleClass("subattackhighlight");
      });
      subattackClick();
    }
  }
    //prompt(t["t1"].cHName);
  });
}

function subattackClick(){
  $(".subattack").click(function(){
    $(".expandsubattack").removeClass("expandtrue").addClass("expandfalse");
    $(".idstats").unbind("click").remove();
    id3 = $(this).attr("id");
    if ($("."+id3).length > 0){
      $("."+id3).remove();
      $(this).children(".expandsubattack").removeClass("expandtrue").addClass("expandfalse");
    }
    else {
      $(".id").unbind("click").remove();
      $(this).children(".expandsubattack").removeClass("expandfalse").addClass("expandtrue");

      //t["t"+aT].cHName[2] = id3;
      var keys3 = Object.keys(chars[id][id2][id3]);
      for (l=0;l<keys3.length;l++){
        $(this).after('<div id="'+keys3[l]+'" class="id '+id3+' '+id2+' '+id+'"><p>'+keys3[l]+'</p></div>');
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick();
    }
  });
}

function idClick(){
  $(".id").click(function(){
    $(".id").removeClass("idcurrent");
    id4 = $(this).attr("id");
    if ($("#"+id4+"stats").length > 0){
      $("#"+id4+"stats").remove();
    }
    else {
      $(this).addClass("idcurrent");
      $(".idstats").remove();
      t["t"+aT].cHName[0] = id;
      t["t"+aT].cHName[1] = id2;
      t["t"+aT].cHName[2] = id3;
      t["t"+aT].cHName[3] = id4;
      var hb = chars[id][id2][id3][id4];
      $(this).after('<div id="'+id4+'stats" class="idstats"><div id="miniAngle"></div><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<span id="angleText" style="font-size:8px"></span><br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: <span class="effect-'+hb.effect+'">'+hb.effect+'</span></p></div>');
      if (hb.angle == 361){
        $("#angleText").append(" (Sakurai)");
        $("#miniAngle").css({"background-image":"url(assets/trajectory/sakurai.png)",
        "left":"120px"});
      }
      else {
        $("#miniAngle").css({
            "-webkit-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-moz-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-ms-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-o-transform":"rotate("+(hb.angle * -1)+"deg)",
            "transform":"rotate("+(hb.angle * -1)+"deg)"
        });
      }
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
    }
  });
}

function idClick2(){
  $(".id").click(function(){
    $(".id").removeClass("idcurrent");
    id4 = $(this).attr("id");
    if ($("#"+id4+"stats").length > 0){
      $("#"+id4+"stats").remove();
    }
    else {
      $(this).addClass("idcurrent");
      $(".idstats").remove();

      t["t"+aT].cHName[0] = id;
      t["t"+aT].cHName[1] = id2;
      t["t"+aT].cHName[2] = false;
      t["t"+aT].cHName[3] = id4;
      var hb = chars[id][id2][id4];
      $(this).after('<div id="'+id4+'stats" class="idstats"><div id="miniAngle"></div><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<span id="angleText" style="font-size:8px"></span><br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: <span class="effect-'+hb.effect+'">'+hb.effect+'</span></p></div>');
      if (hb.angle == 361){
        $("#angleText").append(" (Sakurai)");
        $("#miniAngle").css({"background-image":"url(assets/trajectory/sakurai.png)",
        "left":"120px"});
      }
      else {
        $("#miniAngle").css({
            "-webkit-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-moz-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-ms-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-o-transform":"rotate("+(hb.angle * -1)+"deg)",
            "transform":"rotate("+(hb.angle * -1)+"deg)"
        });
      }
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
    }
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
    if (pT != aT){
      t["t"+pT].trajFrozen = true;
      $("#trajNum"+pT+" .trajFreeze").removeClass("freezeOff").addClass("freezeOn");
    }
  });
}

function swapOptions(){
    if (t["t"+aT].grounded){
      $("#groundedBox").show();
      $("#attemptCCDisable").hide();
    }
    else {
      $("#groundedBox").hide();
      $("#attemptCCDisable").show();
    }
    $(".verButton").removeClass("verButtonOn");
    if (t["t"+aT].version == "PAL"){
      $("#PALButton").addClass("verButtonOn");
    }
    else {
      $("#NTSCButton").addClass("verButtonOn");
    }

    changeHitboxVersions(t["t"+aT].version);
    if (t["t"+aT].cHName[2]){
      t["t"+aT].curHitbox = chars[t["t"+aT].cHName[0]][t["t"+aT].cHName[1]][t["t"+aT].cHName[2]][t["t"+aT].cHName[3]];
    }
    else {
            t["t"+aT].curHitbox = chars[t["t"+aT].cHName[0]][t["t"+aT].cHName[1]][t["t"+aT].cHName[3]];
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

    $("#percentNumberEdit").val(Math.floor(t["t"+aT].percent));
    $("#percentPreciseWhole").empty().append(Math.floor(t["t"+aT].percent));
    $("#percentPreciseEdit").val(t["t"+aT].fractional);
    if (t["t"+aT].useFractionals){
      $("#percentPrecise").show();
      $("#percentPreciseIcon").removeClass("percentPreciseIconExpand").addClass("percentPreciseIconCollapse");
      $(this).children("p").empty().append("Close Fractionals");
    }
    else {
      $("#percentPrecise").hide();
      $("#percentPreciseIcon").removeClass("percentPreciseIconCollapse").addClass("percentPreciseIconExpand");
      $(this).children("p").empty().append("Open Fractionals");
    }
    diOffset = $("#"+activeDI+"diSelector").offset();

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
    if (t["t"+aT].vcancel){
      $("#vcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#vcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }

    if (t["t"+aT].meteorCancel){
      $("#mcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#mcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }
    if (t["t"+aT].fadeIn){
      $("#fiSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#fiSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }
    if (t["t"+aT].doubleJump){
      $("#djSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#djSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }

    $(".attack").unbind("click").remove();
    $(".subattack").unbind("click").remove();
    $(".id").unbind("click").remove();
    $(".idstats").remove();
    $(".expandcharacter").removeClass("expandtrue").addClass("expandfalse");
    id = t["t"+aT].cHName[0];
    var keys = Object.keys(chars[id]);
    for (i=0;i<keys.length;i++){
      $("#"+id).after('<div id="'+keys[i]+'" class="attack '+id+'"><div class="expandattack expandfalse"></div><p>'+keys[i]+'</p></div>').children(".expandcharacter").removeClass("expandfalse").addClass("expandtrue");
    }
    $(".attack").hover(function(){
      $(this).toggleClass("attackhighlight");
    });
    attackClick();
    id2 = t["t"+aT].cHName[1];
    var keys2 = Object.keys(chars[id][id2]);
    if (!t["t"+aT].cHName[2]){
      for (j=0;j<keys2.length;j++){
        $("#"+id2).after('<div id="'+keys2[j]+'" class="id '+id2+' '+id+'"><p>'+keys2[j]+'</p></div>').children(".expandattack").removeClass("expandfalse").addClass("expandtrue");
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick2();
      id4 = t["t"+aT].cHName[3];
      $("#"+id4).addClass("idcurrent");
      hb = t["t"+aT].curHitbox;
      $("#"+id4).after('<div id="'+id4+'stats" class="idstats"><div id="miniAngle"></div><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<span id="angleText" style="font-size:8px"></span><br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: <span class="effect-'+hb.effect+'">'+hb.effect+'</span></p></div>');
      if (hb.angle == 361){
        $("#angleText").append(" (Sakurai)");
        $("#miniAngle").css({"background-image":"url(assets/trajectory/sakurai.png)",
        "left":"120px"});
      }
      else {
        $("#miniAngle").css({
            "-webkit-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-moz-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-ms-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-o-transform":"rotate("+(hb.angle * -1)+"deg)",
            "transform":"rotate("+(hb.angle * -1)+"deg)"
        });
      }
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
        $("#"+id2).after('<div id="'+keys2[k]+'" class="subattack '+id2+' '+id+'"><div class="expandsubattack expandfalse"></div><p>'+keys2[k]+'</p></div>').children(".expandattack").removeClass("expandfalse").addClass("expandtrue");
        if (keys2[k].length > 10){
          if (keys2[k].length > 15){
            $("#"+keys2[k]).children("p").css("font-size","9px");
          }
          else {
            $("#"+keys2[k]).children("p").css("font-size","12px");
          }
        }
      }
      $(".subattack").hover(function(){
        $(this).toggleClass("subattackhighlight");
      });
      subattackClick();
      id3 = t["t"+aT].cHName[2];
      var keys3 = Object.keys(chars[id][id2][id3]);
      for (l=0;l<keys3.length;l++){
        $("#"+id3).after('<div id="'+keys3[l]+'" class="id '+id3+' '+id2+' '+id+'"><p>'+keys3[l]+'</p></div>').children(".expandsubattack").removeClass("expandfalse").addClass("expandtrue");
      }
      $(".id").hover(function(){
        $(this).toggleClass("idhighlight");
      });
      idClick();
      id4 = t["t"+aT].cHName[3];
      $("#"+id4).addClass("idcurrent");
      hb = t["t"+aT].curHitbox;
      $("#"+id4).after('<div id="'+id4+'stats" class="idstats"><div id="miniAngle"></div><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<span id="angleText" style="font-size:8px"></span><br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: <span class="effect-'+hb.effect+'">'+hb.effect+'</span></p></div>');
      if (hb.angle == 361){
        $("#angleText").append(" (Sakurai)");
        $("#miniAngle").css({"background-image":"url(assets/trajectory/sakurai.png)",
        "left":"120px"});
      }
      else {
        $("#miniAngle").css({
            "-webkit-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-moz-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-ms-transform":"rotate("+(hb.angle * -1)+"deg)",
            "-o-transform":"rotate("+(hb.angle * -1)+"deg)",
            "transform":"rotate("+(hb.angle * -1)+"deg)"
        });
      }
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
  $(".tminicolour").unbind("click");
  $(".tminicolour").click(function(){
    var id = $(this).attr("id")[1];
    if (!$("#csb"+id).length){
      $(".colourselectbox").remove();
      var left = $("#trajColour"+id).offset().left;
      var top = $("#trajColour"+id).offset().top;
      $("body").append('<div id="csb'+id+'" class="colourselectbox"><div id="colourselect1" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#fe3a3a"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#fe7f7f"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#bb2828"></div><div id="colourselectReal1" class="colourselectReal"></div></div><div id="colourselect2" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#fa5d36"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#ffaa7a"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#d04703"></div><div id="colourselectReal2" class="colourselectReal"></div></div><div id="colourselect3" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#fff508"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#fcfc8d"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#b9b91c"></div><div id="colourselectReal3" class="colourselectReal"></div></div><div id="colourselect4" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#08fb08"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#89fe89"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#299f29"></div><div id="colourselectReal4" class="colourselectReal"></div></div><div id="colourselect5" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#00bdf9"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#77ffff"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#009999"></div><div id="colourselectReal5" class="colourselectReal"></div></div><div id="colourselect6" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#4040ff"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#8787fc"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#2d2da2"></div><div id="colourselectReal6" class="colourselectReal"></div></div><div id="colourselect7" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#813ffc"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#ac82ff"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#5b2293"></div><div id="colourselectReal7" class="colourselectReal"></div></div><div id="colourselect8" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#fa36fa"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#fa7afa"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#990099"></div><div id="colourselectReal8" class="colourselectReal"></div></div><div id="colourselect9" class="colourselect"><div id="minicolourbox1" class="minicolourbox" style="background-color:#9e9e9e"></div><div id="minicolourbox2" class="minicolourbox" style="background-color:#FFFFFF"></div><div id="minicolourbox3" class="minicolourbox" style="background-color:#595959"></div><div id="colourselectReal9" class="colourselectReal"></div></div></div>');
      $("#csb"+id).css({"top":(top-180)+"px","left":(left-45)+"px"});
      colourChange(id);
    }
    else {
      $(".colourselectbox").remove();
    }
  });
}

function trajColourHover(){
  $(".trajColour").unbind("mouseenter").unbind("mouseleave");
  $(".tminicolour").unbind("mouseenter").unbind("mouseleave");
  $(".trajColour").hover(function(){
    $(this).addClass("trajBoxHighlight");
  },function(){
    $(this).removeClass("trajBoxHighlight");
  });
  $(".tminicolour").hover(function(){
    var id = $(this).attr("id")[1];
    var cid = $(this).attr("id")[12];
    var left = $(this).offset().left;
    var top = $(this).offset().top;
    var text;
    if (cid == 1){
      text = "Safe (in hitstun)";
    }
    else if (cid == 2){
      text = "Safe (out of hitstun)";
    }
    else if (cid == 3){
      text = "Killed";
    }
    $("body").append('<div class="minicolourinfo"><p>'+text+'</p></div>');
    $(".minicolourinfo").css({"top":top+"px","left":(left-125)+"px"});
  }, function(){
    $(".minicolourinfo").remove();
  });
}

var colourChange = function(id){
  $(".colourselectReal").unbind("click").unbind("mouseover").unbind("mouseleave");
  $(".colourselectReal").click(function(){
    var pid = $(this).attr("id");
    newp = parseInt(pid[16]);
    newp -= 1;
    $("#t"+id+"minicolour1").css("background-color",palettes[newp][0]);
    $("#t"+id+"minicolour2").css("background-color",palettes[newp][1]);
    $("#t"+id+"minicolour3").css("background-color",palettes[newp][2]);
    $("#start"+id).css({"fill":palettes[newp][0],"stroke":palettes[newp][0]});
    $(".fP"+id).css({"fill":palettes[newp][0],"stroke":palettes[newp][0]});
    $(".fPK"+id).css({"fill":palettes[newp][2],"stroke":palettes[newp][2]});
    $(".fPnH"+id).css({"fill":palettes[newp][1],"stroke":palettes[newp][1]});
    $(".tLineS"+id).css("stroke",palettes[newp][1]);
    $(".tLineK"+id).css("stroke",palettes[newp][1]);
    $("#kill"+id).css({"fill":palettes[newp][2],"stroke":palettes[newp][2]});
    t["t"+aT].palette = newp;
    savedPalettes[id-1] = newp;
    $("#labelBox"+id).css("border-color",palettes[newp][0]);
    drawTrajectory();
    $(".colourselectbox").remove();
  });
  $(".colourselectReal").hover(function(){
    $(this).toggleClass("colourselectRealHighlight");
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
    $("#trajBox"+id+", #trajGroup"+id+", #trajGroup-t"+id+", #labelBox"+id+", #labelOptions"+id+", #trajBoxInfo"+id).remove();
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
    damage *= 1 + (t["t"+aT].chargeF * (0.3671/60));
  }
  t["t"+aT].newDamage = damage;
  $("#newDamageEdit").empty().append(damage.toPrecision(5));
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

	var hit = new Hit(t["t"+aT].percent,damage,t["t"+aT].curHitbox.kg,t["t"+aT].curHitbox.bk,t["t"+aT].curHitbox.wbk,t["t"+aT].curHitbox.angle,t["t"+aT].character,t["t"+aT].version,xPos,yPos,t["t"+aT].crouch,t["t"+aT].reverse,t["t"+aT].chargeInterrupt,t["t"+aT].tdiMouseXMelee,t["t"+aT].tdiMouseYMelee,t["t"+aT].fadeIn,t["t"+aT].doubleJump,t["t"+aT].sdiMouseXMelee,t["t"+aT].sdiMouseYMelee,t["t"+aT].adiMouseXMelee,t["t"+aT].adiMouseYMelee,t["t"+aT].meteorCancel,t["t"+aT].vcancel,t["t"+aT].grounded);

	t["t"+aT].curPositions = hit.positions;
  t["t"+aT].hitstun = hit.hitstun;
  t["t"+aT].knockback = hit.knockback;
  if (hit.meteorCancelled){
    t["t"+aT].hitstun = 8;
  }
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
    $(SVG("path")).attr("id","start"+aT).attr("class","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",palettes[t["t"+aT].palette][1]).attr("stroke",palettes[t["t"+aT].palette][1]).prependTo("#trajGroup"+aT);
    $(SVG("path")).attr("id","start-t"+aT).attr("class","start-t").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajGroup-t"+aT);
  //}
  //$("#trajGroup"+aT+" .framePos").css("fill","#25d041");
  var isKilled = false;
  var i = 0;

  if (hit.stayGrounded && t["t"+aT].grounded){
    t["t"+aT].yDisplacement = hit.yDisplacement;
    if (hit.knockback >= 80){
      //amsah tech

      $(SVG("text")).attr("id","at"+aT).attr("class","at").attr("x",temX+32).attr("y",temY-24).attr("font-size","80px").attr("font-family","'Share Tech Mono', 'Ubuntu Mono', Consolas, 'Courier New'").attr("font-weight","bold").attr("fill","black").prependTo("#trajGroup"+aT);
      $("#at"+aT).append("AT");
      $(SVG("circle")).attr("id","atCircle"+aT).attr("class","atCircle").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill",palettes[t["t"+aT].palette][0]).attr("stroke",palettes[t["t"+aT].palette][0]).prependTo("#trajGroup"+aT);
      $(SVG("circle")).attr("id","atCircle-t"+aT).attr("class","atCircle-t").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill","transparent").prependTo("#trajGroup-t"+aT);
    }
    else {
      //crouch cancel
      $(SVG("text")).attr("id","cc"+aT).attr("class","cc").attr("x",temX+32).attr("y",temY-24).attr("font-size","80px").attr("font-family","'Share Tech Mono', 'Ubuntu Mono', Consolas, 'Courier New'").attr("font-weight","bold").attr("fill","black").prependTo("#trajGroup"+aT);
      $("#cc"+aT).append("CC");
      $(SVG("circle")).attr("id","ccCircle"+aT).attr("class","ccCircle").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill",palettes[t["t"+aT].palette][0]).attr("stroke",palettes[t["t"+aT].palette][0]).prependTo("#trajGroup"+aT);
      $(SVG("circle")).attr("id","ccCircle-t"+aT).attr("class","ccCircle-t").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill","transparent").prependTo("#trajGroup-t"+aT);
    }
  }

  while (!isKilled && i < hit.positions.length){
  	var x = hit.positions[i][0];
  	var y = hit.positions[i][1];
    var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
    lineText += tempText;
  	if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){

        $(SVG("circle")).attr("id",aT+"f"+(i+1)).attr("class","fP"+aT+" framePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).attr("fill",palettes[t["t"+aT].palette][0]).attr("stroke",palettes[t["t"+aT].palette][0]).prependTo("#trajGroup"+aT);
        $(SVG("circle")).attr("id",aT+"f"+(i+1)+"-t").attr("class","fP-t"+aT+" framePos-t").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajGroup-t"+aT);
        if (i+1 > t["t"+aT].hitstun){
          $("#"+aT+"f"+(i+1)).attr("class","fPnH"+aT+" framePos").attr("fill",palettes[t["t"+aT].palette][1]).attr("stroke",palettes[t["t"+aT].palette][1]);
        }
  	}
  	else {
      //checks if vertical knockback velocity is greater or equal to 2.4 when above the top blastzone
      if (x >= bzRight || x <= bzLeft || y <= bzBottom || (y >= bzTop && hit.positions[i][3] >= 2.4)){
        temX = ((x*10)+centreOffset[0]);
        temY = ((-y*10)+centreOffset[1]);
        $(SVG("path")).attr("id","kill"+aT).attr("class","kill").attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").attr("fill",palettes[t["t"+aT].palette][2]).attr("stroke",palettes[t["t"+aT].palette][2]).appendTo("#trajGroup"+aT);
        $(SVG("path")).attr("id","kill-t"+aT).attr("class","kill-t pos"+i).attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").appendTo("#trajGroup-t"+aT);
        cla = "tLineK";
        isKilled = true;
        if (i <= hit.hitstun){
          $("#trajGroup"+aT+" .framePos").attr("class","fPK"+aT+" framePos").attr("fill",palettes[t["t"+aT].palette][2]).attr("stroke",palettes[t["t"+aT].palette][2]);;
        }
      }
    }

    i++;
  }
  //$("#trajLine"+aT).remove();
  $(SVG("path")).attr("id","trajLine"+aT).attr("class","trajLine "+cla+aT).attr("d",lineText).prependTo("#trajGroup"+aT);
  if (cla == "tLineS"){
    $("#trajLine"+aT).attr("stroke",palettes[t["t"+aT].palette][1]);
  }
  else {
    $("#trajLine"+aT).attr("stroke",palettes[t["t"+aT].palette][0]);
  }

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
    if (fid > t["t"+tid].hitstun){
      $("#trajCanvas").after('<div class="framePosInfoBox">Actionable frame: '+(fid-t["t"+tid].hitstun)+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    else {
      $("#trajCanvas").after('<div class="framePosInfoBox">Frame of hitstun: '+fid+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+tid].palette][0]});
  }, function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).attr("r",15);
    $(".framePosInfoBox").remove();
  });

  $(".start-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(7,8));
    var kb = t["t"+id].knockback.toPrecision(4);
    if (t["t"+id].knockback < 80){
      kb += " (No Tumble)";
    }
    else {
      kb += " (Tumble)";
    }
    var hitlag = Math.floor(t["t"+aT].newDamage * (1/3) + 3);
    if (t["t"+aT].curHitbox.effect == "Electric"){
      hitlag = Math.floor(hitlag * 1.5);
    }
    if (t["t"+aT].crouching){
      hitlag = Math.floor(hitlag * (2/3));
    }
    $("#start"+id).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:15px">Position Hit</span><br>X: '+((Math.round(t["t"+id].mouseXMeleeF*100))/100)+' Y: '+((Math.round(t["t"+id].mouseYMeleeF*100))/100)+'<br>Hitlag: '+hitlag+'<br>Hitstun: '+t["t"+aT].hitstun+'<br>KB: '+kb+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+id].palette][0]});

  }, function(){
    $(".start").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".kill-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(6,7));
    var num = $(this).attr("class");
    num = parseInt(num.substr(10,num.length));
    $("#kill"+id).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:45px"><span style="font-size:13px">KILLED!</span><br>Pos X:'+((Math.round(t["t"+id].curPositions[num][0]*100))/100)+' Y:'+((Math.round(t["t"+id].curPositions[num][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+id].curPositions[num][2]*100))/100)+' Y:'+((Math.round(t["t"+id].curPositions[num][3]*100))/100)+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+id].palette][0]});

  }, function(){
    $(".kill").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".ccCircle-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(10,11));
    var yD = t["t"+id].yDisplacement.toPrecision(6);
    if (yD.length > 7){
      yD = yD.substr(0,8);
    }
    $("#ccCircle"+id).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:45px"><span style="font-size:13px">Crouch Cancelled</span><br>Knockback: '+t["t"+id].knockback.toPrecision(7)+'<br>Y-Displacement:'+yD+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+id].palette][0]});

  }, function(){
    $(".ccCircle").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".atCircle-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(10,11));
    var yD = t["t"+id].yDisplacement.toPrecision(6);
    if (yD.length > 7){
      yD = yD.substr(0,8);
    }
    $("#atCircle"+id).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:45px"><span style="font-size:13px">Amsah Techable</span><br>Knockback: '+t["t"+id].knockback.toPrecision(7)+'<br>Y-Displacement:'+yD+'</div>');
    var frameposy = mouseY;
    var frameposx = mouseX;
    if (mouseY + trajOffset.top > windheight){
      frameposy = windheight;
    }
    if (mouseX + trajOffset.left + 160 > windwidth){
      frameposx = windwidth - trajOffset.left - 160;
    }
    $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+id].palette][0]});

  }, function(){
    $(".atCircle").css("stroke-width",0);
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
	});

  $(document).on("ps-scroll-y",function(){
    diOffset = $("#"+activeDI+"diSelector").offset();
  });

  $("#tdiUser").hide();
  $("#sdiUser").hide();
  $("#adiUser").hide();
  $("#sdiBox").hide();
  $("#adiBox").hide();

  $("#tutorialbutton").hover(function(){
    $(this).toggleClass("tutorialbuttonhighlight");
  });

  $("#donatebutton").hover(function(){
    $(this).toggleClass("donatebuttonhighlight");
  });

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
    if (diPointerFrozen[type[0]]){
      $(this).children(".diFreeze").removeClass("freezeOff").addClass("freezeOn");
    }
    else {
      $(this).children(".diFreeze").removeClass("freezeOn").addClass("freezeOff");
    }
  });

  $(".diPrecise").hover(function(){
    $(this).toggleClass("diPreciseHighlight");
  });

  $(".diPrecise").click(function(){
    var id = $(this).attr("id");
    var type = id[0];
    diPointerFrozen[type] = true;
    if (id[3] == "R" || id[3] == "L"){
      var x = "";
      if (id[3] == "L" && !(t["t"+aT][type+"diMouseXMelee"] < -0.999)){
        if ($("#"+type+"diXInput").text() == "0.2875"){
          t["t"+aT][type+"diMouseXMelee"] = 0;
        }
        else if (t["t"+aT][type+"diMouseXMelee"] < 0.2875 && t["t"+aT][type+"diMouseXMelee"] > -0.2875){
          t["t"+aT][type+"diMouseXMelee"] = -0.2875;
        }
        else {
          t["t"+aT][type+"diMouseXMelee"] -= 0.0125;
        }
      }
      else if (id[3] == "R" && !(t["t"+aT][type+"diMouseXMelee"] > 0.999)){
        if ($("#"+type+"diXInput").text() == "-0.2875"){
          t["t"+aT][type+"diMouseXMelee"] = 0;
        }
        else if (t["t"+aT][type+"diMouseXMelee"] < 0.2875 && t["t"+aT][type+"diMouseXMelee"] > -0.2875){
          t["t"+aT][type+"diMouseXMelee"] = 0.2875;
        }
        else {
          t["t"+aT][type+"diMouseXMelee"] += 0.0125;
        }
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
      $("#"+type+"diXInput").empty().append(x);
    //  t["t"+aT][type+"diMouseXReal"] = ((t["t"+aT][type+"diMouseXMelee"]/0.0125)+80)*(130/161);
    }
    if (id[3] == "U" || id[3] == "D"){
      var y = "";
      if (id[3] == "U" && !(t["t"+aT][type+"diMouseYMelee"] > 0.999)){
        if ($("#"+type+"diYInput").text() == "-0.2875"){
          t["t"+aT][type+"diMouseYMelee"] = 0;
        }
        else if (t["t"+aT][type+"diMouseYMelee"] < 0.2875 && t["t"+aT][type+"diMouseYMelee"] > -0.2875){
          t["t"+aT][type+"diMouseYMelee"] = 0.2875;
        }
        else {
          t["t"+aT][type+"diMouseYMelee"] += 0.0125;
        }
      }
      else if (id[3] == "D" && !(t["t"+aT][type+"diMouseYMelee"] < -0.999)){
        if ($("#"+type+"diYInput").text() == "0.2875"){
          t["t"+aT][type+"diMouseYMelee"] = 0;
        }
        else if (t["t"+aT][type+"diMouseYMelee"] < 0.2875 && t["t"+aT][type+"diMouseYMelee"] > -0.2875){
          t["t"+aT][type+"diMouseYMelee"] = -0.2875;
        }
        else {
          t["t"+aT][type+"diMouseYMelee"] -= 0.0125;
        }
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
      $("#"+type+"diYInput").empty().append(y);
      //prompt(t["t"+aT][type+"diMouseYReal"]);
      //t["t"+aT][type+"diMouseYReal"] = ((t["t"+aT][type+"diMouseYReal"]/-0.0125)+80);
      //prompt(t["t"+aT][type+"diMouseYReal"]);
    }

    changeUserStick(t["t"+aT][type+"diMouseXMelee"],t["t"+aT][type+"diMouseYMelee"],type);
    $("#"+type+"diSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));
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

  $(".diSwitch").hover(function(){
    $(this).toggleClass("diPreciseHighlight");
  });

  $(".diSwitch").click(function(){
    var id = $(this).attr("id");
    id = id[0];
    if (diSwitch[id]){
      $(this).children("p").empty().append("Simple");
      diSwitch[id] = 0;
      $("#"+id+"diButtons").show();
      $("#"+id+"diButtonsP").hide();
    }
    else {
      $(this).children("p").empty().append("Precise");
      diSwitch[id] = 1;
      $("#"+id+"diButtonsP").show();
      $("#"+id+"diButtons").hide();
    }
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

  trajectoryHover();

  trajectoryClick();

	drawTrajectory();

	$("#victim-char").hover(function(){
    $(this).toggleClass("victimCharHighlight");
	});

  $("#victim-char").click(function(){
    if ($("#chardropdown").css("display") == "none"){
      $(".hbcharselect").css("opacity",0.7);
      $("#chardropdown").fadeIn();
      var left = $(this).offset().left;
      var top = $(this).offset().top;
      $("#chardropdown").css({"top":top+"px","left":(left-280)+"px"});
    }
    else {
      $("#chardropdown").fadeOut();
    }
  });

  $("#chardropdown").hover(function(){
    $("#victim-char").addClass("victimCharHighlight");
    hoverDropdown = true;
  },function(){
    hoverDropdown = false;
    $(this).fadeOut();
    $("#victim-char").removeClass("victimCharHighlight");
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

  $(".percentButton").hover(function(){
    $(this).toggleClass("percentButtonHighlight");
  });

	var percentHold = 0;

	$(".percentButton").mousedown(function() {
		var id = $(this).attr("id");
		percentHold = setInterval(function() {
			var curNum = parseInt($("#percentNumberEdit").val());
			if (id == "percentPlus"){
				var newnum = curNum + 1;
        if (newnum > 999){
          newnum = 999;
        }
			}
			else {
				var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
      }
      if ($("#percentPreciseIcon").hasClass("percentPreciseIconCollapse")){
        t["t"+aT].percent = parseFloat(newnum+"."+t["t"+aT].fractional);
      }
      else {
        t["t"+aT].percent = newnum;
      }

			$("#percentNumberEdit").val(newnum);
      $("#percentPreciseWhole").empty().append(newnum);
      drawTrajectory();
		}, 50);
	}).bind("mouseup mouseleave", function() {
    clearInterval(percentHold);
	});

  $(".chargingButton").hover(function(){
    $(this).toggleClass("chargingButtonHighlight");
  });

  var chargingHold = 0;

  $(".chargingButton").mousedown(function() {
    var id = $(this).attr("id");
    chargingHold = setInterval(function() {
      var curNum = parseInt($("#chargingNumberEdit").val());
      if (id == "chargingPlus"){
        var newnum = curNum + 1;
        if (newnum > 60){
          newnum = 60;
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
      $("#chargingNumberEdit").val(newnum);
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

  $(".realButton").hover(function(){
    $(this).toggleClass("realButtonHighlight");
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

  $("#vcRealButton").click(function(){
    if (t["t"+aT].vcancel){
      $("#vcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].vcancel = false;
    }
    else {
      $("#vcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].vcancel = true;
    }
    drawTrajectory();
  });

  $("#mcRealButton").click(function(){
    if (t["t"+aT].meteorCancel){
      $("#mcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].meteorCancel = false;
    }
    else {
      $("#mcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].meteorCancel = true;
      $("#djSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].doubleJump = true;
    }
    drawTrajectory();
  });

  $("#fiRealButton").click(function(){
    if (t["t"+aT].fadeIn){
      $("#fiSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].fadeIn = false;
    }
    else {
      $("#fiSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].fadeIn = true;
    }
    drawTrajectory();
  });
  $("#djRealButton").click(function(){
    if (t["t"+aT].doubleJump){
      $("#djSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].doubleJump = false;
      $("#mcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].meteorCancel = false;
    }
    else {
      $("#djSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].doubleJump = true;
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
    swapOptions();
    drawTrajectory();
  });

  $(".stageselect").hover(function(){
    $(this).toggleClass("stagehighlight");
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
    if(!$(e.target).hasClass("colourselect") && !$(e.target).hasClass("tminicolour"))
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
  trajLabelHover();
  trajLabelClick();

  $("#trajAdd").click(function(){

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
      $(".trajBox").removeClass("trajBoxSelected");


      currentTrajs[newTraj-1] = true;

      storedTrajs++;
      //finally found a way to deep copy objects. fukin pointers man
      $.extend(true,t["t"+newTraj],t["t"+aT]);

      t["t"+newTraj].hasLabel = false;
      t["t"+newTraj].palette = savedPalettes[newTraj-1];
      aT = newTraj;

      if (newTraj > 1){
        $("#trajBox"+(newTraj-1)).after('<div id="trajBox'+newTraj+'" class="trajBox trajBoxSelected"><div id="trajNum'+newTraj+'" class="trajNum"><div class="trajFreeze freezeOn"></div><p>'+newTraj+'</p></div><div id="trajColour'+newTraj+'" class="trajColour"><div id="t'+newTraj+'minicolour1" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][0]+'"></div><div id="t'+newTraj+'minicolour2" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][1]+'"></div><div id="t'+newTraj+'minicolour3" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][2]+'"></div></div><div id="trajLabel'+newTraj+'" class="trajLabel"><p>Add label</p></div><div id="trajDelete'+newTraj+'" class="trajDelete"><p>x</p></div></div>');
      }
      else {
        $("#trajBoxContainer").prepend('<div id="trajBox1" class="trajBox trajBoxSelected"><div id="trajNum1" class="trajNum"><div class="trajFreeze freezeOn"></div><p>1</p></div><div id="trajColour1" class="trajColour"><div id="t1minicolour1" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][0]+'"></div><div id="t1minicolour2" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][1]+'"></div><div id="t1minicolour3" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][2]+'"></div></div><div id="trajLabel1" class="trajLabel"><p>Add label</p></div><div id="trajDelete1" class="trajDelete"><p>x</p></div></div>');
      }

      drawTrajectory();

      trajBoxHover();
      trajBoxClick();
      trajColourClick();
      trajColourHover();
      $(".trajDelete").removeClass("trajDeleteDisable");
      trajDeleteHover();
      trajDeleteClick();
      trajLabelHover();
      trajLabelClick();
    }

  });

  $("#trajAdd").hover(function(){
    $(this).toggleClass("trajAddBoxHighlight");
  });

  $(".character").hover(function(){
    $(this).toggleClass("characterhighlight");
  });

  $("#tutorialbutton").click(function(){
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="ppSVid"><iframe class="vid1" width="550" height="413" src="https://www.youtube.com/embed/TtiDd5cQWJc" frameborder="0" allowfullscreen></iframe></div><div id="ppSVidClose" class="ppSClose"><p>x</p></div></div></div>');
    $("#ppSVidClose").unbind("mouseover click");
    $("#ppSVidClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $("#ppSVidClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });

  });

  $("#trajShare").click(function(){
    var qstring = writeQueryString();
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="popoutShare"><div id="ppSTitle"><p>Share this URL <span style="font-size:10px">(triple click to select all)</span></p></div><div id="ppSClose" class="ppSClose"><p>x</p></div><div id="ppSUrl"><p id="shareUrlEdit">http://ikneedata.com/calculator'+qstring+'</p></div></div></div>');
    $("#ppSClose").unbind("mouseover click");
    $("#ppSClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $("#ppSClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });

  });

  $("#trajShare").hover(function(){
    $(this).toggleClass("trajShareHighlight");
  });

  $("#trajTitle").hover(function(){
    $(this).toggleClass("trajTitleHighlight");
  });

  $("#trajTitle").click(function(){
    if ($(this).hasClass("activeTitle")){
      $(this).removeClass("activeTitle").children("p").empty().append("Add Title");
      $("#labelBox0").remove();
    }
    else {
      $(this).addClass("activeTitle").children("p").empty().append("Remove Title");
      $("#display").append('<div id="labelBox0" class="labelBox"><textarea id="textarea0" class="textarea" name="label0" cols="30" rows="3"></textarea></div><div id="labelOptions0" class="labelOptions"><div id="labelFontSize0" class="labelFontSize"><div class="labelFontIcon"></div><div class="labelFontChange"><div class="labelFontUp labelControl"><p>+</p></div><div class="labelFontDown labelControl"><p>-</p></div></div></div><div id="labelOpacity0" class="labelOpacity"><div class="labelOpacityIcon"></div><div class="labelOpacityChange"><div class="labelOpacityUp labelControl"><p>+</p></div><div class="labelOpacityDown labelControl"><p>-</p></div></div></div></div>');
      labelBoxClick(0);
      labelBoxDrag(0);
      labelBoxResize(0);
    }
  });

  $(document).mouseup(function (e){
    var container = $(".labelOptions");
    var container2 = $(".labelBox");
    var container3 = $("#percentNumberEdit");
    var container4 = $("#chargingNumberEdit");
    var container5 = $("#chardropdown");
    var container6 = $(".hbcharselect");
    var container7 = $("#chardropdown1");
    var container8 = $("#chardropdown2");
    var container9 = $(".hbcharselect p")

    if (!container.is(e.target) && !container2.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
    if (!container3.is(e.target)){
      if (container3.val() == ""){
        container3.val("0");
        t["t"+aT].percent = 0;
        drawTrajectory();
      }
    }
    if (!container4.is(e.target)){
      if(container4.val() == ""){
        container4.val("0");
        t["t"+aT].chargeF = 0;
        drawTrajectory();
      }
    }
    if (!container5.is(e.target) && !container6.is(e.target) && !container7.is(e.target) && !container8.is(e.target) && !container9.is(e.target)){
      container5.fadeOut();
    }
  });


  $("#percentNumberEdit").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),false,false,false);
    temp = Math.abs(temp);
    $(this).val(temp);
    $("#percentPreciseWhole").empty().append(temp);
    if ($("#percentPreciseIcon").hasClass("percentPreciseIconCollapse")){
      t["t"+aT].percent = parseFloat(temp+"."+t["t"+aT].fractional);
    }
    else {
      t["t"+aT].percent = temp;
    }
    drawTrajectory();
  });

  $("#percentPreciseEdit").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),false,false,true);
    //temp = Math.abs(temp);
    $(this).val(temp);
    t["t"+aT].fractional = temp;
    t["t"+aT].percent = parseFloat(Math.floor(t["t"+aT].percent)+"."+t["t"+aT].fractional);
    drawTrajectory();
  });

  $("#chargingNumberEdit").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),false,false,false);
    if (temp > 60){
      temp = 60;
    }
    temp = Math.abs(temp);
    $(this).val(temp);
    t["t"+aT].chargeF = temp;
    drawTrajectory();
  });

  $("#mousePosition").hover(function(){
    $("#mPosX").val(t["t"+aT].mouseXMeleeF);
    $("#mPosY").val(t["t"+aT].mouseYMeleeF);
  });

  $("#mPosX").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),true,true,false);
    if (temp >= 1000){
      temp = 999.9;
    }
    //temp = Math.abs(temp);
    $(this).val(temp);
    var newFloat = parseFloat(temp);
    if (!(newFloat > 0 || newFloat < 0)){
      newFloat = 0;
    }
    t["t"+aT].mouseXMeleeF = newFloat;
    drawTrajectory();
  });

  $("#mPosY").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),true,true,false);
    if (temp >= 1000){
      temp = 999.9;
    }
    //temp = Math.abs(temp);
    $(this).val(temp);
    var newFloat = parseFloat(temp);
    if (!(newFloat > 0 || newFloat < 0)){
      newFloat = 0;
    }
    t["t"+aT].mouseYMeleeF = newFloat;
    drawTrajectory();
  });

  $(".stageselect").click(function(){
    $(".stageselect").removeClass("stageselected");
    $(this).addClass("stageselected");
    var id = $(this).attr("id");
    id = id.substr(0,2);
    activeStage = id;
    changeStage(id);
    var savedaT = aT;

    for(x=0;x<9;x++){
      if(currentTrajs[x]){
        aT = x+1;
        drawTrajectory();
      }
    }
    aT = savedaT;

  });

  $("#percentPreciseToggle").hover(function(){
    $(this).toggleClass("percentPreciseToggleHighlight");
  });

  $("#percentPreciseToggle").click(function(){
    if ($("#percentPreciseIcon").hasClass("percentPreciseIconExpand")){
      $("#percentPrecise").show();
      $("#percentPreciseIcon").removeClass("percentPreciseIconExpand").addClass("percentPreciseIconCollapse");
      $(this).children("p").empty().append("Close Fractionals");
      t["t"+aT].percent = parseFloat($("#percentNumberEdit").val()+"."+t["t"+aT].fractional);
      t["t"+aT].useFractionals = true;
    }
    else {
      $("#percentPrecise").hide();
      $("#percentPreciseIcon").removeClass("percentPreciseIconCollapse").addClass("percentPreciseIconExpand");
      $(this).children("p").empty().append("Open Fractionals");
      t["t"+aT].percent = parseInt($("#percentNumberEdit").val());
      t["t"+aT].useFractionals = false;
    }
    drawTrajectory();
    diOffset = $("#"+activeDI+"diSelector").offset();
  });

  $("#attemptCC").click(function(){
    $("#cSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    t["t"+aT].crouch = true;
    t["t"+aT].tdiMouseXMelee = 0;
    t["t"+aT].tdiMouseYMelee = -1;
    changeUserStick(0,-1,"t");
    //prompt(t["t"+aT].tdiMouseXReal);
    $("#tdiSvgPointer").attr("cx",t["t"+aT].tdiMouseXReal/(130/161)).attr("cy",t["t"+aT].tdiMouseYReal/(130/161));
    $("#tdiXInput").empty().append("0.0000");
    $("#tdiYInput").empty().append("-1.0000");
    diPointerFrozen.t = true;
    $("#tdiSelector").children(".diFreeze").removeClass("freezeOff").addClass("freezeOn");

    t["t"+aT].adiMouseXMelee = 0;
    t["t"+aT].adiMouseYMelee = -1;
    changeUserStick(0,-1,"a");
    $("#adiSvgPointer").attr("cx",t["t"+aT].adiMouseXReal/(130/161)).attr("cy",t["t"+aT].adiMouseYReal/(130/161));
    $("#adiXInput").empty().append("0.0000");
    $("#adiYInput").empty().append("-1.0000");
    diPointerFrozen.a = true;
    $("#adiSelector").children(".diFreeze").removeClass("freezeOff").addClass("freezeOn");

    drawTrajectory();
  });

  /*$("#attemptAT").click(function(){
    $("#cSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    t["t"+aT].crouch = false;
    if ((t["t"+aT].curHitbox.angle > 0 && t["t"+aT].curHitbox.angle < 180) || t["t"+aT].curHitbox.angle == 361){

    t["t"+aT].tdiMouseXMelee = 0;
    t["t"+aT].tdiMouseYMelee = -1;
    changeUserStick(0,-1,"t");
    //prompt(t["t"+aT].tdiMouseXReal);
    $("#tdiSvgPointer").attr("cx",t["t"+aT].tdiMouseXReal/(130/161)).attr("cy",t["t"+aT].tdiMouseYReal/(130/161));
    $("#tdiXInput").empty().append("0.0000");
    $("#tdiYInput").empty().append("-1.0000");
    diPointerFrozen.t = true;
    $("#tdiSelector").children(".diFreeze").removeClass("freezeOff").addClass("freezeOn");


    t["t"+aT].adiMouseXMelee = 0;
    t["t"+aT].adiMouseYMelee = -1;
    changeUserStick(0,-1,"a");
    $("#adiSvgPointer").attr("cx",t["t"+aT].adiMouseXReal/(130/161)).attr("cy",t["t"+aT].adiMouseYReal/(130/161));
    $("#adiXInput").empty().append("0.0000");
    $("#adiYInput").empty().append("-1.0000");
    diPointerFrozen.a = true;
    $("#adiSelector").children(".diFreeze").removeClass("freezeOff").addClass("freezeOn");
  });*/

  $("#rcontrolsOptions").perfectScrollbar();
  $("#attackscroll").perfectScrollbar();
  $("#trajBoxContainer").perfectScrollbar();
  $("#stageSelectContainer").perfectScrollbar();

  readQueryString();

});
