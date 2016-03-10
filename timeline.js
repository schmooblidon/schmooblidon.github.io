  controllertext = '<img id="i-lb" src="assets/condisplay/lbutton.png"><img id="i-rb" src="assets/condisplay/rbutton.png"><img id="i-ll" src="assets/condisplay/ltext.png"><img id="i-rr" src="assets/condisplay/rtext.png"><img id="i-zb" src="assets/condisplay/zbutton.png"><img id="i-zz" src="assets/condisplay/ztext.png"><img id="base" src="assets/condisplay/base.png"><img id="i-aa" src="assets/condisplay/a.png"><img id="i-bb" src="assets/condisplay/b.png"><img id="i-xx" src="assets/condisplay/x.png"><img id="i-yy" src="assets/condisplay/y.png"><img id="i-ss" src="assets/condisplay/start.png"><img id="i-du" class="dpad" src="assets/condisplay/dpup.png"><img id="i-dr" class="dpad" src="assets/condisplay/dpright.png"><img id="i-dd" class="dpad" src="assets/condisplay/dpdown.png"><img id="i-dl" class="dpad" src="assets/condisplay/dpleft.png"><img id="i-cs" src="assets/condisplay/cstick.png"><img id="i-ls" src="assets/condisplay/lstick.png">';
playing = false;
timelines = {};
game = "";
name = "";
char = "";
chars = [];
charid = [];
noofbuttons = 0;
noofframes = 0;
buttons = [];
speed = 1;
loop = true;
lsticknum = 0;
csticknum = 0;
inuse = [];
inuse[0] = ["ls", 0];
inuse[1] = ["cs", 0];
inuse[2] = ["aa", 0];
inuse[3] = ["bb", 0];
inuse[4] = ["xx", 0];
inuse[5] = ["yy", 0];
inuse[6] = ["ss", 0];
inuse[7] = ["zz", 0];
inuse[8] = ["ll", 0];
inuse[9] = ["rr", 0];
inuse[10] = ["du", 0];
inuse[11] = ["dr", 0];
inuse[12] = ["dd", 0];
inuse[13] = ["dl", 0];
sounds = [23,23,23,23,23,23,23,23,23,23,23,23,23,23];

timelinesounds = [];

soundfiles = [];
soundfiles[0] = "land";
soundfiles[1] = "tech";
soundfiles[2] = "roll";
soundfiles[3] = "clank";
soundfiles[4] = "powershield";
soundfiles[5] = "laser";
soundfiles[6] = "fireball";
soundfiles[7] = "foxshine";
soundfiles[8] = "foxshinereflect";
soundfiles[9] = "falcoshine";
soundfiles[10] = "falcoshinereflect";
soundfiles[11] = "sheiktu";
soundfiles[12] = "marthgrabledge";
soundfiles[13] = "peachjump";
soundfiles[14] = "peachturnippull";
soundfiles[15] = "falcondodge";
soundfiles[16] = "falconraptor";
soundfiles[17] = "doctornado";
soundfiles[18] = "docpillbounce";
soundfiles[19] = "docjump";
soundfiles[20] = "yoshiegg";
soundfiles[21] = "dkcharge";
soundfiles[22] = "mrgandwmove";

framescript = "1003sd1222222122bb1222220122xy0000122222";

var tframeclickstates = function(){
  $("#timelinebigcontainer").on('click','.tframe',function() {

    var $t = $(this);
    if (!$t.hasClass("stickf")){
      var id = $t.attr("id");
      if (id[2] === "f"){
        var but = parseInt(id.substr(1,1));
        if (id.length === 4){
          var frame = parseInt(id.substr(3,1));
        }
        else {
          var frame = parseInt(id.substr(3,2));
        }
      }
      else {
        but = parseInt(id.substr(1,2));
        if (id.length === 5){
          var frame = parseInt(id.substr(4,1));
        }
        else {
          var frame = parseInt(id.substr(4,2));
        }
      }

      if ($t.hasClass("type0")){
        $t.removeClass("type0");
        $t.addClass("type1");
        timelines["tl"+but][frame-1] = 1;
      }
      else if ($t.hasClass("type1")){
        $t.removeClass("type1");
        $t.addClass("type2");
        timelines["tl"+but][frame-1] = 2;
      }
      else if ($t.hasClass("type2")){
        $t.removeClass("type2");
        $t.addClass("type0");
        timelines["tl"+but][frame-1] = 0;
      }
    }
  });
}

