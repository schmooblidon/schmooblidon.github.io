
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


throwOffsets = {"Pichu":[0.0000,-4.5996],"Puff":[0.0000,-5.0000],"Kirby":[0.0000,-5.0000],"Popo":[0.0000,-5.0042],"Nana":[0.0000,-5.0042],"ICs":[0.0000,-5.0042],"Ness":[0.0000,-5.0042],"Yoshi":[0.0000,-5.6000],"Doc":[0.0000,-5.6672],"Luigi":[0.0000,-5.6672],"Mario":[0.0000,-5.6672],"Pika":[0.0000,-5.7997],"MrG&W":[0.0000,-6.1937],"Sheik":[-0.3466,-8.2405],"Falco":[0.0000,-8.3000],"Fox":[0.0000,-8.3000],"Link":[-0.2257,-8.5516],"Y.Link":[-0.2334,-8.5533],"Peach":[0.0000,-9.4000],"Zelda":[0.0000,-9.4000],"Marth":[-0.4263,-9.8485],"Roy":[-0.4263,-9.8485],"Mewtwo":[-0.2257,-10.3076],"DK":[0.0000,-13.4311],"Falcon":[0.4884,-13.8475],"Ganon":[0.4884,-13.8475],"Samus":[0.4884,-13.8475],"Bowser":[0.0000,-15.5250]};

