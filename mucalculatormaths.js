yRepick = false;
oRepick = false;

starter = 0.5;
ocp1 = 0.5;
ocp2 = 0.5;
ycp1 = 0.5;
ycp2 = 0.5;

function twoZero(start,o1,o2,y1,y2){
  if(o1<o2){
    o1=o2;
  }
  if(y1>y2){
    y1=y2;
  }
  var twoZerov = (start)*(o1);
  return twoZerov;
}

function twoOne(start,o1,o2,y1,y2){
  if(o1<o2){
    o1=o2;
  }
  if(y1>y2){
    y1=y2;
  }
  twoOnev = (start)*(1-o1)*(y1)+(1-start)*(y1)*(o1);
  return twoOnev;
}

function oneTwo(start,o1,o2,y1,y2){
  if(o1<o2){
    o1=o2;
  }
  if(y1>y2){
    y1=y2;
  }
  oneTwov = (start)*(1-o1)*(1-y1)+(1-start)*(y1)*(1-o1);
  return oneTwov;
}

function zeroTwo(start,o1,o2,y1,y2){
  if(o1<o2){
    o1=o2;
  }
  if(y1>y2){
    y1=y2;
  }
  zeroTwov = (1-start)*(1-y1);
  return zeroTwov;
}


function rThreeZero(start,o1,o2,y1,y2){
  rThreeZerov = (start)*(o1)*(o1);
  return rThreeZerov;
}


function rThreeOne(start,o1,o2,y1,y2){
  rThreeOnev = (start)*(1-o1)*(y1)*(o2)+(start)*(o1)*(1-o1)*(y1)+(1-start)*(y1)*(o1)*(o1);
  return rThreeOnev;
}

function rThreeTwo(start,o1,o2,y1,y2){
  rThreeTwov = (start)*(o1)*(1-o1)*(1-y1)*(y1)+(start)*(1-o1)*(1-y1)*(y1)*(o2) +(1-start)*(1-y1)*(y1)*(o1)*(o1)+(1-start)*(y1)*(1-o1)*(y2)*(o2)+(1-start)*(y1)*(o1)*(1-o1)*(y2)+(start)*(1-o1)*(y1)*(1-o2)*(y2);
  return rThreeTwov
}

function rTwoThree(start,o1,o2,y1,y2){
  rTwoThreev=(1-start)*(1-y1)*(y1)*(o1)*(1-o1)+(1-start)*(y1)*(o1)*(1-o1)*(1-y2)+(start)*(o1)*(1-o1)*(1-y1)*(1-y1)+(start)*(1-o1)*(y1)*(1-o2)*(1-y2)+(start)*(1-o1)*(1-y1)*(y1)*(1-o2)+(1-start)*(y1)*(1-o1)*(y2)*(1-o2);
  return rTwoThreev;
}

function rOneThree(start,o1,o2,y1,y2){
  rOneThreev=(1-start)*(y1)*(1-o1)*(1-y2)+(1-start)*(1-y1)*(y1)*(1-o1)+(start)*(1-o1)*(1-y1)*(1-y1);
  return rOneThreev;
}

function rZeroThree(start,o1,o2,y1,y2){
  rZeroThreev=(1-start)*(1-y1)*(1-y1);
  return rZeroThreev;
}

function win3(start,o1,o2,y1,y2){
  winChance = (twoZero(start,o1,o2,y1,y2))+(twoOne(start,o1,o2,y1,y2));
  return winChance;
}

function lose3(start,o1,o2,y1,y2){
  loseChance=(oneTwo(start,o1,o2,y1,y2))+(zeroTwo(start,o1,o2,y1,y2));
  return loseChance;
}

function rWin5(start,o1,o2,y1,y2){
  winChance=(rThreeZero(start,o1,o2,y1,y2)+rThreeOne(start,o1,o2,y1,y2)+rThreeTwo(start,o1,o2,y1,y2));
  return winChance;
}

