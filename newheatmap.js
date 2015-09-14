var cw = 624;
var ch = 920;
var mm = 1244/92;
var airdodgev1 = 2.79000;
var airdodgev2 = 2.67039;
var airdodgev3 = 1.97283;
var sidecontrolsshow = true;
var currentwavedashangle = [[0,"f"],[0,"f"]];
var character = "fox";
var char = "fox";

var interpolateframe = true;

/*
script layout:
event1 = [action1, action2];
action1 = [type, ...]
if type = wavedash
action1 = [wavedash, singleorrange...]
if singleorrange = s
action1 = [wavedash, s, airdodge]
if singleorrange = r
action1 = [wavedash, r, [airdodge1,airdodge2]]
if type = attack
action2 = [attack, attacktype]
if attacktype has variables
action2 = [attack, left]
*/
var actiontypes = ["test","test2"];
var allac = ["Jump","Wavedash","Dash","Dash Back","Pivot","Soft Turn","Smash Turn","Shield","Run","Crouch","DoubleJump","Airdodge","Drift","Attack"];

/*var as = ["Jump"0,"Wavedash"1,"Dash"2,"Dash Back"3,"Pivot"4,"Soft Turn"5,"Smash Turn"6,"Shield"7,"Run"8,"Crouch"9,"DoubleJump"10,"Airdodge"11,"Drift"12,"Attack"13];*/

var fromactionoptions = {
  Wait : [0,1,2,3,5,6,7,13],
  Jump : [10,11,12,13],
  Wavedash : [0,1,2,3,5,6,7,13],
  Dash : [0,1,3,4,7,8,13],
  DashBack : [0,1,3,4,7,8,13],
  Pivot : [0,1,7,13],
  SoftTurn : [0,1,2,3,7,13],
  SmashTurn : [0,1,7,13],
  Shield : [0,1,13],
  Run : [0,1,7,9,13],
  Crouch : [0,1,2,3,7,13],
  DoubleJump : [11,12,13],
  Airdodge : [0,1,2,3,5,6,7,13],
  Drift : [10,11,13],
  Attack : []
}

var allat = ["Grab","Jab","Ftilt","Dtilt","Uptilt","Fsmash","Dsmash","Upsmash","Neutral-B","Side-B","Down-B","Up-B","Nair","Fair","Dair","Bair","Upair","Dash Attack","JC Grab","Dash Grab","Boost Grab"];

/*var allat = ["Grab"0,"Jab"1,"Ftilt"2,"Dtilt"3,"Uptilt"4,"Fsmash"5,"Dsmash"6,"Upsmash"7,"Neutral-B"8,"Side-B"9,"Down-B"10,"Up-B"11,"Nair"12,"Fair"13,"Dair"14,"Bair"15,"Upair"16,"Dash Attack"17,"JC Grab"18,"Dash Grab"19,"Boost Grab"20]; */
var fromactionattacks = {
  Wait : [0,1,2,3,4,5,6,7,8,9,10,11],
  Jump : [8,9,10,11,12,13,14,15,16],
  Wavedash : [0,1,2,3,4,5,6,7,8,9,10,11],
  Dash : [7,9,10,11,17,18,19,20],
  DashBack : [7,9,10,11,17,18,19,20],
  Pivot : [0,1,2,3,4,5,6,7,8,9,10,11],
  SoftTurn : [0,1,2,3,4,5,6,7,8,9,10,11],
  SmashTurn : [0,1,2,3,4,5,6,7,8,9,10,11],
  Shield : [0,7,11],
  Run : [7,9,10,11,17,18,19,20],
  Crouch : [0,1,2,3,4,5,6,7,8,9,10,11],
  DoubleJump : [8,9,10,11,12,13,14,15,16],
  Airdodge : [0,1,2,3,4,5,6,7,8,9,10,11],
  Drift : [8,9,10,11,12,13,14,15,16]
}


/*options from each state;
Dash: Jump, wavedash, dash back, pivot, shield, run, attacks(upsmash, B moves, grab, DA)
Wavedash: -- goes into Wait
Wait: jump, wavedash, dash, dash back, soft turn, smash turn, shield, all grounded moves
Run: jump, wavedash, shield, crouch, attacks(upsmash, b moves, grab, da)
First jump: doublejump, airdodge, drift, attacks(aerials, b moves)
Doublejump: airdodge, drift, attacks(aerials, b moves)
Pivot: grounded attacks
Shield: wavedash, jump, upsmash, up, roll
Crouch: grounded attacks
*/

