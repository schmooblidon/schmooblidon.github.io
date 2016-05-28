var resizingtype = function(){
	$("#main-content").width(windwidth);
	$("#inputSelectors").width(windwidth);
	$(".inputContainer").css("margin","20px "+(((windwidth-1170)/10)-1)+"px");
	$(".stageContainer").css("margin","10px "+(((windwidth-1130)/12)-1)+"px");
	$("#wlbo3").css("margin-left",(($("#bo3Container").width()-320)/2)+"px");
	$("#wlbo5").css("margin-left",(($("#bo5Container").width()-320)/2)+"px");
	$("#bo3setDetails").css("margin-left",(($("#bo3Container").width()-400)/2)+"px");
	$("#bo5setDetails").css("margin-left",(($("#bo5Container").width()-600)/2)+"px");
}
