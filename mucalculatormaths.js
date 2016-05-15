yRepick = false;
oRepick = false;

starter = 0.5;
ocp1 = 0.5;
ocp2 = 0.5;
ycp1 = 0.5;
ycp2 = 0.5;

function twoZero(){
  if(ocp1<ocp2){
    ocp1=ocp2;
  }
  if(ycp1>ycp2){
    ycp1=ycp2;
  }
  var twoZerov = (starter)*(ocp1);
  return twoZerov;
}

function twoOne(){
  if(ocp1<ocp2){
    ocp1=ocp2;
  }
  if(ycp1>ycp2){
    ycp1=ycp2;
  }
  twoOnev = (starter)*(1-ocp1)*(ycp1)+(1-starter)*(ycp1)*(ocp1);
  return twoOnev;
}

function oneTwo(){
  if(ocp1<ocp2){
    ocp1=ocp2;
  }
  if(ycp1>ycp2){
    ycp1=ycp2;
  }
  oneTwov = (starter)*(1-ocp1)*(1-ycp1)+(1-starter)*(ycp1)*(1-ocp1);
  return oneTwov;
}

function zeroTwo(){
  if(ocp1<ocp2){
    ocp1=ocp2;
  }
  if(ycp1>ycp2){
    ycp1=ycp2;
  }
  zeroTwov = (1-starter)*(1-ycp1);
  return zeroTwov;
}


function rThreeZero(){
  rThreeZerov = (starter)*(ocp1)*(ocp1);
  return rThreeZerov;
}


function rThreeOne(){
  rThreeOnev = (starter)*(1-ocp1)*(ycp1)*(ocp2)+(starter)*(ocp1)*(1-ocp1)*(ycp1)+(1-starter)*(ycp1)*(ocp1)*(ocp1);
  return rThreeOnev;
}

function rThreeTwo(){
  rThreeTwov = (starter)*(ocp1)*(1-ocp1)*(1-ycp1)*(ycp1)+(starter)*(1-ocp1)*(1-ycp1)*(ycp1)*(ocp2) +(1-starter)*(1-ycp1)*(ycp1)*(ocp1)*(ocp1)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp1)*(ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(ycp2);
  return rThreeTwov
}

