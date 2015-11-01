var anumList = ["jab1","jab2","jab3","dashattack","ftiltHigh","ftiltMidHigh","ftiltMiddle","ftiltMidLow","ftiltLow","uptilt","downtilt","fsmashHigh","fsmashMidHigh","fsmashMiddle","fsmashMidLow","fsmashLow","upsmash","downsmash","nair","fair","bair","upair","dair","neutralb","sideb","upb","downb"];


function attacks() {
  this.jab1 = {anum : 0};
  this.jab2 = {anum : 1};
  this.jab3 = {anum : 2};
  this.dashattack = { anum : 3};
  this.ftiltHigh = {anum : 4};
  this.ftiltMidHigh = {anum : 5};
  this.ftiltMiddle = {anum : 6};
  this.ftiltMidLow = {anum : 7};
  this.ftiltLow = {anum : 8};
  this.uptilt = {anum : 9};
  this.downtilt = {anum : 10};
  this.fsmashHigh = {anum : 11};
  this.fsmashMidHigh = {anum : 12};
  this.fsmashMiddle = {anum : 13};
  this.fsmashMidLow = {anum : 14};
  this.fsmashLow = {anum : 15};
  this.upsmash = {anum : 16};
  this.downsmash = {anum : 17};
  this.nair = {anum : 18};
  this.fair = {anum : 19};
  this.bair = {anum : 20};
  this.upair = {anum : 21};
  this.dair = {anum : 22};
  this.neutralb = {
    anum : 23,
    ground: {},
    air: {}
  };
  this.sideb = {
    anum : 24,
    ground: {},
    air: {}
  };
  this.upb = {
    anum : 25,
    ground: {},
    air: {}
  };
  this.downb = {
    anum : 26,
    ground: {},
    air: {}
  };

}

function hitbox(baseknockback, knockbackgrowth, damage, angle, hsize, activeFrames, offset) {
  this.baseknockback = baseknockback;
  this.knockbackgrowth = knockbackgrowth;
  this.damage = damage;
  this.angle = angle;
  this.hsize = hsize;
  this.activeFrames = activeFrames;
  this.offset = offset;
}

