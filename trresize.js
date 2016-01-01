trajOffset = $("#trajectory").offset();
ratio = 4580/3188;
disWidth = 4580;
disHeight = 3188;

collapsed = {};
collapsed.l = false;
collapsed.r = false;
collapsed.t = false;
collapsed.b = false;

var resizingtype = function(){
	//width/length.   width = ratio*height.   height = width/ratio
	var midwidth = windwidth-360;
	var hbuffer = 0;
	var vbuffer = 0;

	if (collapsed.l){
		midwidth += 150;
	}
	if (collapsed.r){
		midwidth += 150;
	}
	var midheight = windheight-45;
	var displayheight = midheight - 260 ;
	if (collapsed.t){
		displayheight  += 100;
	}
	if (collapsed.b){
		displayheight += 100;
	}

	$("#middlecontrols, #tcontrols, #tcontrolscollapse, #bcontrols, #bcontrolscollapse").width(midwidth);

	//find blastzone buffer

	if (midwidth/ratio <= displayheight){
		vbuffer = displayheight - (midwidth/ratio);
		hbuffer = 0;
		$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").width(midwidth);
		$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").height(midwidth/ratio);

		$("#display").css("border-width",(vbuffer/2 + 1)+"px 0px");
	}
	else {
		vbuffer = 0;
		hbuffer = midwidth - (ratio*displayheight);

		$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").width(ratio*displayheight);
		$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").height(displayheight);

		$("#display").css("border-width","0px "+(hbuffer/2 + 1)+"px");
	}



	$("#middlecontrols, #lcontrols, #lcontrolscollapse, #rcontrols, #rcontrolscollapse").height(midheight);

	$("#attackscroll").height($("#lcontrols").height()-255);
	disWidth = $("#display").width();
	disHeight = $("#display").height();
	trajOffset = $("#trajectory").offset();
}
