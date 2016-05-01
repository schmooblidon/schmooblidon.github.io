defaultversion = "NTSC";

bz = {};
bz.bf = [200,224,-108.8,-224];
bz.fd = [188,246,-140,-246];
bz.dl = [250,255,-123,-255];
bz.ps = [180,230,-111,-230];
bz.ys = [168,173.6,-91,-175.7];
bz.fo = [202.5,198.75,-146.25,-198.75];

function trajectoryObject(){
  this.calculation = 0;
  this.pointerXMelee = 0;
  this.pointerYMelee = 0;
  this.tdiXMelee = 0;
  this.tdiYMelee = 0;
  this.sdiXMelee = 0;
  this.sdiYMelee = 0;
  this.adiXMelee = 0;
  this.adiYMelee = 0;
  this.curHitbox = chars.Fx.neutralSpecial;
  this.cHname = ["Fx","neutralSpecial"];
  this.character = "Fox";
  this.percent = 0;
  this.version = defaultversion;
  this.crouch = false;
  this.reverse = false;
  this.chargeInterrupt = false;
  this.chargeF = 0;
  this.staleQueue = [false,false,false,false,false,false,false,false,false];
  this.curPositions = 0;
  this.fadeIn = true;
  this.doubleJump = true;
  this.hitstun = 0;
  this.meteorCancel = 0;
  this.vcancel = 0;
  this.grounded = false;
  this.knockback = 0;
  this.yDisplacement = 0;
  this.newDamage = 3;
  this.stayGrounded = false;
  this.metal = false;
  this.ice = false;
  this.icg = false;
  this.isThrow = false;
  this.stage = "bf";
  this.task = 0;
  this.damagestaled = 3;
  this.damageunstaled = 3;
}

cl = [];

curCalculations = 0;

c = -1;

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
    cl[c].curHitbox = chars[charid][attackid];
    cl[c].cHname = Object.keys(chars[charid][attackid]);
    $("#victimMain").fadeIn();
    $("#attackMain").fadeOut();
    victimClick();
  });
}

function victimClick(){
  $(".victim").unbind("click");
  $(".victim").click(function(){
    var id = $(this).attr("id");
    cl[c].character = convertCharName(id);
    $("#resultsMain").fadeIn();
    $("#victimMain").fadeOut();
    switch (cl[c].task){
      case 1:
        crouchCancelTask();
        break;
      case 2:
        killTask();
        break;
      default:
        break;
    }
  });
}

// tasks: 0=none, 1=crouch, 2=kill, 3=shieldstun
//task = 0;

function crouchCancelClick() {
  $("#crouchCancelTask").click(function(){
    $("#attackMain").fadeIn();
    $("#taskMain").fadeOut();
    c++;
    cl[c] = new trajectoryObject();
    cl[c].task = 1;
    characterClick();
  });
}

function killClick() {
  $("#killTask").click(function(){
    $("#attackMain").fadeIn();
    $("#taskMain").fadeOut();
    c++;
    cl[c] = new trajectoryObject();
    cl[c].task = 2;
    characterClick();
  });
}

function asdiOptionClick() {
  $("#ccoption2").click(function(){
    createPercents("ad");
  });
}

function amsahTechClick() {
  $("#amsahTechTask").click(function(){
    createPercents("at");
  });
}

function crouchCancelTask(){
  $("#resultsContainer").empty().append('<div id="resultsCCoptionContainer"><div id="ccoption1" class="resultsCCoptionButton ccoptionHighlight"><p>Crouch Cancel</p></div><div class="resultsCCoptionSpace"></div><div id="ccoption2" class="resultsCCoptionButton"><p>ASDI Down</p></div><div class="resultsCCoptionSpace"></div><div id="ccoption3" class="resultsCCoptionButton"><p>Amsah Tech</p></div></div><div id="resultsCCpercents"></div>');
  createPercents("cc");
  $(".resultsCCoptionButton").click(function(){
    $(".resultsCCoptionButton").removeClass("ccoptionHighlight");
    $(this).addClass("ccoptionHighlight");
    var id = $(this).attr("id");
    id = id.substr(8,id.length);
    if (id == 1){
      createPercents(c,"cc");
    }
    else if (id == 2){
      createPercents(c,"ad");
    }
    else if (id == 3){
      createPercents(c,"at");
    }
  });
}

