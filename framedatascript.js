var switches = {};
switches.stroke = true;
switches.fill = false;
switches.angle = true;
switches.autocancel = true;
switches.iasa = true;
switches.id0fill = false;
switches.id0stroke = false;
switches.id1fill = false;
switches.id1stroke = false;
switches.id2fill = false;
switches.id2stroke = false;
switches.id3fill = false;
switches.id3stroke = false;

playing = false;

var timecount = 0;
var funcall = 0;

var playAttack = 0;

var frame = 0;

var cTime = 0;

var char = "sheik";
var attack = "ftilt";

var a = chars[char][attack];

var detlist = ["dam","bkb","kbg","ang","af","typ"];

var ocolour = ["#3f18ff","#09dcf9","#12f59c","#19ff2a"];
var fcolour = ["#7566bf","#2e68cb","#0eb2c8","#08995c"];

function SVG(tag)
{
   return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

var toggleswitch = function(switchname){
  if (switches[switchname]){
    $("#"+switchname+"switch").removeClass("on").addClass("off").children("p").empty().append("Off");
    switches[switchname] = false;
  }
  else {
    $("#"+switchname+"switch").removeClass("off").addClass("on").children("p").empty().append("On");
    switches[switchname] = true;
  }
}

var updatehitbox = function(){

  var num = 0;
  //find the highest active frame number
  for(i=1;i<=a.af.length;i++){
    for (j=1;j<=a.af[i-1].length;j++){
      if (a.af[i-1][j-1] > num){
        num = a.af[i-1][j-1];
      }
    }
  }

  //for each id, go through each frame up to num, and draw an svg if present
  for(k=1;k<=a.ai.length;k++){
    for(l=1;l<=num;l++){
      if (typeof a["id"+(k-1)].svg["f"+l] != "undefined"){
        $(SVG("path")).attr("id", "id"+(k-1)+"f"+l).attr("class","hitbox id"+(k-1)).attr("d", a["id"+(k-1)].svg["f"+l][0]+" "+a["id"+(k-1)].svg["f"+l][1]).attr("fill", "transparent").attr("stroke", "none").prependTo("#svgbox");
      }
    }
  }
}

var drawHitboxes = function(){
  $('#time').html((vid.currentTime * 60).toPrecision(15));
  timecount++;
  $("#timecount").html(timecount);

  frame = Math.round((vid.currentTime * 60 - 0.5).toPrecision(15));
  cTime = vid.currentTime;
  $("#frames").html(frame);
  var a = chars["sheik"]["ftilt"];

  //$(".hitbox").attr("stroke","none").attr("fill","transparent");
  //for each id
  for(k=1;k<=a.ai.length;k++){
    //if alwaysshow fill/stroke are off, make invisible
    if (!switches["id"+(k-1)+"stroke"]){
      $(".id"+(k-1)).attr("stroke","none");
    }
    if (!switches["id"+(k-1)+"fill"]){
      $(".id"+(k-1)).attr("fill","transparent");
    }
    // if hitbox of current frame exists
    if (typeof a["id"+(k-1)].svg["f"+frame] != "undefined"){
      if (switches.stroke && !switches["id"+k+"stroke"]){
        $("#id"+(k-1)+"f"+frame).attr("stroke", ocolour[k-1]);
      }
      if (switches.fill && !switches["id"+k+"fill"]){
        $("#id"+(k-1)+"f"+frame).attr("fill", fcolour[k-1]);
      }
    }
  }
  if (frame >= a.IASA && switches.iasa){
    $("#iasadisplay").removeClass("displayoff").addClass("displayon");
  }
  else {
    $("#iasadisplay").removeClass("displayon").addClass("displayoff");
  }

  if (frame >= a.Autocancel && switches.autocancel){
    $("#autocanceldisplay").removeClass("displayoff").addClass("displayon");
  }
  else {
    $("#autocanceldisplay").removeClass("displayon").addClass("displayoff");
  }
  funcall++;
  $("#funcall").html(funcall);

  var rframe = Math.round((vid.currentTime * 60 + 0.5).toPrecision(15)) + 1;
  $("#rframes").html(rframe);
}

var updateIdInfo = function(){
  $("#statsbox").empty()
  for (k=0;k<stattypes.length;k++){
    if (typeof chars[char][attack][stattypes[k]] != "undefined"){
      $("#statsbox").append("<p>"+stattypes[k]+": "+chars[char][attack][stattypes[k]]+"</p>");
    }
  }

  for (i=0;i<=3;i++){
    if (typeof chars[char][attack].ai[i] != "undefined"){
      $("#id"+i+"-container").children(".infodisabled").remove();
      for(j=0;j<=5;j++){
        $("#id"+i+"-info p:nth-child("+(j+1)+")").children("span").empty().append(chars[char][attack]["id"+i][detlist[j]]);
      }
    }
    else {
      $("#id"+i+"-container").prepend('<div class="infodisabled"></div>');
      for(j=0;j<=5;j++){
        $("#id"+i+"-info p:nth-child("+(j+1)+")").children("span").empty().append("N/A");
      }
    }
  }
}

$(document).ready(function(){

  updateIdInfo();
  vid = $("#mainvid")[0];
  /*var playAttack = function(){
    if (playing){
      $('#time').html((vid.currentTime).toPrecision(15));
      timecount++;
      $("#timecount").html(timecount);
    }
  }*/

  $("#fplus").click(function(){
    vid.pause();
    $("#play").removeClass("pause").addClass("play");
    playing = false;
    clearInterval(playAttack);
    vid.currentTime += (1 / 60);
    $('#time').html((vid.currentTime * 60).toPrecision(15));
    drawHitboxes();
  });
  $("#fminus").click(function(){
    vid.pause();
    $("#play").removeClass("pause").addClass("play");
    playing = false;
    clearInterval(playAttack);
    vid.currentTime -= (1 / 60);
    drawHitboxes();
    $('#time').html((vid.currentTime * 60).toPrecision(15));
  });
  $("#play").click(function(){
    if (playing){
      clearInterval(playAttack);
      vid.pause();
      setTimeout(function(){
        vid.currentTime = cTime;
        drawHitboxes();
      },300);

      $(this).removeClass("pause").addClass("play");
      playing = false;
    }
    else {
      vid.play();
      $(this).removeClass("play").addClass("pause");
      playing = true;
      //setInterval(playAttack(), 1000/60);
      playAttack = setInterval(function() {
        drawHitboxes();
      }, 1000/60);
    }
  });



  $(".realbutton").click(function(){
    var id = $(this).attr("id");
    if (id == "stroke" || id == "fill"){
      for(i=0;i<=3;i++){
        if (switches[id]){
          if (!switches["id"+i+id]){
            if (id == "stroke"){
              $(".id"+i).attr("stroke","none");
            }
            else {
              $(".id"+i).attr("fill","none");
            }
          }
        }
        else {
          if (typeof a["id"+i].svg["f"+frame] != "undefined"){
            if (id == "stroke"){
              $("#id"+i+"f"+frame).attr("stroke", ocolour[i]);
            }
            else {
              $("#id"+i+"f"+frame).attr("fill", fcolour[i]);
            }
          }
        }
      }
    }
    if (id == "autocancel" || id == "iasa"){
      if (switches[id]){
        $("#"+id+"display").removeClass("displayon").addClass("displayoff");
      }
    }
    toggleswitch(id);
  });

  $(".minirealbutton").click(function(){
    var id = $(this).attr("id");

    if ($(this).hasClass("ministroke")){
      if (switches["id"+id[2]+"stroke"]){
        $(".id"+id[2]).attr("stroke","none");
        if (typeof a["id"+id[2]].svg["f"+frame] != "undefined" && switches.stroke){
          $("#id"+id[2]+"f"+frame).attr("stroke", ocolour[id[2]]);
        }
      }
      else {
        $(".id"+id[2]).attr("stroke",ocolour[id[2]]);
      }
    }
    else if ($(this).hasClass("minifill")) {
      if (switches["id"+id[2]+"fill"]){
        $(".id"+id[2]).attr("fill","none");
        if (typeof a["id"+id[2]].svg["f"+frame] != "undefined" && switches.fill){
          $("#id"+id[2]+"f"+frame).attr("fill", fcolour[id[2]]);
        }
      }
      else {
        $(".id"+id[2]).attr("fill",fcolour[id[2]]);
      }
    }

    toggleswitch(id);
  });

  $(".colourbox").click(function(){
    var id = $(this).attr("id");
    var newcolour = $(this).css("background-color");
    if (id[3] == "f"){
      for(i=1;i<=3;i++){
        $("#id"+id[2]+"fillcolour"+i).removeClass("colourboxselected");
      }
      if (switches["id"+id[2]+"fill"]){
        $(".id"+id[2]).attr("fill", newcolour);
      }
      else {
        if (typeof a["id"+id[2]].svg["f"+frame] != "undefined" && switches.fill){
          $("#id"+id[2]+"f"+frame).attr("fill", newcolour);
        }
      }
      fcolour[id[2]] = newcolour;
    }
    else {
      for(i=1;i<=3;i++){
        $("#id"+id[2]+"strokecolour"+i).removeClass("colourboxselected");
      }
      if (switches["id"+id[2]+"stroke"]){
        $(".id"+id[2]).attr("stroke", newcolour);
      }
      else {
        if (typeof a["id"+id[2]].svg["f"+frame] != "undefined" && switches.stroke){
          $("#id"+id[2]+"f"+frame).attr("stroke", newcolour);
        }
      }
      ocolour[id[2]] = newcolour;
    }
    $(this).addClass("colourboxselected");
  });

  $("#stroke").click(function(){
    for(i=0;i<=3;i++){
      if (!switches["id"+i+"stroke"]){

      }
    }
  });

  updatehitbox();

  /*$("#mainvid").bind("timeupdate", function() {
    $('#time').html((vid.currentTime).toPrecision(15));
    timecount++;
    $("#timecount").html(timecount);
  });*/

  //$("#f-id0").attr("d",sheik.ftilt.id0[0][0]);
});
