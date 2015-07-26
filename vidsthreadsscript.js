youtubeheightswitch = true;
youtubeheightswitch2 = false;
$(document).ready(function(){
	if (mobile === false){
    $(".ig-button").hover(function(){
      $(this).toggleClass("ighighlighted");
    });
    $(".fullsize").hover(function(){
      $(this).toggleClass("highlighted");
    });
	}
});
