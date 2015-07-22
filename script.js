mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	mobile = true;
}
youtubeheightswitch = true;
youtubeheightswitch2 = false;
sideconwidth = 300;
controlconwidth = 100;
hitboxwidth = 1280;
hitboxheight = 714;
hbhlswitch = 1;
hurtchar = "falcon";
pos = "stand";
currentMargin = "75%";
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
var fc = {};
for(i=0;i<11;i++){
	fc["fc"+i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
}
if	(typeof noofgfys === 'undefined'){
	var noofgfys = 0;
}
var fselect = function(type, text){
	$("#fsid").empty();
	$("#fsid").append(text);
	$(".framecontrol").removeClass("partialon");
	$(".framecontrol").removeClass("partialoff");
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
	if ($("#hbleft").hasClass("highlighted")){
		if (cm > 0){
				$("#hurtbox").css("margin-left",(cm-1)+"%");
		}
	}
	else if ($("#hbright").hasClass("highlighted")){
		if (cm < 75){
				$("#hurtbox").css("margin-left",(cm+1)+"%");
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
			$("."+type).toggleClass(type+"off");
		}
		else if (y === 0){
			if (fselected === "fc0"){
				for (i=1;i<11;i++){
					if (!$("#a"+i+type).hasClass("a"+i+"off")){
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
				if (!$("#a"+snum+type).hasClass("a"+snum+"off")){
					$("#a"+snum+type).fadeToggle(200,0);
				}
			}
	}
};
var hbhl = function(t,z){
		if (t === "a"){
			if (z === "0"){
				$(".hitbox").toggleClass("hitboxhighlight");
			}
			else {
			$("."+t+z).toggleClass("hitboxhighlight");
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
				$("."+t+z).toggleClass("hitboxhighlight");
			}
			else {
				$("#a"+n+t+z).toggleClass("hitboxhighlight");
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
					if (!$("#a"+j+"f"+i).hasClass("a"+j+"off") && (fc["fc"+j][i-1])){
						$("#a"+j+"f"+i).fadeOut(1).delay(a+800-17).fadeIn(1);
					}
			}
		}
		$("#go").fadeIn(1).delay(1040).fadeOut(1)
	});
};
var randomtile = function(){
	rand = Math.random();
	if (rand > 0.8){
		$("#main").addClass("falcontile");
	}
	else if(rand > 0.6){
		$("#main").addClass("shinetile");
	}
	else if(rand > 0.4){
		$("#main").addClass("randalltile");
	}
	else if(rand > 0.2){
		$("#main").addClass("turnipset1tile");
	}
	else {
		$("#main").addClass("turnipset2tile");
	}
};
var resizing = function() {
		var windwidth = $(window).width();
		if (windwidth < 1500){
			$("#main").addClass("smalltext");
		}
		else {
			$("#main").removeClass("smalltext");
		}
		if (windwidth < 1200){
			$(".button").css({"font-size":"12px","width":70,"bottom":0});
			$(".longbutton").css({"width":102,"top":0});
			$("#titlelogo").css({"width":280,"height":60,"margin-top":10});
		}
		else {
			$(".button").css({"font-size":"16px","width":90,"bottom":0});
			$(".longbutton").css({"width":135,"top":0});
			$("#titlelogo").css({"width":280,"height":60,"margin-top":10});
		}
		if (windwidth < 1050){
			$(".button").css({"font-size":"12px","width":60,"bottom":14});

			$(".longbutton").css({"width":70,"bottom":0,"top":0});
			$("#titlelogo").css({"width":200,"height":43,"margin-top":20});
		}
		if (windwidth < 870){
			$(".button").css({"font-size":"10px","width":50,"bottom":11});
			$(".longbutton").css({"width":60,"top":0});
			$("#titlelogo").css({"width":150,"height":32,"margin-top":25});
		}
		if ($("#blog").length){
			var type = "b";
		}
		else if ($("#infographmain").length){
			var type = "g";
		}
		else if ($("#imgandframecontainer").length){
			var type = "h";
		}
		else if ($("#donationleft").length){
			var type = "d";
		}
		else if ($("#about").length){
			var type = "a";
		}
		switch(type) {
			case "b":
				$("#blogcontainer").width(windwidth - 360);
				$("#blog").width(windwidth - 440);
				break;
			case "g":
				$("#ig-content").width(windwidth - 490);
				$(".ig").width(windwidth - 490);
				$(".ig-text").width(windwidth - 1040);
				if (windwidth < 1500){
					$(".graphcontainer").width(350);
					$(".graphcontainer").children("a").children("img").width("99%");
					$(".graphcontainer").children("a").children("img").height("99%");
					$(".graphcontainer").children("img").width("99%");
					$(".graphcontainer").children("img").height("99%");
					if (youtubeheightswitch){
						for (i=1;i<3;i++){
						var tempid = "#vid" + i;
						$(".graphcontainer").children(".vid"+i).height((
						$(".graphcontainer").children(".vid"+i).height() * (350/550)
						));
						}
					youtubeheightswitch = false;
					}
					$(".graphcontainer").children("iframe").width(350);
					youtubeheightswitch2 = true;
					$(".ig-text").width(windwidth - 840);
					$("video").css({"width": "65%","height":" 65%"});
					if ($(".ig").hasClass("gfyinside1")){

						//$(".gfyPreLoadCanvas").css({"width": "65%","height":" 65%"});
						//$(".gfyDotCanvas").css("right", 200);
						//$(".gfyCtrlTabPull").hide();
						for (i=1;i<noofgfys+1;i++){
							//$(".gfyinside"+i).height($(".gfyinside"+i).children(".graphcontainer").children(".gfyitem").children("div").height() * 0.65);
							//$(".gfyinside"+i).find(".gfyCtrlBox").css({"right" : 200, "bottom": $(".gfyinside"+i).children(".graphcontainer").children(".gfyitem").children("div").height() * 0.35  - 40});
							//if($(".gfyinside"+i).height() < $(".gfyinside"+i).children(".ig-text").height()){
								//$(".gfyinside"+i).height($(".gfyinside"+i).children(".ig-text").height());
					//		}
							//$(".gfyinside"+i).children(".graphcontainer").height($(".gfyinside"+i).height() + 30);
							$(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());
						}
					}
					if (windwidth < 1150){
						$(".ig").css("display", "block");
						$(".ig-text").css("float", "none");
						$(".ig-text").width("auto");
						for (i=1;i<noofgfys+1;i++){
						//	$(".gfyinside"+i).children(".graphcontainer").height("auto");
							//$(".gfyinside"+i).children(".ig-text").css("bottom", $(".gfyinside"+i).children(".graphcontainer").height() * 0.35 - 20);

							//$(".gfyinside"+i).height($(".gfyinside"+i).children(".graphcontainer").height() * 0.65 + $(".gfyinside"+i).children(".ig-text").height() + 25);
							$(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());
						}
					}
					else {
						$(".ig").css("display", "inline-block");
						$(".ig-text").css("float", "right");
						$(".ig-text").width(windwidth - 840);
						for (i=1;i<noofgfys+1;i++){
							//$(".gfyinside"+i).children(".ig-text").css("bottom", 0);
							$(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());

						}
					}
				}
				else {
						$(".graphcontainer").width(550);
						$(".graphcontainer").children("a").children("img").width("100%");
						$(".graphcontainer").children("a").children("img").height("100%");
						$(".graphcontainer").children("img").width("100%");
						$(".graphcontainer").children("img").height("100%");
						$(".ig-text").width(windwidth - 1040);
						$("video").width("100%");
						$("video").height("100%");
					//	$(".gfyCtrlBox").css({"right" : 0,
					//	"bottom" : 0});
					//	$(".gfyDotCanvas").css("right", 0);
					//	$(".gfyCtrlTabPull").show();
						youtubeheightswitch = true;
						$(".graphcontainer").children("iframe").width(550);
						if (youtubeheightswitch2){
							for (i=1;i<3;i++){
								$(".graphcontainer").children(".vid"+i).height((
								$(".graphcontainer").children(".vid"+i).height() * (550/350)));
							}
							youtubeheightswitch2 = false;
						}
						$(".ig").css("display", "inline-block");
						$(".ig-text").css("float", "right");
						$(".ig").height("auto");
						for (i=1;i<noofgfys+1;i++){
						//	$(".gfyinside"+i).children(".ig-text").css("bottom", 0);
						//	$(".gfyinside"+i).children(".graphcontainer").height("auto");

							$(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());
						}
					}
				break;
			case "h":
				var i = 11;
				while (i>0){
					var x = $("#attack"+i).length;
					if (x > 0){
						var numofa = i;
						i = 0;
					}
					else {
						i--;
					}
				}
				var hmratio = hitboxwidth / hitboxheight;
				var hurttobaseratio = 300 / 1280;
				var base = $("#base");
				if (hitboxwidth > (windwidth - sideconwidth - controlconwidth)) {
					$("#img-container").children("img").width(windwidth - sideconwidth - controlconwidth);
					$("#hurtbox").width(base.width() * hurttobaseratio);
					$("#img-container").width(base.width());
					$("#img-container").children("img").height(base.width() / hmratio);
					$("#img-container").height(base.height());
					$("#hurtbox").height(base.height());
					$(".framecontrol").width(Math.round(base.width()/21));
					$("#frameall").width($(".framecontrol").width());
					$("#frame20").width(base.width() - $(".framecontrol").width() * 20);
					$("#imgandframecontainer").width(base.width());
				}
				else {
					$("#img-container").children("img").width(hitboxwidth);
					$("#hurtbox").width(300);
					$("#img-container").width(hitboxwidth);
					$("#img-container").children("img").height(hitboxheight);
					$("#hurtbox").height(hitboxheight);
					$("#img-container").height(hitboxheight);
					$(".framecontrol").width(Math.round(hitboxwidth /21 - 1));
					$("#frameall").width($(".framecontrol").width());
					$("#frame20").width(base.width() - $(".framecontrol").width() * 20);
					$("#imgandframecontainer").width(hitboxwidth);
				}
				if (windwidth < 1150){
					$(".framecontrol").css("font-size","15px");
				}
				else {
						$(".framecontrol").css("font-size","20px");
				}
				if (windwidth < 1057){
					$(".control").height(35);
					$(".control").children("p").css("padding","6px 0px 6px 0px");
					$(".allatt").height(18);
					$(".framecircle").css("margin","7px 0px 7px 0px");
					$("#hurtboxcontrol").find(".control").height(25);
					$("#hurtboxcontrol").find("p").css("padding","4px 0px 4px 0px");
					$("#play-button").height(43);
					$("#img-button").height(25);
					$("#hbhlbutton").height(28);
					$("#control-container").height(((numofa + 3)* 35)+214);
				}
				else {
					$(".control").height(40);
					$(".control").children("p").css("padding","9px 0px 9px 0px");
					$(".allatt").height(20);
					$(".framecircle").css("margin","10px 0px 10px 0px");
					$("#hurtboxcontrol").find(".control").height(25);
					$("#hurtboxcontrol").find("p").css("padding","4px 0px 4px 0px");
					$("#play-button").height(43);
					$("#img-button").height(31);
					$("#hbhlbutton").height(28);
					$("#control-container").height(((numofa + 3)* 40)+236);
				}
				break;
			case "d":
				$("#blogcontainer").width(windwidth - 360);
				if ($("#kneecoin").length){
					var kcratio = 400/452;
					$("#donationleft").width("40%");
					var dlw = $("#donationleft").width();
					$("#kneecoin").width(dlw);
					$("#kneecoin").height(dlw * (1/kcratio));
					var drh = $("#donationright").height();
					var kch = $("#kneecoin").height();
					if (drh > kch){
						$("#donationleft").height(drh);
					}
					else {
						$("#donationleft").height(kch);
					}
					var marg = 0.5 * ($("#donationleft").height() - $("#kneecoin").height());
					$("#kneecoin").css("margin", marg+"px 0px "+marg+"px 0px");
				}
				break;
			case "a":
				$("#blogcontainer").width(windwidth - 360);
				break;
		}

		if ($("#main").css("font-family") === "Courier New"){
			$("#img-button").css("font-size","11px");
			$("#hbhlbutton").css("font-size","9px");
			$("#control-speed").css("font-size","10px");
		}
	};
var widthresize = function(){
	$(window).resize(function(){
		resizing();
	});
};
(function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
}(document, 'script'));
$(document).ready(function(){
	$("#fc0").addClass("fchighlight");
	resizing();
	widthresize();
	var noofattacks = 0;
	for(i=1;i<11;i++){
		if ($("#top-controls").children("#attack"+i).length > 0){
			noofattacks++;
		}
	}
	$("#times1").addClass("highlighted2");
	$("#chardropdown").hide();
	$("#hmtypedropdown").hide();
	$("#hurtchardropdown").hide();
	$("#ready").fadeOut(1);
	$("#go").fadeOut(1);
	randomtile();
	if (mobile === false){
		helpbox();
	}
	$(".attack").addClass("highlighted2");
	$(".framecontrol").children("p").addClass("framehighlight2");
	if (mobile === false){
		$(".maximize").hover(function(){
		$(this).fadeTo(300, 0.5);
		}, function(){
		$(this).fadeTo(300, 0);
		});
	}
	$(".maximize").click(function(){
		var char = $(this).parents("#ig-content").attr('class');
		var num = $(this).attr('id');
		if (num.length > 2){
			char = "";
		}
		if ($("#bigimg").length === 0){
			var w = $(window).width();
			var h = $(window).height();
			var code ='<img id="bigimg" src="assets/infographs/'+char+num+'.jpg"/>';
			$("#bigimgcontainer").append(code);
			$("#bigimg").load(function(){
				var ratio = $("#bigimg").width() / $("#bigimg").height() ;
				var top = h - $("#bigimg").height();
				var left = w - $("#bigimg").width();
				if (top < 40 || left < 40){
					if (top < 40){
						$("#bigimg").height((h-40));
						top = 0;
						$("#bigimg").width($("#bigimg").height() * ratio);
						left = (w - $("#bigimg").width())*0.5 - 20;
					}
					else if (left < 40){
						$("#bigimg").width((w-40));
						left = 0;
						$("#bigimg").height($("#bigimg").width() / ratio);
						top = (h - $("#bigimg").height())*0.5 - 20;
					}
				}
				else {
					top = top * 0.5 - 20;
					left = left * 0.5 - 20;
				}
			$("#bigimg").css({"top":top+"px","left":left+"px"});
		});
			$("#bigimg").click(function(){
				$("#bigimgcontainer").empty();
			});
		}
	});
	if (mobile === false){
		$(".button").hover(function(){
			$(this).toggleClass("buttonhighlighted");
		});
		$(".socialmedia").hover(function(){
			$(this).toggleClass("socialmediahighlight");
		});

		$("#header").hover(function(){
			$("body").toggleClass("bodyhighlight");
		});

		$("#heatmapinfo").hover(function(){
			$("#heatmapinfobox").fadeToggle(300);
		});
		$(".noa").hover(function(){
			$(this).toggleClass("highlighted");
		});
		$(".attack").children("p").hover(function(){
			$(this).parent().toggleClass("highlighted");
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
		});
	}
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
	if (mobile === false){
	$(".framecircle").hover(function(){
		$(this).toggleClass("highlighted");
		});
	}
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
	if (mobile === false){
	$(".sugbtn").hover(function(){
		$(this).toggleClass("sugbtnhighlight");
	});
	}
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
	if (mobile === false){
		$("#hurtchar").hover(function(){
			$("#hurtchardropdown").toggle();
		});
	}
	$(".hbcharselect").click(function(){
		hurtchar = $(this).text();
		hurtchar = hurtchar.toLowerCase();
		$("#hurtcurrent").empty();
		$("#hurtcurrent").append(hurtchar);
		$("#hurtboxcontainer").empty();
		$("#hurtboxcontainer").append('<img id="hurtbox" '+isflipped+' src="assets/heatmaps/hurtboxes/'+hurtchar+pos+'.png" style="margin-left:'+currentMargin+'"/>');
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

		$("#hurtboxcontainer").empty();
		$("#hurtboxcontainer").append('<img id="hurtbox" '+isflipped+' src="assets/heatmaps/hurtboxes/'+hurtchar+pos+'.png" style="margin-left:'+currentMargin+'"/>');
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
	$("#allattackon2").click(function(){
		$(".attack").addClass("highlighted2");
		for (i=1;i<11;i++){
			for (j=1;j<21;j++){
				if (fc["fc"+i][j-1]){
					$("#a"+i+"f"+j).fadeIn(200);
				}
			}
			$(".a"+i).removeClass("a"+i+"off");
		}
	});
	if (mobile === false){
	$("#frameall").children("div").hover(function(){
		$(this).toggleClass("highlighted2");
	});
}
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
					if (!$("#a"+j+"f"+i).hasClass("a"+j+"off")){
						$("#a"+j+"f"+i).fadeIn(200);
					}
					fc["fc"+j][i-1] = 1;
				}
				fc[fselected][i-1] = 1;
			}
			$(".framecontrol").removeClass("partialon");
			$(".framecontrol").removeClass("partialoff");
		}
		else {
			for (i=1;i<21;i++){
					if (!$("#a"+n+"f"+i).hasClass("a"+n+"off")){
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
			$(".a"+i).addClass("a"+i+"off");
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
			$(".framecontrol").removeClass("partialon");
			$(".framecontrol").removeClass("partialoff");
		}
		else {
			for (i=1;i<21;i++){
				$("#a"+n+"f"+i).fadeOut(200);
				fc[fselected][i-1] = 0;
			}	}
	});
	if (mobile === false){
	$(".speed").hover(function(){
		$(this).toggleClass("highlighted"
	);
	});
}
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
	if (mobile === false){
	$("#characterbutton").hover(function(){
		$("#chardropdown").toggle();
	});
	$("#heatmaptype").hover(function(){
		$("#hmtypedropdown").toggle();
	});
	$(".framecontrol").hover(function(){
		$(this).children("p").toggleClass("framehighlight framehighlight2");
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
	});
}
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
			$(this).children(".help").empty();
			$(this).children(".help").append("ALL off");
			$(this).children(".help").css("top","-30px");
			$(this).removeClass("partialoff");
		}
		if ($(this).hasClass("partialon")){
			$(this).children(".help").empty();
			$(this).children(".help").append("ALL on");
			$(this).children(".help").css("top","-30px");
			$(this).removeClass("partialon");
		}
	});
	play();
	$("#shrink").click(function(){
		$("#img-container").animate({width:600, height:449},200);
		$("#img-container").children("img").animate({height:449, width:600},200);
		$("#framecontainer").animate({width:600},200);
		$(".framecontrol").animate({width:30},200);
	});
	$("#enlarge").click(function(){
		$("#img-container").animate({height:618, width:825},200);
		$("#img-container").children("img").animate({height:618, width:825},200);
		$("#framecontainer").animate({width:825},200);
		$(".framecontrol").animate({width:41},200);
	});
	if (mobile === false){
	$(".fullsize").hover(function(){
		$(this).toggleClass("highlighted");
	});
	$(".ig-button").hover(function(){
		$(this).toggleClass("ighighlighted");
	});
}
	setTimeout(resizing,500);
	setTimeout(resizing,1000);
	setTimeout(resizing,5000);
});
