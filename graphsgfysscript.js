if	(typeof noofgfys === 'undefined'){
	var noofgfys = 0;
}
(function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
}(document, 'script'));

$(document).ready(function(){
	if (mobile === false){
		$(".maximize").hover(function(){
		$(this).fadeTo(300, 0.5);
		}, function(){
		$(this).fadeTo(300, 0);
		});
		$(".ig-button").hover(function(){
			$(this).toggleClass("ighighlighted");
		});
    $(".fullsize").hover(function(){
      $(this).toggleClass("highlighted");
    });
	}
	else {
    $(".maximize").attr("src", "assets/tapenlarge.png").css("opacity",100);
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
      var $bigimg = $("#bigimg");
			$bigimg.load(function(){
				var ratio = $bigimg.width() / $bigimg.height() ;
				var top = h - $bigimg.height();
				var left = w - $bigimg.width();
				if (top < 40 || left < 40){
					if (top < 40){
						$bigimg.height((h-40));
						top = 0;
						$bigimg.width($bigimg.height() * ratio);
						left = (w - $bigimg.width())*0.5 - 20;
					}
					else if (left < 40){
						$bigimg.width((w-40));
						left = 0;
						$bigimg.height($bigimg.width() / ratio);
						top = (h - $bigimg.height())*0.5 - 20;
					}
				}
				else {
					top = top * 0.5 - 20;
					left = left * 0.5 - 20;
				}
			$bigimg.css({"top":top+"px","left":left+"px"});
		});
			$bigimg.click(function(){
				$("#bigimgcontainer").empty();
			});
		}
	});
});
