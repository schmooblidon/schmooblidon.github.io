var thing = function(){
	for (i=1;i<101;i++){
		var c = $("#old img:nth-child("+i+")").attr("class");
		var id = $("#old img:nth-child("+i+")").attr("id");

		$("#hitboxsvg path:nth-child("+i+")").attr("class",c);
		$("#hitboxsvg path:nth-child("+i+")").attr("id",id);
		$("#hitboxsvg path:nth-child("+i+")").removeAttr("fill");

		c = c+"-t";
		id = id+"-t";

		$("#hitboxsvg-t path:nth-child("+i+")").attr("class",c);
		$("#hitboxsvg-t path:nth-child("+i+")").attr("id",id);
		$("#hitboxsvg-t path:nth-child("+i+")").removeAttr("fill");
		$("#hitboxsvg-t path:nth-child("+i+")").attr("style","fill:transparent");
	}
};






$(document).ready(function(){
	thing();
});