throwFrames = {"Bw":{"weight":{"d":true,"u":false,"f":true,"b":false},"dthrow":{"release":56,"firstA":85,"hLag":6},"uthrow":{"release":52,"firstA":70,"hLag":16},"fthrow":{"release":35,"firstA":60,"hLag":0},"bthrow":{"release":18,"firstA":40,"hLag":0}},"DK":{"weight":{"d":true,"u":true,"b":true,"cd":false,"cu":false,"cf":false,"cb":false},"dthrow":{"release":40,"firstA":60,"hLag":0},"uthrow":{"release":13,"firstA":44,"hLag":0},"bthrow":{"release":14,"firstA":40,"hLag":0},"cdthrow":{"release":15,"firstA":40,"hLag":0},"cuthrow":{"release":14,"firstA":30,"hLag":0},"cfthrow":{"release":15,"firstA":40,"hLag":0},"cbthrow":{"release":15,"firstA":40,"hLag":0}},"Ys":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":44,"hLag":0},"uthrow":{"release":12,"firstA":44,"hLag":0},"fthrow":{"release":19,"firstA":40,"hLag":0},"bthrow":{"release":19,"firstA":44,"hLag":0}},"Sm":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":21,"firstA":42,"hLag":0},"uthrow":{"release":31,"firstA":42,"hLag":0},"fthrow":{"release":15,"firstA":42,"hLag":0},"bthrow":{"release":11,"firstA":42,"hLag":0}},"Gn":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":40,"hLag":0},"uthrow":{"release":15,"firstA":44,"hLag":3},"fthrow":{"release":18,"firstA":40,"hLag":3},"bthrow":{"release":20,"firstA":50,"hLag":3}},"CF":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":40,"hLag":0},"uthrow":{"release":15,"firstA":44,"hLag":3},"fthrow":{"release":18,"firstA":40,"hLag":3},"bthrow":{"release":20,"firstA":50,"hLag":3}},"Lk":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":28,"firstA":50,"hLag":2},"uthrow":{"release":27,"firstA":50,"hLag":3},"fthrow":{"release":16,"firstA":40,"hLag":3},"bthrow":{"release":16,"firstA":40,"hLag":3}},"DM":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":3},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Lg":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":0},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Ma":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":18,"firstA":40,"hLag":0},"uthrow":{"release":18,"firstA":40,"hLag":0},"fthrow":{"release":12,"firstA":28,"hLag":0},"bthrow":{"release":44,"firstA":67,"hLag":0}},"Ns":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":30,"firstA":50,"hLag":10},"uthrow":{"release":36,"firstA":56,"hLag":0},"fthrow":{"release":27,"firstA":53,"hLag":0},"bthrow":{"release":27,"firstA":53,"hLag":0}},"Pc":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":43,"firstA":65,"hLag":0},"uthrow":{"release":25,"firstA":48,"hLag":2},"fthrow":{"release":15,"firstA":34,"hLag":2},"bthrow":{"release":21,"firstA":50,"hLag":2}},"Sh":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":36,"firstA":58,"hLag":3},"uthrow":{"release":23,"firstA":58,"hLag":4},"fthrow":{"release":24,"firstA":48,"hLag":4},"bthrow":{"release":20,"firstA":48,"hLag":3}},"Zd":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":50,"firstA":65,"hLag":8},"uthrow":{"release":28,"firstA":50,"hLag":0},"fthrow":{"release":32,"firstA":50,"hLag":0},"bthrow":{"release":28,"firstA":50,"hLag":0}},"Po":{"weight":{"d":true,"u":false,"f":false,"b":true},"dthrow":{"release":36,"firstA":50,"hLag":0},"uthrow":{"release":31,"firstA":60,"hLag":4},"fthrow":{"release":28,"firstA":50,"hLag":4},"bthrow":{"release":17,"firstA":40,"hLag":0}},"Ms":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":43,"hLag":0},"uthrow":{"release":12,"firstA":45,"hLag":0},"fthrow":{"release":14,"firstA":32,"hLag":0},"bthrow":{"release":7,"firstA":45,"hLag":0}},"Mw":{"weight":{"d":false,"u":true,"f":true,"b":true},"dthrow":{"release":25,"firstA":50,"hLag":3},"uthrow":{"release":42,"firstA":70,"hLag":0},"fthrow":{"release":18,"firstA":75,"hLag":0},"bthrow":{"release":29,"firstA":50,"hLag":0}},"Ry":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":14,"firstA":43,"hLag":0},"uthrow":{"release":12,"firstA":45,"hLag":0},"fthrow":{"release":14,"firstA":32,"hLag":0},"bthrow":{"release":7,"firstA":45,"hLag":0}},"YL":{"weight":{"d":true,"u":false,"f":false,"b":false},"dthrow":{"release":28,"firstA":50,"hLag":2},"uthrow":{"release":27,"firstA":50,"hLag":3},"fthrow":{"release":16,"firstA":40,"hLag":3},"bthrow":{"release":16,"firstA":40,"hLag":3}},"Fc":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":33,"firstA":56,"hLag":12},"uthrow":{"release":7,"firstA":39,"hLag":0},"fthrow":{"release":11,"firstA":34,"hLag":3},"bthrow":{"release":9,"firstA":39,"hLag":0}},"Pk":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":20,"firstA":48,"hLag":3},"uthrow":{"release":20,"firstA":44,"hLag":3},"fthrow":{"release":29,"firstA":44,"hLag":8},"bthrow":{"release":30,"firstA":50,"hLag":0}},"Kb":{"weight":{"d":false,"u":false,"f":false,"b":false},"dthrow":{"release":57,"firstA":88,"hLag":2},"uthrow":{"release":51,"firstA":80,"hLag":0},"fthrow":{"release":45,"firstA":63,"hLag":0},"bthrow":{"release":29,"firstA":50,"hLag":0}},"Fx":{"weight":{"d":false,"u":true,"f":false,"b":true},"dthrow":{"release":33,"firstA":44,"hLag":0},"uthrow":{"release":8,"firstA":39,"hLag":0},"fthrow":{"release":11,"firstA":34,"hLag":3},"bthrow":{"release":9,"firstA":39,"hLag":0}},"Jp":{"weight":{"d":false,"u":true,"f":false,"b":true},"dthrow":{"release":63,"firstA":85,"hLag":11},"uthrow":{"release":8,"firstA":42,"hLag":0},"fthrow":{"release":10,"firstA":35,"hLag":5},"bthrow":{"release":25,"firstA":50,"hLag":0}},"GW":{"weight":{"d":true,"u":true,"f":true,"b":true},"dthrow":{"release":55,"firstA":70,"hLag":0},"uthrow":{"release":55,"firstA":70,"hLag":0},"fthrow":{"release":55,"firstA":70,"hLag":0},"bthrow":{"release":55,"firstA":70,"hLag":0}},"Pi":{"weight":{"d":false,"u":false,"f":false,"b":true},"dthrow":{"release":20,"firstA":48,"hLag":3},"uthrow":{"release":20,"firstA":44,"hLag":3},"fthrow":{"release":29,"firstA":44,"hLag":8},"bthrow":{"release":30,"firstA":50,"hLag":0}}};









