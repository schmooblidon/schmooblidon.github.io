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
	var imgurtobaseratiow = 167 / 1280;
	var imgurtobaseratioh = 61 / 720;
	var base = $("#base");
	if (hitboxwidth > (windwidth - sideconwidth - controlconwidth)) {
		$("#img-container").children("img").width(windwidth - sideconwidth - controlconwidth);
		$("#hitboxsvg").width(windwidth - sideconwidth - controlconwidth);
		$("#hitboxsvg-t").width(windwidth - sideconwidth - controlconwidth);
		var previoushbwidth = $("#hurtboxcontainer").width();
		$("#hurtbox").width(base.width() * hurttobaseratio);
		$("#hurtboxcontainer").width(base.width() * hurttobaseratio);
		$("#draghurtcontainer").width(base.width());
		var draghurtmarg = ($("#hurtbox").width() - 140) / 2;
		if (draghurtmarg < 0){
			draghurtmarg = 0;
		}
		var temppos = $("#draghurt").position();
		var newleft = temppos.left * ($("#hurtboxcontainer").width()/previoushbwidth);
		$("#draghurt").css({"margin-left":draghurtmarg,"margin-right":draghurtmarg,"left":newleft});
		$("#hurtcontrolbox").css({"margin-left":draghurtmarg,"margin-right":draghurtmarg,"left":newleft});
		$("#hurtboxcontainer").css("left",newleft);

		$("#imgurbox").width(base.width() * imgurtobaseratiow);
		$("#imgur").width(base.width() * imgurtobaseratiow);
		$("#img-container").width(base.width());
		$("#img-container").children("img").height(base.width() / hmratio);
		$("#hitboxsvg").height(base.width() / hmratio);
		$("#hitboxsvg-t").height(base.width() / hmratio);
		$("#img-container").height(base.height());
		$("#hurtbox").height(base.height());
		$("#imgurbox").height(base.height() * imgurtobaseratioh);
		$("#imgur").height(base.height() * imgurtobaseratioh);
		$(".framecontrol").width(Math.round(base.width()/21));
		$("#frameall").width($(".framecontrol").width());
		$("#frame20").width(base.width() - $(".framecontrol").width() * 20);
		$("#imgandframecontainer").width(base.width());
		if (windwidth < 1500){
			if (windwidth < 1100){
				var dragboxdim = [75,25];
			}
			else if (windwidth < 1200){
				var dragboxdim = [80,30];
			}
			else if (windwidth < 1300){
				var dragboxdim = [85,35];
			}
			else if (windwidth < 1400){
				var dragboxdim = [90,40];
			}
			else {
				var dragboxdim = [95,45];
			}
			$("#hurtcontrolbox").height(dragboxdim[0]);
			$("#hurtboxmidcontrols").height(dragboxdim[0]);
			$("#draghurtcontainer").height(dragboxdim[1]);
			$("#draghurt").height(dragboxdim[1]);
			$("#hurtchardropdown").css("bottom",dragboxdim[0]);

		}
	}
	else {
		$("#img-container").children("img").width(hitboxwidth);
		$("#hitboxsvg").width(hitboxwidth);
		$("#hitboxsvg-t").width(hitboxwidth);
		var previoushbwidth = $("#hurtboxcontainer").width();
		$("#hurtbox").width(300);
		$("#hurtboxcontainer").width(300);
		$("#draghurtcontainer").width(base.width());
		var temppos = $("#draghurt").position();
		var newleft = temppos.left * (300/previoushbwidth);
		$("#draghurt").css({"margin-left":80,"margin-right":80,"left":newleft});
		$("#hurtcontrolbox").css({"margin-left":80,"margin-right":80,"left":newleft});
		$("#hurtboxcontainer").css("left",newleft);
		$("#img-container").width(hitboxwidth);
		$("#img-container").children("img").height(hitboxheight);
		$("#hitboxsvg").height(hitboxheight);
		$("#hitboxsvg-t").height(hitboxheight);
		$("#hurtbox").height(hitboxheight);
		$("#imgurbox").width(167);
		$("#imgur").width(167);
		$("#imgurbox").height(61);
		$("#imgur").height(61);
		$("#img-container").height(hitboxheight);
		$(".framecontrol").width(Math.round(hitboxwidth /21 - 1));
		$("#frameall").width($(".framecontrol").width());
		$("#frame20").width(base.width() - $(".framecontrol").width() * 20);
		$("#imgandframecontainer").width(hitboxwidth);
		$("#hurtcontrolbox").height(100);
		$("#hurtboxmidcontrols").height(100);
		$("#draghurtcontainer").height(50);
		$("#draghurt").height(50);
		$("#hurtchardropdown").css("bottom",100);
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
