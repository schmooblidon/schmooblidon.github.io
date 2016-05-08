defaultversion = "NTSC";

palettes = [["#fe3a3a","#fe7f7f","#bb2828"],
["#fa5d36","#ffaa7a","#d04703"],
["#fff508","#fcfc8d","#b9b91c"],
["#08fb08","#89fe89","#299f29"],
["#00bdf9","#77ffff","#009999"],
["#4040ff","#8787fc","#2d2da2"],
["#813ffc","#ac82ff","#5b2293"],
["#fa36fa","#fa7afa","#990099"],
["#9e9e9e","#FFFFFF","#595959"]];

bz = {};
bz.bf = [200,224,-108.8,-224];
bz.fd = [188,246,-140,-246];
bz.dl = [250,255,-123,-255];
bz.ps = [180,230,-111,-230];
bz.ys = [168,173.6,-91,-175.7];
bz.fo = [202.5,198.75,-146.25,-198.75];

dimensions = {};
dimensions.bf = [2290,1594];
dimensions.fd = [2510,1690];
dimensions.dl = [2600,1915];
dimensions.ps = [2350,1505];
dimensions.ys = [1796.5,1345];
dimensions.fo = [2037.5,1794];

surfaces = {};
surfaces.bf = [[[-68.4,0],[68.4,0]],[[-57.6,27.2],[-20.0,27.2]],[[20,27.2],[57.6,27.2]],[[-18.8,54.4],[18.8,54.4]]];
surfaces.fd = [[[-85.56570,0],[85.56570,0]]];
surfaces.dl = [[[-77.2713,0.0089],[77.2713,0.0089]],[[-61.3929,30.1422],[-31.7254,30.1422]],[[31.7036,30.2426],[63.0745,30.2426]],[[-19.0181,51.4254],[19.0171,51.4254]]];
surfaces.ps = [[[-87.75,0],[87.75,0]],[[-55,25],[-25,25]],[[25,25],[55,25]]];
surfaces.ys = [[[-56,0],[56,0]],[[-59.5,23.45],[-28,23.45]],[[28,23.45],[59.5,23.45]],[[-15.75,42],[15.75,42]]];
surfaces.fo = [[[-63.34755,0.00288],[63.34755,0.00288]],[[-14.25,42.75],[14.25,42.75]]];


snapping = true;

//centreOffset = [-bz[cl[c].stage][3]*10+50,bz[cl[c].stage][0]*10+50];
centreOffset = [-bz["bf"][3]*5+25,bz["bf"][0]*5+25];
ratio = 2290/1594;
disWidth = 2290;
disHeight = 1594;



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
  this.curHitbox = chars.Ms.fsmash;
  this.cHname = ["Ms","fsmash"];
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
  this.allHitboxes = [];
  this.curPositions = [];
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

    $("#victimMain").fadeOut();
    switch (cl[c].task){
      case 1:
        $("#resultsMain").fadeIn();
        crouchCancelTask();
        break;
      case 2:
        positionSelect();
        break;
      default:
        break;
    }
  });
}