throwAnim = { "CF":{
	"fthrow":{
		"f18":{"throwN":[7.53633,12.5128]}
	},
	"bthrow":{
		"f20":{"throwN":[-11.360,22.2253]}
	},
	"uthrow":{
		"f15":{"throwN":[8.63127,11.1474]}
	},
	"dthrow":{
		"f20":{"throwN":[8.57631,3.24386]},
		"f21":{"throwN":[8.57597,3.24620]},
		"f22":{"throwN":[8.48266,3.16498]}
	}
},

"DK":{
"cfthrow":{
"f15":{"throwN":[21.6851,8.56516]}},

"cbthrow":{
"f15":{"throwN":[-22.841,13.8851]}},

"cuthrow":{
"f14":{"throwN":[4.30127,29.6078]}},

"cdthrow":{
"f15":{"throwN":[24.9065,4.66490]}},

"bthrow":{
"f14":{"throwN":[-18.737,22.9823],"transN":[-2.49831,0]},
"f15":{"throwN":[-18.737,22.9823],"transN":[-2.49831,0]},
"f16":{"throwN":[-18.737,22.9823],"transN":[-2.49831,0]}},

"uthrow":{
"f13":{"throwN":[-2.3933,32.6888]},
"f14":{"throwN":[-2.3933,32.6888]},
"f15":{"throwN":[-2.3933,32.6888]}}, //f14,f15 copied

"dthrow":{
"f40":{"throwN":[7.40637,1.08482]},
"f41":{"throwN":[7.42163,1.08482]},
"f42":{"throwN":[7.43381,1.08482]}}},


"Fx":{
"fthrow":{
"f11":{"throwN":[9.02201,8.47130],"transN":[5.17469,0]}},

"bthrow":{
"f9":{"throwN":[-6.4707,11.2994]},
"f10":{"throwN":[-6.5963,11.3281]},
"f11":{"throwN":[-6.6120,11.3317]}},

"uthrow":{
"f8":{"throwN":[-0.0352,22.2114]},
"f9":{"throwN":[-0.0670,22.3484]},
"f10":{"throwN":[-0.0800,22.4555]}},

"dthrow":{
"f33":{"throwN":[0.50063,5.39126]}}},

"GW":{
"fthrow":{
"f55":{"throwN":[12.6106,9.20251]},
"f56":{"throwN":[12.6106,9.20251]},
"f57":{"throwN":[12.6106,9.20251]}},

"bthrow":{
"f55":{"throwN":[-14.010,10.0527]},
"f56":{"throwN":[-14.010,10.0527]},
"f57":{"throwN":[-14.010,10.0527]}},

"uthrow":{
"f55":{"throwN":[-2.7821,21.0745]},
"f56":{"throwN":[-2.7821,21.0745]},
"f57":{"throwN":[-2.7821,21.0745]}},

"dthrow":{
"f55":{"throwN":[-6.1200,1.21135]},
"f56":{"throwN":[-6.1200,1.21135]},
"f57":{"throwN":[-6.1200,1.21135]}}},

"Kb":{
"fthrow":{
"f45":{"throwN":[1.43280,-0.0892],"transN":[16.7500,1.43259]}},

"bthrow":{
"f29":{"throwN":[-5.9339,1.09228],"transN":[-6.7101,0.00000]}},

"uthrow":{
"f51":{"throwN":[6.20753,5.38381]}},

"dthrow":{
"f57":{"throwN":[3.09553,1.46822]}}},

"Bw":{
"fthrow":{
"f35":{"throwN":[17.5745,16.7415]},
"f36":{"throwN":[17.5745,16.7415]},
"f37":{"throwN":[17.5745,16.7415]}},  // copied f35/f37

"bthrow":{
"f18":{"throwN":[-14.669,24.3290]},
"f19":{"throwN":[-14.669,24.3290]},
"f20":{"throwN":[-14.669,24.3290]}}, // copied f19/f20

"uthrow":{
"f52":{"throwN":[1.11454,34.2259]}},

"dthrow":{
"f56":{"throwN":[13.7997,7.97297]},
"f57":{"throwN":[13.7997,7.97297]},
"f58":{"throwN":[13.7997,7.97297]}}, // copied f57/f58

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
"f27":{"throwN":[0.54617,31.2413]}},

"dthrow":{
"f28":{"throwN":[-5.2788,-0.0610]},
"f29":{"throwN":[-5.2692,-0.0860]},
"f30":{"throwN":[-5.2614,-0.1066]}}},