var createHitbox = function(char,eventnum,attack,currentSpeedX,positionX,positionY,range,rnum){
  var att = window[char].attacks[attack];
  var k = -1;
  var idPresent = true;
  while (idPresent === true){
    if (typeof att["id"+(k+1)] !== "undefined"){
      idPresent = true;
      k++;
    }
    else {
      idPresent = false;
    }
  }
  /* NOW k IS THE NUMBER OF IDs in the attack*/

  for (i=0;i<att.idlist.length;i++){
    if (i === 0){
      var previousframe = 0;
    }
    else {
      var previousframe = att.idlist[i-1][0];
    }
    for (j=1;j<=att.idlist[i][0] - previousframe;j++){
      if (currentSpeedX >= window[char].maxwalk){
        currentSpeedX -= (window[char].traction * 2);
      }
      else {
        currentSpeedX -= window[char].traction;
      }
      positionX += currentSpeedX*mm;
    }
    for (n=0;n<att.idlist[i][1].length;n++){
      var currentFrameIdList = att.idlist[i][1];
      for (m=0;m<att["id"+currentFrameIdList[n]].offset.length;m++){
        if(att["id"+currentFrameIdList[n]].offset[m][0] === att.idlist[i][0]){
          var offsetListnumber = m;
        }
      }
      if (typeof offsetListnumber === "undefined"){
        /*prompt("something wrong");*/
      }
      else {
        /*prompt("something right");*/
      }
      var offsetIndex = att["id"+currentFrameIdList[n]].offset[offsetListnumber];
      if ($("#e"+eventnum+"a"+att.anum+"f"+(att.idlist[i][0]-1)+"i"+currentFrameIdList[n]).length){

        /*INTERPOLATING*/

        var id = "e"+eventnum+"a"+att.anum+"f"+att.idlist[i][0]+"i"+currentFrameIdList[n];
        var cla = "f"+att.idlist[i][0]+" id"+currentFrameIdList[n]+"f"+att.idlist[i][0]+attack;
        var previous = $("#e"+eventnum+"a"+att.anum+"f"+(att.idlist[i][0]-1)+"i"+currentFrameIdList[n]);
        if (previous.children(".currenthit").length){
          previous = previous.children(".currenthit");
        }
        /*$("#hitbox-visible").prepend('<g id="'+id+'" class="'+cla+' vis" ></g>');*/
        $(SVG("g")).attr("id",id).attr("class",cla+" vis "+range+" "+range+rnum).prependTo("#hitbox-visible");
        $(SVG("circle")).attr("class","currenthit").attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#"+id);
        /*$("#hitbox-invisible").prepend('<g id="'+id+'-i" class="'+cla+' invis" ></g>');*/
        $(SVG("g")).attr("id",id+"-i").attr("class",cla+" invis "+range+" "+range+rnum).prependTo("#hitbox-invisible");
        $(SVG("circle")).attr("class","currenthit").attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#"+id+"-i");


        var p = previous;
        var c = $("#"+id).children(".currenthit");
        var r = parseFloat(c.attr("r"));

        var a = parseFloat(c.attr("cx")) - parseFloat(p.attr("cx"));

        var b = parseFloat(c.attr("cy")) - parseFloat(p.attr("cy"));

        if (b > 0){
          var y = "b";
        }
        else {
          var y = "a";
        }

        var x = Math.atan(Math.abs(a)/Math.abs(b));

        var opp = Math.sin(x) * r;
        var adj = Math.cos(x) * r;

        var sigma = [parseFloat(p.attr("cx")),parseFloat(p.attr("cy"))];

        if (y === "b"){

          var alpha1 = [(sigma[0] + adj),(sigma[1] - opp)];
          var alpha2 = [(alpha1[0] + a), (alpha1[1] + b)];

          var beta1 = [(sigma[0] - adj),(sigma[1] + opp)];
          var beta2 = [(beta1[0] + a),(beta1[1] + b)];
        }
        else {
          var alpha1 = [(sigma[0] - adj),(sigma[1] - opp)];
          var alpha2 = [(alpha1[0] + a), (alpha1[1] + b)];

          var beta1 = [(sigma[0] + adj),(sigma[1] + opp)];
          var beta2 = [(beta1[0] + a),(beta1[1] + b)];
        }

        $(SVG("path")).attr("class","interpolation").attr("d", "M "+alpha1[0]+" "+alpha1[1]+" L "+alpha2[0]+" "+alpha2[1]+" A "+r+" "+r+" 0 0 1 "+beta2[0]+" "+beta2[1]+" L "+beta1[0]+" "+beta1[1]+" A "+r+" "+r+" 0 0 1 "+alpha1[0]+" "+alpha1[1]+" Z").prependTo("#"+id);

        $(SVG("path")).attr("class","interpolation").attr("d", "M "+alpha1[0]+" "+alpha1[1]+" L "+alpha2[0]+" "+alpha2[1]+" A "+r+" "+r+" 0 0 1 "+beta2[0]+" "+beta2[1]+" L "+beta1[0]+" "+beta1[1]+" A "+r+" "+r+" 0 0 1 "+alpha1[0]+" "+alpha1[1]+" Z").prependTo("#"+id+"-i");

      }
      else {
        var id = "e"+eventnum+"a"+att.anum+"f"+att.idlist[i][0]+"i"+currentFrameIdList[n];
        if (rnum > 1){
          $(SVG("g")).attr("id",id).attr("class","f"+att.idlist[i][0]+" vis id"+currentFrameIdList[n]+"f"+att.idlist[i][0]+attack+" range").prependTo("#hitbox-visible");
          $(SVG("g")).attr("id",id+"-i").attr("class","f"+att.idlist[i][0]+" invis id"+currentFrameIdList[n]+"f"+att.idlist[i][0]+attack+" range").prependTo("#hitbox-invisible");
        }
        if (rnum > 0){
          $(SVG("circle")).attr("class",range+rnum).attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#"+id);
          $(SVG("circle")).attr("class",range+rnum).attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#"+id+"-i");
        }
        if (rnum === 1){
          var r1 = $("#"+id).children(".r1");
          var r2 = $("#"+id).children(".r2");
          var r1c = [parseFloat(r1.attr("cx")),parseFloat(r1.attr("cy"))];
          var r2c = [parseFloat(r2.attr("cx")),parseFloat(r2.attr("cy"))];
          var rr = parseFloat(r1.attr("r"));
          $(SVG("path")).attr("class","rinterpolate").attr("d","M "+r1c[0]+" "+(r1c[1]-rr)+" L "+r2c[0]+" "+(r2c[1]-rr)+" A "+rr+" "+rr+" 0 0 1 "+r2c[0]+" "+(r2c[1]+rr)+" L "+r1c[0]+" "+(r1c[1]+rr)+" A "+rr+" "+rr+" 0 0 1 "+r1c[0]+" "+(r1c[1]-rr)+" Z").prependTo("#"+id);
          $(SVG("path")).attr("class","rinterpolate").attr("d","M "+r1c[0]+" "+(r1c[1]-rr)+" L "+r2c[0]+" "+(r2c[1]-rr)+" A "+rr+" "+rr+" 0 0 1 "+r2c[0]+" "+(r2c[1]+rr)+" L "+r1c[0]+" "+(r1c[1]+rr)+" A "+rr+" "+rr+" 0 0 1 "+r1c[0]+" "+(r1c[1]-rr)+" Z").prependTo("#"+id+"-i");
        }
        if (rnum === 0){
          $(SVG("circle")).attr("id","e"+eventnum+"a"+att.anum+"f"+att.idlist[i][0]+"i"+currentFrameIdList[n]).attr("class","f"+att.idlist[i][0]+" vis id"+currentFrameIdList[n]+"f"+att.idlist[i][0]+attack+" "+range+" "+range+rnum).attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#hitbox-visible");
          $(SVG("circle")).attr("id","e"+eventnum+"a"+att.anum+"f"+att.idlist[i][0]+"i"+currentFrameIdList[n]+"-i").attr("class","f"+att.idlist[i][0]+" invis id"+currentFrameIdList[n]+"f"+att.idlist[i][0]+attack+" "+range+" "+range+rnum).attr("cx", (positionX+(offsetIndex[1][0] * mm))).attr("cy", (positionY-(offsetIndex[1][1] * mm))).attr("r", (att["id"+currentFrameIdList[n]].hsize * mm)).prependTo("#hitbox-invisible");
        }


      }
      /*if ($("#e"+eventnum+"a"+att.anum+"f"+(att.idlist[i][0]-1)+"i"+currentFrameIdList[n]).length){
        var previous = $("#e"+eventnum+"a"+att.anum+"f"+(att.idlist[i][0]-1)+"i"+currentFrameIdList[n]);
        var current = $("#e"+eventnum+"a"+att.anum+"f"+(att.idlist[i][0])+"i"+currentFrameIdList[n]);
        $(SVG("line")).attr("x1",previous.attr("cx")).attr("y1",previous.attr("cy")).attr("x2",current.attr("cx")).attr("y2",current.attr("cy")).attr("style","stroke:rgb(120,0,0);stroke-width:"+(current.attr("r"))*2).prependTo("#hitbox-visible");
      }
      */
    }
  }
}

