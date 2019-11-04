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


//temp solution to loading sfx early
sounds = [new Audio("assets/sounds/hit.wav"),new Audio("assets/sounds/tech.wav"),new Audio("assets/sounds/land.wav"),new Audio("assets/sounds/falcondodge.wav"),new Audio("assets/sounds/tactionable.wav"),new Audio("assets/sounds/kill.wav")];

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
  this.tdiStrength = 0;
  this.tdiAngle = 0;
  this.sdiMouseXMelee = 0;
  this.sdiMouseYMelee = 0;
  this.sdiMouseXReal = 65.4;
  this.sdiMouseYReal = 65.4;
  this.sdiAngle = 0;
  this.adiMouseXMelee = 0;
  this.adiMouseYMelee = 0;
  this.adiMouseXReal = 65.4;
  this.adiMouseYReal = 65.4;
  this.adiAngle = 0;
  this.zdiMouseXMelee = 0;
  this.zdiMouseYMelee = 0;
  this.zdiMouseXReal = 65.4;
  this.zdiMouseYReal = 65.4;
  this.zdiAngle = 0;
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
  this.stayGrounded = false;
  this.metal = false;
  this.ice = false;
  this.icg = false;
  this.stacked = false;
  this.stackedTrajectory = 0;
  this.comboSnap = 0;
  this.cSnapFrame = 0;
  this.hasCombo = 0;
  this.tFrames = [-1,-1];
  this.lastDisplay = 0;
  this.killFrame = 0;
  this.hitlag = 0;
  this.shieldstun = 0;

  this.grabInterrupt = false;
  this.yoshiDJArmor = false;
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
diPointerFrozen.z = false;
mouseX = 0;
mouseY = 0;
mouseZoomX = 0;
mouseZoomY = 0;
diMouseX = {};
diMouseY = {};
diMouseX.t = 0;
diMouseY.t = 0;
diMouseX.s = 0;
diMouseY.s = 0;
diMouseX.a = 0;
diMouseY.a = 0;
diMouseY.z = 0;
diMouseX.z = 0;

diSwitch = {};
diSwitch.t = 0;
diSwitch.s = 0;
diSwitch.z = 0;
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
comboSnapping = false;
automaticStale = true;
centreOffset = [-bzLeft*10+50,bzTop*10+50];

curVolume = 5;

function refreshKnockdownBox(traj) {
  if (t["t"+traj].knockback >= 80){
    $("#knockdownBox").show();
  }
  else {
    $("#knockdownBox").hide();
  }
}

function changeVolume(plus){
  if (plus){
    curVolume++;
    if (curVolume > 9){
      curVolume = 9;
    }
  }
  else {
    curVolume--;
    if (curVolume < 0){
      curVolume = 0;
    }
  }
}

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
    chars.Sh.dthrow.id0 = new hitbox(3,60,50,0,70,'Normal');
    chars.Ys.fsmash.id0 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.fsmash.id1 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.fsmash.id2 = new hitbox(17,361,98,0,32,'Normal');
    chars.Ys.usmash.id0 = new hitbox(15,75,108,0,30,'Normal');
    chars.Ys.usmash.id1 = new hitbox(15,75,108,0,30,'Normal');
    chars.Ys.dair.id0 = new hitbox(3,270,90,0,5,'Normal');
    chars.Ys.dair.id1 = new hitbox(3,270,90,0,5,'Normal');
    chars.Kb.dash.clean.id0 = new hitbox(9,105,50,0,70,'Flame');
    chars.Kb.dash.late.id0 = new hitbox(5,105,50,0,50,'Flame');
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
    chars.Sh.dthrow.id0 = new hitbox(3,80,50,0,70,'Normal');
    chars.Ys.fsmash.id0 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.fsmash.id1 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.fsmash.id2 = new hitbox(16,361,94,0,32,'Normal');
    chars.Ys.usmash.id0 = new hitbox(14,75,108,0,26,'Normal');
    chars.Ys.usmash.id1 = new hitbox(14,75,108,0,26,'Normal');
    chars.Ys.dair.id0 = new hitbox(4,270,90,0,5,'Normal');
    chars.Ys.dair.id1 = new hitbox(4,270,90,0,5,'Normal');
    chars.Kb.dash.clean.id0 = new hitbox(8,105,66,0,70,'Flame');
    chars.Kb.dash.late.id0 = new hitbox(5,105,66,0,50,'Flame');
  }
}

