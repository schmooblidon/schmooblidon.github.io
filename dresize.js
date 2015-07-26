var resizingtype = function(){
	$("#blogcontainer").width(windwidth - 360);
	if ($("#kneecoin").length){
		var kcratio = 400/452;
		$("#donationleft").width("40%");
		var dlw = $("#donationleft").width();
		$("#kneecoin").width(dlw);
		$("#kneecoin").height(dlw * (1/kcratio));
		var drh = $("#donationright").height();
		var kch = $("#kneecoin").height();
		if (drh > kch){
			$("#donationleft").height(drh);
		}
		else {
			$("#donationleft").height(kch);
		}
		var marg = 0.5 * ($("#donationleft").height() - $("#kneecoin").height());
		$("#kneecoin").css("margin", marg+"px 0px "+marg+"px 0px");
	}
}
