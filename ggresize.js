var resizingtype = function(){
  $("#ig-content").width(windwidth - 490);
  $(".ig").width(windwidth - 490);
  $(".ig-text").width(windwidth - 1040);
  if (windwidth < 1500){
    $(".graphcontainer").width(350);
    $(".graphcontainer").children("a").children("img").width("99%");
    $(".graphcontainer").children("a").children("img").height("99%");
    $(".graphcontainer").children("img").width("99%");
    $(".graphcontainer").children("img").height("99%");
    $(".ig-text").width(windwidth - 840);
    if (windwidth < 1150){
      $(".ig").css("display", "block");
      $(".ig-text").css("float", "none");
      $(".ig-text").width("auto");
    }
    else {
      $(".ig").css("display", "inline-block");
      $(".ig-text").css("float", "right");
      $(".ig-text").width(windwidth - 840);
    }
  }
  else {
      $(".graphcontainer").width(550);
      $(".graphcontainer").children("a").children("img").width("100%");
      $(".graphcontainer").children("a").children("img").height("100%");
      $(".graphcontainer").children("img").width("100%");
      $(".graphcontainer").children("img").height("100%");
      $(".ig-text").width(windwidth - 1040);
      $(".ig").css("display", "inline-block");
      $(".ig-text").css("float", "right");
      $(".ig").height("auto");
    }
    for (i=1;i<noofgfys+1;i++){
      $(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());
    }

}
