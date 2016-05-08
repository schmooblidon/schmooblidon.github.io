function calculatePercentFromKnockback(kb,hitbox,victim){
  var base = hitbox.bk;
  var growth = hitbox.kg;
  var damageunstaled = hitbox.dmg;
  var damagestaled = hitbox.dmg;
  var setKnockback = hitbox.wbk;
  var weight = characters[victim].NTSCweight;
  var knockback = kb;
  var percent = 0;
  if (setKnockback == 0){
    if (growth > 0){
      percent = ((-50*base*weight) - (5000 * base) - (7*growth*damagestaled*damageunstaled) - (14 * growth * damagestaled) - (9*growth*weight) - (900*growth) + (50*knockback*weight) + (5000 * knockback))/(7*growth*(damageunstaled + 2));
    }
    else {
      prompt("Can't divide by zero! This hitbox shouldn't exist");
      percent = 0;
    }
  }
  else {
    var knockback = ((((setKnockback * 10 / 20) + 1) * 1.4 * (200/(weight + 100)) + 18) * (growth / 100)) + base;
    if (knockback >= kb){
      percent = "Never";
    }
    else {
      percent = "Inf";
    }
  }
  return percent;
}

function findLiftUpKnockback (victim,angle){
  return ((characters[victim].gravity + 3 + (0.051 * Math.sin(angle*angleConversion))) / 0.03 ) / Math.sin(angle*angleConversion);
}

function findCrouchCancelPercent(hitbox,victim){
  var percent;
  var trajectory = hitbox.angle;
  if ((trajectory == 0 || trajectory >= 180) && trajectory != 361){
    percent = "Never";
  }
  else {
    var newAngle = getAngle(trajectory, 120, false, 0, -1.0);
    var liftUpKB = findLiftUpKnockback(victim,newAngle);
    //prompt(liftUpKB);
    if (liftUpKB < 80){
      percent = calculatePercentFromKnockback(liftUpKB*(3/2),hitbox,victim);
      prompt("Tell me if this gets called");
    }
    else {
      percent = calculatePercentFromKnockback(120,hitbox,victim);
    }
  }
  return percent;
}

function findASDIdownPercent(hitbox,victim){
  var percent;
  var trajectory = hitbox.angle;
  if ((trajectory == 0 || trajectory >= 180) && trajectory != 361){
    percent = "Never";
  }
  else {
    percent = calculatePercentFromKnockback(80,hitbox,victim);
  }
  return percent;
}

function findAmsahTechPercent(hitbox,victim,type){
  var percent;
  var trajectory = hitbox.angle;
  if ((trajectory == 0 || trajectory >= 180) && trajectory != 361){
    percent = "Inf";
  }
  else {
    var newAngle = getAngle(trajectory, 120, false, 0, -1.0);
    //prompt(newAngle);
    var liftUpKB = findLiftUpKnockback(victim,newAngle);
    //prompt(liftUpKB);
    percent = calculatePercentFromKnockback(liftUpKB,hitbox,victim);
  }
  return percent;
}

/*function findKillPercent(c,diType){

// find for X blastzone and Y blastzone and see which 1 comes first

  var percent;

  //Constants
  decay = 0.051;
  gravity = 0.23;
  terVel = 2.4;
  blastzone = 150;
  charVel = 0;

  kb -= 0.051;
  charVel -= grav; max = terVel;
}*/

function reverseAngle(angle){
  if (angle <= 180){
    return 180 - angle;
  }
  else {
    return 540 - angle;
  }
}