function positionSelect(){
  $("#positionMain").fadeIn();
  trajOffset = $("#positionDisplay").offset();
  trajectoryClick();
  $(".hitDirectionButton").click(function(){
    $(".hitDirectionButton").removeClass("hitDirectionButtonOn");
    $(this).addClass("hitDirectionButtonOn");
    var id = $(this).attr("id");
    if (id[3] == "L"){
      cl[c].reverse = true;
    }
    else {
      cl[c].reverse = false;
    }
    threeDICreateAndDraw();
  });
  $(".stagebutton").click(function(){
    $(".stagebutton").removeClass("stageselected");
    $(this).addClass("stageselected");
    var id = $(this).attr("id");
    changeStage(id);
  });
  $("#snaptosurfacesContainer").click(function(){
    if (snapping){
      $("#stsSwitchBar").removeClass("switchBarOn").addClass("switchBarOff");
      snapping = false;
    }
    else {
      $("#stsSwitchBar").removeClass("switchBarOff").addClass("switchBarOn");
      snapping = true;
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
  percentsA = createPercents(c,"cc");
  writePercents(c,percentsA[0],percentsA[1]);
  $(".resultsCCoptionButton").click(function(){
    $(".resultsCCoptionButton").removeClass("ccoptionHighlight");
    $(this).addClass("ccoptionHighlight");
    var id = $(this).attr("id");
    id = id.substr(8,id.length);
    if (id == 1){
      percentsA = createPercents(c,"cc");
    }
    else if (id == 2){
      percentsA = createPercents(c,"ad");
    }
    else if (id == 3){
      percentsA = createPercents(c,"at");
    }
    writePercents(c,percentsA[0],percentsA[1]);
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
    var percentsA;
    if (id == 1){
      percentsA = createPercents(c,"kn");
    }
    else if (id == 2){
      percentsA = createPercents(c,"kp");
    }
    else if (id == 3){
      percentsA = createPercents(c,"kb");
    }
    writePercents(c,percentsA[0],percentsA[1]);
  });
  $("#fullresultsButton").click(function(){
    $("#positionMain").fadeOut();
    killTask();
  });
}

function writePercents(c,percents,lowestPercent){
  $("#resultsCCpercents").empty().append('<div id="allHitboxes" class="percent"><div id="allHitboxesTitle"><p>All Hitboxes</p></div><p id="allHitboxesPercent"><span id="allHitboxesPercentEdit"></span>%</p></div>');
  var keys = Object.keys(cl[c].curHitbox);
  // if no subattacks
  if (keys[0][0] == "i" && keys[0][1] == "d"){

    for (i=0;i<keys.length;i++){
      //applying seperators
      if (i != 0){
        $("#allHitboxes").append('<div class="idSeperator"></div>');
      }
      $("#allHitboxes").append('<div id="idContainerAI'+i+'" class="idContainer"><div class="idTitle"><p>id '+i+'</p></div><div class="idPercent"><p><span id="subattackAid'+i+'Percent">'+percents[i]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+cl[c].curHitbox[keys[i]].dmg+'<br>Angle: '+cl[c].curHitbox[keys[i]].angle+'<br>BKB: '+cl[c].curHitbox[keys[i]].bk+'<br>KBG: '+cl[c].curHitbox[keys[i]].kg+'<br>SKB: '+cl[c].curHitbox[keys[i]].wbk+'<br>Type: <span class="effectText">'+cl[c].curHitbox[keys[i]].effect+'</span><br></p></div></div>');

      // apply margin to center if not 4 ids
      $("#idContainerAI0").css("margin-left",(((4-keys.length)*50)+48)+"px");
    }
  }
  else {
    for (i=0;i<keys.length;i++){
      $("#resultsCCpercents").append('<div id="subattackHitboxes'+i+'" class="subattackHitboxes percent"><div class="subattackTitle"><p>'+keys[i]+'</p></div>');
      var keys2 = Object.keys(cl[c].curHitbox[keys[i]]);
      // for each id
      for (j=0;j<keys2.length;j++){
        //applying seperators
        if (j != 0){
          $("#subattackHitboxes"+i).append('<div class="idSeperator"></div>');
        }
        $("#subattackHitboxes"+i).append('<div id="idContainerS'+i+'I'+j+'" class="idContainer"><div class="idTitle"><p>id '+j+'</p></div><div class="idPercent"><p><span id="subattack'+i+'id'+j+'Percent">'+percents[i][j]+'</span>%</p></div><div class="idDetails"><p>Dmg: '+cl[c].curHitbox[keys[i]][keys2[j]].dmg+'<br>Angle: '+cl[c].curHitbox[keys[i]][keys2[j]].angle+'<br>BKB: '+cl[c].curHitbox[keys[i]][keys2[j]].bk+'<br>KBG: '+cl[c].curHitbox[keys[i]][keys2[j]].kg+'<br>SKB: '+cl[c].curHitbox[keys[i]][keys2[j]].wbk+'<br>Type: <span class="effectText">'+cl[c].curHitbox[keys[i]][keys2[j]].effect+'</span><br></p></div></div>');

        // apply margin to center if not 4 ids
        $("#idContainerS"+i+"I0").css("margin-left",((4-keys2.length)*50)+"px");
      }
    }
  }
  $("#allHitboxesPercentEdit").append(lowestPercent);

}

function createPercents(c,type){

  var keys = Object.keys(cl[c].curHitbox);
  // if no subattacks
  if (keys[0][0] == "i" && keys[0][1] == "d"){
    var percents = [];
    var pos;
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

      // check if lowest percent
      if (lowestPercent != "Never"){
        if (percents[i] == "Never"){
          lowestPercent = "Never";
          if (type == "kn"){
            cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]];
          }
          else if (type == "kp"){
            cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]];
          }
          else if (type == "kb"){
            cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]];
          }
        }
        else if (percents[i] != "Inf"){
          if (percents[i] < lowestPercent){
            lowestPercent = percents[i];
            if (type == "kn"){
              cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]];
            }
            else if (type == "kp"){
              cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]];
            }
            else if (type == "kb"){
              cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]];
            }
          }
        }
      }

    }
    // if lowest percent never changed, must be infinity
    if (lowestPercent == 123456){
      lowestPercent = "Inf";
      if (type == "kn"){
        cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]];
      }
      else if (type == "kp"){
        cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]];
      }
      else if (type == "kb"){
        cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]];
      }
    }
  }
  else {
    var percents = [];
    var lowestPercent = 123456;
    // for each sub attack
    for (i=0;i<keys.length;i++){
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


        // check if lowest percent
        if (lowestPercent != "Never"){
          if (percents[i][j] == "Never"){
            lowestPercent = "Never";
            if (type == "kn"){
              cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]][keys2[j]];
            }
            else if (type == "kp"){
              cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]][keys2[j]];
            }
            else if (type == "kb"){
              cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]][keys2[j]];
            }
          }
          else if (percents[i][j] != "Inf"){
            if (percents[i][j] < lowestPercent){
              lowestPercent = percents[i][j];
              if (type == "kn"){
                cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]][keys2[j]];
              }
              else if (type == "kp"){
                cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]][keys2[j]];
              }
              else if (type == "kb"){
                cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]][keys2[j]];
              }
            }
          }
        }

      }
    }
    // if lowest percent never changed, must be infinity
    if (lowestPercent == 123456){
      lowestPercent = "Inf";
      if (type == "kn"){
        cl[c].allHitboxes[0] = cl[c].curHitbox[keys[i]][keys2[j]];
      }
      else if (type == "kp"){
        cl[c].allHitboxes[1] = cl[c].curHitbox[keys[i]][keys2[j]];
      }
      else if (type == "kb"){
        cl[c].allHitboxes[2] = cl[c].curHitbox[keys[i]][keys2[j]];
      }
    }
  }


  return [percents,lowestPercent];
}

