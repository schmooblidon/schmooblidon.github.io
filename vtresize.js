var resizingtype = function(){
  $("#ig-content").width(windwidth - 190);
  $(".ig").width(windwidth - 190);
  $(".ig-text").width(windwidth - 740);
  if (windwidth < 1200){
    $(".graphcontainer").width(350);
    $(".graphcontainer").children("a").children("img").width("99%");
    $(".graphcontainer").children("a").children("img").height("99%");
    $(".graphcontainer").children("img").width("99%");
    $(".graphcontainer").children("img").height("99%");
    if (youtubeheightswitch){
      for (i=1;i<3;i++){
      var tempid = "#vid" + i;
      $(".graphcontainer").children(".vid"+i).height((
      $(".graphcontainer").children(".vid"+i).height() * (350/550)
      ));
      }
    youtubeheightswitch = false;
    }
    $(".graphcontainer").children("iframe").width(350);
    youtubeheightswitch2 = true;
    $(".ig-text").width(windwidth - 840);
    $("video").css({"width": "65%","height":" 65%"});
    if (windwidth < 850){
      $(".ig").css("display", "block");
      $(".ig-text").css("float", "none");
      $(".ig-text").width("auto");
    }
    else {
      $(".ig").css("display", "inline-block");
      $(".ig-text").css("float", "right");
      $(".ig-text").width(windwidth - 540);
    }
  }
  else {
      $(".graphcontainer").width(550);
      $(".graphcontainer").children("a").children("img").width("100%");
      $(".graphcontainer").children("a").children("img").height("100%");
      $(".graphcontainer").children("img").width("100%");
      $(".graphcontainer").children("img").height("100%");
      $(".ig-text").width(windwidth - 740);
      $("video").width("100%");
      $("video").height("100%");
      youtubeheightswitch = true;
      $(".graphcontainer").children("iframe").width(550);
      if (youtubeheightswitch2){
        for (i=1;i<3;i++){
          $(".graphcontainer").children(".vid"+i).height((
          $(".graphcontainer").children(".vid"+i).height() * (550/350)));
        }
        youtubeheightswitch2 = false;
      }
      $(".ig").css("display", "inline-block");
      $(".ig-text").css("float", "right");
      $(".ig").height("auto");
    }
}