var dash = function(char, nof, currentSpeedX){
  var dashinit = window[char].dashinit;
  var dashterm = window[char].dashterm;
  var dashacc = window[char].dashacc;
  var traction = window[char].traction;

  var dashdistance = currentSpeedX;

  /*changing from true dash init, to pseudo*/
  if (dashinit > dashterm){
    dashinit -= traction*2;
    if (dashinit < dashterm){
      dashinit = dashterm;
    }
  }
  else if (dashinit < dashterm){
    dashinit += dashacc;
    if (dashinit > dashterm){
      dashinit = dashterm
    }
  }


  if (dashinit === dashterm){
		var dash = dashterm;
		var i = 1;
		while (i < nof){
			dashdistance += dash;
			i++;
    }
		currentSpeedX = dash;
	}
	else if (dashinit > dashterm){
		var zd = Math.round((dashinit - dashterm)/traction - 0.5);
		if (zd > (nof - 2)){
			zd = (nof - 2);
		}
		var dash = 0;
		var n = 0;

		while (n <= zd){
			dashdistance += (dashinit - traction*n);
			currentSpeedX = (dashinit - traction*n);
			n++;
    }
    if ((nof - zd - 2) !== 0){
		  dashdistance += dashterm*(nof - zd - 2);
      currentSpeedX = dashterm;
    }
  }
	else {
		var zd = Math.round((dashterm - dashinit)/dashacc - 0.5);
		if (zd > (nof - 2)){
			zd = (nof - 2);
		}
		dash = 0;
		n = 0;

		while (n <= zd){
			dashdistance += (dashinit + dashacc*n);
      currentSpeedX = (dashinit + dashacc*n);
			n++;
    }
    if ((nof - zd - 2) !== 0){
		  dashdistance += dashterm*(nof - zd - 2);
      currentSpeedX = dashterm;
    }
	}
	return [dashdistance, currentSpeedX];
}