"Lg":{
"fthrow":{
"f12":{"throwN":[8.60534,9.09100]},
"f13":{"throwN":[8.60534,9.09100]},
"f14":{"throwN":[8.60534,9.09100]}}, // copied f13/f14

"bthrow":{
"f44":{"throwN":[-5.8218,10.2289]},
"f45":{"throwN":[-5.8218,10.2289]},
"f46":{"throwN":[-5.8218,10.2289]}}, // copied f45/f46

"uthrow":{
"f18":{"throwN":[-0.5018,18.5491]},
"f19":{"throwN":[-0.4940,18.9771]},
"f20":{"throwN":[-0.5010,19.3271]}},

"dthrow":{
"f18":{"throwN":[-1.5057,2.93436]},
"f19":{"throwN":[-1.4007,3.06379]},
"f20":{"throwN":[-1.2956,3.08359]}}},

"Ma":{
"fthrow":{
"f12":{"throwN":[7.5727,8.00009]},
"f13":{"throwN":[7.5727,8.00009]},
"f14":{"throwN":[7.5727,8.00009]}}, // copied f13/f14

"bthrow":{
"f44":{"throwN":[-5.1232,9.00145]},
"f45":{"throwN":[-5.1232,9.00145]},
"f46":{"throwN":[-5.1232,9.00145]}}, // copied f45/f46

"uthrow":{
"f18":{"throwN":[-0.4416,16.3233]},
"f19":{"throwN":[-0.4347,16.6999]},
"f20":{"throwN":[-0.4409,17.0078]}},

"dthrow":{
"f18":{"throwN":[-1.3251,2.58225]},
"f19":{"throwN":[-1.2326,2.69615]},
"f20":{"throwN":[-1.1401,2.71357]}}},

"Ms":{
"fthrow":{
"f14":{"throwN":[8.18196,1.77321]},
"f15":{"throwN":[8.12133,1.53742]},
"f16":{"throwN":[8.07226,1.31479]}},

"bthrow":{
"f7":{"throwN":[-0.8121,7.83451]},
"f8":{"throwN":[-0.8640,7.75129]},
"f9":{"throwN":[-0.9240,7.67382]}},

"uthrow":{
"f12":{"throwN":[5.68346,24.3936]},
"f13":{"throwN":[5.32021,26.5133]},
"f14":{"throwN":[5.03991,28.7261]}},

"dthrow":{
"f14":{"throwN":[8.09110,2.68214]},
"f15":{"throwN":[5.77836,0.13357]},
"f16":{"throwN":[5.77836,-0.0706]}}},

"Mw":{
"fthrow":{
"f18":{"throwN":[16.3272,27.4193]},
"f19":{"throwN":[16.3272,27.4193]},
"f20":{"throwN":[16.3272,27.4193]}}, // copied f19/f20

"bthrow":{
"f29":{"throwN":[-7.7144,26.5453]},
"f30":{"throwN":[-7.7144,26.5453]},
"f31":{"throwN":[-7.7144,26.5453]}}, // copied f30/f31

"uthrow":{
"f42":{"throwN":[2.26330,30.2982]},
"f43":{"throwN":[2.26330,30.3087]},
"f44":{"throwN":[2.26330,30.3124]}},

"dthrow":{
"f25":{"throwN":[10.9009,0.47735]}}},

"Ns":{
"fthrow":{
"f27":{"throwN":[11.5000,9.77506]},
"f28":{"throwN":[11.5000,9.77506]},
"f29":{"throwN":[11.5000,9.77506]}}, // copied f28/f29

"bthrow":{
"f27":{"throwN":[-13.554,14.8295]},
"f28":{"throwN":[-13.554,14.8295]},
"f29":{"throwN":[-13.554,14.8295]}}, // copied f28/f29

"uthrow":{
"f36":{"throwN":[2.49245,17.8440]},
"f37":{"throwN":[2.48751,17.8404]},
"f38":{"throwN":[2.48202,17.8373]}},

"dthrow":{
"f30":{"throwN":[-2.2612,1.93382]}}},

