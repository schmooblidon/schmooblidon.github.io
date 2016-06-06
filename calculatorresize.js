trajOffset = $("#trajCanvas").offset();
//diOffset = {};
diOffset = $("#tdiSelector").offset();
//diOffset.s = $("#sdiSelector").offset();
//diOffset.a = $("#adiSelector").offset();
ratio = 4580/3188;
disWidth = 4580;
disHeight = 3188;

activeStage = "bf";

dimensions = {};
dimensions.bf = [4580,3188];
dimensions.fd = [5020,3380];
dimensions.dl = [5200,3830];
dimensions.ps = [4700,3010];
dimensions.ys = [3593,2690];
dimensions.fo = [4075,3588];

bz = {};
bz.bf = [200,224,-108.8,-224];
bz.fd = [188,246,-140,-246];
bz.dl = [250,255,-123,-255];
bz.ps = [180,230,-111,-230];
bz.ys = [168,173.6,-91,-175.7];
bz.fo = [202.5,198.75,-146.25,-198.75];

bzTop = 200;
bzBottom = -108.8;
bzLeft = -224;
bzRight = 224;

disMagnification = 1;

collapsed = {};
collapsed.l = false;
collapsed.r = false;
collapsed.t = false;
collapsed.b = false;

activeDI = "t";

zoom = 1;

midwidth = 0;
displayheight = 0;

var resizingtype = function(){
	//width/length.   width = ratio*height.   height = width/ratio
	mousePosBoxOffset = [220,145];
	midwidth = Math.floor(windwidth-360);
	console.log(windwidth);
	console.log(midwidth);
	var hbuffer = 0;
	var vbuffer = 0;

	if (collapsed.l){
		midwidth += 150;
		//mousePosBoxOffset[0] -= 150;
	}
	if (collapsed.r){
		midwidth += 150;
		mousePosBoxOffset[0] -= 150;
	}
	var midheight = windheight-45;
	displayheight = midheight - 260 ;
	if (collapsed.t){
		displayheight  += 100;
	}
	if (collapsed.b){
		displayheight += 100;
		mousePosBoxOffset[1] -= 100;
	}

	$("#middlecontrols, #tcontrols, #tcontrolscollapse, #bcontrols, #bcontrolscollapse").width(midwidth);
	$("#trajBoxContainer").width(midwidth-140);
	$("#stageSelectContainer").width(midwidth-270);

	//find blastzone buffer
	if (zoom == 1){
		if (midwidth/ratio <= displayheight){
			vbuffer = displayheight - (midwidth/ratio);
			hbuffer = 0;
			$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").width(midwidth);
			$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").height(midwidth/ratio);
			$("#display").css("border-width",(vbuffer/2 + 1)+"px 0px");
			mousePosBoxOffset[1] += vbuffer/2;
		}
		else {
			vbuffer = 0;
			hbuffer = midwidth - (ratio*displayheight);
			$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").width(ratio*displayheight);
			$("#display, #trajectory, #trajectory-t, #trajBackground, #trajCanvas").height(displayheight);
			$("#display").css("border-width","0px "+(hbuffer/2 + 1)+"px");
			mousePosBoxOffset[0] += hbuffer/2;
		}
	}
	else {
		if (midwidth/ratio <= displayheight){
			$("#display, #trajCanvas").width(midwidth);
			$("#display, #trajCanvas").height(midwidth/ratio);
			$("#trajectory, #trajectory-t, #trajBackground").width(midwidth*zoom);
			$("#trajectory, #trajectory-t, #trajBackground").height((midwidth/ratio)*zoom);
			vbuffer = displayheight - (midwidth/ratio)*zoom;
			if (vbuffer < 0){
				vbuffer = 0;
				$("#display, #trajCanvas").height(displayheight);
			}
			else {
				$("#display, #trajCanvas").height((midwidth/ratio)*zoom);
			}
			$("#display").css("border-width",(vbuffer/2 + 1)+"px 0px");
			mousePosBoxOffset[1] += vbuffer/2;
		}
		else {
			$("#display, #trajCanvas").width(ratio*displayheight);
			$("#display, #trajCanvas").height(displayheight);
			$("#trajectory, #trajectory-t, #trajBackground").width(ratio*displayheight*zoom);
			$("#trajectory, #trajectory-t, #trajBackground").height(displayheight*zoom);
			hbuffer = midwidth - (ratio*displayheight*zoom);
			if (hbuffer < 0){
				hbuffer = 0;
				$("#display, #trajCanvas").width(midwidth);
			}
			else {
				$("#display, #trajCanvas").width(ratio*displayheight*zoom);
			}
			$("#display").css("border-width","0px "+(hbuffer/2 + 1)+"px");
			mousePosBoxOffset[0] += hbuffer/2;
		}
	}

	$("#middlecontrols, #lcontrols, #lcontrolscollapse, #rcontrols, #rcontrolscollapse").height(midheight);
	$("#rcontrolsOptions").height(midheight - 40);

	$("#attackscroll").height($("#lcontrols").height()-235);
	disWidth = $("#trajectory").width();
	disHeight = $("#trajectory").height();
	disMagnification = disWidth/dimensions[activeStage][0];
	for(i=1;i<=9;i++){
		$("#labelBox"+i).css({"top":t["t"+i].labelY * disMagnification,"left":t["t"+i].labelX *disMagnification});
	}
	$("#labelBox0").css({"top":titleY * disMagnification,"left":titleX *disMagnification});
	trajOffset = $("#trajCanvas").offset();
	diOffset = $("#"+activeDI+"diSelector").offset();

	$("#mousePosition").css({"right":mousePosBoxOffset[0]+"px","bottom":mousePosBoxOffset[1]+"px"});

	$("#display").perfectScrollbar('update');

}
