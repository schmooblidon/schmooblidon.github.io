sameRedOrGreen = $("#sameRedOrGreen").is(":checked");
sameBlue = $("#sameBlue").is(":checked");
sameComposite = $("#sameComposite").is(":checked");
sameHue = $("#sameHue").is(":checked");
clearOnClick = $("#clear").is(":checked");

customR = 255;
customG = 255;
customB = 255;

rogRange = [1,255];
bRange = [1,255];
hRange = [1,358];

fillMode = 0;

function deleteNonNumbers(text,allowNegative,allowPoint,allowZeros){
  var newtext = "";
  var hasPoint = false;
  for (i=0;i<text.length;i++){
    var asc = text[i].charCodeAt();
    if (asc >= 48 && asc <= 57){
       newtext += text[i];
    }
    else if (allowPoint && asc == 46){
      for (j=0;j<newtext.length;j++){
        if (newtext[j] == "."){
          hasPoint = true;
        }
      }
      if (!hasPoint){
        newtext += text[i];
      }
    }
    else if (allowNegative && asc == 45){
      newtext += text[i];
    }
  }
  if (newtext == ""){
    newtext = 0;
  }
  else {
    if (!allowPoint && !allowZeros){
      newtext = parseInt(newtext);
    }
  }
  return newtext;
}


function findComposite(pD,npD){
  if (pD[0] == npD[0] && pD[1] == npD[1] && pD[2] == npD[2]){
    return true;
  }
  else {
    return false;
  }
}

function findRedOrGreen(pD,npD){
  if ((pD[0] == npD[0] && pD[0] != 0) || (pD[1] == npD[1] && pD[1] != 0)){
    return true;
  }
  else {
    return false;
  }
}

function findRedOrGreenRange(npD){
  var range = [Math.min(rogRange[0],rogRange[1]),Math.max(rogRange[0],rogRange[1])];
  if ((npD[0] >= range[0] && npD[0] <= range[1]) || (npD[1] >= range[0] && npD[1] <= range[1])){
    return true;
  }
  else {
    return false;
  }
}

function findBlue(pD,npD){
  if (pD[2] == npD[2]){
    return true;
  }
  else {
    return false;
  }
}

function findBlueRange(npD){
  var range = [Math.min(bRange[0],bRange[1]),Math.max(bRange[0],bRange[1])];
  if (npD[2] >= range[0] && npD[2] <= range[1]){
    return true;
  }
  else {
    return false;
  }
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h*360), s, l];
}

function findHue(fH,pD,npD){
  if (fH == rgbToHsl(npD[0],npD[1],npD[2])[0]){
    return true;
  }
  else {
    return false;
  }
}

function findHueRange(npD){
  var range = [Math.min(hRange[0],hRange[1]),Math.max(hRange[0],hRange[1])];
  if (rgbToHsl(npD[0],npD[1],npD[2])[0] >= range[0] && rgbToHsl(npD[0],npD[1],npD[2])[0] <= range[1]){
    return true;
  }
  else {
    return false;
  }
}

function rgbToMelee(rgb) {
  var conversion = 80/255;
  return [(Math.round(rgb[2]*conversion)/80).toFixed(4), (Math.round(rgb[1]*conversion)/80 - Math.round(rgb[0]*conversion)/80).toFixed(4)];
}