var updatetimeline = function(ug,uc,un,unb,unf){

  if (ug !== game){
    $("#tlgame").attr("src","assets/gameicon/"+ug+".png")
  }
  game = ug;
  if (uc !== char){
    for (i=1;i<=charid.length;i++){
      if (charid[i-1] === uc){
        var dimensions = (i-1)*(-26);
        $("#tlchar").css("background","url(assets/stockicons/melee.png) "+dimensions+"px 0")
      }
    }
  }
  char = uc;
  if (un !== name){
    $("#tlname").empty().append(un);
  }
  name = un;
  if (unb !== noofbuttons){
    $("#tline").height((72*(unb+1)));
    if (unb < noofbuttons){
      var tempinuse = [];
      var j = 0;
      for (i=0;i<=13;i++){
        if (inuse[i][1]){
          tempinuse[j] = [inuse[i][0],inuse[i][1],i];
          j++;
        }
      }
      for (i=1;i<=noofbuttons-unb;i++){
        for (j=1;j<=tempinuse.length;j++){
          if ($("#tl"+(noofbuttons+1-i)).children(".tkey").hasClass(tempinuse[j-1][0])){
            inuse[tempinuse[j-1][2]][1] = 0;
          }
        }
        $("#tl"+(noofbuttons+1-i)).remove();
        $("#tlextra"+(noofbuttons+1-i)).remove();
      }
    }
    else {
      for (i=1;i<=unb-noofbuttons;i++){
        if (buttons[(noofbuttons-2+i)] === "ls" || buttons[(noofbuttons-2+i)] === "cs"){
          $("#tlextra"+(noofbuttons-1+i)).after('<div class="timeline" id="tl'+(noofbuttons+i)+'"><div class="tkey"></div></div>');
        }
        else {
          $("#tl"+(noofbuttons-1+i)).after('<div class="timeline" id="tl'+(noofbuttons+i)+'"><div class="tkey"></div></div>');
        }
        for (j=1;j<=noofframes;j++){
          $("#tl"+(noofbuttons+i)).append('<div class="tframe type0" id="b'+(noofbuttons+i)+'f'+j+'"></div>');
          timelines["tl"+(noofbuttons+i)] = [];
          timelines["tl"+(noofbuttons+i)][j-1] = 0;

          timelinesounds[noofbuttons+i-1] = [];
          timelinesounds[noofbuttons+i-1][j-1] = new Audio("assets/sounds/"+soundfiles[sounds[noofbuttons+i-1]-1]+".wav");
        }
      }
    }
    noofbuttons = unb;
  }

  if (unf !== noofframes){
    if (unf < noofframes){

      for(j=1;j<=noofframes-unf;j++){
        for (i=1;i<=noofbuttons;i++){
          $("#b"+i+"f"+(noofframes+1-j)).remove();
          $("#tlextra"+i).children("#tlextraf"+(noofframes+1-j)).remove();
        }
        $("#num"+(noofframes+1-j)).remove();
      }

    }
    else {

      for(j=1;j<=unf-noofframes;j++){
        for (i=1;i<=noofbuttons;i++){
          $("#tl"+i).append('<div class="tframe type0" id="b'+i+'f'+(noofframes+j)+'"></div>');
          if (buttons[i-1] === "ls" || buttons[i-1] === "cs"){
            $("#tl"+i).children(".tframe").removeClass("type0 type1").addClass("type2 stickf").css("background-image","url(assets/buttons/"+buttons[i-1]+"frame.png)");
            $("#tl"+i).children("#b"+i+"f"+(noofframes+j)).append('<div class="'+buttons[i-1]+'tickf analog" id="'+buttons[i-1]+'tickf'+(noofframes+j)+'"></div>');
            $("#tlextra"+i).append('<div class="tlexf" id="tlextraf'+(noofframes+j)+'"><div class="stickexcontrol stickprevious" id="'+buttons[i-1]+'tickpf'+(noofframes+j)+'"></div><div class="stickexcontrol stickreset" id="'+buttons[i-1]+'tickrf'+(noofframes+j)+'"></div><div class="stickexcontrol sticknext" id="'+buttons[i-1]+'ticknf'+(noofframes+j)+'"></div></div>');
            if (buttons[i-1] === "ls"){
              timelines["tl"+i][(noofframes+j)-1] = [15,15];
              dragstick("l");
            }
            else {
              timelines["tl"+i][(noofframes+j)-1] = [20,20];
              dragstick("c");
            }

          }
          else {
            timelines["tl"+i][(noofframes+j)-1] = 0;
          }
          timelinesounds[i-1][(noofframes+j)-1] = new Audio("assets/sounds/"+soundfiles[sounds[i-1]]+".wav");
        }
        $("#playline").append('<div class="tnum" id="num'+(noofframes+j)+'"><p>'+(noofframes+j)+'</p></div>');
      }
    }
    noofframes = unf;
    $("#timelinebigcontainer").width(105+(72*noofframes));
    $("#timelinescontainer").width(102+(72*noofframes));

  }
  resizing();

}


