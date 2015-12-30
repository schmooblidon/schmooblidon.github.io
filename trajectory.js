pointerfrozen = false;
mouseX = 0;
mouseY = 0;
trajFrozen = false;
mouseXMelee = 0;
mouseYMelee = 0;
mouseXMeleeF = 0;
mouseYMeleeF = 0;

isKilled = false;

bzTop = 200;
bzBottom = -108.8;
bzLeft = -224;
bzRight = 224;

crouch = false;

reverse = false;

chargeInterrupt = false;

charging = false;
chargeF = 0;

//each surface is put into an element in the array. The surface is broken down into arrays of far left point X and y, and far right point X and Y. Use .length to find the number of surfaces to check

surfaces = [[[-68.4,0],[68.4,0]],[[-57.6,27.2],[-20.0,27.2]],[[20,27.2],[57.6,27.2]],[[-18.8,54.4],[18.8,54.4]]];

snapping = true;

staleQueue = [false,false,false,false,false,false,false,false,false];

curPositions = [];

centreOffset = [bzRight*10+50,bzTop*10+50];

curHitbox = chars.Fx.NS.id0;

var percent = 120;
var NTSC = true;
var character = "Fox";

function attackTable(){
  var id = "";
  var id2 = "";
  var id3 = "";
  $(".character").hover(function(){
    $(this).toggleClass("characterhighlight");
  });
  $(".character").click(function(){
    $(".attack").remove();
    $(".subattack").remove();
    $(".id").remove();
    $(".idstats").remove();
    id = $(this).attr("id");
    var keys = Object.keys(chars[id]);
    for (i=0;i<keys.length;i++){
      $(this).after('<div id="'+keys[i]+'" class="attack '+id+'"><p>'+keys[i]+'</p></div>');
    }
    $(".attack").hover(function(){
      $(this).toggleClass("attackhighlight");
    });
    $(".attack").click(function(){
      $(".subattack").remove();
      $(".id").remove();
      $(".idstats").remove();
      id2 = $(this).attr("id");
      var keys2 = Object.keys(chars[id][id2]);
      if (keys2[0][0] == "i" && keys2[0][1] == "d"){
        for (j=0;j<keys2.length;j++){
          $(this).after('<div id="'+keys2[j]+'" class="id '+id2+' '+id+'"><p>'+keys2[j]+'</p></div>');
        }
        $(".id").hover(function(){
          $(this).toggleClass("idhighlight");
        });
        $(".id").click(function(){
          $(".id").removeClass("idcurrent");
          $(this).addClass("idcurrent");
          $(".idstats").remove();
          id4 = $(this).attr("id");
          var hb = chars[id][id2][id4];
          $(this).after('<div id="'+id3+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
          curHitbox = hb;
          drawTrajectory();
          if (id2.substr(1,id2.length) == "smash"){
            charging = true;
            $("#disableCharge").hide();
          }
          else {
            charging = false;
            $("#disableCharge").show();
          }
        });
      }
      else {
        for (k=0;k<keys2.length;k++){
          $(this).after('<div id="'+keys2[k]+'" class="subattack '+id2+' '+id+'"><p>'+keys2[k]+'</p></div>');
        }
        $(".subattack").hover(function(){
          $(this).toggleClass("subattackhighlight");
        });
        $(".subattack").click(function(){
          $(".id").remove();
          $(".idstats").remove();
          id3 = $(this).attr("id");
          var keys3 = Object.keys(chars[id][id2][id3]);
          for (l=0;l<keys3.length;l++){
            $(this).after('<div id="'+keys3[l]+'" class="id '+id3+' '+id2+' '+id+'"><p>'+keys3[l]+'</p></div>');
          }
          $(".id").hover(function(){
            $(this).toggleClass("idhighlight");
          });
          $(".id").click(function(){
            $(".id").removeClass("idcurrent");
            $(this).addClass("idcurrent");
            $(".idstats").remove();
            id4 = $(this).attr("id");
            var hb = chars[id][id2][id3][id4];
            $(this).after('<div id="'+id3+'stats" class="idstats"><p>Damage: '+hb.dmg+'<br>Angle: '+hb.angle+'<br>KB Growth: '+hb.kg+'<br>Set Knockback: '+hb.wbk+'<br>Base Knockback: '+hb.bk+'<br>Effect: '+hb.effect+'</p></div>');
            curHitbox = hb;
            drawTrajectory();
            if (id2.substr(1,id2.length) == "smash"){
              charging = true;
              $("#disableCharge").hide();
            }
            else {
              charging = false;
              $("#disableCharge").show();
            }

          });
        })
      }
    })

  });



}



function SVG(tag)
{
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}





function drawTrajectory(onlyDrawWhenUnfrozen){
  onlyDrawWhenUnfrozen = onlyDrawWhenUnfrozen || false;
	$("#trajectory").empty();
  $("#trajectory-t").empty();
  var totalstale = 1.00;
  var damage = curHitbox.dmg;
  for(i=0;i<staleQueue.length;i++){
    if(staleQueue[i]){
      totalstale -= (10-(i+1))/100;
    }
  }
  damage *= totalstale;
  if (charging){
    damage *= 1 + (chargeF * (0.4/59));
  }
  var xPos = 0;
  var yPos = 0;
  if (trajFrozen){
    if (!onlyDrawWhenUnfrozen){
      xPos = mouseXMeleeF;
      yPos = mouseYMeleeF;
    }
  }
  else {
    xPos = mouseXMelee;
    yPos = mouseYMelee;
  }

	var hit = new Hit(percent,damage,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,xPos,yPos,crouch,reverse,chargeInterrupt);
	var positions = hit.positions;
	curPositions = positions;
	var cla = "tLineS";
  var temX = ((xPos*10)+centreOffset[0]);
  var temY = ((-yPos*10)+centreOffset[1]);
  var lineText = "M"+temX+" "+temY+" ";
  $(SVG("path")).attr("id","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajectory");

  $(SVG("path")).attr("id","start-t").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajectory-t");

	for (i=0;i<positions.length;i++){
		var x = positions[i][0];
		var y = positions[i][1];
		if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){
			var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
			lineText += tempText;
			$(SVG("circle")).attr("id","f"+(i+1)).attr("class","framePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajectory");
      $(SVG("circle")).attr("id","f"+(i+1)+"-t").attr("class","framePos-t").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajectory-t");
		}
		else {
			cla = "tLineK";
			isKilled = true;
			$(".framePos").css("fill","#df3c3c");
		}
	}
	//var lineText = lineText.replace("L","M");
	//lineText += "Z";
	$(SVG("path")).attr("id","trajLine").attr("class",cla).attr("d",lineText).prependTo("#trajectory");
  if (!onlyDrawWhenUnfrozen){
    trajPosInfo();
  }
}