$(document).ready(function() {

  $(document).on('mousemove', function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  can = document.getElementById("selectedArea");
  c = can.getContext("2d");
  c.save();

    $("#inputMap2").hover(function(){
      $("#darkenInputMap").show();
      $("#selectedArea").after('<div class="pixelInfoBox"><div id="outputColourBox"></div><p>X: <span id="meleeX" style="color:rgb(0,0,0)">0</span><br>Y: <span id="meleeY" style="color:rgb(0,0,0")>0</span><br>R: <span id="outputRed" style="color:rgb(0,0,0)">0</span><br>G: <span id="outputGreen" style="color:rgb(0,0,0)">0</span><br>B: <span id="outputBlue" style="color:rgb(0,0,0)">0</span></div>');
    },function(){
      $("#darkenInputMap").hide();
      $(".pixelInfoBox").remove();
    });

    $('img').mousemove(function(e) {
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }

        $(".pixelInfoBox").css({"top":mouseY,"left":mouseX});

        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        $("#outputColourBox").css("background-color","rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")");
        var meleeUnit = rgbToMelee(pixelData);
        $("#meleeX").text(meleeUnit[0]).css("color","white");
        $("#meleeY").text(meleeUnit[1]).css("color","white");;
        $("#outputRed").text(pixelData[0]).css("color","rgb("+pixelData[0]+",0,0)");
        $("#outputGreen").text(pixelData[1]).css("color","rgb(0,"+pixelData[1]+",0)");
        $("#outputBlue").text(pixelData[2]).css("color","rgb(0,0,"+pixelData[2]+")");
    });



    $("img").click(function(e){
      sameRedOrGreen = $("#sameRedOrGreen").is(":checked");
      sameBlue = $("#sameBlue").is(":checked");
      sameComposite = $("#sameComposite").is(":checked");
      sameHue = $("#sameHue").is(":checked");
      clearOnClick = $("#clear").is(":checked");
      if(!this.canvas) {
          this.canvas = $('<canvas />')[0];
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
      }
      var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
      var firstHue = rgbToHsl(pixelData[0],pixelData[1],pixelData[2])[0];
      //console.log(pixelData);
      c.restore();
      if (clearOnClick){
        c.clearRect(0,0,255,255);
      }
      var fill = "rgb("+customR+","+customG+","+customB+")";
      for(var x=0;x<256;x++){
        for(var y=0;y<256;y++){
          var newPixelData = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
          var rightPix = false;
          if (sameComposite){
            rightPix = findComposite(pixelData,newPixelData);
          }
          if (sameRedOrGreen){
            rightPix = findRedOrGreen(pixelData,newPixelData);
          }
          if (sameBlue){
            rightPix = findBlue(pixelData,newPixelData);
          }
          if (sameHue){
            rightPix = findHue(firstHue,pixelData,newPixelData);
          }
          if (rightPix){
            c.fillStyle = fill;
            c.fillRect(x,y,1,1);
          }

        }
      }
    });

    $(".colourChoice").on("keyup blur", function() {
      var value = deleteNonNumbers($(this).val(),false,false,false);
      if (value > 255){
        value = 255;
      }
      if (value < 0){
        value = 0;
      }
      value = Math.abs(value);
      $(this).val(value);
      var id = $(this).attr("id");
      switch (id){
        case "red":
          customR = value;
          break;
        case "green":
          customG = value;
          break;
        case "blue":
          customB = value;
          break;
        default:
          break;
      }
      $("#customColourViewer").css("background-color","rgb("+customR+","+customG+","+customB+")");
    });

    $(".range").on("keyup blur", function() {
      var value = deleteNonNumbers($(this).val(),false,false,false);
      var id = $(this).attr("id");
      if (id[0] == "h"){
        if (value > 358){
          value = 358;
        }
      }
      else {
        if (value > 255){
          value = 255;
        }
      }
      if (value < 0){
        value = 0;
      }
      value = Math.abs(value);
      $(this).val(value);
      switch (id){
        case "rogRange1":
          rogRange[0] = value;
          break;
        case "rogRange2":
          rogRange[1] = value;
          break;
        case "bRange1":
          bRange[0] = value;
          break;
        case "bRange2":
          bRange[1] = value;
          break;
        case "hRange1":
          hRange[0] = value;
          break;
        case "hRange2":
          hRange[1] = value;
          break;
        default:
          break;
      }
    });

    $(".fCommandOverlay").click(function(){
      $(".fCommandOverlay").show();
      $(this).hide();
      var id = $(this).attr("id")[15];
      fillMode = parseInt(id);
    });

    $("#fillButton").click(function(){
      clearOnClick = $("#clear").is(":checked");
      //console.log(findRed);
      var iM = document.getElementById("inputMap2");
      if(!iM.canvas) {
          iM.canvas = $('<canvas />')[0];
          iM.canvas.width = iM.width;
          iM.canvas.height = iM.height;
          iM.canvas.getContext('2d').drawImage(iM, 0, 0,iM.width,iM.height);
      }
      c.restore();
      if (clearOnClick){
        c.clearRect(0,0,255,255);
      }
      var fill = "rgb("+customR+","+customG+","+customB+")";
      for(var x=0;x<256;x++){
        for(var y=0;y<256;y++){
          var newPixelData = iM.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
          var rightPix = false;
          switch (fillMode){
            case 0:
              rightPix = findRedOrGreenRange(newPixelData);
              break;
            case 1:
              rightPix = findBlueRange(newPixelData);
              break;
            case 2:
              rightPix = findHueRange(newPixelData);
              break;
            default:
              break;
          }
          if (rightPix){
            c.fillStyle = fill;
            c.fillRect(x,y,1,1);
          }

        }
      }
    });
});
