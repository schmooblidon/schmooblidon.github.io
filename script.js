mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	mobile = true;
}
youtubeheightswitch = true;
youtubeheightswitch2 = false;
sideconwidth = 305;
controlconwidth = 100;
windwidth = 0;
windheight = 0;

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
		windwidth = $(window).width();
    windheight = $(window).height();
		if (windwidth < 1500){
			$("#main").addClass("smalltext");
		}
		else {
			$("#main").removeClass("smalltext");
		}
		if (windwidth < 1200){
			$(".button").css({"font-size":"12px","width":70}).children("p").css("margin","23px 0px");
			$(".longbutton").css("width",90);
      $(".doublebutton").css("width",80).children("p").css("margin","16px 0px");
			$("#titlelogo").css({"width":280,"height":60,"margin-top":0});
		}
		else {
			$(".button").css({"font-size":"16px","width":80}).children("p").css("margin","21px 0px");
			$(".longbutton").css("width",100);
      $(".doublebutton").css("width",85).children("p").css("margin","12px 0px");
			$("#titlelogo").css({"width":280,"height":60,"margin-top":0});
		}
		if (windwidth < 1050){
			$(".button").css({"font-size":"12px","width":65}).children("p").css("margin","23px 0px");
			$(".longbutton").css("width",75);
      $(".doublebutton").css("width",70).children("p").css("margin","16px 0px");;
			$("#titlelogo").css({"width":200,"height":43,"margin-top":10});
		}
		if (windwidth < 905){
			$(".button").css({"font-size":"10px","width":50}).children("p").css("margin","25px 0px");
			$(".longbutton").css("width",60);
      $(".doublebutton").css("width",55).children("p").css("margin","19px 0px");;
			$("#titlelogo").css({"width":150,"height":32,"margin-top":16});
		}
    $("#main").css("min-height",windheight-105+"px");
    resizingtype();
	};
var widthresize = function(){
	$(window).resize(function(){
		resizing();
	});
};
$(document).ready(function(){
	resizing();
	widthresize();
	randomtile();
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
		$(".sugbtn").hover(function(){
			$(this).toggleClass("sugbtnhighlight");
		});
	}
	setTimeout(resizing,500);
	setTimeout(resizing,1000);
	setTimeout(resizing,5000);
});