mouseX = 0;
mouseY = 0;

function trajectoryClick(){
  $("#trajectory-t").unbind("click");
  $("#trajectory-t").click(function(){
    var widthRatio = disWidth/dimensions[cl[c].stage][0];
    var heightRatio = disHeight/dimensions[cl[c].stage][1];

    cl[c].mouseXMelee = (Math.round(((mouseX/widthRatio)-(-bz[cl[c].stage][3]*5+25))*20))/100;
    cl[c].mouseYMelee = (Math.round(((mouseY/heightRatio)-(bz[cl[c].stage][0]*5+25))*-20))/100;
    cl[c].grounded = false;

    if (snapping){
        //will have to do some more maths for slanted surfaces like yoshis
        for (i=0;i<surfaces[cl[c].stage].length;i++){
          //if X position is in line with surface or within 10Mm on either side
          if (cl[c].mouseXMelee >= surfaces[cl[c].stage][i][0][0] - 10 && cl[c].mouseXMelee <= surfaces[cl[c].stage][i][1][0] + 10){

            //if Y is within 10Mm of surface on either side
            if (cl[c].mouseYMelee <= surfaces[cl[c].stage][i][0][1] + 10 && cl[c].mouseYMelee >= surfaces[cl[c].stage][i][0][1] - 10){
              //if X is just outside of the plat X plane, snap to the edge (left)
              if (cl[c].mouseXMelee >= surfaces[cl[c].stage][i][0][0] - 10 && cl[c].mouseXMelee < surfaces[cl[c].stage][i][0][0]){
                cl[c].mouseXMelee = surfaces[cl[c].stage][i][0][0];
              }
              //(right)
              if (cl[c].mouseXMelee <= surfaces[cl[c].stage][i][1][0] + 10 && cl[c].mouseXMelee > surfaces[cl[c].stage][i][1][0]){
                cl[c].mouseXMelee = surfaces[cl[c].stage][i][1][0];

              }

              //moving the Y position up or down for slanted parts of the stages
              if (i == 0 && cl[c].stage == "ys" && cl[c].mouseXMelee > 39.2){
                var angle = Math.atan(3.5/16.8);
                var x = cl[c].mouseXMelee - 39.2;
                cl[c].mouseYMelee = -x * Math.tan(angle);
              }
              else if (i == 0 && cl[c].stage == "ys" && cl[c].mouseXMelee < -39.2){
                var angle = Math.atan(3.5/16.8);
                var x = -cl[c].mouseXMelee - 39.2;
                cl[c].mouseYMelee = -x * Math.tan(angle);
              }
              else if (i == 0 && cl[c].stage == "fo" && cl[c].mouseXMelee > 51.261 && cl[c].mouseXMelee < 53.583){
                var angle = Math.atan(0.621/2.322);
                var x = cl[c].mouseXMelee - 51.261;
                cl[c].mouseYMelee = x * Math.tan(angle);
              }
              else if (i == 0 && cl[c].stage == "fo" && cl[c].mouseXMelee < -51.261 && cl[c].mouseXMelee > -53.583){
                var angle = Math.atan(0.621/2.322);
                var x = -cl[c].mouseXMelee - 51.261;
                cl[c].mouseYMelee = x * Math.tan(angle);
              }
              else if (i == 0 && cl[c].stage == "fo" && (cl[c].mouseXMelee >= 53.583 || cl[c].mouseXMelee <= -53.583)){
                cl[c].mouseYMelee = 0.62388
              }
              else {
                cl[c].mouseYMelee = surfaces[cl[c].stage][i][0][1];
              }
              cl[c].grounded = true;
            }
          }
        }
      }
      if (cl[c].grounded){
        $("#groundedBox").css("opacity",1);
        $("#attemptCCDisable").hide();
      }
      else {
        $("#groundedBox").css("opacity",0.2);
        $("#attemptCCDisable").show();
      }
      $("#mPosX").empty().append(cl[c].mouseXMelee);
      $("#mPosY").empty().append(cl[c].mouseYMelee);

      threeDICreateAndDraw();
  });
}