"Pc":{
"fthrow":{
"f15":{"throwN":[6.27994,10.3451]}},

"bthrow":{
"f21":{"throwN":[-6.5123,10.3866]}},

"uthrow":{
"f25":{"throwN":[-0.4209,25.1126]}},

"dthrow":{
"f43":{"throwN":[-3.2483,-0.1038]}}},

"Pk":{
"fthrow":{
"f29":{"throwN":[7.08556,11.7272]}},

"bthrow":{
"f30":{"throwN":[-3.2930,8.74976],"transN":[-25.200,0]}},

"uthrow":{
"f20":{"throwN":[2.40722,14.9081]}},

"dthrow":{
"f20":{"throwN":[-0.5405,1.17256]}}},

"Po":{
"fthrow":{
"f28":{"throwN":[14.2476,8.20171]}},

"bthrow":{
"f17":{"throwN":[-10.172,9.69242]},
"f18":{"throwN":[-13.727,8.53091]},
"f19":{"throwN":[-16.326,9.91663]}},

"uthrow":{
"f31":{"throwN":[-4.0256,26.9426]}},

"dthrow":{
"f36":{"throwN":[13.3134,3.25132]},
"f37":{"throwN":[13.3436,3.25132]},
"f38":{"throwN":[13.3864,3.25132]}}},

"Jp":{
"fthrow":{
"f10":{"throwN":[11.2800,6.58010]}},

"bthrow":{
"f25":{"throwN":[-6.2320,0.71290],"transN":[-7.5200,0]},
"f26":{"throwN":[-6.3616,0.52940],"transN":[-7.4754,0]},
"f27":{"throwN":[-6.4554,0.30614],"transN":[-7.3336,0]}},

"uthrow":{
"f8":{"throwN":[-4.0995,10.5044]},
"f9":{"throwN":[-2.3493,10.7122]},
"f10":{"throwN":[0.11034,10.5044]}},

"dthrow":{
"f63":{"throwN":[0.99571,1.39779]}}},

"Sm":{
"fthrow":{
"f15":{"throwN":[9.17490,20.4992]},
"f16":{"throwN":[9.17490,20.4992]},
"f17":{"throwN":[9.17490,20.4992]}},  //copied f16/f17

"bthrow":{
"f11":{"throwN":[-14.370,19.1663]},
"f12":{"throwN":[-14.370,19.1663]},
"f13":{"throwN":[-14.370,19.1663]}}, // copied f12/f13

"uthrow":{
"f31":{"throwN":[0.79793,41.7047]},
"f32":{"throwN":[0.79793,41.7047]},
"f33":{"throwN":[0.79793,41.7047]}},

"dthrow":{
"f21":{"throwN":[13.0290,1.57963]},
"f22":{"throwN":[12.9714,-0.7415]},
"f23":{"throwN":[12.9646,-0.8414]}}},

"Ys":{
"fthrow":{
"f19":{"throwN":[13.9279,20.6202]},
"f20":{"throwN":[13.9279,20.6202]},
"f21":{"throwN":[13.9279,20.6202]}},  //copied f20/f21

"bthrow":{
"f19":{"throwN":[-15.964,16.6653]},
"f20":{"throwN":[-15.964,16.6653]},
"f21":{"throwN":[-15.964,16.6653]}}, // copied f20/f21

"uthrow":{
"f12":{"throwN":[-1.9667,29.6349]},
"f13":{"throwN":[-2.1663,30.7874]},
"f14":{"throwN":[-2.3068,31.5989]}},

"dthrow":{
"f14":{"throwN":[-1.3429,1.53477]},
"f15":{"throwN":[-0.9008,1.39857]},
"f16":{"throwN":[-0.9008,1.44012]}}},

"Zd":{
"fthrow":{
"f32":{"throwN":[9.05510,12.3484]},
"f33":{"throwN":[9.05510,12.3484]},
"f34":{"throwN":[9.05510,12.3484]}}, // copied f33/f34

"bthrow":{
"f28":{"throwN":[-14.816,13.1514]},
"f29":{"throwN":[-14.902,13.1514]},
"f30":{"throwN":[-14.859,13.1514]}},

"uthrow":{
"f29":{"throwN":[-4.4844,24.0404]},
"f30":{"throwN":[-4.4844,24.0404]},
"f31":{"throwN":[-4.4844,24.0404]}},

"dthrow":{
"f50":{"throwN":[-0.0411,-0.2985]}}},

