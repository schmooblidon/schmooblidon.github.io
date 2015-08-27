

char = "doc";
attack = ["upb", "nair", "grab", "upair", "upsmash", "bair", "dair"];

attacks = {};
attacks.a7 = [[20],[18,17],[15,14]];
attacks.a6 = [[20,10]];
attacks.a5 = [[12,10]];
attacks.a4 = [[13,8]];
attacks.a3 = [[8,7]];
attacks.a2 = [[20,7]];
attacks.a1 = [[20,4]];


a = 7;
text = "";

var thing = function(){

	for (i=20;i>0;i--){

		for (j=a;j>0;j--){
			if (attacks["a"+j].length === 2){
				if (attacks["a"+j][0][0] === i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}
				else if (attacks["a"+j][0][0] < i && attacks["a"+j][0][1] >= i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}

				if (attacks["a"+j][1][0] === i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}
				else if (attacks["a"+j][1][0] < i && attacks["a"+j][1][1] >= i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}


			}
			else {
				if (attacks["a"+j][0][0] === i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}
				else if (attacks["a"+j][0][0] < i && attacks["a"+j][0][1] >= i){
					text = '<img class="a'+j+' f'+i+' hitbox" id="a'+j+'f'+i+'" src="assets/heatmaps/'+char+'/'+attack[j-1]+i+'.png"/>\n';
					$("body").append(text);
				}
			}
		}
	}
};

$(document).ready(function(){
	thing();
});