function rLose5(start,o1,o2,y1,y2){
  loseChance=rTwoThree(start,o1,o2,y1,y2)+rOneThree(start,o1,o2,y1,y2)+rZeroThree(start,o1,o2,y1,y2);
  return loseChance;
}

function threeZero(start,o1,o2,y1,y2){
  threeZerov=(start)*(o1)*(o2);
  return threeZerov;
}


function threeOne(start,o1,o2,y1,y2){
  threeOnev=(start)*(1-o1)*(y1)*(o2)+(start)*(o1)*(1-o2)*(y1)+(1-start)*(y1)*(o1)*(o2);
  return threeOnev;
}

function threeTwo(start,o1,o2,y1,y2){
  threeTwov=(start)*(o1)*(1-o2)*(1-y1)*(y2)+(start)*(1-o1)*(1-y1)*(y2)*(o2)+(1-start)*(1-y1)*(y2)*(o1)*(o2)+(1-start)*(y1)*(1-o1)*(y2)*(o2)+(1-start)*(y1)*(o1)*(1-o2)*(y2)+(start)*(1-o1)*(y1)*(1-o2)*(y2);
  return threeTwov;
}

function twoThree(start,o1,o2,y1,y2){
  twoThreev=(1-start)*(1-y1)*(y2)*(o1)*(1-o2)+(1-start)*(y1)*(o1)*(1-o2)*(1-y2)+(start)*(o1)*(1-o2)*(1-y1)*(1-y2)+(start)*(1-o1)*(y1)*(1-o2)*(1-y2)+(start)*(1-o1)*(1-y1)*(y2)*(1-o2)+(1-start)*(y1)*(1-o1)*(y2)*(1-o2);
  return twoThreev;
}

function oneThree(start,o1,o2,y1,y2){
  oneThreev=(1-start)*(y1)*(1-o1)*(1-y2)+(1-start)*(1-y1)*(y2)*(1-o1)+(start)*(1-o1)*(1-y1)*(1-y2);
  return oneThreev;
}

function zeroThree(start,o1,o2,y1,y2){
  zeroThreev=(1-start)*(1-y1)*(1-y2);
  return zeroThreev;
}

function win3(start,o1,o2,y1,y2){
  winChance=(twoZero(start,o1,o2,y1,y2))+(twoOne(start,o1,o2,y1,y2));
  return winChance;
}

function lose3(start,o1,o2,y1,y2){
  loseChance=(oneTwo(start,o1,o2,y1,y2))+(zeroTwo(start,o1,o2,y1,y2));
  return loseChance;
}

function win5(start,o1,o2,y1,y2){
  winChance=(threeZero(start,o1,o2,y1,y2)+threeOne(start,o1,o2,y1,y2)+threeTwo(start,o1,o2,y1,y2));
  return winChance;
}

function lose5(start,o1,o2,y1,y2){
  loseChance=twoThree(start,o1,o2,y1,y2)+oneThree(start,o1,o2,y1,y2)+zeroThree(start,o1,o2,y1,y2);
  return loseChance;
}

function yRThreeZero(start,o1,o2,y1,y2){
  yRThreeZerov=(start)*(o1)*(o2);
  return yRThreeZerov;
}

function yRThreeOne(start,o1,o2,y1,y2){
  yRThreeOnev=(start)*(1-o1)*(y1)*(o2)+(start)*(o1)*(1-o2)*(y1)+(1-start)*(y1)*(o1)*(o2);
  return yRThreeOnev;
}

function yRThreeTwo(start,o1,o2,y1,y2){
  yRThreeTwov=(start)*(o1)*(1-o2)*(1-y1)*(y1)+(start)*(1-o1)*(1-y1)*(y1)*(o2)+(1-start)*(1-y1)*(y1)*(o1)*(o2)+(1-start)*(y1)*(1-o1)*(y2)*(o2)+(1-start)*(y1)*(o1)*(1-o2)*(y2)+(start)*(1-o1)*(y1)*(1-o2)*(y2);
  return yRThreeTwov;
}