function char(maxwalk, traction, dashinit, dashacc, dashterm, dashframes, jumpsquat, jumpHinit, jumpVinit, groundtoair, jumpHmax, shorthopVinit, noofjumps, gravity, termvelocity, airmobility, airHmax, airfriction, fastfallvelocity, djc) {
    this.maxwalk = maxwalk;
    this.traction = traction;
    this.dashinit = dashinit;
    this.dashacc = dashacc;
    this.dashterm = dashterm;
    this.dashframes = dashframes
    this.jumpsquat = jumpsquat;
    this.jumpHinit = jumpHinit;
    this.jumpVinit = jumpVinit;
    this.groundtoair = groundtoair;
    this.jumpHmax = jumpHmax;
    this.shorthopVinit = shorthopVinit;
    this.noofjumps = noofjumps;
    this.gravity = gravity;
    this.termvelocity = termvelocity;
    this.airmobility = airmobility;
    this.airHmax = airHmax;
    this.airfriction = airfriction;
    this.fastfallvelocity = fastfallvelocity;
    this.djc = djc;
    this.attacks = new attacks();
}
var fox = new char(1.6,0.08,1.9,0.1,2.2,[11,21],3,0.72,3.68,0.83,1.7,2.1,0,0.23,2.8,0.06,0.83,0.02,3.4,false);
var foxa = fox.attacks;
foxa.jab1.id0 = new hitbox(0,100,4,70,3.32791,[[2,3]],[[2,[5.48921,5.97309]],[3,[15.53373,8.14861]]]);
foxa.jab1.id1 = new hitbox(0,100,4,70,3.32791,[[2,3]],[[2,[6.19857,9.12425]],[3,[8.99843,7.76470]]]);
foxa.jab1.idlist = [[2,[0,1]],[3,[0,1]]];
foxa.jab2.id0 = new hitbox(0,100,4,70,5,[5,5]);
foxa.jab2.id1 = new hitbox(0,100,4,70,5,[5,5]);
foxa.dashattack.id0 = new hitbox(35,90,7,72,5,[5,5]);
foxa.dashattack.id1 = new hitbox(35,90,7,72,5,[5,5]);
foxa.ftiltMiddle.id0 = new hitbox(0,100,9,361,5,[5,5]);
foxa.ftiltMiddle.id1 = new hitbox(0,100,9,361,5,[5,5]);
foxa.ftiltMiddle.id2 = new hitbox(0,100,9,361,5,[5,5]);
foxa.uptilt.id0 = new hitbox(18,140,12,110,5.07780,[[5,11]],[[5,[-3.84335,4.74831]],[6,[-5.70921,10.78571]],[7,[-1.73668,16.29311]],[8,[4.50842,16.12613]],[9,[4.68260,15.32194]],[10,[3.99878,14.60301]],[11,[3.12142,14.13342]]]);
foxa.uptilt.id1 = new hitbox(18,140,9,84,5.07780,[[5,11]],[[5,[-3.84335,4.74831]],[6,[-5.70921,10.78571]],[7,[-1.73668,16.29311]],[8,[4.50842,16.12613]],[9,[4.68260,15.32194]],[10,[3.99878,14.60301]],[11,[3.12142,14.13342]]]);
foxa.uptilt.id2 = new hitbox(18,140,9,80,3.51540,[[5,11]],[[5,[-3.82606,4.71312]],[6,[-5.72112,10.77124]],[7,[-1.82256,16.27079]],[8,[4.41711,16.17972]],[9,[4.59562,15.38135]],[10,[3.93135,14.68610]],[11,[3.06158,14.21880]]]);
foxa.uptilt.id3 = new hitbox(18,140,9,80,3.12480,[[5,11]],[[5,[0.46717,8.18963]],[6,[0.41969,9.35220]],[7,[1.03304,10.22105]],[8,[1.77660,10.30280]],[9,[1.78963,10.21148]],[10,[1.56899,10.21863]],[11,[1.35074,10.19723]]]);
foxa.uptilt.idlist = [[5,[0,1,2,3]],[6,[0,1,2,3]],[7,[0,1,2,3]],[8,[0,1,2,3]],[9,[0,1,2,3]],[10,[0,1,2,3]],[11,[0,1,2,3]]];
foxa.downtilt.id0 = new hitbox(25,125,10,70,5,[5,5]);
foxa.downtilt.id1 = new hitbox(25,125,10,80,5,[5,5]);
foxa.downtilt.id2 = new hitbox(25,125,10,90,5,[5,5]);
foxa.fsmashMiddle.set1 = {};
foxa.fsmashMiddle.set2 = {};
foxa.fsmashMiddle.set1.id0 = new hitbox(10,105,15,361,5,[5,5]);
foxa.fsmashMiddle.set1.id1 = new hitbox(10,105,15,361,5,[5,5]);
foxa.fsmashMiddle.set1.id2 = new hitbox(10,105,15,361,5,[5,5]);
foxa.fsmashMiddle.set2.id0 = new hitbox(2,100,12,361,5,[5,5]);
foxa.fsmashMiddle.set2.id1 = new hitbox(2,100,12,361,5,[5,5]);
foxa.fsmashMiddle.set2.id2 = new hitbox(2,100,12,361,5,[5,5]);
foxa.upsmash.set1 = {};
foxa.upsmash.set2 = {};
foxa.upsmash.set1.id0 = new hitbox(30,112,18,80,5,[5,5]);
foxa.upsmash.set1.id1 = new hitbox(30,112,18,80,5,[5,5]);
foxa.upsmash.set2.id0 = new hitbox(10,100,13,361,5,[5,5]);
foxa.upsmash.set2.id1 = new hitbox(10,100,13,361,5,[5,5]);
foxa.downsmash.id0 = new hitbox(20,65,15,25,5,[5,5]);
foxa.downsmash.id1 = new hitbox(20,65,15,25,5,[5,5]);
foxa.downsmash.id2 = new hitbox(20,65,15,25,5,[5,5]);
foxa.downsmash.id3 = new hitbox(20,65,15,25,5,[5,5]);
foxa.nair.set1 = {};
foxa.nair.set2 = {};
foxa.nair.set1.id0 = new hitbox(10,100,12,361);
foxa.nair.set1.id1 = new hitbox(10,100,12,361);
foxa.nair.set1.id2 = new hitbox(10,100,12,361);
foxa.nair.set2.id0 = new hitbox(0,100,9,361);
foxa.nair.set2.id1 = new hitbox(0,100,9,361);
foxa.nair.set2.id2 = new hitbox(0,100,9,361);
foxa.fair.set1 = {};
foxa.fair.set2 = {};
foxa.fair.set1.id0 = new hitbox(10,100,7,361);
foxa.fair.set1.id1 = new hitbox(10,100,7,361);
foxa.fair.set2.id0 = new hitbox(10,100,5,361);
foxa.fair.set2.id1 = new hitbox(10,100,5,361);
foxa.bair.set1 = {};
foxa.bair.set2 = {};
foxa.bair.set1.id0 = new hitbox(0,100,15,361,3.65992,[[4,19]],[[4,[-0.00767,7.97444]],[5,[-0.00978,7.97621]][6,[-0.01195,7.97903]],[7,[-0.01417,7.97990]],[8,[-0.01644,7.98180]],[9,[-0.01873,7.98172]],[10,[-0.02106,7.98568]],[11,[-0.02340,7.98764]],[12,[-0.02575,7.98961]],[13,[-0.02811,7.99159]],[14,[-0.03045,7.99355]],[15,[-0.03279,7.99552]],[16,[-0.03509,7.99745]],[17,[-0.03737,7.99936]],[18,[-0.03961,8.00124]],[19,[-0.04180,8.00308]]);
foxa.bair.set1.id1 = new hitbox(0,100,15,361,4.99187,[[4,19]],[[4,[-8.04333,9.58714]],[5,[-8.06056,9.56407]],[6,[-8.06227,9.50591]],[7,[-8.07127,9.43147]],[8,[-7.90740,9.39338]],[9,[-7.70656,9.23384]],[10,[-7.46671,9.09557]],[11,[-7.21266,8.96507]],[12,[-6.95791,8.84172]],[13,[-6.71012,8.72224]],[14,[-6.47212,8.60219]],[15,[-6.24277,8.47663]],[16,[-6.01765,8.33039]],[17,[-5.78952,8.18832]],[18,[-5.54914,8.00487]],[19,[-5.28309,7.80108]]]);
foxa.bair.set1.id2 = new hitbox(0,100,9,361,3.32791,[[4,19]],[[4,[2.66295,4.19604]],[5,[2.80178,4.15701]],[6,[2.87459,4.16952]],[7,[2.93154,4.18670]],[8,[2.97354,4.20176]],[9,[2.99942,4.20778]],[10,[3.00630,4.19792]],[11,[2.98990,4.16534]],[12,[2.99182,4.15973]],[13,[2.99342,4.15836]],[14,[2.98291,4.14718]],[15,[2.94732,4.11142]],[16,[2.88695,4.05349]],[17,[2.83222,4.01117]],[18,[2.77550,3.97638]],[19,[2.71048,3.94252]]]);
foxa.bair.set2.id0 = new hitbox(0,100,9,361);
foxa.bair.set2.id1 = new hitbox(0,100,9,361);
foxa.bair.set2.id2 = new hitbox(0,100,9,361);
foxa.upair.set1 = {};
foxa.upair.set2 = {};
foxa.upair.set1.id0 = new hitbox(0,120,5,92);
foxa.upair.set1.id1 = new hitbox(0,120,5,92);
foxa.upair.set1.id2 = new hitbox(0,120,5,92);
foxa.upair.set2.id0 = new hitbox(40,116,13,85);
foxa.upair.set2.id1 = new hitbox(40,116,13,85);
foxa.upair.set2.id2 = new hitbox(40,116,13,85);
foxa.dair.id0 = new hitbox(0,100,3,290);
foxa.dair.id0 = new hitbox(0,100,2,290);

foxa.upb.hold = {};
foxa.upb.id0 = new hitbox(60,60,14,80);
foxa.upb.hold.id0 = new hitbox(40,40,2,70);
