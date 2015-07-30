


/* state 1 = press compulsory = white
/* state 2 = will not affect = grey
/* state 0 = no press compulsary = black */

/*timelineframelength = 10;
*/
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
/*
for (i=1;i<=noofbuttons;i++){
  timelines["tl"+i] = [];
  for (j=1;j<=timelineframelength;j++){
    timelines["tl"+i][j-1] = 0;
  }
}*/

framescript = "1003sd1222222122bb1222220122xy0000122222";

var tframeclickstates = function(){
  $("#timelinebigcontainer").on('click','.tframe',function() {
    var $t = $(this);
    if ($t.hasClass("type0")){
      $t.removeClass("type0");
      $t.addClass("type1");
    }
    else if ($t.hasClass("type1")){
      $t.removeClass("type1");
      $t.addClass("type2");
    }
    else if ($t.hasClass("type2")){
      $t.removeClass("type2");
      $t.addClass("type0");
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
      for(i=1;i<=noofbuttons-unb;i++){
        $("#tl"+(noofbuttons+1-i)).remove();
      }
    }
    else {
      for (i=1;i<=unb-noofbuttons;i++){
        $("#tl"+(noofbuttons-1+i)).after('<div class="timeline" id="tl'+(noofbuttons+i)+'"><div class="tkey"></div></div>');
        for (j=1;j<=noofframes;j++){
          $("#tl"+(noofbuttons+i)).append('<div class="tframe type0" id="b'+(noofbuttons+i)+'f'+j+'"></div>');
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
        }
        $("#num"+(noofframes+1-j)).remove();
      }

    }
    else {
      for(j=1;j<=unf-noofframes;j++){
        for (i=1;i<=noofbuttons;i++){
          $("#tl"+i).append('<div class="tframe type0" id="b'+i+'f'+(noofframes+j)+'"></div>');
        }
        $("#playline").append('<div class="tnum" id="num'+(noofframes+j)+'"><p>'+(noofframes+j)+'</p></div>');
      }
    }
    noofframes = unf;
    $("#timelinebigcontainer").width(105+(72*noofframes));
    $("#timelinescontainer").width(102+(72*noofframes));

  }


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
    for (j=1;j<=noofframes;j++){
      timelines["tl"+i][j-1] = 0;
    }
  }
  $("#timelinebigcontainer").width(105+(72*noofframes)).append('<div id="tline" style="height:'+(72*(noofbuttons+1))+'px"></div><div id="timelinescontainer"></div>');

  for (i=1;i<=noofbuttons;i++){
    $("#timelinescontainer").append('<div class="timeline" id="tl'+i+'"><div class="tkey"></div></div>');

    for (j=1;j<=noofframes;j++){
      $("#tl"+i).append('<div class="tframe type0" id="b'+i+'f'+j+'"></div>');
    }
  }

  $("#timelinescontainer").width(102+(72*noofframes)).append('<div class="timeline" id="playline"><div id="playkey" class="playmode"></div></div>');
  for (j=1;j<=noofframes;j++){
      $("#playline").append('<div class="tnum" id="num'+j+'"><p>'+j+'</p></div>');
  }

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
    updatetimeline(ngame,nchar,nname,nnoofbuttons,nnoofframes);
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
    $tl.animate({left : 103+(noofframes * 72)},16*noofframes, function() {
        playtimeline();
      }
    );
  }
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
        $(this).append("<div class='tframehighlight'></div>");
    },
    mouseleave: function () {
        $(this).empty();
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
      $(this).append('<div id="buttondropdown"><div class="buttonselect" id="sd" style="background-image:url(assets/buttons/sd.png)"></div><div class="buttonselect" id="bb" style="background-image:url(assets/buttons/bb.png)"></div><div class="buttonselect" id="xy" style="background-image:url(assets/buttons/xy.png)"></div></div>');
      $(this).addClass("dropdowned");
    }
  });

  $("#timelinebigcontainer").on({
    mouseenter: function () {
        $(this).addClass("buttonselecthighlight");
    },
    mouseleave: function () {
        $(this).removeClass("buttonselecthighlight");
    }
  }, ".buttonselect");

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
        $(this).addClass("playkeyhighlight");
    },
    mouseleave: function () {
        $(this).removeClass("playkeyhighlight");
    }
  }, "#playkey");



  $("#timelinebigcontainer").on('click','.buttonselect',function() {
    var but = $(this).attr("id");
    $(this).closest(".tkey").css("background-image","url(assets/buttons/"+but+".png)");
    $(".tkey").removeClass("tkeyhighlight");

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


});
