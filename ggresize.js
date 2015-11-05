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
    $(".ig-text").width(windwidth - 540);
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
      $(".ig").css("display", "inline-block");
      $(".ig-text").css("float", "right");
      $(".ig").height("auto");
    }
    for (i=1;i<noofgfys+1;i++){
      $(".gfyinside"+i).children(".media-flex").height(ratios[i-1] * $(".gfyinside"+i).children(".graphcontainer").width());
    }

}
