trajOffset = $("#trajectory").offset();
ratio = 4580/3188;
disWidth = 4580;
disHeight = 3188;

var resizingtype = function(){
	//width/length.   width = ratio*height.   height = width/ratio
	$("#display").width(windwidth-300);
	$("#trajectory").width(windwidth-300);
	$("#trajBackground").width(windwidth-300);
	$("#trajCanvas").width(windwidth-300);
	disWidth = $("#display").width();
	$("#display").height($("#display").width()/ratio);
	$("#trajectory").height($("#trajectory").width()/ratio);
	$("#trajBackground").height($("#trajBackground").width()/ratio);
	$("#trajCanvas").height($("#trajCanvas").width()/ratio);
	disHeight = $("#display").height();
	trajOffset = $("#trajectory").offset();
}