function threeDICreateAndDraw(){
  var percentsA1 = createPercents(c,"kn");
  var percentsA2 = createPercents(c,"kp");
  var percentsA3 = createPercents(c,"kb");

  $("#nodiresultedit").empty().append(percentsA1[1]);
  $("#maxdi1resultedit").empty().append(percentsA2[1]);
  $("#maxdi2resultedit").empty().append(percentsA3[1]);
  var pos1 = findKillPositions(cl[c].allHitboxes[0],c,"n");
  var pos2 = findKillPositions(cl[c].allHitboxes[1],c,"p");
  var pos3 = findKillPositions(cl[c].allHitboxes[2],c,"b");

  //drawTrajectorySuperLite(c,"#f13f3f");
  drawTrajectoryLite(c,"a",2,pos1);
  drawTrajectoryLite(c,"b",3,pos2);
  drawTrajectoryLite(c,"c",3,pos3);

}

function changeStage(id){
  $("#trajBackground").attr("src","assets/trajectory/stages/"+id+".png").attr("width",dimensions[id][0]).attr("height",dimensions[id][1]);
  /*bzTop = bz[id][0];
  bzRight = bz[id][1];
  bzBottom = bz[id][2];
  bzLeft = bz[id][3];
  $("#bzTopText").empty().append(bzTop);
  $("#bzBottomText").empty().append(bzBottom);
  $("#bzRightText").empty().append(bzRight);
  $("#bzLeftText").empty().append(bzLeft);*/

  cl[c].stage = id;

  disWidth = dimensions[id][0];
  disHeight = dimensions[id][1];
  ratio = disWidth/disHeight;
  centreOffset = [-bz[id][3]*5+25,bz[id][0]*5+25];

  //viewBox attribute is weird and had to use vanilla javascript and also avoid changing the di selector svg elements
  var svg = document.getElementsByTagName("svg")[0];
  var svg2 = document.getElementsByTagName("svg")[1];

  $("#trajectory, #trajectory-t").attr("width",disWidth).attr("height",disHeight).attr("enable-background","new 0 0 "+disWidth+" "+disHeight);
  svg.setAttribute("viewBox","0 0 "+disWidth+" "+disHeight);
  svg2.setAttribute("viewBox","0 0 "+disWidth+" "+disHeight);
  $("#trajBackground").css({"width":disWidth+"px","height":disHeight+"px"});

  threeDICreateAndDraw();


  //resizing();
}

