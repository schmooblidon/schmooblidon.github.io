var resizingtype = function(){
	var ratio = 4580/3188;
	//width/length.   width = ratio*height.   height = width/ratio
	$("#display").width(windwidth-150);
	$("#trajectory").width(windwidth-150);
	$("#trajBackground").width(windwidth-150);
	$("#display").height($("#display").width()/ratio);
	$("#trajectory").height($("#trajectory").width()/ratio);
	$("#trajBackground").height($("#trajBackground").width()/ratio);
}