function createAutomaticStale(){
  //t["t"+aT].staleQueue[0] = false;
  //console.log("test "+aT);
  var comboSearching = true;
  var nT = aT;
  var sT = 0;
  // sT = startingTrajectory
  //console.log("------------------------");
  var depth = 0;
  var realDepth = 0;
  while (comboSearching){
    if (t["t"+nT].comboSnap > 0){
      //console.log("nT = "+nT);
      //console.log("t['t'+nT].comboSnap = "+(t["t"+nT].comboSnap));
      //console.log("aT = "+aT);
      depth++;
      if (t["t"+aT].cHName[0] == t["t"+(t["t"+nT].comboSnap)].cHName[0] && t["t"+(t["t"+nT].comboSnap)].cHName[1] == t["t"+aT].cHName[1]){
        sT = t["t"+nT].comboSnap;
        realDepth = depth;
      }
      nT = t["t"+nT].comboSnap;
    }
    else {
      comboSearching = false;
    }
  }
  //console.log("realDepth"+realDepth);
  if (sT > 0){
    var sQ = [];
    for (j=0;j<9;j++){
      sQ[j] = t["t"+sT].staleQueue[j];
    }
    //console.log("sT = "+sT);
    nT = sT;
    //console.log("nT = "+nT)
    for (i=0;i<realDepth;i++){
      var tempSQ = [];
      for (j=0;j<9;j++){
        tempSQ[j] = sQ[j];
      }
      for (k=0;k<8;k++){
        if (tempSQ[k]){
          sQ[k+1] = true;
        }
        else {
          sQ[k+1] = false;
        }
      }
      //console.log(nT);
      if (t["t"+aT].cHName[0] == t["t"+nT].cHName[0] && t["t"+aT].cHName[1] == t["t"+nT].cHName[1]){
        sQ[0] = true;
      }
      else {
        sQ[0] = false;
      }
      nT = t["t"+nT].hasCombo;
    }
    for (j=0;j<9;j++){
      t["t"+aT].staleQueue[j] = sQ[j];
    }
  }
  else {
    t["t"+aT].staleQueue = [false,false,false,false,false,false,false,false,false];
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
    t["t"+aT].mouseXMelee = (Math.round(((mouseZoomX/widthRatio)-(-bzLeft*10+50))*10))/100;
    t["t"+aT].mouseYMelee = (Math.round(((mouseZoomY/heightRatio)-(bzTop*10+50))*-10))/100;
    $("#mPosX").val(t["t"+aT].mouseXMelee);
    $("#mPosY").val(t["t"+aT].mouseYMelee);

    if (t["t"+aT].trajFrozen == false){
      t["t"+aT].grounded = false;
      var closestTraj = [];

      if (comboSnapping){
        // for each possible trajectory
        var closest = 11;
        var howClose;
        for (i=0;i<9;i++){
          // if exists and not deleted
          if (currentTrajs[i]){
            var hasComboSnap = false;
            var isSnappedOnYou = false;
            // check if has combo snapped already
            for (l=0;l<9;l++){
              if (t["t"+(l+1)].comboSnap == (i+1)){
                // skip active traj
                if (l != aT-1){
                  hasComboSnap = true;
                }
              }
            }
            if (t["t"+aT].hasCombo == (i+1)){
              isSnappedOnYou = true;
            }
            //excluding current active trajectory, ones with combos already and ones that are snapped onto the trajectory itself (causes infinite drawing otherwise)
            if (i != aT-1 && !hasComboSnap && !isSnappedOnYou){
              // for each trajectory frame
              for(j=0;j<t["t"+(i+1)].curPositions.length;j++){
                // if mouse is within 5 Mm radius of trajectory frame
                if (t["t"+aT].mouseXMelee <= t["t"+(i+1)].curPositions[j][0] + 10 && t["t"+aT].mouseXMelee >= t["t"+(i+1)].curPositions[j][0] - 10 && t["t"+aT].mouseYMelee <= t["t"+(i+1)].curPositions[j][1] + 10 && t["t"+aT].mouseYMelee >= t["t"+(i+1)].curPositions[j][1] - 10){
                  // might need to use trig
                  howClose = Math.abs(t["t"+aT].mouseXMelee - t["t"+(i+1)].curPositions[j][0]) + Math.abs(t["t"+aT].mouseYMelee - t["t"+(i+1)].curPositions[j][1]);
                  if (howClose < closest){
                    closest = howClose;
                    closestTraj = [i,j];
                  }
                }
              }
            }
          }
        }
      }
      if (closestTraj.length > 0){
        var cT = closestTraj[0]+1;
        t["t"+aT].mouseXMelee = t["t"+cT].curPositions[closestTraj[1]][0];
        t["t"+aT].mouseYMelee = t["t"+cT].curPositions[closestTraj[1]][1];
        t["t"+aT].comboSnap = cT;
        t["t"+aT].cSnapFrame = closestTraj[1];
        t["t"+cT].hasCombo = aT;
        t["t"+aT].character = t["t"+cT].character;
        t["t"+aT].percent = t["t"+cT].percent + t["t"+cT].newDamage;
        var fract = (t["t"+aT].percent % 1).toPrecision(5);
        t["t"+aT].fractional = fract.substr(2,fract.length);
        if (automaticStale){
          createAutomaticStale();


          // if using same attack, not checking hitbox ids
          /*
          if (t["t"+aT].cHName[0] == t["t"+cT].cHName[0] && t["t"+aT].cHName[1] == t["t"+cT].cHName[1]){
            t["t"+aT].staleQueue[0] = true;
            // check stale queue 0 - 8 (skip 9)
            for (k=0;k<8;k++){
              if (t["t"+cT].staleQueue[k]){
                t["t"+aT].staleQueue[k+1] = true;
              }
              else {
                t["t"+aT].staleQueue[k+1] = false;
              }
            }
          }*/
        }
        swapOptions();
        //prompt(t["t1"].hasCombo);
        // making frames past the combo point of the stationary trajectory invisible
        // fuck it, easier to just redraw
        drawTrajectory(closestTraj[0]+1);
      }
      else {
        // if was previously combo snapped, redraw stationary trajectory
        if (t["t"+aT].comboSnap > 0){
          var cT = t["t"+aT].comboSnap;
          t["t"+aT].comboSnap = 0;
          t["t"+cT].hasCombo = 0;
          drawTrajectory(cT);
        }
      }
      if ((snapping && !comboSnapping) || (snapping & comboSnapping && closestTraj.length == 0)){
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
      refreshKnockdownBox(aT);
      drawTrajectory(aT,true);
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
      if (temp[v+1]+temp[v+2] == "ag"){
        translated += "\r\n";
      }
      else {
        translated += String.fromCharCode(parseInt(temp[v+1]+temp[v+2], 16));
      }
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
          if (temp1[v].charCodeAt(0).toString(16) == "a"){
            temp2 += "g";
          }
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
    diAngle = Math.atan(y/x) * (180 / Math.PI) * 1;""
    if (x < 0){
      diAngle += 180;
    }
    else if (y < 0) {
      diAngle += 360;
    }
  }
  return diAngle;
}

function GetAttackAngle() {
  if (t["t"+aT].stacked) {
    return t["t"+aT].stackedTrajectory;
  }
  else {
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
    return attackAngle;
  }
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
      var attackAngle = GetAttackAngle();
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
      t["t"+aT].tdiStrength = (angleOffset/18)*100;
      $("#tdiOffsetPercent").empty().append(formatTDIStrength((angleOffset/18)*100));
      calculateStickColor(angleOffset, type);
    }
    $("#"+type+"diDiAngle").empty().append(Math.round(diAngle));
    t["t"+aT][type+"diAngle"] = Math.round(diAngle);
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
    var version = GetQueryStringParams("version");
    var loop = 25;
    if (version == "200"){
      loop = 26;
    }
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
        for (j=0;j<loop;j++){
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
              if (version == "200"){
                diSwitch["z"] = parseInt(temp[3]);
                if (diSwitch["z"]){
                  $("#zdiSwitch").children("p").empty().append("Precise");
                }
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
              if (version == "200"){
                t["t"+p].icg = Boolean(parseInt(temp[10]));
                t["t"+p].ice = Boolean(parseInt(temp[11]));
                t["t"+p].metal = Boolean(parseInt(temp[12]));
              }
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
              if (version == "200"){
                temp = temp.split(",");
                t["t"+p].sdiMouseXReal = parseFloat(temp[0]);
                t["t"+p].zdiMouseXReal = parseFloat(temp[1]);
              }
              else {
                t["t"+p].sdiMouseXReal = parseFloat(temp);
              }
              break;
            case "v":
              if (version == "200"){
                temp = temp.split(",");
                t["t"+p].sdiMouseYReal = parseFloat(temp[0]);
                t["t"+p].zdiMouseYReal = parseFloat(temp[1]);
                var xy2 = convertPixelsToStick(t["t"+p].zdiMouseXReal,t["t"+p].zdiMouseYReal);
                t["t"+p].zdiMouseXMelee = xy2[0];
                t["t"+p].zdiMouseYMelee = xy2[1];
              }
              else {
                t["t"+p].sdiMouseYReal = parseFloat(temp);
              }
              var xy1 = convertPixelsToStick(t["t"+p].sdiMouseXReal,t["t"+p].sdiMouseYReal);
              t["t"+p].sdiMouseXMelee = xy1[0];
              t["t"+p].sdiMouseYMelee = xy1[1];
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
            case "z":
              temp = temp.split(",");
              t["t"+p].hasCombo = parseInt(temp[0]);
              t["t"+p].comboSnap = parseInt(temp[1]);
              t["t"+p].cSnapFrame = parseInt(temp[2]);
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
        //drawTrajectory(aT);
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
    for (var b=1;b<10;b++){
      if (t["t"+b].comboSnap == 0 && currentTrajs[b-1]){
        drawTrajectory(b);
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

function writeQueryString(){
  var qstring = "?";
  qstring += "version=200&stage="+activeStage+"&";
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
      for (j=0;j<26;j++){
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
            temp += diSwitch["z"];
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
            var temp11 = ~~t["t"+i].icg;
            var temp12 = ~~t["t"+i].ice;
            var temp13 = ~~t["t"+i].metal;
            temp = temp1+temp2+temp3+temp4+temp5+temp6+temp7+temp8+temp9+temp10+temp11+temp12+temp13;
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
            temp = ""+t["t"+i].sdiMouseXReal+","+t["t"+i].zdiMouseXReal;
            break;
          case 21:
            temp = ""+t["t"+i].sdiMouseYReal+","+t["t"+i].zdiMouseYReal;
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
          case 25:
            temp = ""+t["t"+i].hasCombo+","+t["t"+i].comboSnap+","+t["t"+i].cSnapFrame;
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
  var ang = GetAttackAngle();
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
      drawTrajectory(aT);
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
      drawTrajectory(aT);
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
    //trajectoryAnimation(aT);
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
    refreshKnockdownBox(aT);
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

    $("#chargingNumberEdit").val(t["t"+aT].chargeF);

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
    var type;
    for (b=0;b<4;b++){
      if (b == 0){
        type = "t";
      }
      else if (b == 1){
        type = "s";
      }
      else if (b == 2){
        type = "a";
      }
      else if (b == 3){
        type = "z";
      }

      $("#"+type+"diSvgPointer").attr("cx",t["t"+aT][type+"diMouseXReal"]/(130/161)).attr("cy",t["t"+aT][type+"diMouseYReal"]/(130/161));

      var x = t["t"+aT][type+"diMouseXMelee"];
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
      $("#"+type+"diXInput").empty().append(x);
      var y = t["t"+aT][type+"diMouseYMelee"];
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
      $("#"+type+"diYInput").empty().append(y);

      changeUserStick(t["t"+aT][type+"diMouseXMelee"], t["t"+aT][type+"diMouseYMelee"], type);
    }





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

    if (t["t"+aT].grabInterrupt){
      $("#hwgSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#hwgSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
    }

    if (t["t"+aT].yoshiDJArmor){
      $("#ydjaSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
    }
    else {
      $("#ydjaSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
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
      drawTrajectory(aT);
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
      drawTrajectory(aT);

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
    drawTrajectory(aT);
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
    if (t["t"+id].comboSnap > 0){
      var m = t["t"+id].comboSnap;
      t["t"+m].hasCombo = 0;
      t["t"+id].comboSnap = 0;
      t["t"+id].cSnapFrame = 0;
      drawTrajectory(m);

    }
    if (t["t"+id].hasCombo > 0){
      var m = t["t"+id].hasCombo;
      t["t"+m].comboSnap = 0;
      t["t"+id].hasCombo = 0;
      drawTrajectory(m);
    }
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

function outputPopup(){
  $("#tutorial").fadeOut();
  if(!($("#popout").length > 0)){
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="popoutOutput"><div id="ppOutputTitle"><p>Trajectory Outputs</p></div><div id="ppSClose" class="ppSClose"><p>x</p></div><div id="ppOutputText"></div></div></div>');
    //<textarea id="outputText"></textarea>
    $("#ppSClose").unbind("mouseover click");
    $("#ppSClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $("#ppSClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });

    for(i=1;i<=storedTrajs;i++){
      var atk = convertCharName(t["t"+i].cHName[0])+" "+t["t"+i].cHName[1]+" ";
      if (t["t"+i].cHName[2]){
        atk += t["t"+i].cHName[2]+" ";
      }
      atk += t["t"+i].cHName[3];
      var sq = "";
      for(j=0;j<9;j++){
        if (t["t"+i].staleQueue[j]){
          sq += (j+1)+" ";
        }
      }
      if (sq.length == 0){
        sq = "-";
      }
      var hd = "Right";
      if (t["t"+i].reverse){
        hd = "Left";
      }
      var variables = "";
      if (t["t"+i].crouch){
        variables += "Crouching, ";
      }
      if (t["t"+i].chargeInterrupt){
        variables += "Smash Charge Interruption, ";
      }
      if (t["t"+i].vcancel){
        variables += "V-Cancel, ";
      }
      if (t["t"+i].meteorCancel){
        variables += "Meteor Cancel, ";
      }
      if (t["t"+i].fadeIn){
        variables += "Fade In, ";
      }
      if (t["t"+i].doubleJump){
        variables += "DoubleJump, ";
      }
      variables = variables.substr(0,variables.length-2);

      if (t["t"+i].knockback >= 80){
        var kbtext = " (Knockdown)";
      }
      else {
        var kbtext = " (No Knockdown)";
      }

      var hitlag = Math.floor(t["t"+i].newDamage * (1/3) + 3);
      if (t["t"+i].curHitbox.effect == "Electric"){
        hitlag = Math.floor(hitlag * 1.5);
      }
      if (t["t"+i].crouch){
        hitlag = Math.floor(hitlag * (2/3));
      }
      if (t["t"+i].tFrames[0] > 0){
        var details = 'Throw Release: '+t["t"+i].tFrames[0]+'th frame of animation<br>Thrower Actionable: '+(t["t"+i].tFrames[1] + 1)+'th frame of hitstun';
      }
      else {
        var details = 'Hitlag: '+hitlag+' frames<br>Shieldstun: '+t["t"+i].shieldstun+' frames';
      }
      if (t["t"+i].comboSnap > 0){
        var combo = '<br>Combo Hit from Trajectory '+t["t"+i].comboSnap+', frame '+(t["t"+i].cSnapFrame+1);
      }
      else {
        var combo = '';
      }
      $("#ppOutputText").append('-------------<br>TRAJECTORY '+i+'<br>-------------'+combo+'<br>ATTACKER<br>Attack: '+atk+'<br> -Damage: '+t["t"+i].curHitbox.dmg+'%<br> -Angle: '+t["t"+i].curHitbox.angle+'°<br> -Knockback Growth: '+t["t"+i].curHitbox.kg+'<br> -Set Knockback: '+t["t"+i].curHitbox.wbk+'<br> -Base Knockback: '+t["t"+i].curHitbox.bk+'<br> -Effect: '+t["t"+i].curHitbox.effect+'<br>Stale Queue: '+sq+'<br>Smash Charge: '+t["t"+i].chargeF+' frames<br>Damage: '+t["t"+i].newDamage.toFixed(5)+'%<br>VICTIM<br>Character: '+t["t"+i].character+'<br>Percent: '+t["t"+i].percent+'%<br>Hit Direction: '+hd+'<br>Trajectory DI:<br> -Inputs: X:'+t["t"+i].tdiMouseXMelee+' Y:'+t["t"+i].tdiMouseYMelee+'<br> -Strength: '+formatTDIStrength(t["t"+i].tdiStrength)+'%<br> -Angle: '+t["t"+i].tdiAngle+'°<br>SDI (1): <br> -Inputs: X:'+t["t"+i].sdiMouseXMelee+' Y:'+t["t"+i].sdiMouseYMelee+'<br> -Angle: '+t["t"+i].sdiAngle+'°<br>SDI (2): <br> -Inputs: X:'+t["t"+i].zdiMouseXMelee+' Y:'+t["t"+i].zdiMouseYMelee+'<br> -Angle: '+t["t"+i].zdiAngle+'°<br>ASDI: <br> -Inputs: X:'+t["t"+i].adiMouseXMelee+' Y:'+t["t"+i].adiMouseYMelee+'<br> -Angle: '+t["t"+i].adiAngle+'°<br>Variables: '+variables+'<br>'+details+'<br>Hitstun: '+t["t"+i].hitstun+' frames<br>Knockback: '+t["t"+i].knockback.toFixed(5)+kbtext+'<br>Y-Displacement: '+t["t"+i].yDisplacement.toFixed(5)+'<br>POSITIONS:<br>Position Hit: X: '+t["t"+i].mouseXMeleeF.toFixed(5)+' Y: '+t["t"+i].mouseYMeleeF.toFixed(5));

      if (t["t"+i].grounded){
        $("#ppOutputText").append(" Grounded");
      }


      if (t["t"+i].stayGrounded && t["t"+i].grounded){
        if (t["t"+i].knockback >= 80){
          $("#ppOutputText").append("<br>AMSAH TECHABLE");
        }
        else {
          $("#ppOutputText").append("<br>CROUCH CANCELLED");
        }
      }
      else {
        var p = 0;
        var isKilled = false;
        while (!isKilled && p < t["t"+i].curPositions.length){
          var x = t["t"+i].curPositions[p][0];
          var y = t["t"+i].curPositions[p][1];
          if (p+1 == t["t"+i].hitstun){
            $("#ppOutputText").append("<br>Last Frame of Hitstun:");
          }
          if (p == t["t"+i].tFrames[1]){
            $("#ppOutputText").append("<br>Thrower is actionable:");
          }
          if (t["t"+i].hasCombo){
            if (p == t["t"+(t["t"+i].hasCombo)].cSnapFrame){
              $("#ppOutputText").append('<br>Combo Hit (Trajectory '+t["t"+i].hasCombo+'):');
            }
          }
          $("#ppOutputText").append("<br>Frame "+(p+1)+":<br> -Positions: X: "+x.toFixed(5)+" Y: "+y.toFixed(5)+"<br> -KBVel: X: "+t["t"+i].curPositions[p][2].toFixed(5)+" Y: "+t["t"+i].curPositions[p][3].toFixed(5)+"<br> -CharVel: X: "+t["t"+i].curPositions[p][4].toFixed(5)+" Y:"+t["t"+i].curPositions[p][5].toFixed(5));
          if (!(x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){
            //within the blastzone
            if (x >= bzRight || x <= bzLeft || y <= bzBottom || (y >= bzTop && t["t"+i].curPositions[i][3] >= 2.4)){
              isKilled = true;
              $("#ppOutputText").append("<br>KILLED!");
            }
          }
          p++;
        }
      }
      $("#ppOutputText").append(" <br>");
    }

  }
}

sources = 0;

function sourcePopup(){
  $("#tutorial").fadeOut();
  if(!($("#popout").length > 0)){
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="popoutSource"><div id="ppSourceTitle"><p>Paste source in format (frame1x,frame1y),(frame2x,frame2y)... <span style="font-size:10px">i.e. (1.2,3.4),(1.32,3.4),(1.35,3.51)...</span></p></div><div id="ppSClose" class="ppSClose"><p>x</p></div><div id="ppSourceText"><textarea id="sourceText"></textarea></div><div id="ppSourceOffset"><p>Offset</p><div id="ppSourceOffsetX"><textarea placeholder="X" id="sourceOffsetX"></textarea></div><div id="ppSourceOffsetY"><textarea placeholder="Y" id="sourceOffsetY"></textarea></div></div><div id="ppSourceColour"><p>Colour</p><div id="ppSourceColourText"><span id="sourceColourHash">#</span><textarea maxlength="6" id="sourceColourText"></textarea></div><div id="ppSourceColourTest"></div></div><div id="ppSourceDraw"><p>Draw</p></div></div></div>');
    $("#ppSClose").unbind("mouseover click");
    $("#ppSClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $("#ppSClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });
    var offset = [0,0];

    $("#sourceOffsetX").on("keyup blur", function() {
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
      offset[0] = newFloat;
    });

    $("#sourceOffsetY").on("keyup blur", function() {
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
      offset[1] = newFloat;
    });

    $("#sourceColourText").on("keyup blur", function() {
      $("#ppSourceColourTest").css("background-color","#"+$(this).val());
    });

    $("#ppSourceDraw").click(function(){
      drawTrajectoryFromSource($("#sourceText").val(),offset,$("#ppSourceColourTest").css("background-color"));
      $("#popoutOverlay, #popout").remove();
    });
  }
}

function trajResetFrame(n,frame,type){
  switch (type){
    case 0:
      setTimeout(function(){
        $("#"+n+"f"+frame).attr("r",15);
      }, 100);
      break;
    case 1:
      setTimeout(function(){
        $("#"+n+"f"+frame).css("stroke-width",0);
      }, 100);
      break;
    case 2:
      setTimeout(function(){
        $("#"+n+"f"+frame).attr("r",40);
      }, 100);
      break;
    case 3:
      break;
    default:
      break;
  }
}

function trajAnimFrame(n,frame,dupes){
  setTimeout(function(){
    if (frame == t["t"+n].killFrame){
      if (!isDupe(n,dupes[5])){
        var snd3 = new Audio("assets/sounds/kill.wav");
        snd3.volume = curVolume/10;
        snd3.play();
      }
      $("#"+n+"f"+frame).css("stroke-width",30);
      trajResetFrame(n,frame,1);
    }
    else if (frame == t["t"+n].hitstun){
      if (!isDupe(n,dupes[4])){
        var snd4 = new Audio("assets/sounds/falcondodge.wav");
        snd4.volume = curVolume/10;
        snd4.play();
      }
      $("#"+n+"f"+frame).css("stroke-width",30);
      trajResetFrame(n,frame,1);
    }
    else if (frame == t["t"+n].tFrames[1] + 1){
      if (!isDupe(n,dupes[3])){
        var snd5 = new Audio("assets/sounds/tactionable.wav");
        snd5.volume = curVolume/10;
        snd5.play();
      }
      $("#"+n+"f"+frame).attr("r",55);
      trajResetFrame(n,frame,2);
    }
    else {
      $("#"+n+"f"+frame).attr("r",30);
      trajResetFrame(n,frame,0);
    }
    frame++;
    if (t["t"+n].lastDisplay >= frame){
      trajAnimFrame(n,frame,dupes);
    }
    else {
      if (t["t"+n].hasCombo > 0){
        trajectoryAnimation(t["t"+n].hasCombo,dupes);
      }
    }
  }, 16.67);
}

function isDupe(n,dupes){
  var isD = false;
  for(var i=0;i<dupes.length;i++){
    if (n == dupes[i]){
      isD = true;
      break;
    }
  }
  return isD;
}

function trajectoryAnimation(n,dupes){
  frame = 1;
  if (!isDupe(n,dupes[0])){
    var snd1 = new Audio("assets/sounds/hit.wav");
    snd1.volume = curVolume/10;
    snd1.play();
  }
  if (t["t"+n].comboSnap > 0){
    $("#comboStartOuter"+n).attr("r",45).css("stroke-width",20);
    $("#comboStartInner"+n).css("stroke-width",5);
    setTimeout(function(){
      $("#comboStartOuter"+n).css("stroke-width",10).attr("r",35);
      $("#comboStartInner"+n).css("stroke-width",0);
    }, 100);

  }
  else {
    $("#start"+n).css("stroke-width",20);
    setTimeout(function(){
      $("#start"+n).css("stroke-width",0);
    }, 100);
  }
  var delay;
  if (t["t"+n].tFrames[0] > 0){
    delay = t["t"+n].tFrames[0];
  }
  else {
    delay = t["t"+n].hitlag;
  }
  if (t["t"+n].stayGrounded){
    setTimeout(function(){
      if (t["t"+n].knockback > 80){
        if (!isDupe(n,dupes[2])){
          var snd2 = new Audio("assets/sounds/tech.wav");
          snd2.volume = curVolume/10;
          snd2.play();
        }
      }
      else {
        if (!isDupe(n,dupes[1])){
          var snd2 = new Audio("assets/sounds/land.wav");
          snd2.volume = curVolume/10;
          snd2.play();
        }
      }
      $("#ccCircle"+n).css("stroke-width",20);
      $("#atCircle"+n).css("stroke-width",20);
      setTimeout(function(){
        $("#ccCircle"+n).css("stroke-width",0);
        $("#atCircle"+n).css("stroke-width",0);
      }, 300);
    }, 16.67*delay);
  }
  else {
    setTimeout(function(){
      trajAnimFrame(n,frame,dupes);
    }, 16.67*delay);
  }
}

function playAll(){

  // finding duplicates
  var d = {
    hit : [],
    land : [],
    tech : [],
    tactionable : [],
    lasthitstun : [],
    kill : []
  };

  for(j=1;j<10;j++){
    if (currentTrajs[j-1]){
      if (t["t"+j].comboSnap == 0){
        d.hit.push(0);
        if (t["t"+j].stayGrounded){
          if (t["t"+j].knockback < 80){
            d.land.push(t["t"+j].hitlag);
            d.tech.push(-1);
          }
          else {
            d.tech.push(t["t"+j].hitlag);
            d.land.push(-1);
          }
        }
        else {
          d.land.push(-1);
          d.tech.push(-1);
        }
        if (t["t"+j].tFrames[0] > 0){
          d.tactionable.push(t["t"+j].tFrames[0] + t["t"+j].tFrames[1]);
          if (t["t"+j].lastDisplay > t["t"+j].hitstun){
            d.lasthitstun.push(t["t"+j].tFrames[0] + t["t"+j].hitstun);
          }
          else {
            d.lasthitstun.push(-1);
          }
          if (t["t"+j].killFrame > 0){
            d.kill.push(t["t"+j].tFrames[0] + t["t"+j].killFrame);
          }
          else {
            d.kill.push(-1);
          }
        }
        else {
          d.tactionable.push(-1);
          if (t["t"+j].lastDisplay > t["t"+j].hitstun){
            d.lasthitstun.push(t["t"+j].hitlag + t["t"+j].hitstun);
          }
          else {
            d.lasthitstun.push(-1);
          }
          if (t["t"+j].killFrame > 0){
            d.kill.push(t["t"+j].hitlag + t["t"+j].killFrame);
          }
          else {
            d.kill.push(-1);
          }
        }

      }
      else {
        var firstHitReached = false;
        var offset = 0;
        var n = t["t"+j].comboSnap;
        var m = j;
        while (!firstHitReached){
          if (t["t"+n].tFrames[0] > 0){
            offset += t["t"+n].tFrames[0] + t["t"+m].cSnapFrame;
          }
          else {
            offset += t["t"+n].hitlag + t["t"+m].cSnapFrame + 1;
          }
          if (t["t"+n].comboSnap > 0){
            m = n;
            n = t["t"+n].comboSnap;
          }
          else {
            firstHitReached = true;
          }
        }

        d.hit.push(offset);
        if (t["t"+j].tFrames[0] > 0){
          d.tactionable.push(offset+t["t"+j].tFrames[0]+t["t"+j].tFrames[1]);
          if (t["t"+j].lastDisplay > t["t"+j].hitstun){
            d.lasthitstun.push(offset+t["t"+j].tFrames[0] + t["t"+j].hitstun);
          }
          else {
            d.lasthitstun.push(-1);
          }
          if (t["t"+j].killFrame > 0){
            d.kill.push(offset+t["t"+j].tFrames[0] + t["t"+j].killFrame);
          }
          else {
            d.kill.push(-1);
          }
        }
        else {
          d.tactionable.push(-1);
          if (t["t"+j].lastDisplay > t["t"+j].hitstun){
            d.lasthitstun.push(offset+t["t"+j].hitlag + t["t"+j].hitstun);
          }
          else {
            d.lasthitstun.push(-1);
          }
          if (t["t"+j].killFrame > 0){
            d.kill.push(offset+t["t"+j].hitlag + t["t"+j].killFrame);
          }
          else {
            d.kill.push(-1);
          }
        }
        d.land.push(-1);
        d.tech.push(-1);
      }
    }
    else {
      d.hit.push(-1);
      d.land.push(-1);
      d.tech.push(-1);
      d.tactionable.push(-1);
      d.lasthitstun.push(-1);
      d.kill.push(-1);
    }
  }

  var keys = Object.keys(d);
  var dupes = [];
  for (k=0;k<keys.length;k++){
    var dup = [];
    for (l=0;l<9;l++){
      if (d[keys[k]][l] > -1){
        for(m=0;m<l;m++){
          if(d[keys[k]][l] == d[keys[k]][m]){
            dup.push(l+1);
            break;
          }
        }
      }
    }
    dupes.push(dup);
  }

  /*console.log(d.hit);
  console.log(d.land);
  console.log(d.tech);
  console.log(d.tactionable);
  console.log(d.lasthitstun);
  console.log(d.kill);

  console.log(dupes);*/

  for(var i=0;i<9;i++){
    if (currentTrajs[i]){
      if (t["t"+(i+1)].comboSnap == 0){
        trajectoryAnimation(i+1,dupes);
      }
    }
  }
}

function drawTrajectoryFromSource(source,offset,colour){

  // (frame1x,frame1y),(frame2x,frame2y),(frame3x,frame3y)
  positionsArray = source.split(",(");
  for(i=0;i<positionsArray.length;i++){
    if (i == 0){
      var pos = positionsArray[i].substr(1,positionsArray[i].length - 2);
    }
    else {
      var pos = positionsArray[i].substr(0,positionsArray[i].length - 1);
    }
    positionsArray[i] = pos.split(",");
    positionsArray[i][0] = parseFloat(positionsArray[i][0]) + offset[0];
    positionsArray[i][1] = parseFloat(positionsArray[i][1]) + offset[1];
  }
  sources++;

  var temX = ((positionsArray[0][0]*10)+centreOffset[0]);
  var temY = ((-positionsArray[0][1]*10)+centreOffset[1]);

  var lineText = "M"+temX+" "+temY+" ";

  $(SVG("g")).attr("id","sourceGroup"+sources).appendTo("#trajectory");
  $(SVG("path")).attr("id","startS"+sources).attr("class","startS").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",colour).attr("stroke",colour).prependTo("#sourceGroup"+sources);

  for(i=1;i<positionsArray.length;i++){
    var x = positionsArray[i][0];
    var y = positionsArray[i][1];
    var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
    lineText += tempText;
  	if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){

        $(SVG("circle")).attr("id","s"+sources+"f"+(i+1)).attr("class","sfP"+aT+" sframePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).attr("fill",colour).attr("stroke",colour).prependTo("#sourceGroup"+sources);

  	}
  }
  $(SVG("path")).attr("id","strajLine"+sources).attr("class","strajLine "+sources).attr("d",lineText).attr("stroke",colour).attr("fill","transparent").prependTo("#sourceGroup"+sources);

}

function undoSource(){
  $("#sourceGroup"+sources).remove();
  if (sources > 0){
    sources--;
  }
}

function drawTrajectory(n, onlyDrawWhenUnfrozen, waitTillFinish){
  // n = trajectory number, using aT gets complicated with comboing
  //tried changing positions instead of redrawing, but didnt help firefox and created many other issues that'd have to be resolved in more code
  onlyDrawWhenUnfrozen = onlyDrawWhenUnfrozen || false;

  waitTillFinish = waitTillFinish || false;

  t["t"+n].killFrame = -1;

  var totalstale = 1.00;
  var damageunstaled = t["t"+n].curHitbox.dmg;
  if (charging){
    damageunstaled *= 1 + (t["t"+n].chargeF * (0.3671/60));
  }
  for(i=0;i<9;i++){
    if(t["t"+n].staleQueue[i]){
      totalstale -= (10-(i+1))/100;
    }
  }

  var damagestaled = damageunstaled * totalstale;

  if (t["t"+n].grabInterrupt) {
    damagestaled *= 0.5;
  }

  if (t["t"+n].curHitbox.article) damageunstaled = damagestaled;

  t["t"+n].newDamage = damagestaled;
  t["t"+n].shieldstun = Math.floor((Math.floor(damagestaled) * 0.45 + 2) * 200/201);
  //old formula : Math.floor((Math.floor(damagestaled) + 4.45) / 2.235);

  var xPos = 0;
  var yPos = 0;
  if (t["t"+n].trajFrozen){
    if (!onlyDrawWhenUnfrozen){
      xPos = t["t"+n].mouseXMeleeF;
      yPos = t["t"+n].mouseYMeleeF;
    }
  }
  else {
    xPos = t["t"+n].mouseXMelee;
    yPos = t["t"+n].mouseYMelee;
  }

  if (~t["t"+n].cHName[1].indexOf("throw")){
    var isThrow = true;
    var throwChar = t["t"+n].cHName[0];
    if (t["t"+n].cHName[1][0] == "c"){
      var throwType = "c"+t["t"+n].cHName[1][6];
    }
    else if (t["t"+n].cHName[1][0] == "k"){
      var throwType = "k"+t["t"+n].cHName[1][5];
    }
    else {
      var throwType = t["t"+n].cHName[1][0];
    }
  }
  else {
    var isThrow = false;
    var throwChar = false;
    var throwType = false;
  }

	var hit = new Hit(t["t"+n].percent,damagestaled,damageunstaled,t["t"+n].curHitbox.kg,t["t"+n].curHitbox.bk,t["t"+n].curHitbox.wbk,t["t"+n].curHitbox.angle,t["t"+n].character,t["t"+n].version,xPos,yPos,t["t"+n].crouch,t["t"+n].reverse,t["t"+n].chargeInterrupt,t["t"+n].tdiMouseXMelee,t["t"+n].tdiMouseYMelee,t["t"+n].fadeIn,t["t"+n].doubleJump,t["t"+n].sdiMouseXMelee,t["t"+n].sdiMouseYMelee,t["t"+n].zdiMouseXMelee,t["t"+n].zdiMouseYMelee,t["t"+n].adiMouseXMelee,t["t"+n].adiMouseYMelee,t["t"+n].meteorCancel,t["t"+n].vcancel,t["t"+n].grounded,t["t"+n].metal,t["t"+n].ice,t["t"+n].icg,isThrow,throwChar,throwType,t["t"+n].comboSnap,t["t"+n].cSnapFrame,t["t"+n].yoshiDJArmor);

	t["t"+n].curPositions = hit.positions;
  t["t"+n].hitstun = hit.hitstun;
  t["t"+n].knockback = hit.knockback;
  t["t"+n].tFrames = hit.tFrames;
  t["t"+n].hitlag = Math.floor(t["t"+n].newDamage * (1/3) + 3);
  if (hit.meteorCancelled){
    t["t"+n].hitstun = 8;
  }

  t["t"+n].stacked = hit.stacked;
  t["t"+n].stackedTrajectory = hit.stackedTrajectory;

  var comboCutOff = hit.positions.length;
  for (j=0;j<9;j++){
    if (t["t"+(j+1)].comboSnap == n){
      comboCutOff = t["t"+(j+1)].cSnapFrame + 1;
      break;
    }
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
    $("#trajGroup"+n+", #trajGroup-t"+n).remove();
    $(SVG("g")).attr("id","trajGroup"+n).appendTo("#trajectory");
    $(SVG("g")).attr("id","trajGroup-t"+n).appendTo("#trajectory-t");
    if (t["t"+n].comboSnap > 0){
      $(SVG("g")).attr("id","comboStart"+n).attr("class","comboStart").prependTo("#trajGroup"+n);
      $(SVG("g")).attr("id","comboStart-t"+n).attr("class","comboStart-t").prependTo("#trajGroup-t"+n);

      $(SVG("circle")).attr("id","comboStartOuter"+n).attr("class","comboStartOuter").attr("cx",temX).attr("cy",temY).attr("r",35).attr("fill","transparent").attr("stroke",palettes[t["t"+n].palette][1]).prependTo("#comboStart"+n);
      $(SVG("circle")).attr("id","comboStartInner"+n).attr("class","comboStartInner").attr("cx",temX).attr("cy",temY).attr("r",15).attr("fill",palettes[t["t"+n].palette][1]).attr("stroke",palettes[t["t"+n].palette][1]).prependTo("#comboStart"+n);

      $(SVG("circle")).attr("id","comboStartOuter-t"+n).attr("class","comboStartOuter-t").attr("cx",temX).attr("cy",temY).attr("r",35).attr("fill","transparent").prependTo("#comboStart-t"+n);
      $(SVG("circle")).attr("id","comboStartInner-t"+n).attr("class","comboStartInner-t").attr("cx",temX).attr("cy",temY).attr("r",15).attr("fill","transparent").prependTo("#comboStart-t"+n);

    }
    else{
      $(SVG("path")).attr("id","start"+n).attr("class","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",palettes[t["t"+n].palette][1]).attr("stroke",palettes[t["t"+n].palette][1]).prependTo("#trajGroup"+n);
      $(SVG("path")).attr("id","start-t"+n).attr("class","start-t").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajGroup-t"+n);
    }
  //}
  //$("#trajGroup"+n+" .framePos").css("fill","#25d041");
  var isKilled = false;
  var i = 0;

  t["t"+n].stayGrounded = hit.stayGrounded;

  if (hit.stayGrounded && t["t"+n].grounded){
    t["t"+n].yDisplacement = hit.yDisplacement;
    if (hit.knockback >= 80){
      //amsah tech

      $(SVG("text")).attr("id","at"+n).attr("class","at").attr("x",temX+32).attr("y",temY-24).attr("font-size","80px").attr("font-family","'Share Tech Mono', 'Ubuntu Mono', Consolas, 'Courier New'").attr("font-weight","bold").attr("fill","white").prependTo("#trajGroup"+n);
      if (t["t"+n].palette == 2 || t["t"+n].palette == 3){
        $("#at"+n).attr("fill","black");
      }
      $("#at"+n).append("AT");
      $(SVG("circle")).attr("id","atCircle"+n).attr("class","atCircle").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill",palettes[t["t"+n].palette][0]).attr("stroke",palettes[t["t"+n].palette][0]).prependTo("#trajGroup"+n);
      $(SVG("circle")).attr("id","atCircle-t"+n).attr("class","atCircle-t").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill","transparent").prependTo("#trajGroup-t"+n);
    }
    else {
      //crouch cancel
      $(SVG("text")).attr("id","cc"+n).attr("class","cc").attr("x",temX+32).attr("y",temY-24).attr("font-size","80px").attr("font-family","'Share Tech Mono', 'Ubuntu Mono', Consolas, 'Courier New'").attr("font-weight","bold").attr("fill","white").prependTo("#trajGroup"+n);
      if (t["t"+n].palette == 2 || t["t"+n].palette == 3){
        $("#cc"+n).attr("fill","black");
      }
      $("#cc"+n).append("CC");
      $(SVG("circle")).attr("id","ccCircle"+n).attr("class","ccCircle").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill",palettes[t["t"+n].palette][0]).attr("stroke",palettes[t["t"+n].palette][0]).prependTo("#trajGroup"+n);
      $(SVG("circle")).attr("id","ccCircle-t"+n).attr("class","ccCircle-t").attr("cx", temX+76).attr("cy",temY-50).attr("r", 60).attr("fill","transparent").prependTo("#trajGroup-t"+n);
    }
  }

  while (!isKilled && i < comboCutOff){
  	var x = hit.positions[i][0];
  	var y = hit.positions[i][1];
    var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
    lineText += tempText;
  	if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){
      if (i == t["t"+n].tFrames[1]){
        var temX = ((x*10)+centreOffset[0]);
        var temY = ((-y*10)+centreOffset[1]);
        $(SVG("circle")).attr("id",n+"f"+(i+1)).attr("class","actCircle").attr("cx", temX).attr("cy",temY).attr("r", 40).attr("fill",palettes[t["t"+n].palette][1]).attr("stroke",palettes[t["t"+n].palette][1]).appendTo("#trajGroup"+n);
        $(SVG("circle")).attr("id",n+"f"+(i+1)+"-t").attr("class","actCircle-t").attr("cx", temX).attr("cy",temY).attr("r",30).attr("fill","transparent").appendTo("#trajGroup-t"+n);
        $(SVG("text")).attr("id","act"+n).attr("class","act").attr("x",temX-20).attr("y",temY+22).attr("font-size","70px").attr("font-family","'Share Tech Mono', 'Ubuntu Mono', Consolas, 'Courier New'").attr("font-weight","bold").attr("fill",palettes[t["t"+n].palette][0]).appendTo("#trajGroup"+n);
        if (t["t"+n].palette == 2 || t["t"+n].palette == 3){
          $("#act"+n).attr("fill","black");
        }
        $("#act"+n).append("A");
      }
      else if (i+1 == t["t"+n].hitstun){
        var temX = ((x*10)+centreOffset[0]);
        var temY = ((-y*10)+centreOffset[1]);
        $(SVG("path")).attr("id",n+"f"+(i+1)).attr("class","lastHitstun").attr("d","M"+temX+" "+(temY-40)+" L"+(temX+40)+" "+temY+" L"+temX+" "+(temY+40)+" L"+(temX-40)+" "+temY+" Z").attr("fill",palettes[t["t"+n].palette][0]).attr("stroke",palettes[t["t"+n].palette][0]).prependTo("#trajGroup"+n);
        $(SVG("path")).attr("id",n+"f"+(i+1)+"-t").attr("class","lastHitstun-t pos"+i).attr("d","M"+temX+" "+(temY-40)+" L"+(temX+40)+" "+temY+" L"+temX+" "+(temY+40)+" L"+(temX-40)+" "+temY+" Z").prependTo("#trajGroup-t"+n);
      }
      else {
        $(SVG("circle")).attr("id",n+"f"+(i+1)).attr("class","fP"+n+" framePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).attr("fill",palettes[t["t"+n].palette][0]).attr("stroke",palettes[t["t"+n].palette][0]).prependTo("#trajGroup"+n);
        $(SVG("circle")).attr("id",n+"f"+(i+1)+"-t").attr("class","fP-t"+n+" framePos-t").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajGroup-t"+n);
        if (i+1 > t["t"+n].hitstun){
          $("#"+n+"f"+(i+1)).attr("class","fPnH"+n+" framePos").attr("fill",palettes[t["t"+n].palette][1]).attr("stroke",palettes[t["t"+n].palette][1]);
        }
      }
  	}
  	else {
      //checks if vertical knockback velocity is greater or equal to 2.4 when above the top blastzone
      if (x >= bzRight || x <= bzLeft || y <= bzBottom || (y >= bzTop && hit.positions[i][3] >= 2.4)){
        temX = ((x*10)+centreOffset[0]);
        temY = ((-y*10)+centreOffset[1]);
        $(SVG("path")).attr("id",n+"f"+(i+1)).attr("class","kill").attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").attr("fill",palettes[t["t"+n].palette][2]).attr("stroke",palettes[t["t"+n].palette][2]).appendTo("#trajGroup"+n);
        $(SVG("path")).attr("id",n+"f"+(i+1)+"-t").attr("class","kill-t pos"+i).attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").appendTo("#trajGroup-t"+n);
        cla = "tLineK";
        isKilled = true;
        t["t"+n].killFrame = i+1;
        if (i <= hit.hitstun){
          $("#trajGroup"+n+" .framePos").attr("class","fPK"+n+" framePos").attr("fill",palettes[t["t"+n].palette][2]).attr("stroke",palettes[t["t"+n].palette][2]);;
        }
      }
    }

    i++;
  }

  t["t"+n].lastDisplay = i;
  //$("#trajLine"+n).remove();
  $(SVG("path")).attr("id","trajLine"+n).attr("class","trajLine "+cla+n).attr("d",lineText).prependTo("#trajGroup"+n);
  if (cla == "tLineS"){
    $("#trajLine"+n).attr("stroke",palettes[t["t"+n].palette][1]);
  }
  else {
    $("#trajLine"+n).attr("stroke",palettes[t["t"+n].palette][0]);
  }

  if (t["t"+n].hasCombo > 0){
    var cT = t["t"+n].hasCombo;
    t["t"+cT].mouseXMeleeF = hit.positions[t["t"+cT].cSnapFrame][0];
    t["t"+cT].mouseYMeleeF = hit.positions[t["t"+cT].cSnapFrame][1];
    drawTrajectory(cT,false);
  }

  if (!onlyDrawWhenUnfrozen){
    trajPosInfo();
  }
  if (t["t"+n].curHitbox.angle == 361){
    drawAngle();
  }

  $("#newDamageEdit").empty().append(damagestaled.toPrecision(5));

  refreshKnockdownBox(aT);
  drawAngle();

  // when drawTrajectory didnt take a trajectory number argument and always used aT, I needed this when temporarily changing aT, but I shouldn't need it anymore
  if (waitTillFinish){
    return true;
  }
}

function formatTDIStrength(val) {
  if (val >= 100) return "100";
  else return val.toFixed(1);
}

function setPosInfoOffset(id){
  var frameposy = mouseZoomY;
  var frameposx = mouseZoomX;
  scroll = getScrollPos();
  var borders = $("#display").css("border-width");
  borders = borders.split(" ");
  borders[1] = parseInt(borders[1].substr(0,borders[1].length-2));
  borders[0] = parseInt(borders[0].substr(0,borders[0].length-2));
  if (mouseY + 95 > displayheight - (2*borders[0])){
    frameposy = scroll[0] + displayheight - 95 - (2*borders[0]);
  }
  if (mouseX + 165 > midwidth - (2*borders[1])){
    frameposx = scroll[1] + midwidth - 165 - (2*borders[1]);
  }

  $(".framePosInfoBox").css({"top":frameposy+5,"left":(frameposx+20),"border":"2px solid "+palettes[t["t"+id].palette][0]});
}

function trajPosInfo(){
  $(".framePos-t, .start-t, .comboStartOuter-t, .lastHitstun-t, .kill-t, .ccCircle-t, .atCircle-t, .actCircle-t").unbind("mouseenter").unbind("mouseleave");
  $(".framePosInfoBox").remove();
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
    setPosInfoOffset(tid);

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
    var hitlag = Math.floor(t["t"+id].newDamage * (1/3) + 3);
    if (t["t"+id].curHitbox.effect == "Electric"){
      hitlag = Math.floor(hitlag * 1.5);
    }
    if (t["t"+id].crouch){
      hitlag = Math.floor(hitlag * (2/3));
    }
    $("#start"+id).css("stroke-width",20);
    if (t["t"+id].tFrames[0] > 0){
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:95px"><span style="font-size:15px">Position Hit</span><br>X: '+((Math.round(t["t"+id].mouseXMeleeF*100))/100)+' Y: '+((Math.round(t["t"+id].mouseYMeleeF*100))/100)+'<br>Release: '+t["t"+id].tFrames[0]+'<br>Hitstun: '+t["t"+id].hitstun+'<br>KB: '+kb+'<br>Shieldstun: '+t["t"+id].shieldstun+'</div>');
    }
    else {
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:95px"><span style="font-size:15px">Position Hit</span><br>X: '+((Math.round(t["t"+id].mouseXMeleeF*100))/100)+' Y: '+((Math.round(t["t"+id].mouseYMeleeF*100))/100)+'<br>Hitlag: '+hitlag+'<br>Hitstun: '+t["t"+id].hitstun+'<br>KB: '+kb+'<br>Shieldstun: '+t["t"+id].shieldstun+'</div>');
    }
    setPosInfoOffset(id);

  }, function(){
    $(".start").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".comboStartOuter-t").hover(function(){
    var id = parseInt($(this).attr("id").substr(17,18));
    var kb = t["t"+id].knockback.toPrecision(4);
    if (t["t"+id].knockback < 80){
      kb += " (No Tumble)";
    }
    else {
      kb += " (Tumble)";
    }
    var hitlag = Math.floor(t["t"+id].newDamage * (1/3) + 3);
    if (t["t"+id].curHitbox.effect == "Electric"){
      hitlag = Math.floor(hitlag * 1.5);
    }
    if (t["t"+id].crouch){
      hitlag = Math.floor(hitlag * (2/3));
    }
    $("#comboStartOuter"+id).attr("r",45);
    $("#comboStartOuter"+id).css("stroke-width",20);
    $("#comboStartInner"+id).css("stroke-width",5);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:95px"><span style="font-size:15px">Combo Hit</span><br>(trajectory '+t["t"+id].comboSnap+', frame '+(t["t"+id].cSnapFrame+1)+')<br>X: '+((Math.round(t["t"+id].mouseXMeleeF*100))/100)+' Y: '+((Math.round(t["t"+id].mouseYMeleeF*100))/100)+'<br>Hitlag: '+hitlag+'<br>Hitstun: '+t["t"+id].hitstun+'<br>KB: '+kb+'</div>');
    setPosInfoOffset(id);

  }, function(){
    $(".comboStartOuter").css("stroke-width",10).attr("r",35);
    $(".comboStartInner").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".lastHitstun-t").hover(function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:13px">Last Hitstun Frame ('+(fid)+')</span><br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    setPosInfoOffset(tid);

  }, function(){
    $(".lastHitstun").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });

  $(".actCircle-t").hover(function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).attr("r",55);
    if (fid > t["t"+tid].hitstun){
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:13px">Thrower Actionable</span><br>Actionable frame: '+(fid-t["t"+tid].hitstun)+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    else {
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:13px">Thrower Actionable</span><br>Frame of hitstun: '+fid+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    setPosInfoOffset(tid);

  }, function(){
    $(".actCircle").attr("r",40);
    $(".framePosInfoBox").remove();
  });

  $(".kill-t").hover(function(){
    var id = $(this).attr("id");
    var fid = parseInt(id.substr(2,(id.length - 3)));
    var tid = parseInt(id.substr(0,1));
    $("#"+tid+"f"+fid).css("stroke-width",20);
    if (fid > t["t"+tid].hitstun){
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:13px">KILLED!</span><br>Actionable frame: '+(fid-t["t"+tid].hitstun)+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    else {
      $("#trajCanvas").after('<div class="framePosInfoBox" style="height:70px"><span style="font-size:13px">KILLED!</span><br>Frame of hitstun: '+fid+'<br>Pos X:'+((Math.round(t["t"+tid].curPositions[fid-1][0]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][1]*100))/100)+'<br>KBVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][2]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][3]*100))/100)+'<br>CHVel X:'+((Math.round(t["t"+tid].curPositions[fid-1][4]*100))/100)+' Y:'+((Math.round(t["t"+tid].curPositions[fid-1][5]*100))/100)+'</div>');
    }
    setPosInfoOffset(tid);

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
    setPosInfoOffset(id);

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
    setPosInfoOffset(id);

  }, function(){
    $(".atCircle").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });
}

function getScrollPos() {
  if ($("#display").length > 0){
    sT = $("#display").scrollTop();
    sL = $("#display").scrollLeft();

    return[sT,sL];
  }
  else {
    return[0,0];
  }
}

function zoomToTrajectory(){
  var disW = $("#display").width();
  var disH = $("#display").height();
  var zoomW = $("#trajBackground").width();
  var zoomH = $("#trajBackground").height();
  var widthRatio = zoomW/dimensions[activeStage][0];
  var heightRatio = zoomH/dimensions[activeStage][1];
  var tPosX = ((t["t"+aT].mouseXMeleeF*10)+(-bzLeft*10+50))*widthRatio;
  var tPosY = ((t["t"+aT].mouseYMeleeF*-10)+(bzTop*10+50))*heightRatio;
  var moveX = tPosX-(disW/2);
  if (moveX < 0){
    moveX = 0;
  }
  var moveY = tPosY-(disH/2);
  if (moveY < 0){
    moveY = 0;
  }
  $("#display").scrollTop(moveY);
  $("#display").scrollLeft(moveX);
}

$(document).ready(function(){
  for (var i=0;i<6;i++){
    sounds[i].volume = 0;
    sounds[i].play();
  }
  if (mobile){
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="popoutApp"><div id="ppATitle"><p>Android App coming soon!</p></div><div id="ppSClose" class="ppSClose"><p>x</p></div><div id="ppAMain"><div id="ppAImage"><div id="ppAImageContainer"><img id="ppAImage1" class="ppAImage" src="assets/trajectory/app1.png"/><img id="ppAImage2" class="ppAImage" src="assets/trajectory/app2.png"/></div><div id="ppAImageSelector"><div id="ppAIS1" class="ppAIS ppAISelected"></div><div id="ppAIS2" class="ppAIS"></div></div></div"></div><div id="ppADetails"><div id="ppADetailTitle"><img id="ppAIcon" src="assets/trajectory/appicon.png"/><p>Melee Calculator <span id="ppASmallText"> for Android</span></p></div><ul><li>New User Interface built for ease of access</li><li>Find Kill Percents for any attack at any position</li><li>Find CC, ASDI Down and Amsah Teching maximum percents</li><li>Draw trajectories</li><li>Save, manage and share calculations</li></ul><p>and much more...<br><br>Release: TBA</div></div></div>');
    if (screen.height > screen.width){
      $("#popoutApp").css("width",screen.width+"px");
      $("#ppAMain").css({"width":screen.width+"px"});
      $("#popoutApp").css({"height":screen.height+"px","top":"0%"});
      $("#ppAImage").css({"display":"block","width":screen.width+"px","height":"60%"});
      $("#ppADetails").css({"display":"block","width":screen.width+"px","height":"40%"});
    }
    $("#ppAMain").height($("#popoutApp").height()-50);
    $("#ppAImageContainer").height($("#ppAImage").height()-60);
    $(".ppAImage").height($("#ppAImage").height()-80);
    $("#ppAImageSelector").css("margin-left",(($("#ppAImage").width()-68)/2)+"px");
    var ratio = 675/1200;
    $(".ppAImage").css("margin","10px "+(($("#ppAImage").width() - ($("#ppAImage2").height()*ratio))/2)+"px");
    $("#ppSClose").unbind("mouseover click");
    $("#ppSClose").hover(function(){
      $(this).toggleClass("ppSCloseHighlight");
    });
    $(".ppAIS").click(function(){
      if (!$(this).hasClass("ppAISelected")){
        $(".ppAIS").removeClass("ppAISelected");
        $(this).addClass("ppAISelected");
        var id = $(this).attr("id");
        id = parseInt(id.substr(5,1));
        $(".ppAImage").fadeOut();
        $("#ppAImage"+id).fadeIn();
      }
    });
    $("#ppSClose").click(function(){
      $("#popoutOverlay, #popout").remove();
    });
  }
  $("#header").hide();
  attackTable();
	$(document).on('mousemove', function(e){
    scroll = getScrollPos();
		mouseX = e.pageX - trajOffset.left;
		mouseY = e.pageY - trajOffset.top;
    mouseZoomX = e.pageX - trajOffset.left + scroll[1];
    mouseZoomY = e.pageY - trajOffset.top + scroll[0];
    diMouseX = e.pageX - diOffset.left;
    diMouseY = e.pageY - diOffset.top;
    //console.log("mouseX/Y: "+mouseX+"/"+mouseY);
    //console.log("mouseZoomX/Y: "+mouseZoomX+"/"+mouseZoomY);

	});

  $(document).on("ps-scroll-y",function(){
    diOffset = $("#"+activeDI+"diSelector").offset();
  });

  $("#tdiUser").hide();
  $("#sdiUser").hide();
  $("#zdiUser").hide();
  $("#adiUser").hide();
  $("#sdiBox").hide();
  $("#zdiBox").hide();
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
      drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
      $("#zdiBox").show();
      activeDI = "z";
    }
    else if (activeDI == "z"){
      $("#zdiBox").hide();
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

	drawTrajectory(aT);

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
    drawTrajectory(aT);
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
      drawTrajectory(aT);
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
      drawTrajectory(aT);
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
    drawTrajectory(aT);

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
    drawTrajectory(aT);
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

  $("#csRealButton").click(function(){
    if (comboSnapping){
      $("#csSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("Off");
      comboSnapping = false;
    }
    else {
      $("#csSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("On");
      comboSnapping = true;
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
    drawTrajectory(aT);
  });

  $("#hwgRealButton").click(function(){
    if (t["t"+aT].grabInterrupt){
      $("#hwgSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].grabInterrupt = false;
    }
    else {
      $("#hwgSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].grabInterrupt = true;
    }
    drawTrajectory(aT);
  });

  $("#ydjaRealButton").click(function(){
    if (t["t"+aT].yoshiDJArmor){
      $("#ydjaSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].yoshiDJArmor = false;
    }
    else {
      $("#ydjaSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].yoshiDJArmor = true;
    }
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
  });

  $("#icgRealButton").click(function(){
    if (t["t"+aT].icg){
      $("#icgSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].icg = false;
    }
    else {
      $("#icgSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].icg = true;
    }
    drawTrajectory(aT);
  });

  $("#mtRealButton").click(function(){
    if (t["t"+aT].metal){
      $("#mtSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].metal = false;
    }
    else {
      $("#mtSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].metal = true;
    }
    drawTrajectory(aT);
  });

  $("#dicRealButton").click(function(){
    if (t["t"+aT].ice){
      $("#dicSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      t["t"+aT].ice = false;
    }
    else {
      $("#dicSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      t["t"+aT].ice = true;
    }
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
      t["t"+newTraj].hasCombo = 0;
      t["t"+newTraj].comboSnap = 0;
      t["t"+newTraj].cSnapFrame = 0;
      t["t"+newTraj].palette = savedPalettes[newTraj-1];
      aT = newTraj;

      if (newTraj > 1){
        $("#trajBox"+(newTraj-1)).after('<div id="trajBox'+newTraj+'" class="trajBox trajBoxSelected"><div id="trajNum'+newTraj+'" class="trajNum"><div class="trajFreeze freezeOn"></div><p>'+newTraj+'</p></div><div id="trajColour'+newTraj+'" class="trajColour"><div id="t'+newTraj+'minicolour1" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][0]+'"></div><div id="t'+newTraj+'minicolour2" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][1]+'"></div><div id="t'+newTraj+'minicolour3" class="tminicolour" style="background-color:'+palettes[t["t"+newTraj].palette][2]+'"></div></div><div id="trajLabel'+newTraj+'" class="trajLabel"><p>Add label</p></div><div id="trajDelete'+newTraj+'" class="trajDelete"><p>x</p></div></div>');
      }
      else {
        $("#trajBoxContainer").prepend('<div id="trajBox1" class="trajBox trajBoxSelected"><div id="trajNum1" class="trajNum"><div class="trajFreeze freezeOn"></div><p>1</p></div><div id="trajColour1" class="trajColour"><div id="t1minicolour1" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][0]+'"></div><div id="t1minicolour2" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][1]+'"></div><div id="t1minicolour3" class="tminicolour" style="background-color:'+palettes[t["t1"].palette][2]+'"></div></div><div id="trajLabel1" class="trajLabel"><p>Add label</p></div><div id="trajDelete1" class="trajDelete"><p>x</p></div></div>');
      }

      drawTrajectory(aT);

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
    $("body").prepend('<div id="popoutOverlay"></div><div id="popout"><div id="ppSVid"><iframe width="420" height="315" src="https://www.youtube.com/embed/yOHATN4kFLc" frameborder="0" allowfullscreen></iframe></div><div id="ppSVidClose" class="ppSClose"><p>x</p></div></div></div>');
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
        drawTrajectory(aT);
      }
    }
    if (!container4.is(e.target)){
      if(container4.val() == ""){
        container4.val("0");
        t["t"+aT].chargeF = 0;
        drawTrajectory(aT);
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
    drawTrajectory(aT);
  });

  $("#percentPreciseEdit").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),false,false,true);
    //temp = Math.abs(temp);
    $(this).val(temp);
    t["t"+aT].fractional = temp;
    t["t"+aT].percent = parseFloat(Math.floor(t["t"+aT].percent)+"."+t["t"+aT].fractional);
    drawTrajectory(aT);
  });

  $("#chargingNumberEdit").on("keyup blur", function() {
    var temp = deleteNonNumbers($(this).val(),false,false,false);
    if (temp > 60){
      temp = 60;
    }
    temp = Math.abs(temp);
    $(this).val(temp);
    t["t"+aT].chargeF = temp;
    drawTrajectory(aT);
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
    drawTrajectory(aT);
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
    drawTrajectory(aT);
  });

  $(".stageselect").click(function(){
    $(".stageselect").removeClass("stageselected");
    $(this).addClass("stageselected");
    var id = $(this).attr("id");
    id = id.substr(0,2);
    activeStage = id;
    changeStage(id);
    //var savedaT = aT;

    for(x=0;x<9;x++){
      if(currentTrajs[x]){
        //aT = x+1;
        drawTrajectory(x+1);
      }
    }
    //aT = savedaT;

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
    drawTrajectory(aT);
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

    drawTrajectory(aT);
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
  $("#display").perfectScrollbar();
  amount = 74;
  $("#zoomSliderPointer").draggable({axis:"y",containment:"parent",drag:function(){
    amount = parseInt($(this).css("top"));
    zoom = 5 - ((amount/74) * 4);
    resizing();
    zoomToTrajectory();
    //console.log("amount = "+amount+" , zoom = "+zoom);
  }});

  $(".zoomButton").click(function(){
    //console.log("OLD: amount = "+amount+" , zoom = "+zoom);
    var id = $(this).attr("id");
    if (id[4] == "P"){
      if (zoom < 5){
        zoom = Math.round(zoom + 1);
        if (zoom > 5){
          zoom = 5;
        }
      }
    }
    else {
      if (zoom > 1){
        zoom = Math.round(zoom - 1);
        if (zoom < 1){
          zoom = 1;
        }
      }
    }
    amount = Math.round(((5 - zoom)*74)/4);
    //console.log("NEW: amount = "+amount+" , zoom = "+zoom);
    $("#zoomSliderPointer").css("top",amount+"px");
    resizing();
    zoomToTrajectory();
  });

  $(".volumeButton").click(function(){
    if ($(this).hasClass("volumeUp")){
      changeVolume(true);
    }
    else {
      changeVolume(false);
    }
    $("#volumeLevel p").empty().append(curVolume);
  });

  $("#hotkeyContainer").hover(function(){
    $("#hotkeys").toggle();
  });

  $(".activehk").hover(function(){
    var id = $(this).attr("id");
    id = id.substr(3,id.length-3);
    var text;
    switch (id){
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        text = "Selects trajectory "+id;
        break;
      case "u":
        text = "Removes last created trajectory from input";
        break;
      case "i":
        text = "Opens trajectory input window";
        break;
      case "o":
        text = "Opens output info dump for all trajectories";
        break;
      case "a":
        text = "Plays animation for all trajectories";
        break;
      case "s":
        text = "Toggles snap to surfaces";
        break;
      case "q":
        text = "Plays animation for active trajectory";
        break;
      case "c":
        text = "Toggles combo snapping";
        break;
      case "z":
        text = "Zoom in";
        break;
      case "x":
        text = "Zoom out";
        break;
      case "up":
      case "left":
      case "down":
      case "right":
        text = "Moves viewpoint "+id+" (when zoomed in)";
        break;
    }

    $("#hotkeyDescriptionEdit").empty().append(text);
  },function(){
    $("#hotkeyDescriptionEdit").empty().append("Hover over a key");
  });

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (!($("textarea").is(':focus'))){
      switch (evt.keyCode) {
        // 1-9
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          var num = evt.keyCode-48;
          if (currentTrajs[num-1]){
            $(".trajBox").removeClass("trajBoxSelected");
            $("#trajBox"+num).addClass("trajBoxSelected");
            var pT = aT;
            aT = num;
            //prompt(aT);
            //prompt(t["t"+aT].cHName);
            swapOptions();
            //trajectoryAnimation(aT);
            if (pT != aT){
              t["t"+pT].trajFrozen = true;
              $("#trajNum"+pT+" .trajFreeze").removeClass("freezeOff").addClass("freezeOn");
            }
          }
          break;
        // a
        case 65:
          playAll();
          break;
        // c
        case 67:
          if (comboSnapping){
            $("#csSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("Off");
            comboSnapping = false;
          }
          else {
            $("#csSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("On");
            comboSnapping = true;
          }
          break;
        // s
        case 83:
          if (snapping){
            $("#stsSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("Off");
            snapping = false;
          }
          else {
            $("#stsSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("On");
            snapping = true;
          }
          break;
        // o
        case 79:
          outputPopup();
          break;
        // i
        case 73:
          sourcePopup();
          break;
        // u
        case 85:
          undoSource();
          break;
        // q
        case 81:
          var dupes = [[],[],[],[],[],[]];
          trajectoryAnimation(aT,dupes);
          break;
        // z
        case 90:
          if (zoom < 5){
            zoom = Math.round(zoom + 1);
            if (zoom > 5){
              zoom = 5;
            }
          }
          amount = Math.round(((5 - zoom)*74)/4);
          $("#zoomSliderPointer").css("top",amount+"px");
          resizing();
          zoomToTrajectory();
          break;
        // x
        case 88:
          if (zoom > 1){
            zoom = Math.round(zoom - 1);
            if (zoom < 1){
              zoom = 1;
            }
          }
          amount = Math.round(((5 - zoom)*74)/4);
          $("#zoomSliderPointer").css("top",amount+"px");
          resizing();
          zoomToTrajectory();
          break;
        default:
          break;
      }
    }
  };

  readQueryString();


});