function rTwoThree(){
  rTwoThreev=(1-starter)*(1-ycp1)*(ycp1)*(ocp1)*(1-ocp1)+(1-starter)*(ycp1)*(ocp1)*(1-ocp1)*(1-ycp2)+(starter)*(ocp1)*(1-ocp1)*(1-ycp1)*(1-ycp1)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(1-ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp1)*(1-ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(1-ocp2);
  return rTwoThreev;
}

function rOneThree(){
  rOneThreev=(1-starter)*(ycp1)*(1-ocp1)*(1-ycp2)+(1-starter)*(1-ycp1)*(ycp1)*(1-ocp1)+(starter)*(1-ocp1)*(1-ycp1)*(1-ycp1);
  return rOneThreev;
}

function rZeroThree(){
  rZeroThreev=(1-starter)*(1-ycp1)*(1-ycp1);
  return rZeroThreev;
}

function win3(){
  winChance = (twoZero())+(twoOne());
  return winChance;
}

function lose3(){
  loseChance=(oneTwo())+(zeroTwo());
  return loseChance;
}

function rWin5(){
  winChance=(rThreeZero()+rThreeOne()+rThreeTwo());
  return winChance;
}

function rLose5(){
  loseChance=rTwoThree()+rOneThree()+rZeroThree();
  return loseChance;
}

function threeZero(){
  threeZerov=(starter)*(ocp1)*(ocp2);
  return threeZerov;
}


function threeOne(){
  threeOnev=(starter)*(1-ocp1)*(ycp1)*(ocp2)+(starter)*(ocp1)*(1-ocp2)*(ycp1)+(1-starter)*(ycp1)*(ocp1)*(ocp2);
  return threeOnev;
}

function threeTwo(){
  threeTwov=(starter)*(ocp1)*(1-ocp2)*(1-ycp1)*(ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp2)*(ocp2)+(1-starter)*(1-ycp1)*(ycp2)*(ocp1)*(ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp2)*(ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(ycp2);
  return threeTwov;
}

function twoThree(){
  twoThreev=(1-starter)*(1-ycp1)*(ycp2)*(ocp1)*(1-ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp2)*(1-ycp2)+(starter)*(ocp1)*(1-ocp2)*(1-ycp1)*(1-ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(1-ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp2)*(1-ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(1-ocp2);
  return twoThreev;
}

function oneThree(){
  oneThreev=(1-starter)*(ycp1)*(1-ocp1)*(1-ycp2)+(1-starter)*(1-ycp1)*(ycp2)*(1-ocp1)+(starter)*(1-ocp1)*(1-ycp1)*(1-ycp2);
  return oneThreev;
}

function zeroThree(){
  zeroThreev=(1-starter)*(1-ycp1)*(1-ycp2);
  return zeroThreev;
}

function win3(){
  winChance=(twoZero())+(twoOne());
  return winChance;
}

function lose3(){
  loseChance=(oneTwo())+(zeroTwo());
  return loseChance;
}

function win5(){
  winChance=(threeZero()+threeOne()+threeTwo());
  return winChance;
}

function lose5(){
  loseChance=twoThree()+oneThree()+zeroThree();
  return loseChance;
}

function yRThreeZero(){
  yRThreeZerov=(starter)*(ocp1)*(ocp2);
  return yRThreeZerov;
}

function yRThreeOne(){
  yRThreeOnev=(starter)*(1-ocp1)*(ycp1)*(ocp2)+(starter)*(ocp1)*(1-ocp2)*(ycp1)+(1-starter)*(ycp1)*(ocp1)*(ocp2);
  return YRThreeOnev;
}

function yRThreeTwo(){
  yRThreeTwov=(starter)*(ocp1)*(1-ocp2)*(1-ycp1)*(ycp1)+(starter)*(1-ocp1)*(1-ycp1)*(ycp1)*(ocp2)+(1-starter)*(1-ycp1)*(ycp1)*(ocp1)*(ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp2)*(ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(ycp2);
  return yRThreeTwov;
}

function yRTwoThree(){
  yRTwoThreev=(1-starter)*(1-ycp1)*(ycp1)*(ocp1)*(1-ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp2)*(1-ycp2)+(starter)*(ocp1)*(1-ocp2)*(1-ycp1)*(1-ycp1)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(1-ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp1)*(1-ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(1-ocp2);
  return yRTwoThreev;
}

function yROneThree(){
  yROneThreev=(1-starter)*(ycp1)*(1-ocp1)*(1-ycp2)+(1-starter)*(1-ycp1)*(ycp1)*(1-ocp1)+(starter)*(1-ocp1)*(1-ycp1)*(1-ycp1);
  return yROneThreev;
}

function yRZeroThree(){
  yRZeroThreev=(1-starter)*(1-ycp1)*(1-ycp1);
  return yRZeroThreev;
}

function eRThreeZero(){
  eRThreeZerov=(starter)*(ocp1)*(ocp1);
  return eRThreeZerov;
}

function eRThreeOne(){
  eRThreeOnev=(starter)*(1-ocp1)*(ycp1)*(ocp2)+(starter)*(ocp1)*(1-ocp1)*(ycp1)+(1-starter)*(ycp1)*(ocp1)*(ocp1);
  return eRThreeOnev;
}

function eRThreeTwo(){
  eRThreeTwov=(starter)*(ocp1)*(1-ocp1)*(1-ycp1)*(ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp2)*(ocp2)+(1-starter)*(1-ycp1)*(ycp2)*(ocp1)*(ocp1)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(ocp2)+(1-starter)*(ycp1)*(ocp1)*(1-ocp1)*(ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(ycp2);
  return eRThreeTwov;
}

function eRTwoThree(){
  eRTwoThreev=(1-starter)*(1-ycp1)*(ycp2)*(ocp1)*(1-ocp1)+(1-starter)*(ycp1)*(ocp1)*(1-ocp1)*(1-ycp2)+(starter)*(ocp1)*(1-ocp1)*(1-ycp1)*(1-ycp2)+(starter)*(1-ocp1)*(ycp1)*(1-ocp2)*(1-ycp2)+(starter)*(1-ocp1)*(1-ycp1)*(ycp2)*(1-ocp2)+(1-starter)*(ycp1)*(1-ocp1)*(ycp2)*(1-ocp2);
  return eRTwoThreev;
}

function eROneThree(){
  eROneThreev=(1-starter)*(ycp1)*(1-ocp1)*(1-ycp2)+(1-starter)*(1-ycp1)*(ycp2)*(1-ocp1)+(starter)*(1-ocp1)*(1-ycp1)*(1-ycp2);
  return eROneThreev;
}

function eRZeroThree(){
  eRZeroThreev=(1-starter)*(1-ycp1)*(1-ycp2);
  return eRZeroThreev;
}

function eRWin5(){
  winChance=(eRThreeZero()+eRThreeOne()+eRThreeTwo());
  return winChance;
}

function eRLose5(){
  loseChance=eRTwoThree()+eROneThree()+eRZeroThree();
  return loseChance;
}

function yRWin5(){
  winChance=(yRThreeZero()+yRThreeOne()+yRThreeTwo());
  return winChance;
}

function yRLose5(){
  loseChance=yRTwoThree()+yROneThree()+yRZeroThree();
  return loseChance;
}
