
/*throwAnim = {};

throwAnim.Sm = {};
throwAnim.Sm.uthrow = {};
throwAnim.Sm.uthrow.throwN = [0.79793,41.7047];
throwAnim.CF = {};
throwAnim.CF.bthrow = {};
throwAnim.CF.bthrow.throwN = [-11.360,22.2253];
throwAnim.CF.fthrow = {};
throwAnim.CF.fthrow.throwN = [7.53633,12.5128];
throwAnim.Pi = {};
throwAnim.Pi.bthrow = {};
throwAnim.Pi.bthrow.throwN = [-2.819,6.70068];
throwAnim.Pi.bthrow.transN = [-14.000,0];*/


throwOffsets = {"Pichu":[0.0000,-4.5996],"Puff":[0.0000,-5.0000],"Kirby":[0.0000,-5.0000],"ICs":[0.0000,-5.0042],"Ness":[0.0000,-5.0042],"Yoshi":[0.0000,-5.6000],"Doc":[0.0000,-5.6672],"Luigi":[0.0000,-5.6672],"Mario":[0.0000,-5.6672],"Pika":[0.0000,-5.7997],"MrG&W":[0.0000,-6.1937],"Sheik":[-0.3466,-8.2405],"Falco":[0.0000,-8.3000],"Fox":[0.0000,-8.3000],"Link":[-0.2257,-8.5516],"Y.Link":[-0.2334,-8.5533],"Peach":[0.0000,-9.4000],"Zelda":[0.0000,-9.4000],"Marth":[-0.4263,-9.8485],"Roy":[-0.4263,-9.8485],"Mewtwo":[-0.2257,-10.3076],"DK":[0.0000,-13.4311],"Falcon":[0.4884,-13.8475],"Ganon":[0.4884,-13.8475],"Samus":[0.4884,-13.8475],"Bowser":[0.0000,-15.5250]};

