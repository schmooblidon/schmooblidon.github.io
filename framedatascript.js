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
vspeed = 1;
asdasd = [];
asdasd[0] = ["000000","333333","666666","999999","CCCCCC","FFFFFF"];
asdasd[1] = ["FF0000","FF6666","990000","FF3300","FF6633","993300"];
asdasd[2] = ["00ff00","66ff66","009900","ffff00","ffff66","999900"];
asdasd[3] = ["0000ff","6666ff","000099","00ffff","66ffff","009999"];
asdasd[4] = ["ff00ff","ff66ff","990099","9900CC","9966FF","330066"];
asdasd[5] = ["","","","","",""];

colourtext = '<div class="colourselectbox">';

var ocolour = ["#66ff66","#66ffff","#ff66ff","#9966ff"];
var fcolour = ["#ff6666","#ffff66","#6666ff","#ff6633"];

for(i=0;i<6;i++){
  for(j=0;j<5;j++){
    //newcolour = "000000";
    /*newcolour = newcolour.split('');



    newcolour[j-1] = (j*3).toString(16);
    newcolour[j] = (j*3).toString(16);

    newcolour[i-1] = (i*3).toString(16);
    newcolour[i] = (i*3).toString(16);

    newcolour = newcolour.join('');

    newcolour = "#"+newcolour;*/

    colourtext += '<div class="colourselect" style="background-color:#'+asdasd[j][i]+'"></div>';
  }
}

colourtext += '</div>'





var timecount = 0;
var funcall = 0;

var playAttack = 0;

var frame = 0;

var cTime = 0;

var char = "sheik";
var attack = "ftilt";

var a = chars[char][attack];

var detlist = ["dam","bkb","kbg","ang","af","typ"];



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

var drawHitboxes = function(t){
  $('#time').html((vid.currentTime * 60).toPrecision(15));
  timecount++;
  $("#timecount").html(timecount);

  frame = Math.round((vid.currentTime * 60 - 0.5).toPrecision(15));
  cTime = vid.currentTime;
  $("#frames").html(frame);
  var a = chars["sheik"]["ftilt"];
  if (t){
    $("#svgbox-t").empty();
  }
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
      $("#framedisplay").removeClass("nothitting").addClass("hitting");
      if (switches.stroke && !switches["id"+k+"stroke"]){
        $("#id"+(k-1)+"f"+frame).attr("stroke", ocolour[k-1]);
      }
      if (switches.fill && !switches["id"+k+"fill"]){
        $("#id"+(k-1)+"f"+frame).attr("fill", fcolour[k-1]);
      }
      if (t){
        $(SVG("path")).attr("id", "id"+(k-1)+"f"+frame+"-t").attr("class","hitbox-t id"+(k-1)+"-t").attr("d", a["id"+(k-1)].svg["f"+frame][0]+" "+a["id"+(k-1)].svg["f"+frame][1]).attr("fill", "transparent").attr("stroke", "none").prependTo("#svgbox-t");
        hitboxHover();
      }
    }
    else {
      $("#framedisplay").removeClass("hitting").addClass("nothitting");
    }
  }
  $("#framedisplay").children("p").empty().append(frame);
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
        if (j == 3){
          $("#id"+i+"-info p:nth-child("+(j+1)+")").children("span").append(' <img class="anglesmall" src="assets/anglesmall.png"/>');
          var ang = chars[char][attack]["id"+i].ang * -1;
          $(".anglesmall").css({"-ms-transform" : "rotate("+ang+"deg)", "-webkit-transform" : "rotate("+ang+"deg)", "transform" : "rotate("+ang+"deg)"});
        }
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

var hitboxHover = function(){
  $(".hitbox-t").mouseover(function(e){
    var id = $(this).attr("id");
    $("#detailcanvas").append('<img class="angle" src="assets/angle.png"></img>');
    var ang = chars[char][attack]["id"+id[2]].ang * -1;
    $(".angle").css({"-ms-transform" : "rotate("+ang+"deg)", "-webkit-transform" : "rotate("+ang+"deg)", "transform" : "rotate("+ang+"deg)"});
  }).mouseout(function(){
    $(".angle").remove();
  });
}

