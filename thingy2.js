attack = ["upb", "fair", "nair", "upair", "bair", "upsmash", "grab"];

attacks = {};


attacks.a6 = [[20]];
attacks.a5 = [[20,16]];
attacks.a4 = [[14]];
attacks.a3 = [[14,13]];
attacks.a2 = [[20,12]];
attacks.a1 = [[8,7]];
a = 6;

num = 1;
var applychange = function(i,j){
	$("#hitboxsvg path:nth-child("+num+")").attr("class","a"+j+" f"+i+" hitbox");
	$("#hitboxsvg path:nth-child("+num+")").attr("id","a"+j+"f"+i);
	$("#hitboxsvg path:nth-child("+num+")").removeAttr("fill");
	$("#hitboxsvg-t path:nth-child("+num+")").attr("class","a"+j+" f"+i+" hitbox-t");
	$("#hitboxsvg-t path:nth-child("+num+")").attr("id","a"+j+"f"+i+"-t");
	$("#hitboxsvg-t path:nth-child("+num+")").removeAttr("fill");
	$("#hitboxsvg-t path:nth-child("+num+")").attr("style","fill:transparent");
	num++;
}

var thing = function(){
		/*var c = $("#old img:nth-child("+num+")").attr("class");
		var id = $("#old img:nth-child("+num+")").attr("id");*/

		for (i=20;i>0;i--){

			for (j=a;j>0;j--){
				if (attacks["a"+j].length > 1){
					for (x=1;x<=attacks["a"+j].length;x++){
						if (attacks["a"+j][x-1][0] === i){
							applychange(i,j);
						}
						else if (attacks["a"+j][x-1][0] > i && attacks["a"+j][x-1][1] <= i){
							applychange(i,j);
						}
					}
				}
				else {
					if (attacks["a"+j][0][0] === i){
						applychange(i,j);
					}
					else if (attacks["a"+j][0][0] > i && attacks["a"+j][0][1] <= i){
						applychange(i,j);
					}
				}
			}
		}


};






$(document).ready(function(){
	thing();
});