function trajPosInfo(){
  $(".framePos-t").hover(function(){
    var id = $(this).attr("id");
    id = parseInt(id.substr(1,(id.length - 3)));
    $("#f"+id).attr("r",30);
    $("#trajCanvas").after('<div class="framePosInfoBox">Frame of hitstun: '+id+'<br>Pos X:'+((Math.round(curPositions[id-1][0]*100))/100)+' Y:'+((Math.round(curPositions[id-1][1]*100))/100)+'<br>Vel X:'+((Math.round(curPositions[id-1][2]*100))/100)+' Y:'+((Math.round(curPositions[id-1][3]*100))/100)+'</div>');
    $(".framePosInfoBox").css({"top":mouseY+5,"left":(mouseX+160)});
  }, function(){
    var id = $(this).attr("id");
    id = parseInt(id.substr(1,(id.length - 3)));
    $("#f"+id).attr("r",15);
    $(".framePosInfoBox").remove();
  });

  $("#start-t").hover(function(){
    $("#start").css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox">Position Hit<br>X: '+((Math.round(mouseXMeleeF*100))/100)+' Y: '+((Math.round(mouseYMeleeF*100))/100)+'</div>');
    $(".framePosInfoBox").css({"top":mouseY+5,"left":mouseX+160});
  }, function(){
    $("#start").css("stroke-width",0);
    $(".framePosInfoBox").remove();
  });
}

