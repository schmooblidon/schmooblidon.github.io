findRed = $("#findRed").is(":checked")
findGreen = $("#findGreen").is(":checked")
findBlue = $("#findBlue").is(":checked")
clearOnClick = $("#clear").is(":checked")

$(document).ready(function() {

  can = document.getElementById("selectedArea");
  c = can.getContext("2d");
  c.save();

    $('img').mousemove(function(e) {
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }

        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        $("#outputColourBox").css("background-color","rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")");
        $("#outputRed").text(pixelData[0]).css("color","rgb("+pixelData[0]+",0,0)");
        $("#outputGreen").text(pixelData[1]).css("color","rgb(0,"+pixelData[1]+",0)");
        $("#outputBlue").text(pixelData[2]).css("color","rgb(0,0,"+pixelData[2]+")");
    });



    $("img").click(function(e){
      findRed = $("#findRed").is(":checked")
      findGreen = $("#findGreen").is(":checked")
      findBlue = $("#findBlue").is(":checked")
      clearOnClick = $("#clear").is(":checked")
      //console.log(findRed);
      if(!this.canvas) {
          this.canvas = $('<canvas />')[0];
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
      }
      var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
      c.restore();
      if (clearOnClick){
        c.fillStyle = "black";
        c.fillRect(0,0,255,255);
      }
      var fill = "rgb(";
      if (findRed){
        fill+=pixelData[0]+",";
      }
      else {
        fill+="0,";
      }
      if (findGreen){
        fill+=pixelData[1]+",";
      }
      else {
        fill+="0,";
      }
      if (findBlue){
        fill+=pixelData[2]+")";
      }
      else {
        fill+="0)";
      }
      //console.log(fill);
      for(var x=0;x<256;x++){
        for(var y=0;y<256;y++){
          var newPixelData = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
          //console.log(newPixelData);
          if (findRed || findGreen || findBlue){
            var rightPix = true;
            if (findRed){
              if (pixelData[0] == newPixelData[0]){
                rightPix = true;
              }
              else {
                rightPix = false;
              }
            }
            if (findGreen && rightPix){
              if (pixelData[1] == newPixelData[1]){
                rightPix = true;
              }
              else {
                rightPix = false;
              }
            }
            if (findBlue && rightPix){
              if (pixelData[2] == newPixelData[2]){
                rightPix = true;
              }
              else {
                rightPix = false;
              }
            }
            if (rightPix){
              //console.log("test");
              c.fillStyle = fill;
              c.fillRect(x,y,1,1);
            }
          }
        }
      }
    });



});