var createnewtimeline = function(ngame,nchar,nname,nnoofbuttons,nnoofframes){
  game = ngame;
  char = nchar;
  name = nname;
  noofbuttons = nnoofbuttons;
  noofframes = nnoofframes;

  $(".editbutton").remove();
  $("#maincontrols").append('<div id="updatebutton" class="editbutton"><p>Update</p></div>');
  $("#maincontrols").after('<div id="timelinetitle"><img id="tlgame" src="assets/gameicon/'+game+'.png"><div id="tltext"><div id="tlchar"></div><span id="tlname">'+name+'</span></div></div>');

  for (i=1;i<=charid.length;i++){
    if (charid[i-1] === char){
      var dimensions = (i-1)*(-26);
      $("#tlchar").css("background","url(assets/stockicons/melee.png) "+dimensions+"px 0")
    }
  }
  $(".editbutton").hover(function(){
    $(this).toggleClass("editbuthighlight");
  });
  $("#updatebutton").click(function(){
    editbutton("update");
  });

  for (i=1;i<=noofbuttons;i++){
    timelines["tl"+i] = [];
    buttons[i-1] = "0";
    timelinesounds[i-1] = [];
    for (j=1;j<=noofframes;j++){
      timelines["tl"+i][j-1] = 0;
      timelinesounds[i-1][j-1] = new Audio("assets/sounds/mrgandwmove.wav");
    }
  }

  $("#timelinebigcontainer").width(110+(72*noofframes)).append('<div id="controllerdisplay">'+controllertext+'</div><div id="scrollbox"><div id="tline" style="height:'+(72*(noofbuttons+1))+'px"></div><div id="timelinescontainer"></div></div>');

  for (i=1;i<=noofbuttons;i++){
    $("#timelinescontainer").append('<div class="timeline" id="tl'+i+'"><div class="tkeycontainer"><div class="tkey"></div><div class="tsound"><div class="tsoundicon"></div><p class="soundtext"></p></div></div></div>');

    for (j=1;j<=noofframes;j++){
      $("#tl"+i).append('<div class="tframe type0" id="b'+i+'f'+j+'"></div>');
    }
  }

  $("#timelinescontainer").width(106+(72*noofframes)).append('<div class="timeline" id="playline"><div id="playkey" class="playmode"></div></div><div class="timeline" id="extracontrols"><div id="playcontrols"><div id="speed1" class="playbutton playbuttonhighlight2"><p>1x</p></div><div id="speed05" class="playbutton"><p>0.5</p></div><div id="speed025" class="playbutton"><p>0.25</p></div><div id="loop" class="playbutton" style="background-image:url(assets/buttons/loop.png)"></div></div></div>');
  for (j=1;j<=noofframes;j++){
      $("#playline").append('<div class="tnum" id="num'+j+'"><p>'+j+'</p></div>');
  }
  resizing();
  tframeclickstates();

}

var editbutton = function(type){
  var allgood = 1;
  var ngame = $("#gamedrop").val();
  if (ngame === "0"){
    allgood = 0;
  }
  var nchar = $("#chardrop").val();

  var nname = $("#namedrop").val();
  if (nname === ""){
    allgood = 0;
  }
  var nnoofbuttons = parseInt($("#buttonsdrop").val());
  if (nnoofbuttons === 0){
    allgood = 0;
  }
  var nnoofframes = parseInt($("#framesdrop").val());
  if (nnoofframes === 0){
    allgood = 0;
  }
  $("form").removeClass("error");
  if (allgood && type === "create"){
    createnewtimeline(ngame,nchar,nname,nnoofbuttons,nnoofframes);
  }
  else if (allgood && type === "update"){
    //updatetimeline(ngame,nchar,nname,nnoofbuttons,nnoofframes);
  }
  else {
    for (i=1;i<5;i++){
      if ($("#drop"+i).children("select").val() === "0" || $("#drop"+i).children("input").val() === "" ){
        $("#drop"+i).addClass("error");
      }
    }
  }
}