$(document).ready(function(){
  attackTable();
	$(document).on('mousemove', function(e){
		mouseX = e.pageX - trajOffset.left;
		mouseY = e.pageY - trajOffset.top;
    //(disWidth/4580)*100 gives width in pixels of blastzone

	});
  $("#trajectory-t").mousemove(function(){
    var widthRatio = disWidth/4580;
    var heightRatio = disHeight/3188;
    mouseXMelee = (Math.round(((mouseX/widthRatio)-2290)*10))/100;
    mouseYMelee = (Math.round(((mouseY/heightRatio)-2050)*-10))/100;
    $("#mPosX").empty().append(mouseXMelee);
    $("#mPosY").empty().append(mouseYMelee);
    if (trajFrozen == false){
      if (snapping){
        //will have to do some more maths for slanted surfaces like yoshis
        for (i=0;i<surfaces.length;i++){
          //if X position is in line with surface or within 10Mm on either side
          if (mouseXMelee >= surfaces[i][0][0] - 10 && mouseXMelee <= surfaces[i][1][0] + 10){

            //if Y is within 10Mm of surface on either side
            if (mouseYMelee <= surfaces[i][0][1] + 10 && mouseYMelee >= surfaces[i][0][1] - 10){
              //if X is just outside of the plat X plane, snap to the edge (left)
              if (mouseXMelee >= surfaces[i][0][0] - 10 && mouseXMelee < surfaces[i][0][0]){
                mouseXMelee = surfaces[i][0][0];
              }
              //(right)
              if (mouseXMelee <= surfaces[i][1][0] + 10 && mouseXMelee > surfaces[i][1][0]){
                mouseXMelee = surfaces[i][1][0];

              }
              mouseYMelee = surfaces[i][0][1];
            }
          }
        }
      }
      drawTrajectory(true);
    }
  });

  $("#trajectory-t").click(function(){
    if (trajFrozen == false){
      trajFrozen = true;
      mouseXMeleeF = mouseXMelee;
      mouseYMeleeF = mouseYMelee;
      trajPosInfo();
    }
    else {
      trajFrozen = false;
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
		character = newchar;
    drawTrajectory();
	});

	var percentHold = 0;

	$(".percentButton").mousedown(function() {
		var id = $(this).attr("id");
		percentHold = setInterval(function() {
			var curNum = parseInt($("#percentNumberEdit").text());
			if (id == "percentPlus"){
				var newnum = curNum + 1;
				percent = newnum;
			}
			else {
				var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
				percent = newnum;
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
        chargeF = newnum;
      }
      else {
        var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
        chargeF = newnum;
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
    if (staleQueue[id-1]){
      staleQueue[id-1] = false;
      $(this).removeClass("staleQon");
    }
    else {
      staleQueue[id-1] = true;
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
      reverse = true;
    }
    else {
      reverse = false;
    }

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
    if (chargeInterrupt){
      $("#hwcSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      chargeInterrupt = false;
    }
    else {
      $("#hwcSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      chargeInterrupt = true;
    }
    drawTrajectory();
  });

  $("#cRealButton").click(function(){
    if (crouch){
      $("#cSwitch").removeClass("switchOn").addClass("switchOff").children("p").empty().append("False");
      crouch = false;
    }
    else {
      $("#cSwitch").removeClass("switchOff").addClass("switchOn").children("p").empty().append("True");
      crouch = true;
    }
    drawTrajectory();
  });

  /*$(".stalingButton").mousedown(function() {
    var id = $(this).attr("id");
    stalingHold = setInterval(function() {
      var curNum = parseInt($("#stalingnumberedit").text());
      if (id == "stalingPlus"){
        var newnum = curNum + 1;
        if (newnum > 9){
          newnum = 9;
        }
        staling = newnum;
      }
      else {
        var newnum = curNum - 1;
        if (newnum < 0){
          newnum = 0;
        }
        staling = newnum;
      }
      $("#stalingnumberedit").empty().append(newnum);
      if (trajFrozen){
        drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMeleeF,mouseYMeleeF);
        trajPosInfo();
      }
      else {
        drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
      }
    }, 50);
  }).bind("mouseup mouseleave", function() {
    clearInterval(stalingHold);
  });*/

  /*setTimeout(function(){
    trajOffset = $("#trajectory").offset();
  }, 1000);*/

});