var wavedash = function(char, airdodge){

  var airdodgev = parseFloat(airdodge);
  var jumpsquat = window[char].jumpsquat;
  var maxwalk = window[char].maxwalk;
  var traction = window[char].traction;
  var wavedash = 0;
  var currentSpeedX = 0;
	var zw_1 = Math.round((airdodgev - maxwalk)/(traction*2) + 0.5);
	if (zw_1 > 9 + jumpsquat) {
		zw_1 = 9 + jumpsquat;
  }
	var zw_2 = airdodgev - (zw_1*traction*2);

	if (char === "sheik" || char === "marth" || char === "link" || char === "dk" || char === "roy" || char === "bowser"){
		var cursed = true;
  }
	else {
		var cursed = false;
  }

	if (zw_1 >= 9 + jumpsquat){
		var n = 0
		if (cursed === true){
			wavedash = -0.5*airdodgev;
    }
		else {
			wavedash = 0;
    }

		while (n <= zw_1) {
      currentSpeedX = airdodgev - (traction*2) * n;
			wavedash = wavedash + airdodgev - (traction*2) * n;
			n = n + 1;
    }
  }
	else {

		var n = 0
		if (cursed === true){
			var wavedash_1 = -0.5*airdodgev;
    }
		else {
			var wavedash_1 = 0;
    }

		while (n <= zw_1){
      currentSpeedX = airdodgev - (traction*2) * n;
			wavedash_1 = wavedash_1 + airdodgev - (traction*2) * n;
			n = n + 1;
    }

		var m = 1
		var wavedash_2 = 0

		while (m <= (9 + jumpsquat - zw_1)) {
      currentSpeedX = zw_2 - traction * m;
			wavedash_2 = wavedash_2 + zw_2 - traction * m;
			m = m + 1;
    }
		wavedash = (wavedash_1 + wavedash_2);
  }
  return [wavedash, currentSpeedX];
}