throwFrames = {"Bw":{"weight":{"d":true,"u":false,"f":true,"b":false},"dthrow":{"release":56,"firstA":85,"hLag":6},"uthrow":{"release":52,"firstA":70,"hLag":16},"fthrow":{"release":35,"firstA":60,"hLag":0},"bthrow":{"release":18,"firstA":40,"hLag":0}},"DK":{"weight":{"d":true,"u":true,"b":true},"dthrow":{"release":40,"firstA":60,"hLag":0},"uthrow":{"release":13,"firstA":44,"hLag":0},"bthrow":{"release":14,"firstA":40,"hLag":0}},"DKCargo":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":15,"firstA":40,"hLag":0},"uthrow":{"release":13,"firstA":30,"hLag":0},"fthrow":{"release":14,"firstA":40,"hLag":0},"bthrow":{"release":15,"firstA":40,"hLag":0}},"Ys":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":44,"hLag":0},"uthrow":{"release":12,"firstA":44,"hLag":0},"fthrow":{"release":19,"firstA":40,"hLag":0},"bthrow":{"release":19,"firstA":44,"hLag":0}},"Sm":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":21,"firstA":42,"hLag":0},"uthrow":{"release":31,"firstA":42,"hLag":0},"fthrow":{"release":15,"firstA":42,"hLag":0},"bthrow":{"release":11,"firstA":42,"hLag":0}},"Gn":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":40,"hLag":0},"uthrow":{"release":15,"firstA":44,"hLag":3},"fthrow":{"release":18,"firstA":40,"hLag":3},"bthrow":{"release":20,"firstA":50,"hLag":3}},"CF":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":40,"hLag":0},"uthrow":{"release":15,"firstA":44,"hLag":3},"fthrow":{"release":18,"firstA":40,"hLag":3},"bthrow":{"release":20,"firstA":50,"hLag":3}},"Lk":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":28,"firstA":50,"hLag":2},"uthrow":{"release":27,"firstA":50,"hLag":3},"fthrow":{"release":16,"firstA":40,"hLag":3},"bthrow":{"release":16,"firstA":40,"hLag":3}},"DM":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":3},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Lg":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":0},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Ma":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":0},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Ns":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":30,"firstA":50,"hLag":10},"uthrow":{"release":36,"firstA":56,"hLag":0},"fthrow":{"release":27,"firstA":53,"hLag":0},"bthrow":{"release":27,"firstA":53,"hLag":0}},"Pc":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":43,"firstA":65,"hLag":0},"uthrow":{"release":25,"firstA":48,"hLag":2},"fthrow":{"release":15,"firstA":34,"hLag":2},"bthrow":{"release":21,"firstA":50,"hLag":2}},"Sh":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":36,"firstA":58,"hLag":3},"uthrow":{"release":23,"firstA":58,"hLag":4},"fthrow":{"release":24,"firstA":48,"hLag":4},"bthrow":{"release":20,"firstA":48,"hLag":3}},"Zd":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":50,"firstA":65,"hLag":8},"uthrow":{"release":28,"firstA":50,"hLag":0},"fthrow":{"release":32,"firstA":50,"hLag":0},"bthrow":{"release":28,"firstA":50,"hLag":0}},"Po":{"weight":{"d":true,"u":false,"f":false,"b":true},"dthrow":{"release":36,"firstA":50,"hLag":0},"uthrow":{"release":31,"firstA":60,"hLag":4},"fthrow":{"release":28,"firstA":50,"hLag":4},"bthrow":{"release":17,"firstA":40,"hLag":0}},"Ms":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":43,"hLag":0},"uthrow":{"release":12,"firstA":45,"hLag":0},"fthrow":{"release":14,"firstA":32,"hLag":0},"bthrow":{"release":7,"firstA":45,"hLag":0}},"Mw":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":25,"firstA":50,"hLag":3},"uthrow":{"release":42,"firstA":70,"hLag":0},"fthrow":{"release":18,"firstA":75,"hLag":0},"bthrow":{"release":29,"firstA":50,"hLag":0}},"Ry":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":43,"hLag":0},"uthrow":{"release":12,"firstA":45,"hLag":0},"fthrow":{"release":14,"firstA":32,"hLag":0},"bthrow":{"release":7,"firstA":45,"hLag":0}},"YL":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":28,"firstA":50,"hLag":2},"uthrow":{"release":27,"firstA":50,"hLag":3},"fthrow":{"release":16,"firstA":40,"hLag":3},"bthrow":{"release":16,"firstA":40,"hLag":3}},"Fc":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":33,"firstA":56,"hLag":12},"uthrow":{"release":7,"firstA":39,"hLag":0},"fthrow":{"release":11,"firstA":34,"hLag":3},"bthrow":{"release":9,"firstA":39,"hLag":0}},"Pika":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":48,"hLag":3},"uthrow":{"release":20,"firstA":44,"hLag":3},"fthrow":{"release":29,"firstA":44,"hLag":8},"bthrow":{"release":30,"firstA":50,"hLag":0}},"Kb":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":57,"firstA":88,"hLag":2},"uthrow":{"release":51,"firstA":80,"hLag":0},"fthrow":{"release":46,"firstA":63,"hLag":0},"bthrow":{"release":29,"firstA":50,"hLag":0}},"Fx":{"weight":{"d":false,"u":true,"f":false,"b":true},"dthrow":{"release":33,"firstA":44,"hLag":0},"uthrow":{"release":8,"firstA":39,"hLag":0},"fthrow":{"release":11,"firstA":34,"hLag":3},"bthrow":{"release":9,"firstA":39,"hLag":0}},"Jp":{"weight":{"d":false,"u":true,"f":false,"b":true},"dthrow":{"release":63,"firstA":85,"hLag":11},"uthrow":{"release":8,"firstA":42,"hLag":0},"fthrow":{"release":10,"firstA":35,"hLag":5},"bthrow":{"release":25,"firstA":50,"hLag":0}},"GW":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":55,"firstA":70,"hLag":0},"uthrow":{"release":55,"firstA":70,"hLag":0},"fthrow":{"release":55,"firstA":70,"hLag":0},"bthrow":{"release":55,"firstA":70,"hLag":0}},"Pi":{"weight":{"d":false,"u":false,"f":false,"b":true},"dthrow":{"release":20,"firstA":48,"hLag":3},"uthrow":{"release":20,"firstA":44,"hLag":3},"fthrow":{"release":29,"firstA":44,"hLag":8},"bthrow":{"release":30,"firstA":50,"hLag":0}}};