function calculatePositions(hb,percent,c,angle,savePositions){
  isKilled = false;
  knockback = getKnockback(hb,percent,c);
  cl[c].knockback = knockback;
  //console.log("Percent "+percent);
  hitstun = Math.floor(knockback * .4);
  cl[c].hitstun = hitstun;

  gravityFrames = Math.floor(characters[cl[c].character].terminalVelocity / characters[cl[c].character].gravity);
  lastGravityFrame = characters[cl[c].character].terminalVelocity % characters[cl[c].character].gravity;

  horVelKB = getHorizontalVelocity(knockback, angle, false);
  verVelKB = getVerticalVelocity(knockback, angle);
  //console.log("verVelKB = "+verVelKB);

  horizontalDecay = getHorizontalDecay(angle);
  verticalDecay = getVerticalDecay(angle);

  verVelChar = 0;
  horVelChar = 0;

  hPos = cl[c].mouseXMelee;
  vPos = cl[c].mouseYMelee;

  frame = 0;

  positions = [];


  while (Math.abs(horVelKB) > 0.001 || Math.abs(verVelKB) > 0.001){
    frame++;
    if (horVelKB != 0){
      if (horVelKB > 0){
        horVelKB -= horizontalDecay;
        if (horVelKB < 0){
          horVelKB = 0;
        }
      }
      else {
        horVelKB -= horizontalDecay;
        if (horVelKB > 0){
          horVelKB = 0;
        }
      }
    }
    if (verVelKB != 0){
      if (verVelKB > 0){
        verVelKB -= verticalDecay;
        if (verVelKB < 0){
          verVelKB = 0;
        }
      }
      else {
        verVelKB -= verticalDecay;
        if (verVelKB > 0){
          verVelKB = 0;
        }
      }
    }

    if (frame < gravityFrames+1) {
        verVelChar -= characters[cl[c].character].gravity;
    }
    else if (frame === gravityFrames+1) {
        verVelChar -= lastGravityFrame;
    }

    hPos = hPos + horVelChar + horVelKB;
    vPos = vPos + verVelChar + verVelKB;

    if (savePositions){
      positions.push([hPos,vPos]);
    }

    //console.log("hPos "+hPos);
    //console.log("vPos "+vPos);
    if (hPos > bz[cl[c].stage][1] || hPos < bz[cl[c].stage][3] || vPos < bz[cl[c].stage][2] || (vPos > bz[cl[c].stage][0] && verVelKB >= 2.4)){
      isKilled = true;
      break;
    }
  }
  if (savePositions){
    return positions;
  }
  else {
    return isKilled;
  }
}

function findKillPercent(hb,c,diType){
  var percent = 128;
  var iterations = 0;
  var foundPercent = false;
  var isKilled = false;
  var killNotPossible = false;
  var knockback;
  var hitstun;
  var angle = hb.angle;
  if (angle == 361){
    angle = 44;
  }
  if (cl[c].reverse){
    angle = reverseAngle(angle);
  }
  var angles = getDIAngles(angle);
  if (diType == "p"){
    angle = angles[0];
  }
  else if (diType == "b"){
    angle = angles[1];
  }
  var horVelKB;
  var verVelKB;
  var horizontalDecay;
  var verticalDecay;
  var verVelChar;
  var horVelChar;
  var gravityFrames;
  var lastGravityFrame;
  var hPos;
  var vPos;

  while (!foundPercent && !killNotPossible){

    isKilled = calculatePositions(hb,percent,c,angle,false);
    //foundPercent = true;
    //console.log("percent = "+percent);
    //console.log("isKilled = "+isKilled);
    //console.log("iteration = "+iterations);
    if (percent == 1024 && !isKilled){
      killNotPossible = true;
      break;
    }
    if (percent != 0 && (percent%128) == 0 && !isKilled){
      percent += 128;
    }
    else {
      if (iterations == 7){
        if (!isKilled){
          percent += 1;
        }
        foundPercent = true;
      }
      else {
        iterations++;
        if (isKilled){
          percent -= Math.floor(128/(Math.pow(2,iterations)));
        }
        else {
          percent += Math.floor(128/(Math.pow(2,iterations)));
        }
      }
    }

  }
  //return [percent,positions];
  return percent;
}

function findKillPositions(hb,c,diType){
  var percent = 128;
  var iterations = 0;
  var foundPercent = false;
  var isKilled = false;
  var killNotPossible = false;
  var knockback;
  var hitstun;
  var angle = hb.angle;
  if (angle == 361){
    angle = 44;
  }
  if (cl[c].reverse){
    angle = reverseAngle(angle);
  }
  var angles = getDIAngles(angle);
  if (diType == "p"){
    angle = angles[0];
  }
  else if (diType == "b"){
    angle = angles[1];
  }
  var horVelKB;
  var verVelKB;
  var horizontalDecay;
  var verticalDecay;
  var verVelChar;
  var horVelChar;
  var gravityFrames;
  var lastGravityFrame;
  var hPos;
  var vPos;

  return calculatePositions(hb,percent,c,angle,true);
}