var buildtimeline = function(framescript){

  tlflength = parseInt(framescript.substr(0,2));
  noofbuttons = parseInt(framescript.substr(2,2));

  for (i=1;i<=noofbuttons;i++){
    timelines["tl"+i] = [];
    buttons[i-1] = framescript.substr(4+((i-1)*(tlflength+2)),2);
    for (j=1;j<=tlflength;j++){
      timelines["tl"+i][j-1] = parseInt(framescript.substr(5+j+((i-1)*(tlflength+2)),1));
    }
  }

  $("#timelinebigcontainer").width(105+(72*tlflength)).append('<div id="tline" style="height:'+(72*(noofbuttons+1))+'px"></div><div id="timelinescontainer"></div>');

  for (i=1;i<=noofbuttons;i++){
    $("#timelinescontainer").append('<div class="timeline" id="tl'+i+'"><div class="tkey" style="background-image:url(assets/buttons/'+buttons[i-1]+'.png)"></div></div>');

    for (j=1;j<=tlflength;j++){
      $("#tl"+i).append('<div class="tframe type'+timelines["tl"+i][j-1]+'"></div>');
    }
  }

  $("#timelinescontainer").width(102+(72*tlflength)).append('<div class="timeline" id="playline"><div id="playkey" class="playmode"></div></div>');
  for (j=1;j<=tlflength;j++){
      $("#playline").append('<div class="tnum"><p>'+j+'</p></div>');
  }
  }

var playtimeline = function(){
  var $tl = $("#tline");
  $tl.css("left","103px");
  if (playing){
    $tl.animate({left : 103+(noofframes * 72)},16*noofframes*speed, "linear",function() {
        if (loop){
          setTimeout(function(){playtimeline();},1000);
        }
        else {
          $tl.css("left","103px");
          $("#playkey").removeClass("pausemode").addClass("playmode");
        }
      }
    );
    (function buttondisplay (j) {
      setTimeout(function () {
        for (i=1;i<=noofbuttons;i++){
          if (buttons[i-1] === "ls"){
            $("#i-ls").css({"top": 252 - 30 + (2 * timelines["tl"+i][noofframes-j][0]), "left": 96 - 30 + (2 * timelines["tl"+i][noofframes-j][1])});
          }
          else if (buttons[i-1] === "cs"){
            $("#i-cs").css({"top": 416 - 30 + (1.5 * timelines["tl"+i][noofframes-j][0]), "left": 442 - 30 + (1.5 * timelines["tl"+i][noofframes-j][1])});
          }
          else if (timelines["tl"+i][noofframes-j]){
            $("#i-"+buttons[i-1]).fadeTo(1,1);
            $("#debug").empty().append(noofframes-j);
            timelinesounds[i-1][noofframes-j].play();
            if (buttons[i-1] === "ll"){
              $("#i-lb").css("top","123px");
            }
            else if (buttons[i-1] === "rr"){
              $("#i-rb").css("top","123px");
            }
            else if (buttons[i-1] === "zz"){
              $("#i-zb").css("top","133px");
            }
          }
          else {
            $("#i-"+buttons[i-1]).fadeTo(1,0.35);
            if (buttons[i-1] === "ll"){
              $("#i-lb").css("top","108px");
            }
            else if (buttons[i-1] === "rr"){
              $("#i-rb").css("top","108px");
            }
            else if (buttons[i-1] === "zz"){
              $("#i-zb").css("top","123px");
            }
          }
        }
        if (--j) buttondisplay(j);
      }, 16*speed)
    })(noofframes);
  }
}

var dragstick = function(type){
  $("."+type+"stickf").draggable({ stop: function(){
    var frame = $(this).attr("id");
    frame = parseInt(frame.substr(7,2));
    var but = $(this).closest(".timeline").attr("id");
    but = parseInt(but.substr(2,2));
    var dimensions = $(this).position();
    timelines["tl"+but][frame-1] = [dimensions.top, dimensions.left];
  } , containment: "parent", scroll: false });
}

