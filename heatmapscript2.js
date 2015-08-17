
hitboxwidth = 1280;
hitboxheight = 714;
hbhlswitch = 1;
hurtchar = "falcon";
hurtchar2 = "falcon";
pos = "stand";
currentMargin = "75%";
currenthurtboxpos = 0;

isflipped = '';
v = 0;
someon = [];
for (i=0;i<20;i++){
	someon[i] = false;
}
var onattacks = {};
partonframe = 1;
someoff = [];
for (i=0;i<20;i++){
	someoff[i] = false;
}
var offattacks = {};
textton = [];
texttempon = [];
texttoff = [];
texttempoff = [];
fselected = "fc0";
attackswitches = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
listofattacks = ["Grab","Upair","Nair","Bair","Up-b","Knee","Dair"];
var fc = {};
for(i=0;i<11;i++){
	fc["fc"+i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
}
if	(typeof noofgfys === 'undefined'){
	var noofgfys = 0;
}
var fselect = function(type, text){
	$("#fsid").empty().append(text);
	$(".framecontrol").removeClass("partialon partialoff");
	if (fselected === "fc0"){
		someon = [];
		for (i=0;i<20;i++){
			someon[i] = false;
		}
		onattacks = {};
		someoff = [];
		for (i=0;i<20;i++){
			someoff[i] = false;
		}
		offattacks = {};
		v = [];
		w = [];
		for (i=1;i<21;i++){
			var a = 0;
			var b = 0;
			offattacks[i-1] = [];
			onattacks[i-1] = [];
			if (fc[fselected][i-1]){
				for (j=1;j<11;j++){
					if (!fc["fc"+j][i-1]){
						someoff[i-1] = true;
						offattacks[i-1][a] = j;
						a++;
					}
				}
			}
			else {
				for (j=1;j<11;j++){
					if (fc["fc"+j][i-1]){
						someon[i-1] = true;
						onattacks[i-1][b] = j;
						b++;
					}
				}
			}
		}
	}
	$(".framecontrol").children("p").addClass("framehighlight3");
	for (i=1;i<21;i++){
		if (fc[type][i-1]){
			$("#frame"+i).children("p").removeClass("framehighlight3");
		}
	}
	if (fselected === "fc0"){
		for (i=1;i<21;i++){
			if (someoff[i-1]){
				$("#frame"+i).addClass("partialoff");
				$("#frame"+i).children("p").removeClass("framehighlight3");
				texttoff = [];
				texttempoff[i-1] = "";
				v[i-1] = offattacks[i-1].length;
				for (j=0;j<v[i-1];j++){
					texttoff[j] = $("#attack"+offattacks[i-1][j]).children("p").text();
					texttempoff[i-1] = texttempoff[i-1]+texttoff[j]+" off<br>";
				}
			}

			if (someon[i-1]){
				$("#frame"+i).addClass("partialon");
				$("#frame"+i).children("p").addClass("framehighlight3");
				textton = [];
				texttempon[i-1] = "";
				w[i-1] = onattacks[i-1].length;
				for (j=0;j<w[i-1];j++){
					textton[j] = $("#attack"+onattacks[i-1][j]).children("p").text();
					texttempon[i-1] = texttempon[i-1]+textton[j]+" on<br>";
				}
			}
		}
	}
}
intervalId = 0;
fulltext = "";
pospart = "";
var helpbox = function(){
	$(".attack").children("p").hover(function(){
		var textpart = $(this).text();
		fulltext = "<div class='help' style='width:100px'><p>Toggle "+textpart+" hitboxes</p></div>";
		$(this).parent().append(fulltext);
		},
		function (){
		$(".help").remove();
	});
	$(".framecircle").hover(function(){
		var textpart = $(this).parent().children("p").text();
		if (textpart === ""){
			textpart = "ALL";
		}
		fulltext = "<div class='help' style='width:100px'><p>Change frame control to "+textpart+"</p></div>";
			$(this).parent().append(fulltext);
		},
		function (){
		$(".help").remove();
	});
	$("#fallon").hover(function(){
		fulltext = "<div class='help' style='width:100px; left:0px; top:-135px'><p>Turn all frame switches on<br>for current frame control</p></div>";
			$(this).parent().append(fulltext);
	},
	function (){
		$(".help").remove();
	});
	$("#falloff").hover(function(){
		fulltext = "<div class='help' style='width:100px; left:0px; top:-135px'><p>Turn all frame switches off<br>for current frame control</p></div>";
			$(this).parent().append(fulltext);
	},
	function (){
		$(".help").remove();
	});
	$(".framecontrol").hover(function(){
		if ($(this).hasClass("partialoff")){
			var p = $(this).attr("id");
			if (p.length === 6){
				p = Number(p[5]);
			}
			else {
				p = Number(p[5]+p[6]);
			}
			var textpart = texttempoff[p-1];
			var top = 30 + (v[p-1] * 15);
			fulltext = "<div class='help' style='width:80px; left:-20px; top:-"+top+"px'>"+textpart+"</div>";
			$(this).append(fulltext);
		}
		if ($(this).hasClass("partialon")){
			var p = $(this).attr("id");
			if (p.length === 6){
				p = Number(p[5]);
			}
			else {
				p = Number(p[5]+p[6]);
			}
			var textpart = texttempon[p-1];
			var top = 30 + (w[p-1] * 15);
			fulltext = "<div class='help' style='width:80px; left:-20px; top:-"+top+"px'>"+textpart+"</div>";
			$(this).append(fulltext);
		}
	},
	function (){
		$(".help").remove();
	});
	$(".control").hover(function(){
		if (!$(this).hasClass("attack") && !$(this).hasClass("nohelp")){
		var id = $(this).attr("id");
		switch (id){
			case "position":
				fulltext = "<div class='help' style='width:100px'><p>Switch the hurtbox between crouch and stand</p></div>";
				break;
			case "flip":
				fulltext = "<div class='help' style='width:100px; left:50px'><p>Turn the hurtbox around</p></div>";
				break;
			case "hbleft":
				fulltext = "<div class='help' style='width:100px'><p>Move the hurtbox left</p></div>";
				break;
			case "hbright":
				fulltext = "<div class='help' style='width:100px; left:50px'><p>Move the hurtbox right</p></div>";
				break;
			case "img-button":
				fulltext = "<div class='help' style='width:100px'><p>Link to an imgur album</p></div>";
				break;
			case "hbhlbutton":
				fulltext = "<div class='help' style='width:100px'><p>Turns off frame highlighting<br>Can prevent lag</p></div>";
				break;
			case "allattackon2":
				fulltext = "<div class='help' style='width:100px'><p>Turns all attack switches on</p></div>";
				break;
			case "allattackoff2":
				fulltext = "<div class='help' style='width:100px'><p>Turns all attack switches off</p></div>";
				break;
			case "play-button":
				fulltext = "<div class='help' style='width:150px'><p>Plays an animation of your selected hitboxes<br>Speeds underneath</p></div>";
				break;
			}
			$(this).append(fulltext);
		}
	},
	function (){
		if (!$(this).hasClass("attack")){
		$(".help").remove();
	}
	}
);
}
var movehurtbox = function(){
	if (currentMargin.length === 2){
		var cm = Number(currentMargin[0]);
	}
	else {
		var cm = Number(currentMargin[0]+currentMargin[1]);
	}
	if ($("#hbleft").hasClass("hbdirectionhighlight")){
		if (cm > 0){
				$("#hurtbox").css("margin-left",(cm-1)+"%");
		}
	}
	else if ($("#hbright").hasClass("hbdirectionhighlight")){
		if (cm < 75){
				$("#hurtbox").css("margin-left",(cm+1)+"%");
		}
	}
	currentMargin = $("#hurtbox").prop("style")["margin-left"];
}

var mobilemovehurtbox = function(direction){
  if (currentMargin.length === 2){
    var cm = Number(currentMargin[0]);
  }
  else {
    var cm = Number(currentMargin[0]+currentMargin[1]);
  }
  if (direction = "l"){
    if (cm > 0){
        $("#hurtbox").css("margin-left",(cm-2)+"%");
    }
  }
  else if (direction = "r"){
    if (cm < 75){
        $("#hurtbox").css("margin-left",(cm+2)+"%");
    }
  }
  currentMargin = $("#hurtbox").prop("style")["margin-left"];
}

var togglehitbox = function(type, num) {
		var type = type+num;
		var x = type.indexOf("a");
		var y = type.indexOf("f");
		if (x === 0){
			for (i=1;i<21;i++) {
				if (fc["fc"+num][i-1]){
					$("#"+type+"f"+i).fadeToggle(200,0);

				}
			}
			var typenum = parseInt(type.substr(1,2));
			if (attackswitches[typenum-1]){
				attackswitches[typenum-1] = 0;
			}
			else {
				attackswitches[typenum-1] = 1;
			}
		}
		else if (y === 0){
			if (fselected === "fc0"){
				for (i=1;i<11;i++){
					if (attackswitches[i-1]){
						if (fc["fc0"][num-1] === 1){
							$("#a"+i+type).fadeIn(200,0);
						}
						else {
							$("#a"+i+type).fadeOut(200,0);
						}
					}
				}
			}
			else {
				if (fselected.length > 3){
					var snum = fselected[2]+fselected[3];
				}
				else {
					var snum = fselected[2];
				}
				if (attackswitches[snum-1]){
					$("#a"+snum+type).fadeToggle(200,0);
				}
			}
	}
};
var hbhl = function(t,z){
		if (t === "a"){
			if (z === "0"){
				$(".hitbox").attr("stroke","white");
			}
			else {
			$("."+t+z).attr("stroke","white");
			}
		}
		else {
			if (fselected.length > 3){
				var n = fselected[2]+fselected[3];
			}
			else {
		 		var n = fselected[2];
			}
			if (n === "0"){
				$("."+t+z).attr("stroke","white");
			}
			else {
				$("#a"+n+t+z).attr("stroke","white");
				$("#a"+n+t+z+"-t").attr("stroke","white");
			}
		}
};
var hbhlundo = function(t,z){
	if (t === "a"){
		if (z === "0"){
			$(".hitbox").attr("stroke","none");
		}
		else {
		$("."+t+z).attr("stroke","none");
		}
	}
	else {
		if (fselected.length > 3){
			var n = fselected[2]+fselected[3];
		}
		else {
			var n = fselected[2];
		}
		if (n === "0"){
			$("."+t+z).attr("stroke","none");
		}
		else {
			$("#a"+n+t+z).attr("stroke","none");
			$("#a"+n+t+z+"-t").attr("stroke","none");
		}
	}
};

var speed = 1;
var play = function() {
	$("#play-button").click(function(){
		$(".hitbox").fadeOut(200);
		$("#ready").fadeIn(1).delay(1000).fadeOut(1);
		$("#go").fadeOut(1).delay(1000).fadeIn(1);
		for (i=1;i<21;i++){
			a = i *17 *speed;
				for (j=1;j<11;j++) {
					if (attackswitches[j-1] && (fc["fc"+j][i-1])){
						$("#a"+j+"f"+i).fadeOut(1).delay(a+800-17).fadeIn(1);
					}
			}
		}
		$("#go").fadeIn(1).delay(1040).fadeOut(1)
	});
};


$(document).ready(function(){
	$("#fc0").addClass("fchighlight");
	var noofattacks = 0;
	for(i=1;i<11;i++){
		if ($("#top-controls").children("#attack"+i).length > 0){
			noofattacks++;
		}
	}
	$("#times1").addClass("highlighted2");
	$("#ready").fadeOut(1);
	$("#go").fadeOut(1);
	if (mobile === false){
		helpbox();
		$("#heatmapinfo").hover(function(){
			$("#heatmapinfobox").fadeToggle(300);
		});
		$(".noa").hover(function(){
			$(this).toggleClass("highlighted");
		});
		$(".attack").children("p").hover(function(){
			$(this).parent().addClass("highlighted");
			if (hbhlswitch){
				var m = $(this).parent().attr("id");
				if (m.length > 7){
					m = m[6]+m[7];
				}
				else {
					m = m[6];
				}

				hbhl("a",m);
			}
		},function(){
			$(this).parent().removeClass("highlighted");
			if (hbhlswitch){
				var m = $(this).parent().attr("id");
				if (m.length > 7){
					m = m[6]+m[7];
				}
				else {
					m = m[6];
				}

				hbhlundo("a",m);
			}
		});
		$(".framecircle").hover(function(){
			$(this).toggleClass("highlighted");
			});
			$("#frameall").children("div").hover(function(){
				$(this).toggleClass("highlighted2");
			});
			$(".speed").hover(function(){
				$(this).toggleClass("highlighted"
			);
			});
			$(".framecontrol").hover(function(){
				if (hbhlswitch){
					var m = $(this).attr("id");
					if (m.length === 6){
						m = m[5];
					}
					else {
						m = m[5] + m[6];
					}
					hbhl("f",m);
				}
			},function(){
				if (hbhlswitch){
					var m = $(this).attr("id");
					if (m.length === 6){
						m = m[5];
					}
					else {
						m = m[5] + m[6];
					}
					hbhlundo("f",m);
				}
			});
			$(".framecontrol").hover(function(){
				$(this).children("p").toggleClass("framehighlight framehighlight2");
			});
			$("#hbleft").mousedown(function() {
				movehurtbox();
				intervalId = setInterval(movehurtbox, 50);
		}).bind("mouseup mouseleave", function() {
				clearInterval(intervalId);
		});
			$("#hbright").mousedown(function() {
				movehurtbox();
				intervalId = setInterval(movehurtbox, 50);
			}).bind("mouseup mouseleave", function() {
				clearInterval(intervalId);
			});
			$("#characterbutton").hover(function(){
				$("#chardropdown").toggle();
			});
			$("#heatmaptype").hover(function(){
				$("#hmtypedropdown").toggle();
			});
			$("#hurtchar").hover(function(){
				$("#hurtchardropdown").toggle();
			});
	}
	else {
		$("#hbleft").click(function(){
			mobilemovehurtbox("l");
		});
		$("#hbright").click(function(){
			mobilemovehurtbox("r");
		});
		$("#characterbutton").click(function(){
			$("#chardropdown").toggle();
		});
		$("#heatmaptype").click(function(){
			$("#hmtypedropdown").toggle();
		});
		$("#hurtchar").click(function(){
			$("#hurtchardropdown").toggle();
		});
	}
	$(".attack").addClass("highlighted2");
	$(".framecontrol").children("p").addClass("framehighlight2");

	$(".attack").children("p").click(function(){
		$(this).parent().toggleClass("highlighted2");

		var atnum = $(this).parent().attr("id");
		if (atnum.length === 7){
			var atnum = atnum[6];
		}
		else {
			var atnum = atnum[6] + atnum[7];
		}
		togglehitbox("a", atnum);
	});

	$(".framecircle").click(function(){
		$(".framecircle").removeClass("fchighlight");
		$(this).addClass("fchighlight");
		var text = $(this).parent().children("p").text();
		if (text === ""){
			text = "ALL";
		}
		var type = $(this).attr("id");
		fselected = type;
		fselect(type, text);
	});

	$("#hbhlbutton").click(function(){
		$(this).children("p").children("span").empty();
		if (hbhlswitch){
			$(this).children("p").children("span").append("on");
			hbhlswitch = 0;
		}
		else {
			$(this).children("p").children("span").append("off");
			hbhlswitch = 1;
		}
	});


	$(".hbcharselect").click(function(){
		hurtchar = $(this).text();
		hurtchar2 = hurtchar.toLowerCase();
		$("#hurtboxcontainer").empty().append('<img id="hurtbox" '+isflipped+' src="assets/heatmaps/hurtboxes/'+hurtchar2+pos+'.png"/>');
		$("#hurtcurrent").empty().append(hurtchar);
		resizing();
	});
	$("#position").click(function(){
		$("#position").empty();
		if (pos === "crouch"){
			pos = "stand";
			$("#position").append("crouch");
		}
		else {
			pos = "crouch";
			$("#position").append("stand");
		}

		$("#hurtboxcontainer").empty().append('<img id="hurtbox" '+isflipped+' src="assets/heatmaps/hurtboxes/'+hurtchar2+pos+'.png"/>');;
		resizing();
	});
	$("#flip").click(function(){
		$("#hurtbox").toggleClass("flipped");
		if (isflipped === ''){
			isflipped = 'class="flipped"';
		}
		else {
			isflipped = '';
		}
	});

	$("#allattackon2").click(function(){
		$(".attack").addClass("highlighted2");
		for (i=1;i<11;i++){
			for (j=1;j<21;j++){
				if (fc["fc"+i][j-1]){
					$("#a"+i+"f"+j).fadeIn(200);
				}
			}
			attackswitches[i-1] = 1;
		}
	});

	$("#fallon").click(function(){
		$(".framecontrol").children("p").removeClass("framehighlight3");
		if (fselected.length > 3){
			var n = fselected[2]+fselected[3];
		}
		else {
			var n = fselected[2];
		}
		if (n === "0"){
			for (i=1;i<21;i++){
				for (j=1;j<11;j++){
					if (attackswitches[j-1]){
						$("#a"+j+"f"+i).fadeIn(200);
					}
					fc["fc"+j][i-1] = 1;
				}
				fc[fselected][i-1] = 1;
			}
			$(".framecontrol").removeClass("partialon partialoff");
		}
		else {
			for (i=1;i<21;i++){
					if (attackswitches[n-1]){
						$("#a"+n+"f"+i).fadeIn(200);
					}
			fc[fselected][i-1] = 1;
			}
		}
	});
	$("#allattackoff2").click(function(){
		$(".attack").removeClass("highlighted2");
		for (i=1;i<11;i++){
			$(".a"+i).fadeOut(200);
			attackswitches[i-1] = 0;
		}
	});
	$("#falloff").click(function(){
		$(".framecontrol").children("p").addClass("framehighlight3");
		if (fselected.length > 3){
			var n = fselected[2]+fselected[3];
		}
		else {
			var n = fselected[2];
		}
		if (n === "0"){
			$(".hitbox").fadeOut(200);
			for (i=1;i<21;i++){
				fc[fselected][i-1] = 0;
				for (j=1;j<11;j++){
					fc["fc"+j][i-1] = 0;
				}
			}
			$(".framecontrol").removeClass("partialon partialoff");
		}
		else {
			for (i=1;i<21;i++){
				$("#a"+n+"f"+i).fadeOut(200);
				fc[fselected][i-1] = 0;
			}	}
	});

	$("#times1").click(function(){
		$(this).addClass("highlighted2"
	);
		$("#times05").removeClass("highlighted2");
		$("#times025").removeClass("highlighted2");
		speed = 1;
	});
	$("#times05").click(function(){
		$(this).addClass("highlighted2");
		$("#times1").removeClass("highlighted2");
		$("#times025").removeClass("highlighted2");
		speed = 2;
	});
	$("#times025").click(function(){
		$(this).addClass("highlighted2");
		$("#times1").removeClass("highlighted2");
		$("#times05").removeClass("highlighted2");
		speed = 4;
	});



	$(".framecontrol").click(function(){
		$(this).children("p").toggleClass("framehighlight3");
		var fnum = $(this).attr("id");
		if (fnum.length === 6){
			fnum = fnum[5];
		}
		else {
			fnum = fnum[5]+fnum[6];
		}
		var n = fc[fselected][fnum-1];
		if (n === 0){
			fc[fselected][fnum-1] = 1;
			if (fselected === "fc0"){
				for (i=1;i<11;i++){
					fc["fc"+i][fnum-1] = 1;
				}
			}
			else {
				var notemp = 0;
				for (i=1;i<noofattacks+1;i++){
					if (fc["fc"+i][fnum-1] === 1){
						notemp++;
					}
				}
				if (notemp === noofattacks){
					fc["fc0"][fnum-1] = 1;
				}
			}
		}
		else if (n === 1){
			fc[fselected][fnum-1] = 0;
			if (fselected === "fc0"){
				for (i=1;i<11;i++){
					fc["fc"+i][fnum-1] = 0;
				}
			}
			var notemp = 0;
			for (i=1;i<noofattacks+1;i++){
				if (fc["fc"+i][fnum-1] === 0){
					notemp++;
				}
			}
			if (notemp === noofattacks){
				fc["fc0"][fnum-1] = 0;
			}
		}
		togglehitbox("f", fnum);
		if ($(this).hasClass("partialoff")){
			$(this).children(".help").empty().append("ALL off").css("top","-30px");
			$(this).removeClass("partialoff");
		}
		if ($(this).hasClass("partialon")){
			$(this).children(".help").empty().append("ALL on").css("top","-30px");
			$(this).removeClass("partialon");
		}
	});

	$(".hitbox-t").click(function(){
		var id = $(this).attr('id');
		prompt(id);
	});

	$(".hitbox-t").hover(function(){
		$(this).attr("stroke","white");
		var id = $(this).attr("id");
		id = id.substr(0,(id.length - 2));
		$("#"+id).attr("stroke","white");
	},function(){
		$(this).attr("stroke","none");
		var id = $(this).attr("id");
		id = id.substr(0,(id.length - 2));
		$("#"+id).attr("stroke","none");
	});

	$(".hitbox-t").mouseover(function(e){
		var id = $(this).attr("id");
		id = id.substr(0,(id.length - 2));
		var lengtha = id.indexOf("f");
		var a = parseInt(id.substr(1,lengtha - 1));
		var f = parseInt(id.substr(lengtha + 1, 2));
		if (attackswitches[a-1] && fc["fc"+a][f-1]){
  		$("#hurtboxcontainer").after('<div class="hitboxinfo">'+listofattacks[a-1]+' frame '+f+'</div>')
		}

	}).mouseout(function(){
  	$(".hitboxinfo").remove();
	});

	$(document).on('mousemove', function(e){
    $(".hitboxinfo").css({
       left:  e.pageX - 100,
       top:   e.pageY - 120
    });
	});

	$("#img-container").hover(function(){
		for (i=1;i<11;i++){
			if (attackswitches[i-1] === 0){
				for (j=1;j<21;j++){
					$("#a"+i+"f"+j+"-t").hide();
				}
			}
			else {
				for (j=1;j<21;j++){
					if (fc["fc"+i][j-1] === 0){
						$("#a"+i+"f"+j+"-t").hide();
					}
				}
			}
		}
	},function(){
		$("#hitboxsvg-t").children("path").show();
	});

	$("#imgurbox").hover(function(){
		$(this).toggleClass("imgurhighlight");
	});

	$("#draghurt").draggable({containment: "parent", scroll: false,
      drag: function() {
				var pos = $(this).position();
        $("#hurtcontrolbox").css("left",pos.left);
				$("#hurtboxcontainer").css("left",pos.left);
      },
			stop: function() {
				var pos = $(this).position();
        $("#hurtcontrolbox").css("left",pos.left);
				$("#hurtboxcontainer").css("left",pos.left);
				currenthurtboxpos = pos.left;
			}
			});

	/*$("#hurtcontrolbox").hover(function(){
		$(".hbcon").css("opacity","0.7");

		}, function(){
		$(".hbcon").css("opacity","0.5");
	});*/

	$(".hbcon").hover(function(){
		$(".hbcon").css("opacity","0.7");
		$(this).css("opacity","1");
		if ($(this).hasClass("hbcharselect")){
			$("#hurtchar").css("opacity","1");
		}
	}, function(){
		if ($(this).hasClass("hbcharselect")){
			$(".hbcon").css("opacity","0.7");
			$("#hurtchar").css("opacity","1");
		}
		else {
			$(".hbcon").css("opacity","0.5");
		}
	});

	$(".hbdirection").hover(function(){
		$(this).toggleClass("hbdirectionhighlight");
	});

	play();
});