function SVG(tag)
{
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

var createEvent = function(char){
  var eventnum = 1;
  var positionX = cw;
  var positionY = ch;
  var distance = 0;
  var frames = 0;
  var action1 = prompt("First action: ");
  if (action1 === "wavedash"){
    var wdangle = prompt("Wavedash angle: ");
    var distandspeed = wavedash(char,wdangle);
    distance = distandspeed[0];
    var currentSpeedX = distandspeed[1];
    positionX += (distance*mm);
    frames = frames + 10 + window[char].jumpsquat;
  }
  else if (action1 === "dash"){
    var currentSpeedX = 0;
    var nof = prompt("Number of dash frames up to "+window[char].dashframes[0]);
    var distandspeed = dash(char,nof,currentSpeedX);
    distance = distandspeed[0];
    currentSpeedX = distandspeed[1];
    positionX += (distance*mm);
    frames = nof;
  }
  var action2 = prompt("Second action: ");
  if (action2 === "jab"){

    createHitbox(char,eventnum,"jab1",currentSpeedX,positionX,positionY);

    /*var k = 0;
    var thing = true;
    while (thing === true){
      prompt("k="+k+" id number");
      if (typeof window[char].attacks.jab1["id"+k] != "undefined"){
        thing = true;
        for (j=1;j<window[char].attacks.jab1["id"+k].activeFrames.length + 1;j++){
          prompt("j="+j+" frame set");
          for (l=0;l<(window[char].attacks.jab1["id"+k].activeFrames[j-1][1] - window[char].attacks.jab1["id"+k].activeFrames[j-1][0] + 1);l++){
            prompt("l="+l+" frame number in j list");
            /*$("#main-content").children("svg").append('<circle id="'+'e1'+'f'+(frames)+'jab'+'" cx="'+(positionX+(window[char].attacks.jab1["id"+k].offset[j-1][0] * mm))+'" cy="'+(positionY-(window[char].attacks.jab1["id"+k].offset[j-1][1] * mm))+'" r="'+(window[char].attacks.jab1["id"+k].hsize * mm)+'" fill="red"/>');
            var oldvalues = [currentSpeedX,positionX,distance];
            for (p=1;p<=window[char].attacks.jab1["id"+k].activeFrames[j-1][l];p++){
              prompt("p="+p+" frame");
              if (currentSpeedX >= window[char].maxwalk){
                currentSpeedX = currentSpeedX - (window[char].traction * 2);
                prompt(currentSpeedX);
              }
              else {
                currentSpeedX = currentSpeedX - window[char].traction;
                prompt(currentSpeedX);
              }
              distance = distance + currentSpeedX;
              positionX = positionX + currentSpeedX*mm;
              prompt(distance);
            }
            var drift = window[char].attacks.jab1["id"+k].activeFrames;
            $(SVG("circle")).attr("id","e1"+"f"+(frames)+"jab").attr("class","f"+p).attr("cx", (positionX+(window[char].attacks.jab1["id"+k].offset[l][0] * mm))).attr("cy", (positionY-(window[char].attacks.jab1["id"+k].offset[l][1] * mm))).attr("r", (window[char].attacks.jab1["id"+k].hsize * mm)).appendTo("svg");
            currentSpeedX = oldvalues[0];
            positionX = oldvalues[1];
            distance = oldvalues[2];
          }
        }
        k++;
      }
      else {
        thing = false;
      }
    }*/
  }
}

var selectStart = function(char){

}

var interpretScript = function(script){
  var positionX = cw;
  var positionY = ch;
  var distance = 0;
  var frames = 0;
  var eventnum = 1;
  /*prompt(script);*/

  for (i=0;i<script.length;i++){
    switch (script[i][0]){
      case "Wavedash" :
        if (script[i][1] === "r"){
          var wdangle2 = script[i][3][0];
          var distandspeed2 = wavedash(char,wdangle2);
          var distance2 = distance;
          distance2 = distandspeed2[0];
          var currentSpeedX2 = distandspeed2[1];
          var positionX2 = positionX;
          var positionY2 = positionY;
          if (script[i][3][1] === "f"){
            positionX2 += (distance2*mm);
          }
          else {
            positionX2 -= (distance2*mm);
          }
          var frames2 = frames;
          frames2 = frames2 + 10 + window[char].jumpsquat;
        }
        var wdangle = script[i][2][0];
        /*prompt("wavedash angle "+wdangle);*/
        var distandspeed = wavedash(char,wdangle);
        distance = distandspeed[0];
        /*prompt("Distance "+distance);*/
        var currentSpeedX = distandspeed[1];
        /*prompt("CurrentSpeedX "+currentSpeedX);*/
        if (script[i][2][1] === "f"){
          positionX += (distance*mm);
        }
        else {
          positionX -= (distance*mm);
        }
        /*prompt("PositionX "+positionX);*/
        frames = frames + 10 + window[char].jumpsquat;
        break;

      case "Attack" :
        if (script[i-1][1] === "r"){
          createHitbox(char,eventnum,"jab1",currentSpeedX2,positionX2,positionY2,"r",2);
          createHitbox(char,eventnum,"jab1",currentSpeedX,positionX,positionY,"r",1);
        }
        else {
          createHitbox(char,eventnum,"jab1",currentSpeedX,positionX,positionY,"s",0);
        }
        break;
      default :
        /*prompt("test");*/
    }
  }
}


$(document).ready(function(){
  /*$(".invis").hover(function(){

  	$(this).attr("stroke","white");
  	var id = $(this).attr("id");
  	id = id.substr(0,(id.length - 2));
  	$("#"+id).attr("stroke","white");
	},function(){
  	$(this).attr("stroke","none");
  	var id = $(this).attr("id");
  	id = id.substr(0,(id.length - 2));
  	$("#"+id).attr("stroke","none");
  });*/

  $("body").on({
    mouseenter: function () {
      var id = $(this).attr("id");
      id = id.substr(0,(id.length - 2));
      if ($(this).children(".interpolation").length){
        if (interpolateframe){
          $(this).children(".interpolation").attr("stroke","white");
          $("#"+id).children(".interpolation").attr("stroke","white");
        }
        else {
          $(this).children(".currenthit").attr("stroke","white");
          $("#"+id).children(".currenthit").attr("stroke","white");
        }
      }
      else {
        $(this).attr("stroke","white");
        $("#"+id).attr("stroke","white");
      }
    },
    mouseleave: function () {
      var id = $(this).attr("id");
      id = id.substr(0,(id.length - 2));
      if ($(this).children(".interpolation").length){
        if (interpolateframe){
          $(this).children(".interpolation").attr("stroke","none");
          $("#"+id).children(".interpolation").attr("stroke","none");
        }
        else {
          $(this).children(".currenthit").attr("stroke","none");
          $("#"+id).children(".currenthit").attr("stroke","none");
        }
      }
      else {
        $(this).attr("stroke","none");
        $("#"+id).attr("stroke","none");
      }
    }
  }, ".invis");


  $("#movecontrols").click(function(){
    if (sidecontrolsshow){
      $(this).css("left","-150px");
      $("#main-content").css("left","-150px");
      sidecontrolsshow = false;
    }
    else {
      $(this).css("left","0px");
      $("#main-content").css("left","0px");
      sidecontrolsshow = true;
    }
  });

  $("#movecontrols").hover(function(){
    $(this).toggleClass("movecontrolshighlight");
    if ($(this).hasClass("movecontrolshighlight")){
      $(this).css("background-color","#d9d9d9");
    }
    else {
      $(this).css("background-color","#a4a4a4");
    }
  });

  $(".eventcreate").hover(function(){
    $(this).toggleClass("eventcreatehighlight");
  });

  $(".eventcreate").click(function(){
    event1 = [];
    var w = $(window).width();
    var h = $(window).height();
    $("body").prepend('<div id="popout" style="width:'+w+'px;height:'+h+'px"><div id="eventcustomize"><div id="eventcusttitle"><p>Event Options</p></div><div id="actioncontainer"><div class="addaction"><p>Add Action +</p></div></div><div id="actionoptions"></div></div></div>');
    var $ec = $("#eventcustomize");
    var ratio = $ec.width() / $ec.height() ;
    var top = (h - $ec.height())/2;
    var left = (w - $ec.width())/2;
    $ec.css({"top":top+"px","left":left+"px"});
    $("#popout").fadeIn(300);

  });

  $("body").on({
    mouseenter: function () {
      $(this).addClass("addactionhighlight");
    },
    mouseleave: function () {
      $(this).removeClass("addactionhighlight");
    }
  }, ".addaction");

  $("body").on("click",".addaction",function(){
    $(".addaction").remove();
    var i = 1;
    var a = true;
    while (a === true){
      if ($("#actionnum"+i).length){
        i++;
      }
      else {
        a = false;
      }
    }
    event1[i-1] = [];
    $("#actionoptions").empty();
    $(".actionnum").removeClass("actionnumselected");
    $("#actioncontainer").append('<div id="actionnum'+i+'" class="actionnum actionnumselected"><p>Action '+i+'</p></div>');
    $("#actionoptions").append('<div id="startvelocity" class="velocity"><p style="padding:7px 0px 0px 0px;display:block;">Starting velocity</p><p>X=<span id="svelocityx">0</span> | Y=<span id="svelocityy">0</span></p></div><div id="actionoptionpanel1"><div class="actiontypetitle"><p>Select Action Type</p></div></div><div id="endvelocity" class="velocity"><p style="padding:7px 0px 0px 0px;display:block;">Ending velocity</p><p>X=<span id="evelocityx">0</span> | Y=<span id="evelocityy">0</span></p></div>');
    if (i === 1){
      for (j=0;j<fromactionoptions.Wait.length;j++){
        $("#actionoptionpanel1").append('<div id="'+allac[fromactionoptions.Wait[j]]+'" class="actiontype"><p>'+allac[fromactionoptions.Wait[j]]+'</p></div>');
      }
    }
    else {
      for (j=0;j<fromactionoptions[actiontypes[i-2]].length;j++){
        $("#actionoptionpanel1").append('<div id="'+allac[fromactionoptions[actiontypes[i-2]][j]]+'" class="actiontype"><p>'+allac[fromactionoptions[actiontypes[i-2]][j]]+'</p></div>');
      }
    }

  });

  $("body").on({
    mouseenter: function () {
      $(this).addClass("addactionhighlight");
    },
    mouseleave: function () {
      $(this).removeClass("addactionhighlight");
    }
  }, ".actionnum");

  $("body").on({
    mouseenter: function () {
      $(this).addClass("actiontypehighlight");
    },
    mouseleave: function () {
      $(this).removeClass("actiontypehighlight");
    }
  }, ".actiontype");

  $("body").on("click", ".actiontype",function(){
    $(".actiontype").removeClass("actiontypehighlight2");
    $(this).addClass("actiontypehighlight2");
    $("#actionoptionpanel2").remove();
    $("#actionoptionpanel3").remove();
    var id = $(this).attr("id");
    var b = true;
    var i = 0;
    while (b === true){
      if ($("#actionnum"+(i+1)).length){
        i++;
        if ($("#actionnum"+i).hasClass("actionnumselected")){
          b = false;
        }
      }
      else {
        b = false;
        alert("Couldn't find selected action number");
      }
    }
    actiontypes[i-1] = id;
    event1[i-1] = [];
    event1[i-1][0] = id;
    if (id === "Attack"){
      $(".addaction").remove();
    }
    else {
      $(".addaction").remove();
      $("#actioncontainer").append('<div class="addaction"><p>Add Action +</p></div>');
    }
    switch (id){
      case "Jump":
        break;
      case "Wavedash":
        $("#actionoptionpanel1").after('<div id="actionoptionpanel2"><div class="actiontypetitle"><p>Select Wavedash Angle</p></div><div id="anglerangeornot" class="single"><p>Single Angle</p></div><div class="wavedashanglecontainer" style="margin-left:5px;"><img src="assets/newheatmap/angle.png"/><div class="slidercontainer"><div class="sliderbar"></div><div class="sliderpointer" id="wavedashpointer1" style="left:245px"></div></div><div class="angledetails"><p><span id="wavedashangle1strength">0</span>% - <span id="wavedashangle1worded">Wavedash down</span></p></div></div><img id="anglebetweenicon" src="assets/newheatmap/anglebetween.png" style="margin:25px 0px;opacity:0.3"/><div id="wavedashanglecontainer2" class="wavedashanglecontainer" style="opacity:0.3;margin-right:5px"><div id="wavedashanglegreyedout"></div><img src="assets/newheatmap/angle.png"/><div class="slidercontainer"><div class="sliderbar"></div><div class="sliderpointer" id="wavedashpointer2" style="left:485px"></div></div><div class="angledetails"><p><span id="wavedashangle2strength">0</span>% - <span id="wavedashangle2worded">Wavedash down</span></p></div></div></div><div id="anglerangeornotbutton" class="createrange"><p>Create Range</p></div></div>');
        $(".sliderpointer").draggable({ drag: function(){
          var dimensions = $(this).position();
          if (dimensions.left < 350){
            /*WAVEDASH ANGLE 1*/
            if (dimensions.left <= 261 && dimensions.left >= 229){
              $("#wavedashangle1strength").empty().append(0);
              var percent = 0;
            }
            else {
              if (dimensions.left > 261){
                var anglenumber = Math.round((dimensions.left - 245 - 16)*(58/67));
                var percent = Math.round((anglenumber/58)*100);
                $("#wavedashangle1strength").empty().append(percent);
              }
              else {
                var anglenumber = Math.round((dimensions.left - 245 + 16)*(58/67));
                var percent = Math.round((anglenumber/58)*100);
                $("#wavedashangle1strength").empty().append(percent);
              }
            }
            if (percent < 0){
              percent *= -1;
              currentwavedashangle[0][1] = "b";
            }
            else {
              currentwavedashangle[0][1] = "f";
            }
            currentwavedashangle[0][0] = percent;
          }
          else {
            /*wavedash 2 ANGLE*/
            if (dimensions.left <= 501 && dimensions.left >= 469){
              $("#wavedashangle2strength").empty().append(0);
              var percent = 0;
            }
            else {
              if (dimensions.left > 501){
                var anglenumber = Math.round((dimensions.left - 485 - 16)*(58/67));
                var percent = Math.round((anglenumber/58)*100);
                $("#wavedashangle2strength").empty().append(percent);
              }
              else {
                var anglenumber = Math.round((dimensions.left - 485 + 16)*(58/67));
                var percent = Math.round((anglenumber/58)*100);
                $("#wavedashangle2strength").empty().append(percent);
              }
            }
            if (percent < 0){
              percent *= -1;
              currentwavedashangle[1][1] = "b";
            }
            else {
              currentwavedashangle[1][1] = "f";
            }
            currentwavedashangle[1][0] = percent;
          }


          if (percent === 0){
            var text= "Wavedash down";
          }
          else if (percent <= 19) {
            var text = "Tiny Wavedash";
          }
          else if (percent <= 49) {
            var text = "Small Wavedash";
          }
          else if (percent <= 74) {
            var text = "Medium Wavedash";
          }
          else if (percent <= 84) {
            var text = "Long Wavedash";
          }
          else if (percent <= 99) {
            var text = "Crispy Wavedash";
          }
          else if (percent === 100) {
            var text = "The Crispiest Wavedash";
          }
          if (dimensions.left < 350){
            $("#wavedashangle1worded").empty().append(text);
          }
          else {
            $("#wavedashangle2worded").empty().append(text);
          }
        }, stop: function() {
          var angle1 = (currentwavedashangle[0][0]-1)*((2.67039-0.80815)/99)+0.80815;
          event1[i-1][2] = [];
          event1[i-1][2][0] = angle1;
          if (currentwavedashangle[0][0] !== 0) {
            var distandspeedangle1 = wavedash(character,angle1);
            distandspeedangle1[1] = Math.round(distandspeedangle1[1] * 100000) / 100000;
            if (currentwavedashangle[0][1] === "b"){
              distandspeedangle1[0] *= -1;
              distandspeedangle1[1] *= -1;
              event1[i-1][2][1] = "b";
            }
            else {
              event1[i-1][2][1] = "f";
            }
            $("#evelocityx").empty().append(distandspeedangle1[1]);
          }
          else {
            $("#evelocityx").empty().append(0);
          }

          if ($("#anglerangeornot").hasClass("range")){
            var angle2 = (currentwavedashangle[1][0]-1)*((2.67039-0.80815)/99)+0.80815;
            event1[i-1][1] = "r";
            event1[i-1][3] = [];
            event1[i-1][3][0] = angle2;
            if (currentwavedashangle[1][0] !== 0) {
              var distandspeedangle2 = wavedash(character,angle2);
              distandspeedangle2[1] = Math.round(distandspeedangle2[1] * 100000) / 100000;
              if (currentwavedashangle[1][1] === "b"){
                distandspeedangle2[0] *= -1;
                distandspeedangle2[1] *= -1;
                event1[i-1][3][1] = "b";
              }
              else {
                event1[i-1][3][1] = "f";
              }
              $("#evelocityx2").empty().append(distandspeedangle2[1]);
            }
            else {
              $("#evelocityx2").empty().append(0);
            }

          }
          else {
            $("#wavedashpointer2").css("left","485px");
            $("#wavedashangle2worded").empty().append("Wavedash down");
            $("#wavedashangle2strength").empty().append(0);
            currentwavedashangle[1][0] = 0;
            event1[i-1][3] = "none";
            event1[i-1][1] = "s";
          }

        }, containment: "parent", scroll: false });

        $("#anglerangeornotbutton").click(function(){
          if ($(this).hasClass("createrange")){
            $(this).removeClass("createrange").addClass("singleangle").children("p").empty().append("Single Angle");
            $("#anglerangeornot").removeClass("single").addClass("range").children("p").empty().append("Angle Range");
            $("#wavedashanglecontainer2").css("opacity",1);
            $("#anglebetweenicon").css("opacity",1);
            $("#endvelocity").append('<img id="endvelocityanglebetweenicon" src="assets/newheatmap/anglebetween.png"/><p id="endvelocity2"> X=<span id="evelocityx2">0</span> | Y=<span id="evelocityy2">0</span></p>');
          }
          else {
            $(this).removeClass("singleangle").addClass("createrange").children("p").empty().append("Create Range");
            $("#anglerangeornot").removeClass("range").addClass("single").children("p").empty().append("Single Angle");
            $("#wavedashanglecontainer2").css("opacity",0.3);
            $("#anglebetweenicon").css("opacity",0.3);
            $("#wavedashpointer2").css("left","485px");
            $("#wavedashangle2worded").empty().append("Wavedash down");
            $("#wavedashangle2strength").empty().append(0);
            currentwavedashangle[1][0] = 0;
            $("#endvelocityanglebetweenicon").remove();
            $("#endvelocity2").remove();
          }
        });

        break;
      case "Dash":
        break;
      case "Dash Back":
        break;
      case "Soft Turn":
        break;
      case "Smash Turn":
        break;
      case "Shield":
        break;
      case "Attack":
        $("#actionoptionpanel1").after('<div id="actionoptionpanel2" style="height:160px;"><div class="selectattacktitle"><p>Select Attack</p></div>');
        for (j=0;j<fromactionattacks[actiontypes[i-2]].length;j++){
          $("#actionoptionpanel2").append('<div id="'+allat[fromactionattacks[actiontypes[i-2]][j]]+'" class="attacktype"><p>'+allat[fromactionattacks[actiontypes[i-2]][j]]+'</p></div>');
        }
        $("#actioncontainer").append('<div id="createbutton" class="createbuttondisable"><p>Create</p></div>');
        $(".attacktype").click(function(){
          $(this).toggleClass("attacktypehighlight2");
          var attackstobeused = [];
          var m = 0;
          for (k=1;k<22;k++){
            if($("#actionoptionpanel2 .attacktype:nth-child("+k+")").hasClass("attacktypehighlight2")){
              attackstobeused[m] = $("#actionoptionpanel2 .attacktype:nth-child("+k+")").attr("id");
              m++;
            }
          }
          $("#createbutton").removeClass("createbuttondisable createbuttonokay");
          if (m > 0){
            $("#createbutton").addClass("createbuttonokay");
          }
          else {
            $("#createbutton").addClass("createbuttondisable");
          }
        });

        $("#createbutton").hover(function(){
          if($("#createbutton").hasClass("createbuttonokay")){
            $(this).toggleClass("createbuttonhighlight");
          }
        });

        $("#createbutton").click(function(){
          if($("#createbutton").hasClass("createbuttonokay")){
            $("#popout").fadeOut(300);
            interpretScript(event1);
          }
        });
        break;
      case "Pivot":
        break;
      case "Run":
        break;
      case "Crouch":
        break;
      case "Airdodge":
        break;
      case "Doublejump":
        break;
    }
  });



});
