t = {
  pointerXMelee:0,
  pointerYMelee:0,
  tdiXMelee : 0,
  tdiYMelee : 0,
  sdiXMelee : 0,
  sdiYMelee : 0,
  adiXMelee : 0,
  adiYMelee : 0,
  curHitbox : chars.Fx.neutralSpecial,
  cHname : ["Fx","neutralSpecial"],
  character : "Fox",
  percent : 80,
  version : "NTSC",
  crouch : false,
  reverse : false,
  chargeInterrupt : false,
  chargeF : 0,
  staleQueue : [false,false,false,false,false,false,false,false,false],
  curPositions : 0,
  fadeIn : true,
  doubleJump : true,
  hitstun : 0,
  meteorCancel : 0,
  vcancel : 0,
  grounded : true,
  knockback : 0,
  yDisplacement : 0,
  newDamage : 3,
  stayGrounded : false,
  metal : false,
  ice : false,
  icg : false
};

function convertCharName(name){
  var newname;
  switch (name){
    case "Fx":
      newname = "Fox";
      break;
    case "Fc":
      newname = "Falco";
      break;
    case "Ms":
      newname = "Marth";
      break;
    case "Sh":
      newname = "Sheik";
      break;
    case "Jp":
      newname = "Puff";
      break;
    case "Pc":
      newname = "Peach";
      break;
    case "Po":
      newname = "ICs";
      break;
    case "CF":
      newname = "Falcon";
      break;
    case "Pk":
      newname = "Pika";
      break;
    case "Sm":
      newname = "Samus";
      break;
    case "DM":
      newname = "Doc";
      break;
    case "Ys":
      newname = "Yoshi";
      break;
    case "Lg":
      newname = "Luigi";
      break;
    case "Gn":
      newname = "Ganon";
      break;
    case "Ma":
      newname = "Mario";
      break;
    case "YL":
      newname = "Y.Link";
      break;
    case "DK":
      newname = "DK";
      break;
    case "Lk":
      newname = "Link";
      break;
    case "GW":
      newname = "MrG&W";
      break;
    case "Ry":
      newname = "Roy";
      break;
    case "Mw":
      newname = "Mewtwo";
      break;
    case "Zd":
      newname = "Zelda";
      break;
    case "Ns":
      newname = "Ness";
      break;
    case "Pi":
      newname = "Pichu";
      break;
    case "Bw":
      newname = "Bowser";
      break;
    case "Kb":
      newname = "Kirby";
      break;
    default:
      newname = "NoName";
      break;
  }
  return newname;
}


var charid;
var attackid;

function characterClick(){
  $(".character").unbind("click");
  $(".character").click(function(){
    $(".expandcharacter").removeClass("expandtrue").addClass("expandfalse");
    charid = $(this).attr("id");
    //prompt(t["t1"].cHName);
    //prompt(aT);

    if ($("."+charid).length > 0){
      $("."+charid).remove();
      $(this).children(".expandcharacter").removeClass("expandtrue").addClass("expandfalse");
    }
    else {
      $(".attack").unbind("click").remove();
      $(this).children(".expandcharacter").removeClass("expandfalse").addClass("expandtrue");

      //t["t"+aT].cHName[0] = id;
      //prompt(t["t1"].cHName);
      var keys = Object.keys(chars[charid]);
      for (i=0;i<keys.length;i++){
        $(this).after('<div id="'+keys[i]+'" class="attack '+charid+'"><p>'+keys[i]+'</p></div>');
      }
      $(".attack").hover(function(){
        $(this).toggleClass("attackhighlight");
      });
      attackClick();
    }
  });
}

function attackClick(){
  $(".attack").unbind("click");
  $(".attack").click(function(){
    attackid = $(this).attr("id");
    t.curHitbox = chars[charid][attackid];
    t.cHname = Object.keys(chars[charid][attackid]);
    $("#victimMain").fadeIn();
    $("#attackMain").fadeOut();
    victimClick();
  });
}

function victimClick(){
  $(".victim").unbind("click");
  $(".victim").click(function(){
    var id = $(this).attr("id");
    t.character = convertCharName(id);
    $("#resultsMain").fadeIn();
    $("#victimMain").fadeOut();
    if (task == 1){
      crouchCancelTask();
    }
  });
}

// tasks: 0=none, 1=crouch, 2=kill, 3=shieldstun
task = 0;

function crouchCancelClick() {
  $("#crouchCancelTask").click(function(){
    $("#attackMain").fadeIn();
    $("#taskMain").fadeOut();
    task = 1;
    characterClick();
  });
}