$(document).ready(function(){

  $("#gamedrop").change(function() {
    var id = $(this).val();
    $("#chardrop").empty()
    if (id === "0"){
      var text = '<option value="0" selected>-</option>';
    }
    else {
      if (id === "me"){
        chars = ["Bowser","C.Falcon","DK","Doc","Falco","Fox","Ganon","ICs","Jiggs","Kirby","Link","Luigi","Mario","Marth","Mewtwo","Mr.G&W","Ness","Peach","Pichu","Pikachu","Roy","Samus","Sheik","Yoshi","Y.Link","Zelda"];
        charid = ["mbw","mcf","mdk","mdo","mfa","mfo","mga","mic","mji","mki","mli","mlg","mmo","mmh","mmw","mgw","mne","mpe","mpc","mpk","mry","msa","msh","myo","myl","mze"];
      }
      else if (id === "br"){
        chars = ["Bowser","C.Falcon","Charizard","Dedede","Diddy","DK","Falco","Fox","Ganon","ICs","Ike","Ivysaur","Jiggs","Kirby","Link","Lucario","Lucas","Luigi","Mario","Marth","Metaknight","Mr.G&W","Ness","Olimar","Peach","Pikachu","Pit","ROB","Samus","Sheik","Snake","Sonic","Squirtle","Toon Link","Wario","Wolf","Yoshi","Zelda","ZSS"];
        charid = ["bbw","bcf","bch","bdd","bdi","bdk","bfa","bfo","bga","bic","bik","biv","bji","bki","bli","blo","bls","blg","bmo","bmh","bmk","bgw","bne","bol","bpe","bpk","bpt","brb","bsa","bsh","bsn","bso","bsq","btl","bwa","bwo","byo","bze","bzs"];

      }
      else if (id === "pm"){
        chars = ["Bowser","C.Falcon","Charizard","Dedede","Diddy","DK","Falco","Fox","Ganon","ICs","Ike","Ivysaur","Jiggs","Kirby","Link","Lucario","Lucas","Luigi","Mario","Marth","Metaknight","Mewtwo","Mr.G&W","Ness","Olimar","Peach","Pikachu","Pit","ROB","Roy","Samus","Sheik","Snake","Sonic","Squirtle","Toon Link","Wario","Wolf","Yoshi","Zelda","ZSS"];
        charid = ["pbw","pcf","pch","pdd","pdi","pdk","pfa","pfo","pga","pic","pik","piv","pji","pki","pli","plo","pls","plg","pmo","pmh","pmk","pgw","pne","pol","ppe","ppk","ppt","prb","psa","psh","psn","pso","psq","ptl","pwa","pwo","pyo","pze","pzs"];
      }
      else if (id === "s4"){
        chars = ["Bowser","Bowser Jr","C.Falcon","Charizard","Dark Pit","Dedede","Diddy","DK","Doc","Duck Hunt","Falco","Fox","Ganon","Greninja","Ike","Jiggs","Kirby","Link","Little Mac","Lucario","Lucas","Lucina","Luigi","Mario","Marth","Megaman","Metaknight","Mewtwo","Mii","Mr.G&W","Ness","Olimar","Pacman","Palutena","Peach","Pikachu","Pit","ROB","Robin","Rosalina","Roy","Ryu","Samus","Sheik","Shulk","Sonic","Toon Link","Villager","Wario","Wii Fit","Yoshi","Zelda","ZSS"];
        charid = ["4bw","4bj","4cf","4ch","4dp","4dd","4di","4dk","4do","4dh","4fa","4fo","4ga","4gr","4ik","4ji","4ki","4li","4lm","4lo","4ls","4la","4lg","4mo","4mh","4mm","4mk","4mw","4mi","4gw","4ne","4ol","4pc","4pa","4pe","4pk","4pt","4rb","4rn","4rs","4ry","4ru","4sa","4sh","4su","4so","4tl","4vi","4wa","4wi","4yo","4ze","4zs"];
      }
      var text = '<option value="all" selected>All</option>';
      for (i=1;i<=chars.length;i++){
        text = text + '<option value="'+charid[i-1]+'">'+chars[i-1]+'</option>';
      }
    }
    $("#chardrop").append(text);
  });

  $(".editbutton").hover(function(){
    $(this).toggleClass("editbuthighlight");
  });

  $("#createbutton").click(function(){
    editbutton("create");
  });


  $("#timelinebigcontainer").on({
    mouseenter: function () {
        if ($(this).hasClass("stickf")){
          $(this).children(".analog").addClass("stickfhighlight");
        }
        else {
          $(this).append("<div class='tframehighlight'></div>");
        }
    },
    mouseleave: function () {
      if ($(this).hasClass("stickf")){
        $(this).children(".analog").removeClass("stickfhighlight");
      }
      else {
        $(this).empty();
      }
    }
  }, ".tframe");

  $("#timelinebigcontainer").on('click','.tkey',function() {
    if ($(this).hasClass("dropdowned")){
      $(this).removeClass("dropdowned");
      $("#buttondropdown").remove();
    }
    else {
      $(".tkey").removeClass("dropdowned");
      $("#buttondropdown").remove();
      $(this).append('<div id="buttondropdown"><div class="buttonselect" id="ls" style="background-image:url(assets/buttons/ls.png)"></div><div class="buttonselect" id="cs" style="background-image:url(assets/buttons/cs.png)"></div><div class="buttonselect" id="aa" style="background-image:url(assets/buttons/aa.png)"></div><div class="buttonselect" id="bb" style="background-image:url(assets/buttons/bb.png)"></div><div class="buttonselect" id="xx" style="background-image:url(assets/buttons/xx.png)"></div><div class="buttonselect" id="yy" style="background-image:url(assets/buttons/yy.png)"></div><div class="buttonselect" id="ss" style="background-image:url(assets/buttons/ss.png)"></div><div class="buttonselect" id="zz" style="background-image:url(assets/buttons/zz.png)"></div><div class="buttonselect" id="ll" style="background-image:url(assets/buttons/ll.png)"></div><div class="buttonselect" id="rr" style="background-image:url(assets/buttons/rr.png)"></div><div class="buttonselect" id="du" style="background-image:url(assets/buttons/du.png)"></div><div class="buttonselect" id="dr" style="background-image:url(assets/buttons/dr.png)"></div><div class="buttonselect" id="dd" style="background-image:url(assets/buttons/dd.png)"></div><div class="buttonselect" id="dl" style="background-image:url(assets/buttons/dl.png)"></div>');
      for (i=0;i<=13;i++){
        if (inuse[i][1]){
          $("#"+inuse[i][0]).addClass("greyedout");
        }
      }
      $(this).addClass("dropdowned");
    }
  });

  $("#timelinebigcontainer").on('click','.tsound',function() {
    if ($(this).hasClass("dropdowned")){
      $(this).removeClass("dropdowned");
      $("#sounddropdown").remove();
    }
    else {
      $(".tsound").removeClass("dropdowned");
      $("#sounddropdown").remove();
      $(this).append('<div id="sounddropdown"><div class="soundselect" id="s1"><p style="line-height:1">Land</p></div><div class="soundselect" id="s2" style="line-height:1"><p>Tech</p></div><div class="soundselect" id="s3" style="line-height:1"><p>Roll</p></div><div class="soundselect" id="s4" style="line-height:1"><p>Clank</p></div><div class="soundselect" id="s5" style="line-height:1"><p>Powershield</p></div><div class="soundselect" id="s6" style="line-height:1"><p>Laser</p></div><div class="soundselect" id="s7" style="line-height:1"><p>Fireball</p></div><div class="soundselect" id="s8" style="line-height:1"><p>Fox Shine</p></div><div class="soundselect" id="s9" style="line-height:1"><p>Fox Shine Reflect</p></div><div class="soundselect" id="s10" style="line-height:1"><p>Falco Shine</p></div><div class="soundselect" id="s11" style="line-height:1"><p>Falco Shine Reflect</p></div><div class="soundselect" id="s12" style="line-height:1"><p>Sheik Tu</p></div><div class="soundselect" id="s13" style="line-height:1"><p>Marth Grab Ledge</p></div><div class="soundselect" id="s14" style="line-height:1"><p>Peach Jump</p></div><div class="soundselect" id="s15" style="line-height:1"><p>Peach Turnip Pull</p></div><div class="soundselect" id="s16" style="line-height:1"><p>Falcon Dodge</p></div><div class="soundselect" id="s17" style="line-height:1"><p>Falcon Raptor</p></div><div class="soundselect" id="s18" style="line-height:1"><p>Doc Tornado</p></div><div class="soundselect" id="s19" style="line-height:1"><p>Doc Pill Bounce</p></div><div class="soundselect" id="s20" style="line-height:1"><p>Doc Jump</p></div><div class="soundselect" id="s21" style="line-height:1"><p>Yoshi Egg</p></div><div class="soundselect" id="s22" style="line-height:1"><p>DK Charge</p></div><div class="soundselect" id="s23" style="line-height:1"><p>Mr GandW Move</p></div></div>');
      $(this).addClass("dropdowned");
    }
  });

  $("#timelinebigcontainer").on({
    mouseenter: function () {
      if (!($(this).hasClass("greyedout"))){
        $(this).addClass("buttonselecthighlight");
      }
    },
    mouseleave: function () {
      if (!($(this).hasClass("greyedout"))){
        $(this).removeClass("buttonselecthighlight");
      }
    }
  }, ".buttonselect");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
      $(this).addClass("soundselecthighlight");
    },
    mouseleave: function () {
      $(this).removeClass("soundselecthighlight");
    }
  }, ".soundselect");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("tkeyhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("tkeyhighlight");
    }
  }, ".tkey");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("tsoundhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("tsoundhighlight");
    }
  }, ".tsound");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("playkeyhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("playkeyhighlight");
    }
  }, "#playkey");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("playbuttonhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("playbuttonhighlight");
    }
  }, ".playbutton");

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("stickexcontrolhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("stickexcontrolhighlight");
    }
  }, ".stickexcontrol");


  $("#timelinebigcontainer").on('click','.buttonselect',function() {

    if (!($(this).hasClass("greyedout"))){
      for (i=0;i<=13;i++){
        if ($(this).closest(".tkey").hasClass(inuse[i][0])){
          inuse[i][1] = 0;
        }
      }
      var num = $(this).closest(".timeline").attr("id");
      if (num.length === 4){
        num = parseInt(num.substr(2,2));
      }
      else {
        num = parseInt(num.substr(2,1));
      }

      if ($(this).closest(".tkey").hasClass("ls") || $(this).closest(".tkey").hasClass("cs")){
        for (i=1;i<=noofframes;i++){
          timelines["tl"+num][i-1] = 0;
        }
        $(this).closest(".timeline").children(".tframe").removeClass("type1 type2 stickf").addClass("type0").empty().css("background-image","none");
        if ($(this).closest(".tkey").hasClass("ls")){
          $("#i-ls").css({"top":252,"left":96});
          $("#tlextra"+lsticknum).remove();
        }
        else {
          $("#i-cs").css({"top":416,"left":442});
          $("#tlextra"+csticknum).remove();
        }
      }

      $(this).closest(".tkey").removeClass("aa bb ss xx yy ls cs zz ll rr");
      var but = $(this).attr("id");
      buttons[num-1] = but;
      for (i=0;i<=13;i++){
        if (inuse[i][0] === but){
          inuse[i][1] = 1;
        }
      }
      $(this).closest(".tkey").addClass(but).css("background-image","url(assets/buttons/"+but+".png)");

      if (but === "ls" || but === "cs"){
        $("#tl"+num).children(".tframe").removeClass("type0 type1").addClass("type2 stickf").css("background-image","url(assets/buttons/"+but+"frame.png)");
        if (but === "ls"){
          lsticknum = num;
        }
        else {
          csticknum = num;
        }
        for (i=1;i<=noofframes;i++){
          if (but === "ls"){
            timelines["tl"+num][i-1] = [15,15];
          }
          else {
            timelines["tl"+num][i-1] = [20,20];
          }
          $("#tl"+num).children("#b"+num+"f"+i).append('<div class="'+but+'tickf analog" id="'+but+'tickf'+i+'"></div>');
        }
        $("#tl"+num).after('<div class="tlex" id="tlextra'+num+'"></div>');
        $("#tlextra"+num).append('<div class="tlexkey"></div>');
        for (i=1;i<=noofframes;i++){
          $("#tlextra"+num).append('<div class="tlexf" id="tlextraf'+i+'"><div class="stickexcontrol stickprevious" id="'+but+'tickpf'+i+'"></div><div class="stickexcontrol stickreset" id="'+but+'tickrf'+i+'"></div><div class="stickexcontrol sticknext" id="'+but+'ticknf'+i+'"></div></div>');
        }
        dragstick(but[0]);
      }
    }
    $(".tkey").removeClass("tkeyhighlight");

  });

  $("#timelinebigcontainer").on('click','.soundselect',function() {
    var id = $(this).attr("id");
    id = parseInt(id.substr(1,id.length));
    var idtext = $(this).children("p").text();
    var idtextfix = "";
    for (i=0;i<idtext.length;i++){
      if (idtext[i] != " "){
        idtextfix += idtext[i];
      }
    }
    idtextfix = idtextfix.toLowerCase();
    $(this).closest(".tsound").children(".soundtext").empty().append(idtext);
    var buttonid = $(this).closest(".timeline").attr("id");
    buttonid = parseInt(buttonid.substr(2,buttonid.length));

    sounds[buttonid-1] = id;
    for(j=0;j<noofframes;j++){
      timelinesounds[buttonid-1][j] = new Audio("assets/sounds/"+idtextfix+".wav");
    }


  });

  $("#timelinebigcontainer").on('click','.playmode',function() {
    $("#playkey").removeClass("playmode").addClass("pausemode");
    playing = true;
    playtimeline();
  });

  $("#timelinebigcontainer").on('click','.pausemode',function() {
    $("#playkey").removeClass("pausemode").addClass("playmode");
    playing = false;
  });

  $("#timelinebigcontainer").on('click','#speed1',function() {
    $(".playbutton").removeClass("playbuttonhighlight2");
    $(this).addClass("playbuttonhighlight2");
    speed = 1;
  });
  $("#timelinebigcontainer").on('click','#speed05',function() {
    $(".playbutton").removeClass("playbuttonhighlight2");
    $(this).addClass("playbuttonhighlight2");
    speed = 2;
  });
  $("#timelinebigcontainer").on('click','#speed025',function() {
    $(".playbutton").removeClass("playbuttonhighlight2");
    $(this).addClass("playbuttonhighlight2");
    speed = 4;
  });
  $("#timelinebigcontainer").on('click','#loop',function() {
    if (loop){
      loop = false;
      $(this).css("background-image","url(assets/buttons/noloop.png)");
    }
    else {
      loop = true;
      $(this).css("background-image","url(assets/buttons/loop.png)");
    }
  });

  $("#timelinebigcontainer").on('click','.stickprevious',function() {
    var num = $(this).attr("id");
    var but = num.substr(0,2);
    num = parseInt(num.substr(8,2));
    if (!(num === 1)){
      var top = $("#"+but+"tickf"+(num-1)).css("top");
      var left = $("#"+but+"tickf"+(num-1)).css("left");
      $("#"+but+"tickf"+num).css({"top":top,"left":left});
      if (but === "ls"){
        timelines["tl"+lsticknum][num-1] = [top, left];
      }
      else {
        timelines["tl"+csticknum][num-1] = [top, left];
      }
    }
  });

  $("#timelinebigcontainer").on('click','.sticknext',function() {
    var num = $(this).attr("id");
    var but = num.substr(0,2);
    num = parseInt(num.substr(8,2));
    if (!(num === noofframes)){
      var top = $("#"+but+"tickf"+(num+1)).css("top");
      var left = $("#"+but+"tickf"+(num+1)).css("left");
      $("#"+but+"tickf"+num).css({"top":top,"left":left});
      if (but === "ls"){
        timelines["tl"+lsticknum][num-1] = [top, left];
      }
      else {
        timelines["tl"+csticknum][num-1] = [top, left];
      }
    }
  });

  $("#timelinebigcontainer").on('click','.stickreset',function() {
    var num = $(this).attr("id");
    var but = num.substr(0,2);
    num = parseInt(num.substr(8,2));
    if (but === "ls"){
      $("#"+but+"tickf"+num).css({"top":15,"left":15});
      timelines["tl"+lsticknum][num-1] = [15, 15];
    }
    else {
      $("#"+but+"tickf"+num).css({"top":20,"left":20});
      timelines["tl"+csticknum][num-1] = [20, 20];
    }
  });

});
