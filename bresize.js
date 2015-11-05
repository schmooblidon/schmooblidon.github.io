var resizingtype = function(){
	$(".blogcontainer").width(windwidth - 60);
	$(".blog").width(windwidth - 140);
	if (windwidth < 1120){
		$("#bloggfycontainer").width(500).height(269);
		$("#docupb").width(500).height(427);
	}
	if (windwidth < 900){
		$("#bloggfycontainer").width(400).height(215);
		$("#docupb").width(400).height(341);
	}
	if (windwidth >= 1120) {
		$("#bloggfycontainer").width(700).height(376);;
		$("#docupb").width(700).height(597);
	}

}
