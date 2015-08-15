var resizingtype = function(){
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
		$("#hitboxsvg").width(windwidth - sideconwidth - controlconwidth);
		$("#hurtbox").width(base.width() * hurttobaseratio);
		$("#img-container").width(base.width());
		$("#img-container").children("img").height(base.width() / hmratio);
		$("#hitboxsvg").height(base.width() / hmratio);
		$("#img-container").height(base.height());
		$("#hurtbox").height(base.height());
		$(".framecontrol").width(Math.round(base.width()/21));
		$("#frameall").width($(".framecontrol").width());
		$("#frame20").width(base.width() - $(".framecontrol").width() * 20);
		$("#imgandframecontainer").width(base.width());
	}
	else {
		$("#img-container").children("img").width(hitboxwidth);
		$("#hitboxsvg").width(hitboxwidth);
		$("#hurtbox").width(300);
		$("#img-container").width(hitboxwidth);
		$("#img-container").children("img").height(hitboxheight);
		$("#hitboxsvg").height(hitboxheight);
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

	if ($("#main").css("font-family") === "Courier New"){
		$("#img-button").css("font-size","11px");
		$("#hbhlbutton").css("font-size","9px");
		$("#control-speed").css("font-size","10px");
	}
}