var colourChange = function(id,newcolour){

  if (id[3] == "f"){
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
  else if (id[3] == "s"){
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
}

var colourPick = function(id){
  $(".colourselect").click(function(){
    newcolour = $(this).css("background-color");
    colourChange(id,newcolour);
    $("#"+id).css("background-color",newcolour);
    $(".colourselectbox").remove();
  });
}

var frameForward = function(){
  vid.pause();
  $("#play").removeClass("pause").addClass("play");
  playing = false;
  clearInterval(playAttack);
  vid.currentTime += (1 / 60);
  $('#time').html((vid.currentTime * 60).toPrecision(15));
  drawHitboxes(true);
}

var frameBackward = function(){
  vid.pause();
  $("#play").removeClass("pause").addClass("play");
  playing = false;
  clearInterval(playAttack);
  vid.currentTime -= (1 / 60);
  drawHitboxes(true);
  $('#time').html((vid.currentTime * 60).toPrecision(15));
}

var displaySpeed = function(){
  var speedstr = Math.round(vspeed * 10).toString();
  if (speedstr != "10"){
    speedstr = "0."+speedstr;
  }
  else {
    speedstr = "1";
  }
  $("#speedvalue").empty().append(speedstr);
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
    frameForward();
  });
  $("#fminus").click(function(){
    frameBackward();
  });
  $("#play").click(function(){
    if (playing){
      clearInterval(playAttack);
      vid.pause();
      setTimeout(function(){
        vid.currentTime = cTime;
        drawHitboxes(true);
      },300);

      $(this).removeClass("pause").addClass("play");
      playing = false;
    }
    else {
      $("#svgbox-t").empty();
      $(this).removeClass("play").addClass("pause");
      playing = true;
      vid.play();
      playAttack = setInterval(function() {
        drawHitboxes(false);
      }, ((1/vspeed)*(1000/60)));
    }
  });

  $("#speedplus").click(function(){
    if (vspeed < 1){
      vspeed += 0.1;
      vid.playbackRate = vspeed;
      if (playing){
        clearInterval(playAttack);
        playAttack = setInterval(function() {
          drawHitboxes(false);
        }, ((1/vspeed)*(1000/60)));
      }
    }
    if (vspeed > 0.91 && !($(this).find(".speeddisabled").length != 0)) {
      $(this).append('<div class="speeddisabled"></div>');
    }
    if (vspeed > 0.11){
      $("#speedminus").empty();
    }
    displaySpeed();
  });

  $("#speedminus").click(function(){
    if (vspeed > 0.11){
      vspeed -= 0.1;
      vid.playbackRate = vspeed;
      if (playing){
        clearInterval(playAttack);
        playAttack = setInterval(function() {
          drawHitboxes(false);
        }, ((1/vspeed)*(1000/60)));
      }
    }
    if (vspeed < 0.11 && !($(this).find(".speeddisabled").length != 0)) {
      $(this).append('<div class="speeddisabled"></div>');
    }
    if (vspeed < 0.91){
      $("#speedplus").empty();
    }
    displaySpeed();
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
              $(".id"+i).attr("fill","transparent");
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
        $(".id"+id[2]).attr("fill","transparent");
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
    colourChange(id,newcolour);
    if (!$(this).hasClass("cbtrans") && !$(this).children(".colourselectbox").length){
      $(".colourselectbox").remove();
      $(this).append(colourtext);
      colourPick(id);
    }
    else if ($(this).hasClass("cbtrans") || $(".colourselectbox").length){
      $(".colourselectbox").remove();
    }
    if (id[3] == "f"){
      $("#id"+id[2]+"fillcolour").removeClass("colourboxselected");
      $("#id"+id[2]+"filltrans").removeClass("colourboxselected");
    }
    else {
      $("#id"+id[2]+"strokecolour").removeClass("colourboxselected");
      $("#id"+id[2]+"stroketrans").removeClass("colourboxselected");
    }
    $(this).addClass("colourboxselected");
  });

  $('html').click(function(e) {
    if(!$(e.target).hasClass('colourselect') && !$(e.target).hasClass('colourbox'))
    {
      $(".colourselectbox").remove();
    }
  });

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
        case 38:
        case 65:
        case 83:
            frameBackward();
            break;
        case 39:
        case 40:
        case 68:
        case 87:
            frameForward();
            break;
    }
  };
  updatehitbox();

	$(document).on('mousemove', function(e){
    $(".angle").css({
       left:  e.pageX-0,
       top:   e.pageY-350
    });
	});

  /*$("#mainvid").bind("timeupdate", function() {
    $('#time').html((vid.currentTime).toPrecision(15));
    timecount++;
    $("#timecount").html(timecount);
  });*/

  //$("#f-id0").attr("d",sheik.ftilt.id0[0][0]);
});