throwAnim = { "CF":{
	"fthrow":{
		"f18":{"throwN":[7.53633,12.5128]}
	},
	"bthrow":{
		"f20":{"throwN":[-11.360,22.2253]}
	},
	"uthrow":{
		"f11":{"throwN":[8.63220,11.0920]},
		"f12":{"throwN":[8.63206,11.8532]},
		"f13":{"throwN":[8.63181,12.6144]},
		"f14":{"throwN":[8.63152,11.8809]},
		"f15":{"throwN":[8.63127,11.1474]},
		"f16":{"throwN":[9.24401,16.4542]},
		"f17":{"throwN":[9.51098,16.5699]}
	},
	"dthrow":{
		"f15":{"throwN":[8.57625,3.63504]},
		"f18":{"throwN":[8.57573,3.42992]},
		"f19":{"throwN":[8.57584,3.33719]},
		"f20":{"throwN":[8.57631,3.24386]},
		"f21":{"throwN":[8.57597,3.24620]},
		"f22":{"throwN":[8.48266,3.16498]}
	}
},

"DK":{
"kfthrow":{
"f15":{"throwN":[21.6851,8.56516]}},

"kbthrow":{
"f15":{"throwN":[-22.841,13.8851]}},

"kuthrow":{
"f12":{"throwN":[13.5359,12.8216]},
"f13":{"throwN":[11.9627,18.1558]},
"f14":{"throwN":[4.30127,29.6078]},
"f15":{"throwN":[3.25976,35.9275]},
"f16":{"throwN":[2.94430,42.1655]}},

"kdthrow":{
"f15":{"throwN":[24.9065,4.66490]}},

"kbthrow":{
"f5":{"transN":[-0.8809,0]},
"f10":{"transN":[-1.7668,0]},
"f14":{"throwN":[-18.737,22.9823],"transN":[-2.49831,0]},
"f35":{"transN":[-7.42676,0]},
"f36":{"transN":[-7.42676,0]}},

"uthrow":{
"f13":{"throwN":[-2.3933,32.6888]}},

"dthrow":{
"f23":{"throwN":[7.33862,1.08482]},
"f24":{"throwN":[7.30162,1.08482]},
"f24_":{"throwN":[7.30162,1.08482]},
"f40":{"throwN":[7.40637,1.08482]},
"f41":{"throwN":[7.42163,1.08482]},
"f42":{"throwN":[7.43381,1.08482]}}},


"Fx":{
"fthrow":{
"f3":{"transN":[-0.2438,0]},
"f4":{"transN":[0.00000,0]},
"f5":{"transN":[0.67909,0]},
"f9":{"transN":[4.03619,0]},
"f10":{"transN":[4.60585,0]},
"f11":{"throwN":[9.02201,8.47130],"transN":[5.17469,0]},
"f12":{"transN":[5.74106,0]},
"f20":{"transN":[9.98677,0]},
"f25":{"transN":[12.1342,0]},
"f27":{"transN":[12.4923,0]},
"f28":{"transN":[12.4906,0]},
"f33":{"transN":[12.4818,0]}},

"bthrow":{
"f7":{"throwN":[-4.3782,4.61710]},
"f8":{"throwN":[-7.5984,11.1866]},
"f9":{"throwN":[-6.4707,11.2994]},
"f10":{"throwN":[-6.5963,11.3281]},
"f11":{"throwN":[-6.6120,11.3317]}},

"uthrow":{
"f6":{"throwN":[4.78641,14.4255]},
"f7":{"throwN":[1.95044,19.5159]},
"f8":{"throwN":[-0.0352,22.2114]},
"f9":{"throwN":[-0.0670,22.3484]},
"f10":{"throwN":[-0.0800,22.4555]}},

"dthrow":{
"f31":{"throwN":[0.50063,5.10061]},
"f32":{"throwN":[0.50063,5.26373]},
"f33":{"throwN":[0.50063,5.39126]},
"f34":{"throwN":[0.50063,5.46404]},
"f35":{"throwN":[0.50063,5.51630]}}},

"GW":{
"fthrow":{
"f53":{"throwN":[8.88167,10.5293]},
"f54":{"throwN":[8.88167,10.5293]},
"f55":{"throwN":[12.6106,9.20251]},
"f56":{"throwN":[12.6106,9.20251]},
"f57":{"throwN":[12.6106,9.20251]}},

"bthrow":{
"f53":{"throwN":[-9.2726,12.8457]},
"f54":{"throwN":[-9.2726,12.8457]},
"f55":{"throwN":[-14.010,10.0527]},
"f56":{"throwN":[-14.010,10.0527]},
"f57":{"throwN":[-14.010,10.0527]}},

"uthrow":{
"f53":{"throwN":[-9.2726,12.8457]},
"f54":{"throwN":[-9.2726,12.8457]},
"f55":{"throwN":[-2.7821,21.0745]},
"f56":{"throwN":[-2.7821,21.0745]},
"f57":{"throwN":[-2.7821,21.0745]}},

"dthrow":{
"f53":{"throwN":[-8.1600,12.4314]},
"f54":{"throwN":[-8.1600,12.4314]},
"f55":{"throwN":[-6.1200,1.21135]},
"f56":{"throwN":[-6.1200,1.21135]},
"f57":{"throwN":[-6.1200,1.21135]}}},

"Kb":{
"fthrow":{
"f8":{"transN":[0.00000,0.00000]},
"f9":{"transN":[0.80479,1.77362]},
"f10":{"transN":[1.62645,3.56161]},
"f27":{"transN":[14.4139,19.7691]},
"f28":{"transN":[14.8966,19.7123]},
"f32":{"transN":[16.2546,12.5141]},
"f34":{"transN":[16.7838,0.00000]},
"f44":{"transN":[16.8096,0.00000]},
"f45":{"throwN":[1.43280,-0.0892],"transN":[16.7500,1.43259]},
"f50":{"transN":[15.3473,6.82204]},
"f58":{"transN":[11.9783,9.85353]},
"f59":{"transN":[11.6938,9.79659]},
"f61":{"transN":[11.3383,9.41728]},
"f61_":{"transN":[11.2199,9.10415]}},

"bthrow":{
"f10":{"transN":[2.98551,0.00000]},
"f10_":{"transN":[2.98551,0.00000]},
"f16":{"transN":[2.98551,0.00000]},
"f17":{"transN":[0.71921,8.58135]},
"f18":{"transN":[-1.2158,14.2145]},
"f20":{"transN":[-4.1328,17.4456]},
"f21":{"transN":[-5.1352,15.4479]},
"f23":{"transN":[-6.2786,3.49188]},
"f24":{"transN":[-6.7101,0.00000]},
"f24_":{"transN":[-6.7101,0.00000]},
"f29":{"throwN":[-5.9339,1.09228],"transN":[-6.7101,0.00000]},
"f29_":{"transN":[-6.7101,0.00000]},
"f35":{"transN":[-6.7101,0.00000]},
"f36":{"transN":[-6.4142,0.00000]},
"f40":{"transN":[-4.5228,0.00000]},
"f49":{"transN":[-0.3623,0.00000]},
"f49_":{"transN":[-0.2347,0.00000]}},

"uthrow":{
"f5":{"transN":[0.00000,0.00000]},
"f6":{"transN":[0.00000,6.37113]},
"f7":{"transN":[0.00000,23.6749]},
"f15":{"transN":[0.00000,230.000]},
"f27":{"transN":[0.00000,249.134]},
"f28":{"transN":[0.00000,249.358]},
"f29":{"transN":[0.00000,248.996]},
"f35":{"transN":[0.00000,230.000]},
"f36":{"transN":[0.00000,220.670]},
"f44":{"transN":[0.00000,24.7696]},
"f45":{"transN":[0.00000,0.25882]},
"f46":{"transN":[0.00000,0.00000]},
"f51":{"throwN":[6.20753,5.38381],"transN":[0.00000,0.00000]},
"f52":{"transN":[-1.4243,4.27011]},
"f55":{"transN":[-5.2986,13.3965]},
"f59":{"transN":[-9.5792,18.2589]},
"f60":{"transN":[-10.499,18.4001]},
"f61":{"transN":[-11.362,18.3504]},
"f70":{"transN":[-16.730,17.5857]},
"f79":{"transN":[-18.404,16.6500]},
"f79_":{"transN":[-18.415,16.4752]}},

"dthrow":{
"f57":{"throwN":[3.09553,1.46822]}}},

"Bw":{
"fthrow":{
"f35":{"throwN":[17.5745,16.7415]}},

"bthrow":{
"f18":{"throwN":[-14.669,24.3290],"transN":[0.00000,0]},
"f19_":{"transN":[0.00000,0]},
"f30":{"transN":[0.00000,0]},
"f31":{"transN":[-0.6322,0]},
"f33":{"transN":[-3.9392,0]},
"f35":{"transN":[-6.0789,0]},
"f35_":{"transN":[-6.0789,0]}},

"uthrow":{
"f50":{"throwN":[-0.2700,14.8127]},
"f51":{"throwN":[1.15596,25.7626]},
"f52":{"throwN":[1.11454,34.2259]},
"f53":{"throwN":[1.01697,34.2289]},
"f54":{"throwN":[0.89577,34.2326]}},

"dthrow":{
"f56":{"throwN":[13.7997,7.97297]}},

"kfthrow":{
"f15":{"transN":[0.00000,0]},
"f16":{"transN":[1.22193,0]},
"f17":{"transN":[3.91726,0]},
"f18":{"throwN":[15.8029,6.46747],"transN":[6.63030,0]},
"f19":{"transN":[7.90535,0]},
"f30":{"transN":[9.18382,0]},
"f39":{"transN":[10.9343,0]},
"f40":{"transN":[11.1657,0]},
"f40_":{"transN":[11.3371,0]}},

"kbthrow":{
"f14":{"throwN":[-20.768,12.1021],"transN":[0.00000,0]},
"f26":{"transN":[0.00000,0]},
"f27":{"transN":[-0.01923,0]},
"f35":{"transN":[-1.91565,0]},
"f39":{"transN":[-4.37019,0]},
"f40":{"transN":[-5.17662,0]},
"f40_":{"transN":[-5.86306,0]}}},

"Lk":{
"fthrow":{
"f16":{"throwN":[11.5061,14.3375]}},

"bthrow":{
"f16":{"throwN":[-10.782,17.0780]}},

"uthrow":{
"f5":{"throwN":[0.30499,29.7616]},
"f26":{"throwN":[0.48044,31.2174]},
"f27":{"throwN":[0.54617,31.2413]},
"f28":{"throwN":[0.54147,31.2622]},
"f29":{"throwN":[0.49642,31.2789]}},

"dthrow":{
"f26":{"throwN":[-5.1635,0.15247]},
"f27":{"throwN":[-5.5198,0.58314]},
"f28":{"throwN":[-5.2788,-0.0610]},
"f29":{"throwN":[-5.2692,-0.0860]},
"f30":{"throwN":[-5.2614,-0.1066]}}},

"Lg":{
"fthrow":{
"f12":{"throwN":[8.60534,9.09100]}},

"bthrow":{
"f44":{"throwN":[-5.8218,10.2289]}},

"uthrow":{
"f16":{"throwN":[-0.6738,3.56149]},
"f17":{"throwN":[-0.5793,7.42040]},
"f18":{"throwN":[-0.5018,18.5491]},
"f19":{"throwN":[-0.4940,18.9771]},
"f20":{"throwN":[-0.5010,19.3271]}},

"dthrow":{
"f16":{"throwN":[-1.4026,16.1662]},
"f17":{"throwN":[-0.2704,13.1363]},
"f18":{"throwN":[-1.5057,2.93436]},
"f19":{"throwN":[-1.4007,3.06379]},
"f20":{"throwN":[-1.2956,3.08359]}}},

"Ma":{
"fthrow":{
"f12":{"throwN":[7.5727,8.00009]}},

"bthrow":{
"f44":{"throwN":[-5.1232,9.00145]}},

"uthrow":{
"f16":{"throwN":[-0.5929,3.13413]},
"f17":{"throwN":[-0.5098,6.52997]},
"f18":{"throwN":[-0.4416,16.3233]},
"f19":{"throwN":[-0.4347,16.6999]},
"f20":{"throwN":[-0.4409,17.0078]}},

"dthrow":{
"f16":{"throwN":[-1.2343,14.2262]},
"f17":{"throwN":[-0.2379,11.5600]},
"f18":{"throwN":[-1.3251,2.58225]},
"f19":{"throwN":[-1.2326,2.69615]},
"f20":{"throwN":[-1.1401,2.71357]}}},

"Ms":{
"fthrow":{
"f12":{"throwN":[11.1683,9.84167]},
"f13":{"throwN":[9.44960,6.36311]},
"f14":{"throwN":[8.18196,1.77321]},
"f15":{"throwN":[8.12133,1.53742]},
"f16":{"throwN":[8.07226,1.31479]}},

"bthrow":{
"f5":{"throwN":[0.02158,9.56328]},
"f6":{"throwN":[-0.7693,7.92358]},
"f7":{"throwN":[-0.8121,7.83451]},
"f8":{"throwN":[-0.8640,7.75129]},
"f9":{"throwN":[-0.9240,7.67382]}},

"uthrow":{
"f10":{"throwN":[10.5103,11.9278]},
"f11":{"throwN":[13.4213,16.3717]},
"f12":{"throwN":[5.68346,24.3936]},
"f13":{"throwN":[5.32021,26.5133]},
"f14":{"throwN":[5.03991,28.7261]}},

"dthrow":{
"f12":{"throwN":[12.4810,8.26519]},
"f13":{"throwN":[11.1965,6.23059]},
"f14":{"throwN":[8.09110,2.68214]},
"f15":{"throwN":[5.77836,0.13357]},
"f16":{"throwN":[5.77836,-0.0706]}}},

"Mw":{
"fthrow":{
"f18":{"throwN":[16.3272,27.4193]}},

"bthrow":{
"f29":{"throwN":[-7.7144,26.5453]}},

"uthrow":{
"f40":{"throwN":[2.26330,30.2578]},
"f41":{"throwN":[2.26330,30.2810]},
"f42":{"throwN":[2.26330,30.2982]},
"f43":{"throwN":[2.26330,30.3087]},
"f44":{"throwN":[2.26330,30.3124]}},

"dthrow":{
"f23":{"throwN":[11.4276,1.28223]},
"f24":{"throwN":[10.8831,0.49226]},
"f25":{"throwN":[10.9009,0.47735]},
"f26":{"throwN":[10.9222,4.87450]},
"f27":{"throwN":[10.9763,15.3592]}}},

"Ns":{
"fthrow":{
"f27":{"throwN":[11.5000,9.77506]}},

"bthrow":{
"f27":{"throwN":[-13.554,14.8295]}},

"uthrow":{
"f34":{"throwN":[2.50000,17.8527]},
"f35":{"throwN":[2.49668,17.8481]},
"f36":{"throwN":[2.49245,17.8440]},
"f37":{"throwN":[2.48751,17.8404]},
"f38":{"throwN":[2.48202,17.8373]}},

"dthrow":{
"f28":{"throwN":[-2.2180,1.56098]},
"f29":{"throwN":[-2.2367,1.72976]},
"f30":{"throwN":[-2.2612,1.93382]},
"f31":{"throwN":[-2.2585,2.31548]},
"f32":{"throwN":[-2.2037,2.40110]}}},

"Pc":{
"fthrow":{
"f13":{"throwN":[6.16056,10.3451]},
"f14":{"throwN":[6.27994,10.3451]},
"f15":{"throwN":[6.27994,10.3451]},
"f16":{"throwN":[6.27994,10.3451]},
"f17":{"throwN":[6.27994,10.3451]}},

"bthrow":{
"f21":{"throwN":[-6.5123,10.3866]}},

"uthrow":{
"f23":{"throwN":[-0.4209,25.1126]},
"f24":{"throwN":[-0.4237,22.8878]},
"f25":{"throwN":[-0.4209,25.1126]},
"f26":{"throwN":[-0.4181,27.3373]},
"f27":{"throwN":[-0.4195,26.1837]}},

"dthrow":{
"f41":{"throwN":[-3.2458,-0.3149]},
"f42":{"throwN":[-3.2483,-0.1038]},
"f43":{"throwN":[-3.2483,-0.1038]},
"f44":{"throwN":[-3.2483,-0.1038]},
"f45":{"throwN":[-3.2483,-0.1038]}}},

"Pk":{
"fthrow":{
"f27":{"throwN":[5.38671,10.6099]},
"f28":{"throwN":[5.11370,11.8174]},
"f29":{"throwN":[7.08556,11.7272]},
"f30":{"throwN":[8.78181,11.6370]},
"f31":{"throwN":[9.01829,11.6768]}},

"bthrow":{
"f3":{"transN":[0.00000,0]},
"f4":{"transN":[-1.3370,0]},
"f15":{"transN":[-14.628,0]},
"f20":{"transN":[-19.377,0]},
"f27":{"transN":[-24.048,0]},
"f28":{"throwN":[4.00700,7.81304],"transN":[-24.494,0]},
"f29":{"throwN":[1.42300,9.20767],"transN":[-24.878,0]},
"f30":{"throwN":[-3.2930,8.74976],"transN":[-25.200,0]},
"f31":{"throwN":[-3.5020,8.64152],"transN":[-25.474,0]},
"f32":{"throwN":[-3.3070,8.47367],"transN":[-25.719,0]},
"f41":{"transN":[-26.882,0]},
"f48":{"transN":[-27.004,0]},
"f49":{"transN":[-27.002,0]},
"f49_":{"transN":[-27.002,0]}},

"uthrow":{
"f18":{"throwN":[2.45083,14.9740]},
"f19":{"throwN":[2.43049,17.6833]},
"f20":{"throwN":[2.40722,14.9081]},
"f21":{"throwN":[2.38230,17.6173]},
"f22":{"throwN":[2.35701,16.0467]}},

"dthrow":{
"f18":{"throwN":[-0.2334,0.51671]},
"f19":{"throwN":[-1.1140,1.96314]},
"f20":{"throwN":[-0.5405,1.17256]},
"f21":{"throwN":[-3.1442,6.05144]},
"f22":{"throwN":[-4.5321,11.4901]}}},

"Po":{
"fthrow":{
"f26":{"throwN":[15.7333,8.11397]},
"f27":{"throwN":[14.9892,8.15784]},
"f28":{"throwN":[14.2476,8.20171]},
"f29":{"throwN":[14.9987,8.15784]},
"f30":{"throwN":[15.7513,8.11397]}},

"bthrow":{
"f15":{"throwN":[-5.2059,11.3729]},
"f16":{"throwN":[-6.8361,11.5290]},
"f17":{"throwN":[-10.172,9.69242]},
"f18":{"throwN":[-13.727,8.53091]},
"f19":{"throwN":[-16.326,9.91663]}},

"uthrow":{
"f29":{"throwN":[-4.0256,26.9426]},
"f30":{"throwN":[-4.0256,29.3622]},
"f31":{"throwN":[-4.0256,26.9426]},
"f32":{"throwN":[-3.9917,27.7616]},
"f33":{"throwN":[-3.9480,28.5807]}},

"dthrow":{
"f34":{"throwN":[13.2703,4.63211]},
"f35":{"throwN":[13.2908,3.25132]},
"f36":{"throwN":[13.3134,3.25132]},
"f37":{"throwN":[13.3436,3.25132]},
"f38":{"throwN":[13.3864,3.25132]}}},

"Jp":{
"fthrow":{
"f8":{"throwN":[9.12599,6.58010]},
"f9":{"throwN":[10.2019,6.58010]},
"f10":{"throwN":[11.2800,6.58010]},
"f11":{"throwN":[11.2828,6.58010]},
"f12":{"throwN":[11.2800,6.58010]}},

"bthrow":{
"f15":{"transN":[0.00000,0]},
"f16":{"transN":[-0.0940,0]},
"f20":{"transN":[-7.5200,0]},
"f23":{"throwN":[-5.9100,-0.0630],"transN":[-7.5200,0]},
"f24":{"throwN":[-6.0730,0.44739],"transN":[-7.5200,0]},
"f25":{"throwN":[-6.2320,0.71290],"transN":[-7.5200,0]},
"f26":{"throwN":[-6.3616,0.52940],"transN":[-7.4754,0]},
"f27":{"throwN":[-6.4554,0.30614],"transN":[-7.3336,0]},
"f28":{"transN":[-7.0832,0]},
"f33":{"transN":[-2.5548,0]},
"f39":{"transN":[-0.0358,0]},
"f40":{"transN":[0.00000,0]},
"f40_":{"transN":[0.00000,0]}},

"uthrow":{
"f6":{"throwN":[-3.0836,7.90553]},
"f7":{"throwN":[-4.5592,9.34938]},
"f8":{"throwN":[-4.0995,10.5044]},
"f9":{"throwN":[-2.3493,10.7122]},
"f10":{"throwN":[0.11034,10.5044]}},

"dthrow":{
"f61":{"throwN":[0.93401,1.35695]},
"f62":{"throwN":[0.97649,1.37719]},
"f63":{"throwN":[0.99571,1.39779]},
"f64":{"throwN":[1.01037,1.43775]},
"f65":{"throwN":[1.00513,1.46202]}}},

"Sm":{
"fthrow":{
"f15":{"throwN":[9.17490,20.4992]}},

"bthrow":{
"f11":{"throwN":[-14.370,19.1663]}},

"uthrow":{
"f29":{"throwN":[0.79793,40.6641]},
"f30":{"throwN":[0.79793,41.7047]},
"f31":{"throwN":[0.79793,41.7047]},
"f32":{"throwN":[0.79793,41.7047]},
"f33":{"throwN":[0.79793,41.7047]}},

"dthrow":{
"f19":{"throwN":[16.3831,9.69041]},
"f20":{"throwN":[12.9568,-0.6513]},
"f21":{"throwN":[13.0290,1.57963]},
"f22":{"throwN":[12.9714,-0.7415]},
"f23":{"throwN":[12.9646,-0.8414]}}},

"Ys":{
"fthrow":{
"f19":{"throwN":[13.9279,20.6202]}},

"bthrow":{
"f19":{"throwN":[-15.964,16.6653]}},

"uthrow":{
"f10":{"throwN":[1.91748,7.47606]},
"f11":{"throwN":[1.50579,9.58545]},
"f12":{"throwN":[-1.9667,29.6349]},
"f13":{"throwN":[-2.1663,30.7874]},
"f14":{"throwN":[-2.3068,31.5989]}},

"dthrow":{
"f12":{"throwN":[-1.3576,7.40034]},
"f13":{"throwN":[-1.7239,2.47770]},
"f14":{"throwN":[-1.3429,1.53477]},
"f15":{"throwN":[-0.9008,1.39857]},
"f16":{"throwN":[-0.9008,1.44012]}}},

"Zd":{
"fthrow":{
"f32":{"throwN":[9.05510,12.3484]}},

"bthrow":{
"f26":{"throwN":[-7.2230,11.4296]},
"f27":{"throwN":[-9.4405,12.3183]},
"f28":{"throwN":[-14.816,13.1514]},
"f29":{"throwN":[-14.902,13.1514]},
"f30":{"throwN":[-14.859,13.1514]}},

"uthrow":{
"f27":{"throwN":[-4.3415,23.9912]},
"f28":{"throwN":[-4.4479,24.0280]},
"f29":{"throwN":[-4.4844,24.0404]},
"f30":{"throwN":[-4.4844,24.0404]},
"f31":{"throwN":[-4.4844,24.0404]}},

"dthrow":{
"f48":{"throwN":[-0.2381,-0.2854]},
"f49":{"throwN":[-0.1396,-0.2941]},
"f50":{"throwN":[-0.0411,-0.2985]},
"f51":{"throwN":[0.05740,-0.2658]},
"f52":{"throwN":[0.15590,-0.1634]}}},

"Sh":{
"fthrow":{
"f24":{"throwN":[9.92890,9.89187]}},

"bthrow":{
"f1":{"transN":[-0.2112,0]},
"f4":{"transN":[-1.9212,0]},
"f4_":{"transN":[-1.9212,0]},
"f13":{"transN":[-1.9212,0]},
"f14":{"transN":[-4.2506,0]},
"f15":{"transN":[-6.5799,0]},
"f20":{"throwN":[-13.889,9.90452],"transN":[-6.5799,0]},
"f20_":{"transN":[-6.5799,0]}},

"uthrow":{
"f21":{"throwN":[-5.7801,27.0356]},
"f22":{"throwN":[-4.5844,27.0356]},
"f23":{"throwN":[-5.7801,27.0356]},
"f24":{"throwN":[-5.7801,27.0356]},
"f25":{"throwN":[-5.7801,27.0356]}},

"dthrow":{
"f34":{"throwN":[-0.1612,3.31756]},
"f35":{"throwN":[-0.2340,3.21420]},
"f36":{"throwN":[-0.3095,3.12073]},
"f37":{"throwN":[-0.3797,3.04454]},
"f38":{"throwN":[-0.4364,2.99298]}}},

"Fc":{
"fthrow":{
"f3":{"transN":[-0.2794,0]},
"f4":{"transN":[0.00000,0]},
"f5":{"transN":[0.77813,0]},
"f9":{"transN":[4.62480,0]},
"f10":{"transN":[5.27754,0]},
"f11":{"throwN":[10.3378,9.70669],"transN":[5.92933,0]},
"f12":{"transN":[6.57830,0]},
"f20":{"transN":[11.4432,0]},
"f25":{"transN":[13.9038,0]},
"f27":{"transN":[14.3141,0]},
"f28":{"transN":[14.3121,0]},
"f33":{"transN":[14.3020,0]}},

"bthrow":{
"f7":{"throwN":[-5.0114,5.29041]},
"f8":{"throwN":[-8.7066,12.8180]},
"f9":{"throwN":[-7.4174,12.9472]},
"f10":{"throwN":[-7.5613,12.9801]},
"f11":{"throwN":[-7.5793,12.9842]}},

"uthrow":{
"f5":{"throwN":[5.95668,8.46180]},
"f6":{"throwN":[3.91996,22.8204]},
"f7":{"throwN":[2.85313,29.3586]},
"f8":{"throwN":[2.85521,29.3302]},
"f9":{"throwN":[2.86133,29.2769]}},

"dthrow":{
"f31":{"throwN":[0.57363,5.84444]},
"f32":{"throwN":[0.57363,6.03135]},
"f33":{"throwN":[0.57363,6.17748]},
"f34":{"throwN":[0.57363,6.26086]},
"f35":{"throwN":[0.57363,6.32075]}}},

"YL":{
"fthrow":{
"f16":{"throwN":[9.04736,11.2818]}},

"bthrow":{
"f16":{"throwN":[-8.4910,13.4383]}},

"uthrow":{
"f25":{"throwN":[0.23335,23.4189]},
"f26":{"throwN":[0.37141,24.5644]},
"f27":{"throwN":[0.42313,24.5832]},
"f28":{"throwN":[0.41943,24.5997]},
"f29":{"throwN":[0.38398,24.6128]}},

"dthrow":{
"f26":{"throwN":[-4.0697,0.11987]},
"f27":{"throwN":[-4.3501,0.45876]},
"f28":{"throwN":[-4.1604,-0.0478]},
"f29":{"throwN":[-4.1529,-0.0678]},
"f30":{"throwN":[-4.1468,-0.0840]}}},

"DM":{
"fthrow":{
"f12":{"throwN":[7.20597,8.03310]}},

"bthrow":{
"f44":{"throwN":[-5.1232,9.00145]}},

"uthrow":{
"f16":{"throwN":[-0.5929,3.13413]},
"f17":{"throwN":[-0.5098,6.52997]},
"f18":{"throwN":[-0.4416,16.3233]},
"f19":{"throwN":[-0.4249,16.6904]},
"f20":{"throwN":[-0.4036,16.9717]}},

"dthrow":{
"f16":{"throwN":[-1.2343,14.2262]},
"f17":{"throwN":[-0.2379,11.5600]},
"f18":{"throwN":[-1.3251,2.58225]},
"f19":{"throwN":[-1.2326,2.69615]},
"f20":{"throwN":[-1.1401,2.71357]}}},

"Ry":{
"fthrow":{
"f12":{"throwN":[10.4885,9.24262]},
"f13":{"throwN":[8.87441,5.97579]},
"f14":{"throwN":[7.68393,1.66529]},
"f15":{"throwN":[7.62699,1.44385]},
"f16":{"throwN":[7.58091,1.23477]}},

"bthrow":{
"f5":{"throwN":[0.02027,8.98117]},
"f6":{"throwN":[-0.7225,7.44128]},
"f7":{"throwN":[-0.7627,7.35764]},
"f8":{"throwN":[-0.8114,7.27948]},
"f9":{"throwN":[-0.8678,7.20673]}},

"uthrow":{
"f10":{"throwN":[9.87056,11.2018]},
"f11":{"throwN":[12.6043,15.3752]},
"f12":{"throwN":[5.33751,22.9088]},
"f13":{"throwN":[4.99637,24.8995]},
"f14":{"throwN":[4.73314,26.9776]}},

"dthrow":{
"f12":{"throwN":[11.7213,7.76210]},
"f13":{"throwN":[10.5150,5.85134]},
"f14":{"throwN":[7.59860,2.51889]},
"f15":{"throwN":[5.42663,0.12544]},
"f16":{"throwN":[5.42663,-0.0663]}}},

"Pi":{
"fthrow":{
"f29":{"throwN":[2.54156,7.88035]}},

"bthrow":{
"f30":{"throwN":[-2.819,6.70068],"transN":[-14.000,0]},
"f49":{"transN":[-15.001,0]},
"f49_":{"transN":[-15.001,0]}},

"uthrow":{
"f20":{"throwN":[1.60236,11.9928]}},

"dthrow":{
"f20":{"throwN":[-0.3003,1.32920]}}},

"Gn":{
"fthrow":{
"f18":{"throwN":[8.39096,13.9318]}},

"bthrow":{
"f20":{"throwN":[-12.648,24.7457]}},

"uthrow":{
"f13":{"throwN":[9.61068,14.0448]},
"f14":{"throwN":[9.61035,13.2282]},
"f15":{"throwN":[9.61007,12.4115]},
"f16":{"throwN":[10.2923,18.3201]},
"f17":{"throwN":[10.5895,18.4490]}},

"dthrow":{
"f18":{"throwN":[9.54823,3.81887]},
"f19":{"throwN":[9.54836,3.71562]},
"f20":{"throwN":[9.54888,3.61171]},
"f21":{"throwN":[9.54850,3.61431]},
"f22":{"throwN":[9.44461,3.52388]}}}};