function yRTwoThree(start,o1,o2,y1,y2){
  yRTwoThreev=(1-start)*(1-y1)*(y1)*(o1)*(1-o2)+(1-start)*(y1)*(o1)*(1-o2)*(1-y2)+(start)*(o1)*(1-o2)*(1-y1)*(1-y1)+(start)*(1-o1)*(y1)*(1-o2)*(1-y2)+(start)*(1-o1)*(1-y1)*(y1)*(1-o2)+(1-start)*(y1)*(1-o1)*(y2)*(1-o2);
  return yRTwoThreev;
}

function yROneThree(start,o1,o2,y1,y2){
  yROneThreev=(1-start)*(y1)*(1-o1)*(1-y2)+(1-start)*(1-y1)*(y1)*(1-o1)+(start)*(1-o1)*(1-y1)*(1-y1);
  return yROneThreev;
}

function yRZeroThree(start,o1,o2,y1,y2){
  yRZeroThreev=(1-start)*(1-y1)*(1-y1);
  return yRZeroThreev;
}

function eRThreeZero(start,o1,o2,y1,y2){
  eRThreeZerov=(start)*(o1)*(o1);
  return eRThreeZerov;
}

function eRThreeOne(start,o1,o2,y1,y2){
  eRThreeOnev=(start)*(1-o1)*(y1)*(o2)+(start)*(o1)*(1-o1)*(y1)+(1-start)*(y1)*(o1)*(o1);
  return eRThreeOnev;
}

function eRThreeTwo(start,o1,o2,y1,y2){
  eRThreeTwov=(start)*(o1)*(1-o1)*(1-y1)*(y2)+(start)*(1-o1)*(1-y1)*(y2)*(o2)+(1-start)*(1-y1)*(y2)*(o1)*(o1)+(1-start)*(y1)*(1-o1)*(y2)*(o2)+(1-start)*(y1)*(o1)*(1-o1)*(y2)+(start)*(1-o1)*(y1)*(1-o2)*(y2);
  return eRThreeTwov;
}

function eRTwoThree(start,o1,o2,y1,y2){
  eRTwoThreev=(1-start)*(1-y1)*(y2)*(o1)*(1-o1)+(1-start)*(y1)*(o1)*(1-o1)*(1-y2)+(start)*(o1)*(1-o1)*(1-y1)*(1-y2)+(start)*(1-o1)*(y1)*(1-o2)*(1-y2)+(start)*(1-o1)*(1-y1)*(y2)*(1-o2)+(1-start)*(y1)*(1-o1)*(y2)*(1-o2);
  return eRTwoThreev;
}

function eROneThree(start,o1,o2,y1,y2){
  eROneThreev=(1-start)*(y1)*(1-o1)*(1-y2)+(1-start)*(1-y1)*(y2)*(1-o1)+(start)*(1-o1)*(1-y1)*(1-y2);
  return eROneThreev;
}

function eRZeroThree(start,o1,o2,y1,y2){
  eRZeroThreev=(1-start)*(1-y1)*(1-y2);
  return eRZeroThreev;
}

function eRWin5(start,o1,o2,y1,y2){
  winChance=(eRThreeZero(start,o1,o2,y1,y2)+eRThreeOne(start,o1,o2,y1,y2)+eRThreeTwo(start,o1,o2,y1,y2));
  return winChance;
}

function eRLose5(start,o1,o2,y1,y2){
  loseChance=eRTwoThree(start,o1,o2,y1,y2)+eROneThree(start,o1,o2,y1,y2)+eRZeroThree(start,o1,o2,y1,y2);
  return loseChance;
}

function yRWin5(start,o1,o2,y1,y2){
  winChance=(yRThreeZero(start,o1,o2,y1,y2)+yRThreeOne(start,o1,o2,y1,y2)+yRThreeTwo(start,o1,o2,y1,y2));
  return winChance;
}

function yRLose5(start,o1,o2,y1,y2){
  loseChance=yRTwoThree(start,o1,o2,y1,y2)+yROneThree(start,o1,o2,y1,y2)+yRZeroThree(start,o1,o2,y1,y2);
  return loseChance;
}