"Sh":{
"fthrow":{
"f24":{"throwN":[9.92890,9.89187]}},

"bthrow":{
"f20":{"throwN":[-13.889,9.90452],"transN":[-6.5799,0]}},

"uthrow":{
"f23":{"throwN":[-5.7801,27.0356]}},

"dthrow":{
"f36":{"throwN":[-0.3095,3.12073]}}},

"Fc":{
"fthrow":{
"f11":{"throwN":[10.3378,9.70669],"transN":[5.92933,0]},
"f12":{"throwN":[10.3378,9.70669],"transN":[6.57830,0]},
"f13":{"throwN":[10.3378,9.70669],"transN":[6.57830,0]}},

"bthrow":{
"f9":{"throwN":[-7.4174,12.9472]},
"f10":{"throwN":[-7.5613,12.9801]},
"f11":{"throwN":[-7.5793,12.9842]}},

"uthrow":{
"f7":{"throwN":[2.85313,29.3586]},
"f8":{"throwN":[2.85521,29.3302]},
"f9":{"throwN":[2.86133,29.2769]}},

"dthrow":{
"f33":{"throwN":[0.57363,6.17748]},
"f34":{"throwN":[0.57363,6.26086]},
"f35":{"throwN":[0.57363,6.32075]}}},

"YL":{
"fthrow":{
"f16":{"throwN":[9.04736,11.2818]}},

"bthrow":{
"f16":{"throwN":[-8.4910,13.4383]}},

"uthrow":{
"f27":{"throwN":[0.42313,24.5832]}},

"dthrow":{
"f28":{"throwN":[-4.1604,-0.0478]},
"f29":{"throwN":[-4.1529,-0.0678]},
"f30":{"throwN":[-4.1468,-0.0840]}}},

"DM":{
"fthrow":{
"f12":{"throwN":[7.20597,8.03310]},
"f13":{"throwN":[7.20597,8.03310]},
"f14":{"throwN":[7.20597,8.03310]}}, // copied f13/f14

"bthrow":{
"f44":{"throwN":[-5.1232,9.00145]},
"f45":{"throwN":[-5.1232,9.00145]},
"f46":{"throwN":[-5.1232,9.00145]}}, // copied f45/f46

"uthrow":{
"f18":{"throwN":[-0.4416,16.3233]},
"f19":{"throwN":[-0.4249,16.6904]},
"f20":{"throwN":[-0.4036,16.9717]}},

"dthrow":{
"f18":{"throwN":[-1.3251,2.58225]},
"f19":{"throwN":[-1.2326,2.69615]},
"f20":{"throwN":[-1.1401,2.71357]}}},

"Ry":{
"fthrow":{
"f14":{"throwN":[7.68393,1.66529]},
"f15":{"throwN":[7.62699,1.44385]},
"f16":{"throwN":[7.58091,1.23477]}},

"bthrow":{
"f7":{"throwN":[-0.7627,7.35764]},
"f8":{"throwN":[-0.8114,7.27948]},
"f9":{"throwN":[-0.8678,7.20673]}},

"uthrow":{
"f12":{"throwN":[5.33751,22.9088]},
"f13":{"throwN":[4.99637,24.8995]},
"f14":{"throwN":[4.73314,26.9776]}},

"dthrow":{
"f14":{"throwN":[7.59860,2.51889]},
"f15":{"throwN":[5.42663,0.12544]},
"f16":{"throwN":[5.42663,-0.0663]}}},

"Pi":{
"fthrow":{
"f29":{"throwN":[2.54156,7.88035]}},

"bthrow":{
"f30":{"throwN":[-2.819,6.70068],"transN":[-14.000,0]},
"f31":{"throwN":[-2.819,6.70068],"transN":[-14.000,0]},
"f32":{"throwN":[-2.819,6.70068],"transN":[-14.000,0]}},

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
"f15":{"throwN":[9.61007,12.4115]}},

"dthrow":{
"f20":{"throwN":[9.54888,3.61171]},
"f21":{"throwN":[9.54850,3.61431]},
"f22":{"throwN":[9.44461,3.52388]}}}};