function killTask(){
  $("#resultsContainer").empty().append('<div id="resultsCCoptionContainer"><div id="ccoption1" class="resultsCCoptionButton ccoptionHighlight"><p>No DI</p></div><div class="resultsCCoptionSpace"></div><div id="ccoption2" class="resultsCCoptionButton"><p>Max DI 1</p></div><div class="resultsCCoptionSpace"></div><div id="ccoption3" class="resultsCCoptionButton"><p>Max DI 2</p></div></div><div id="resultsCCpercents"></div>');
  createPercents(c,"kn");
  $(".resultsCCoptionButton").click(function(){
    $(".resultsCCoptionButton").removeClass("ccoptionHighlight");
    $(this).addClass("ccoptionHighlight");
    var id = $(this).attr("id");
    id = id.substr(8,id.length);
    if (id == 1){
      createPercents(c,"kn");
    }
    else if (id == 2){
      createPercents(c,"kp");
    }
    else if (id == 3){
      createPercents(c,"kb");
    }
  });
}

function createPercents(c,type){
  $("#resultsCCpercents").empty().append('<div id="allHitboxes" class="percent"><div id="allHitboxesTitle"><p>All Hitboxes</p></div><p id="allHitboxesPercent"><span id="allHitboxesPercentEdit"></span>%</p></div>');
  var keys = Object.keys(cl[c].curHitbox);
  // if no subattacks
  if (keys[0][0] == "i" && keys[0][1] == "d"){
    var percents = [];
    var lowestPercent = 123456;
    // for each id
    for (i=0;i<keys.length;i++){
      // find percent
      switch (type){
        case "cc":
          percents[i] = findCrouchCancelPercent(cl[c].curHitbox[keys[i]],cl[c].character);
          break;
        case "ad":
          percents[i] = findASDIdownPercent(cl[c].curHitbox[keys[i]],cl[c].character);
          break;
        case "at":
          percents[i] = findAmsahTechPercent(cl[c].curHitbox[keys[i]],cl[c].character);
          break;
        case "kn":
          percents[i] = findKillPercent(cl[c].curHitbox[keys[i]],c,"n");
          break;
        case "kp":
          percents[i] = findKillPercent(cl[c].curHitbox[keys[i]],c,"p");
          break;
        case "kb":
          percents[i] = findKillPercent(cl[c].curHitbox[keys[i]],c,"b");
          break;
        default:
          break;
      }

      if (percents[i] != "Never" && percents[i] != "Inf"){
        if (percents[i] < 0){
          percents[i] = 0;
        }
        percents[i] = Math.ceil(percents[i]);
      }
      //applying seperators
      if (i != 0){
        $("#allHitboxes").append('<div class="idSeperator"></div>');
      }
      $("#allHitboxes").append('<div id="idContainerAI'+i+'" class="idContainer"><div class="idTitle"><p>id '+i+'</p></div><div class="idPercent"><p><span id="subattackAid'+i+'Percent">'+percents[i]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+cl[c].curHitbox[keys[i]].dmg+'<br>Angle: '+cl[c].curHitbox[keys[i]].angle+'<br>BKB: '+cl[c].curHitbox[keys[i]].bk+'<br>KBG: '+cl[c].curHitbox[keys[i]].kg+'<br>SKB: '+cl[c].curHitbox[keys[i]].wbk+'<br>Type: <span class="effectText">'+cl[c].curHitbox[keys[i]].effect+'</span><br></p></div></div>');

      // check if lowest percent
      if (lowestPercent != "Never"){
        if (percents[i] == "Never"){
          lowestPercent = "Never";
        }
        else if (percents[i] != "Inf"){
          if (percents[i] < lowestPercent){
            lowestPercent = percents[i];
          }
        }
      }
      // apply margin to center if not 4 ids
      $("#idContainerAI0").css("margin-left",(((4-keys.length)*50)+48)+"px");
    }

  }
  else {
    var percents = [];
    var lowestPercent = 123456;
    // for each sub attack
    for (i=0;i<keys.length;i++){
      $("#resultsCCpercents").append('<div id="subattackHitboxes'+i+'" class="subattackHitboxes percent"><div class="subattackTitle"><p>'+keys[i]+'</p></div>');
      percents[i] = [];
      var keys2 = Object.keys(cl[c].curHitbox[keys[i]]);
      // for each id
      for (j=0;j<keys2.length;j++){
        // find percent

        switch (type){
          case "cc":
            percents[i][j] = findCrouchCancelPercent(cl[c].curHitbox[keys[i]][keys2[j]],cl[c].character);
            break;
          case "ad":
            percents[i][j] = findASDIdownPercent(cl[c].curHitbox[keys[i]][keys2[j]],cl[c].character);
            break;
          case "at":
            percents[i][j] = findAmsahTechPercent(cl[c].curHitbox[keys[i]][keys2[j]],cl[c].character);
            break;
          case "kn":
            percents[i][j] = findKillPercent(cl[c].curHitbox[keys[i]][keys2[j]],c,"n");
            break;
          case "kp":
            percents[i][j] = findKillPercent(cl[c].curHitbox[keys[i]][keys2[j]],c,"p");
            break;
          case "kb":
            percents[i][j] = findKillPercent(cl[c].curHitbox[keys[i]][keys2[j]],c,"b");
            break;
          default:
            break;
        }

        if (percents[i][j] != "Never" && percents[i][j] != "Inf"){
          if (percents[i][j] < 0){
            percents[i][j] = 0;
          }
          percents[i][j] = Math.ceil(percents[i][j]);
        }
        //applying seperators
        if (j != 0){
          $("#subattackHitboxes"+i).append('<div class="idSeperator"></div>');
        }
        $("#subattackHitboxes"+i).append('<div id="idContainerS'+i+'I'+j+'" class="idContainer"><div class="idTitle"><p>id '+j+'</p></div><div class="idPercent"><p><span id="subattack'+i+'id'+j+'Percent">'+percents[i][j]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+cl[c].curHitbox[keys[i]][keys2[j]].dmg+'<br>Angle: '+cl[c].curHitbox[keys[i]][keys2[j]].angle+'<br>BKB: '+cl[c].curHitbox[keys[i]][keys2[j]].bk+'<br>KBG: '+cl[c].curHitbox[keys[i]][keys2[j]].kg+'<br>SKB: '+cl[c].curHitbox[keys[i]][keys2[j]].wbk+'<br>Type: <span class="effectText">'+cl[c].curHitbox[keys[i]][keys2[j]].effect+'</span><br></p></div></div>');

        // check if lowest percent
        if (lowestPercent != "Never"){
          if (percents[i][j] == "Never"){
            lowestPercent = "Never";
          }
          else if (percents[i][j] != "Inf"){
            if (percents[i][j] < lowestPercent){
              lowestPercent = percents[i][j];
            }
          }
        }

        // apply margin to center if not 4 ids
        $("#idContainerS"+i+"I0").css("margin-left",((4-keys2.length)*50)+"px");
      }
    }
  }
  // if lowest percent never changed, must be infinity
  if (lowestPercent == 123456){
    lowestPercent = "Inf";
  }
  $("#allHitboxesPercentEdit").append(lowestPercent);
}


$(document).ready(function(){
	$('#characterContainer').perfectScrollbar();
	$('#victimContainer').perfectScrollbar();
  $('#resultsContainer').perfectScrollbar();
  crouchCancelClick();
  killClick();
});
