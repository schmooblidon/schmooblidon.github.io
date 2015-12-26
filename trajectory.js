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
          if (trajFrozen){
            drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMeleeF,mouseYMeleeF);
            trajPosInfo();
          }
          else {
            drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
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
            if (trajFrozen){
              drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMeleeF,mouseYMeleeF);
              trajPosInfo();
            }
            else {
              drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
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





function drawTrajectory(percent,damage,growth,base,angle, character, NTSC, xPos, yPos){
	$("#trajectory").empty();
	var hit = new Hit(percent, damage, growth, base, angle, character, NTSC, xPos, yPos);
	var positions = hit.positions;
	curPositions = positions;
	var cla = "tLineS";
  var temX = ((xPos*10)+centreOffset[0]);
  var temY = ((-yPos*10)+centreOffset[1]);
  var lineText = "M"+temX+" "+temY+" ";
  $(SVG("path")).attr("id","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajectory");

	for (i=0;i<positions.length;i++){
		var x = positions[i][0];
		var y = positions[i][1];
		if ((x < bzRight && x > bzLeft) && (y < bzTop && y > bzBottom)){
			var tempText = "L"+((x*10)+centreOffset[0])+" "+((-y*10)+centreOffset[1])+" ";
			lineText += tempText;
			$(SVG("circle")).attr("id","f"+(i+1)).attr("class","framePos").attr("cx", (x*10)+centreOffset[0]).attr("cy",(-y*10)+centreOffset[1]).attr("r", 15).prependTo("#trajectory");
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
}

function trajPosInfo(){
  $(".framePos").hover(function(){
    $(this).attr("r",30);
    var id = $(this).attr("id");
    id = parseInt(id.substr(1,(id.length - 1)));
    $("#trajCanvas").after('<div class="framePosInfoBox">Frame of hitstun: '+id+'<br>Pos X:'+((Math.round(curPositions[id-1][0]*100))/100)+' Y:'+((Math.round(curPositions[id-1][1]*100))/100)+'<br>Vel X:'+((Math.round(curPositions[id-1][2]*100))/100)+' Y:'+((Math.round(curPositions[id-1][3]*100))/100)+'</div>');
    $(".framePosInfoBox").css({"top":mouseY,"left":mouseX+10});
  }, function(){
    $(this).attr("r",15);
    $(".framePosInfoBox").remove();
  });

  $("#start").hover(function(){
    $(this).css("stroke-width",20);
    $("#trajCanvas").after('<div class="framePosInfoBox">Position Hit<br>X: '+((Math.round(mouseXMeleeF*100))/100)+' Y: '+((Math.round(mouseYMeleeF*100))/100)+'</div>');
    $(".framePosInfoBox").css({"top":mouseY,"left":mouseX+10});
  }, function(){
    $(this).css("stroke-width",0);
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
  $("#trajectory").mousemove(function(){
    var widthRatio = disWidth/4580;
    var heightRatio = disHeight/3188;
    mouseXMelee = (Math.round(((mouseX/widthRatio)-2290)*10))/100;
    mouseYMelee = (Math.round(((mouseY/heightRatio)-2050)*-10))/100;
    $("#mPosX").empty().append(mouseXMelee);
    $("#mPosY").empty().append(mouseYMelee);
    if (trajFrozen == false){

      drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
    }
  });

  $("#trajectory").click(function(){
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

	drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,0,0);
  trajPosInfo();

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
    if (trajFrozen){
      drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMeleeF,mouseYMeleeF);
      trajPosInfo();
    }
    else {
		  drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
    }
	});

	var percentHold = 0;

	$(".percentButton").mousedown(function() {
		var id = $(this).attr("id");
		percentHold = setInterval(function() {
			var curNum = parseInt($("#percentNumberEdit").text());
			if (id == "percentPlus"){
				var newnum = curNum + 1;
				percent += 1;
			}
			else {
				var newnum = curNum - 1;
				percent -= 1;
			}
			$("#percentNumberEdit").empty().append(newnum);
      if (trajFrozen){
        drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMeleeF,mouseYMeleeF);
        trajPosInfo();
      }
      else {
        drawTrajectory(percent,curHitbox.dmg,curHitbox.kg,curHitbox.bk,curHitbox.angle,character,NTSC,mouseXMelee,mouseYMelee);
      }
		}, 50);
	}).bind("mouseup mouseleave", function() {
    clearInterval(percentHold);
	});

  /*setTimeout(function(){
    trajOffset = $("#trajectory").offset();
  }, 1000);*/

});