function SVG(tag)
{
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function drawTrajectorySuperLite(c,colour){
  xPos = cl[c].mouseXMelee;
  yPos = cl[c].mouseYMelee;
  var temX = ((xPos*5)+centreOffset[0]);
  var temY = ((-yPos*5)+centreOffset[1]);
  $(".start").remove();
  $(SVG("path")).attr("id","start"+c).attr("class","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",colour).attr("stroke",colour).prependTo("#trajectory");
}

function drawTrajectoryLite(c,n,pal,pos){

	//cl[n].curPositions = positions;

  var hitstun = cl[c].hitstun;
  var xPos = cl[c].mouseXMelee;
  var yPos = cl[c].mouseYMelee;

	var cla = "tLineS";
  var temX = ((xPos*5)+centreOffset[0]);
  var temY = ((-yPos*5)+centreOffset[1]);
  var lineText = "M"+temX+" "+temY+" ";

  $("#trajGroup"+c+n+", #trajGroup-t"+c+n).remove();
  $(SVG("g")).attr("id","trajGroup"+c+n).appendTo("#trajectory");
  $(SVG("g")).attr("id","trajGroup-t"+c+n).appendTo("#trajectory-t");
  $(SVG("path")).attr("id","start"+c+n).attr("class","start").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").attr("fill",palettes[pal][1]).attr("stroke",palettes[pal][1]).prependTo("#trajGroup"+c+n);
  $(SVG("path")).attr("id","start-t"+c+n).attr("class","start-t").attr("d","M"+temX+" "+(temY-25)+" L"+(temX+25)+" "+(temY+25)+" L"+(temX-25)+" "+(temY+25)+" Z").prependTo("#trajGroup-t"+c+n);

  //var isKilled = false;
  //var i = 0;
  //var positions = pos;
  for (i=0;i<pos.length;i++){
    //prompt(i);
    //prompt(positions[0][0]);
  	var x = pos[i][0];
  	var y = pos[i][1];
    var tempText = "L"+((x*5)+centreOffset[0])+" "+((-y*5)+centreOffset[1])+" ";
    lineText += tempText;
  	if ((x < bz[cl[c].stage][1] && x > bz[cl[c].stage][3]) && (y < bz[cl[c].stage][0] && y > bz[cl[c].stage][2])){
      if (i+1 == hitstun){
        var temX = ((x*5)+centreOffset[0]);
        var temY = ((-y*5)+centreOffset[1]);
        $(SVG("path")).attr("id","lastHitstun"+c+n).attr("class","lastHitstun").attr("d","M"+temX+" "+(temY-40)+" L"+(temX+40)+" "+temY+" L"+temX+" "+(temY+40)+" L"+(temX-40)+" "+temY+" Z").attr("fill",palettes[pal][0]).attr("stroke",palettes[pal][0]).prependTo("#trajGroup"+c+n);
        $(SVG("path")).attr("id","lastHitstun-t"+c+n).attr("class","lastHitstun-t pos"+i).attr("d","M"+temX+" "+(temY-40)+" L"+(temX+40)+" "+temY+" L"+temX+" "+(temY+40)+" L"+(temX-40)+" "+temY+" Z").prependTo("#trajGroup-t"+c+n);
      }
      else {
        $(SVG("circle")).attr("id",c+n+"f"+(i+1)).attr("class","fP"+c+n+" framePos").attr("cx", (x*5)+centreOffset[0]).attr("cy",(-y*5)+centreOffset[1]).attr("r", 15).attr("fill",palettes[pal][0]).attr("stroke",palettes[pal][0]).prependTo("#trajGroup"+c+n);
        $(SVG("circle")).attr("id",c+n+"f"+(i+1)+"-t").attr("class","fP-t"+c+n+" framePos-t").attr("cx", (x*5)+centreOffset[0]).attr("cy",(-y*5)+centreOffset[1]).attr("r", 15).prependTo("#trajGroup-t"+c+n);
        if (i+1 > hitstun){
          $("#"+c+n+"f"+(i+1)).attr("class","fPnH"+c+n+" framePos").attr("fill",palettes[pal][1]).attr("stroke",palettes[pal][1]);
        }
      }
  	}
  	else {
        temX = ((x*5)+centreOffset[0]);
        temY = ((-y*5)+centreOffset[1]);
        $(SVG("path")).attr("id","kill"+c+n).attr("class","kill").attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").attr("fill",palettes[pal][2]).attr("stroke",palettes[pal][2]).appendTo("#trajGroup"+c+n);
        $(SVG("path")).attr("id","kill-t"+c+n).attr("class","kill-t pos"+i).attr("d","M"+temX+" "+(temY+15)+" L"+(temX+42)+" "+(temY+57)+" L"+(temX+57)+" "+(temY+42)+" L"+(temX+15)+" "+temY+" L"+(temX+57)+" "+(temY-42)+" L"+(temX+42)+" "+(temY-57)+" L"+temX+" "+(temY-15)+" L"+(temX-42)+" "+(temY-57)+" L"+(temX-57)+" "+(temY-42)+" L"+(temX-15)+" "+temY+" L"+(temX-57)+" "+(temY+42)+" L"+(temX-42)+" "+(temY+57)+" Z").appendTo("#trajGroup-t"+c+n);
        cla = "tLineK";
        isKilled = true;
    }

    //i++;
  }
  //$("#trajLine"+n).remove();
  $(SVG("path")).attr("id","trajLine"+c+n).attr("class","trajLine "+cla+c+n).attr("d",lineText).prependTo("#trajGroup"+c+n);
  if (cla == "tLineS"){
    $("#trajLine"+c+n).attr("stroke",palettes[pal][1]);
  }
  else {
    $("#trajLine"+c+n).attr("stroke",palettes[pal][0]);
  }
}

function getScrollPos() {
  if ($("#positionDisplay").length > 0){
    sT = $("#positionDisplay").scrollTop();
    sL = $("#positionDisplay").scrollLeft();

    return[sT,sL];
  }
  else {
    return[0,0];
  }
}

$(document).ready(function(){
	$('#characterContainer').perfectScrollbar();
	$('#victimContainer').perfectScrollbar();
  $('#resultsContainer').perfectScrollbar();
  $('#positionDisplay').perfectScrollbar();
  crouchCancelClick();
  killClick();
  trajOffset = $("#positionDisplay").offset();



  $(document).on('mousemove', function(e){
    scroll = getScrollPos();
    //console.log(scroll);
    mouseX = e.pageX - trajOffset.left + scroll[1];
    mouseY = e.pageY - trajOffset.top + scroll[0];
  });
});