function crouchCancelTask(){
  $("#resultsContainer").empty().append('<div id="allHitboxes" class="percent"><div id="allHitboxesTitle"><p>All Hitboxes</p></div><p id="allHitboxesPercent"><span id="allHitboxesPercentEdit"></span>%</p></div>');
  var keys = Object.keys(t.curHitbox);
  // if no subattacks
  if (keys[0][0] == "i" && keys[0][1] == "d"){
    var ccPercents = [];
    var lowestPercent = 123456;
    // for each id
    for (i=0;i<keys.length;i++){
      // find percent
      ccPercents[i] = findCrouchCancelPercent(t.curHitbox[keys[i]],t.character);
      if (ccPercents[i] < 0){
        ccPercents[i] = 0;
      }
      if (ccPercents[i] != "Never" && ccPercents[i] != "Infinity"){
        ccPercents[i] = Math.floor(ccPercents[i]);
      }
      //applying seperators
      if (i != 0){
        $("#allHitboxes").append('<div class="idSeperator"></div>');
      }
      $("#allHitboxes").append('<div id="idContainerAI'+i+'" class="idContainer"><div class="idTitle"><p>id '+i+'</p></div><div class="idPercent"><p><span id="subattackAid'+i+'Percent">'+ccPercents[i]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+t.curHitbox[keys[i]].dmg+'<br>Angle: '+t.curHitbox[keys[i]].angle+'<br>BKB: '+t.curHitbox[keys[i]].bk+'<br>KBG: '+t.curHitbox[keys[i]].kg+'<br>SKB: '+t.curHitbox[keys[i]].wbk+'<br>Type: <span class="effectText">'+t.curHitbox[keys[i]].effect+'</span><br></p></div></div>');

      // check if lowest percent
      if (lowestPercent != "Never"){
        if (ccPercents[i] == "Never"){
          lowestPercent = "Never";
        }
        else if (ccPercents[i] != "Infinity"){
          if (ccPercents[i] < lowestPercent){
            lowestPercent = ccPercents[i];
          }
        }
      }
      // apply margin to center if not 4 ids
      $("#idContainerAI0").css("margin-left",(((4-keys.length)*50)+48)+"px");
    }

  }
  else {
    var ccPercents = [];
    var lowestPercent = 123456;
    // for each sub attack
    for (i=0;i<keys.length;i++){
      $("#resultsContainer").append('<div id="subattackHitboxes'+i+'" class="subattackHitboxes percent"><div class="subattackTitle"><p>'+keys[i]+'</p></div>');
      ccPercents[i] = [];
      var keys2 = Object.keys(t.curHitbox[keys[i]]);
      // for each id
      for (j=0;j<keys2.length;j++){
        // find percent
        ccPercents[i][j] = findCrouchCancelPercent(t.curHitbox[keys[i]][keys2[j]],t.character);
        if (ccPercents[i][j] < 0){
          ccPercents[i][j] = 0;
        }
        if (ccPercents[i][j] != "Never" || ccPercents[i][j] != "Infinity"){
          ccPercents[i][j] = Math.floor(ccPercents[i][j]);
        }
        //applying seperators
        if (j != 0){
          $("#subattackHitboxes"+i).append('<div class="idSeperator"></div>');
        }
        $("#subattackHitboxes"+i).append('<div id="idContainerS'+i+'I'+j+'" class="idContainer"><div class="idTitle"><p>id '+j+'</p></div><div class="idPercent"><p><span id="subattack'+i+'id'+j+'Percent">'+ccPercents[i][j]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+t.curHitbox[keys[i]][keys2[j]].dmg+'<br>Angle: '+t.curHitbox[keys[i]][keys2[j]].angle+'<br>BKB: '+t.curHitbox[keys[i]][keys2[j]].bk+'<br>KBG: '+t.curHitbox[keys[i]][keys2[j]].kg+'<br>SKB: '+t.curHitbox[keys[i]][keys2[j]].wbk+'<br>Type: <span class="effectText">'+t.curHitbox[keys[i]][keys2[j]].effect+'</span><br></p></div></div>');

        // check if lowest percent
        if (lowestPercent != "Never"){
          if (ccPercents[i][j] == "Never"){
            lowestPercent = "Never";
          }
          else if (ccPercents[i][j] != "Infinity"){
            if (ccPercents[i][j] < lowestPercent){
              lowestPercent = ccPercents[i][j];
            }
          }
        }

        // apply margin to center if not 4 ids
        $("#idContainerS"+i+"I0").css("margin-left",((4-keys.length)*50)+"px");
      }
    }
  }
  // if lowest percent never changed, must be infinity
  if (lowestPercent == 123456){
    lowestPercent = "Infinity";
  }
  $("#allHitboxesPercentEdit").append(lowestPercent);
}

function findCrouchCancelPercent(hitbox,victim){
  var base = hitbox.bk;
  var growth = hitbox.kg;
  var damageunstaled = hitbox.dmg;
  var damagestaled = hitbox.dmg;
  var setKnockback = hitbox.wbk;
  var weight = characters[victim].NTSCweight;
  var knockback = 120;
  var percent = 0;
  if (setKnockback == 0){
    if (growth > 0){
      percent = ((-50*base*weight) - (5000 * base) - (7*growth*damagestaled*damageunstaled) - (14 * growth * damagestaled) - (9*growth*weight) - (900*growth) + (50*knockback*weight) + (5000 * knockback))/(7*growth*(damageunstaled + 2));
    }
    else {
      prompt("Can't divide by zero! This hitbox shouldn't exist");
      percent = 0;
    }
  }
  else {
    var kb = ((((setKnockback * 10 / 20) + 1) * 1.4 * (200/(weight + 100)) + 18) * (growth / 100)) + base;
    if (kb >= 80){
      percent = "Never";
    }
    else {
      percent = "Infinity";
    }
  }
  return percent;
}

$(document).ready(function(){
	$('#characterContainer').perfectScrollbar();
	$('#victimContainer').perfectScrollbar();
  $('#resultsContainer').perfectScrollbar();
  crouchCancelClick();


});
