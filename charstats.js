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
foxa.uptilt.id0 = new hitbox(18,140,12,110,5,[5,5]);
foxa.uptilt.id1 = new hitbox(18,140,9,84,5,[5,5]);
foxa.uptilt.id2 = new hitbox(18,140,9,80,5,[5,5]);
foxa.uptilt.id3 = new hitbox(18,140,9,80,5,[5,5]);
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
foxa.bair.set1.id0 = new hitbox(0,100,15,361);
foxa.bair.set1.id1 = new hitbox(0,100,15,361);
foxa.bair.set1.id2 = new hitbox(0,100,9,361);
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
