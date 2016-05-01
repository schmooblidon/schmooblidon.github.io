angleConversion = Math.PI / 180;

function getHorizontalVelocity(knockback, angle) {
    var initialVelocity = knockback * 0.03;
    var horizontalAngle = Math.cos(angle * angleConversion);
    var horizontalVelocity = initialVelocity * horizontalAngle;
    horizontalVelocity = Math.round(horizontalVelocity * 100000) / 100000;
    return horizontalVelocity;
}

function getVerticalVelocity(knockback, angle,grounded) {
    var initialVelocity = knockback * 0.03;
    var verticalAngle = Math.sin(angle * angleConversion);
    var verticalVelocity = initialVelocity * verticalAngle;
    verticalVelocity = Math.round(verticalVelocity * 100000) / 100000;
    if (knockback < 80 && grounded && (trajectory == 0 || trajectory == 180)){
      verticalVelocity = 0;
    }
    return verticalVelocity;
}

function getHorizontalDecay(angle) {
  var decay = 0.051 * Math.cos(angle * angleConversion)
  decay = Math.round(decay * 100000) / 100000;
  return decay;
}

function getVerticalDecay(angle) {
  var decay = 0.051 * Math.sin(angle * angleConversion)
  decay = Math.round(decay * 100000) / 100000;
  return decay;
}

function getKnockback(hb,percent, c) {

  cl[c].damagestaled = hb.dmg;
  cl[c].damageunstaled = hb.dmg;

  if (cl[c].isThrow){
    weight = 100;
  }
  else {
    weight = characters[cl[c].character].NTSCweight;
  }

  if (hb.wbk == 0){
    //var percent = percent + damage;
    //var kb = ((((((percent / 10) + ((percent * damage) / 20)) * (200 / (weight + 100)) * 1.4) + 18) * (growth / 100)) + base);

    var kb = ((0.01 * hb.kg) * ((1.4 * (((0.05 * (cl[c].damageunstaled * (cl[c].damagestaled + Math.floor(percent)))) + (cl[c].damagestaled + Math.floor(percent)) * 0.1) * (2.0 - (2.0 * (weight * 0.01)) / (1.0 + (weight * 0.01))))) + 18) + hb.bk);
    console.log("kb = "+kb);

    //var kb = ((0.01 * knockback growth) * ((1.4 * (((0.05 * (attack damage unstaled * (attack damage staled + floor(current damage)))) + (attack damage staled + floor(current damage)) * 0.1) * (2.0 - (2.0 * (weight * 0.01)) / (1.0 + (weight * 0.01))))) + 18) + base knockback);
  }
  else {
    var kb = ((((hb.wbk * 10 / 20) + 1) * 1.4 * (200/(weight + 100)) + 18) * (hb.kg / 100)) + hb.bk;
  }
  if (cl[c].crouch) {
    kb *= 0.667;
  }
  if (cl[c].chargeInterrupt){
    kb *= 1.2;
  }
  if (cl[c].vcancel){
    kb *= 0.95;
  }
  if (cl[c].ice){
    kb *= 0.25;
  }
  if (cl[c].metal){
    kb -= 30;
    if (kb < 0){
      kb = 0;
    }
  }
  if (kb > 2500){
    kb = 2500;
  }
  if ((hb.angle > 180 && hb.angle != 361) && cl[c].grounded){
    if (kb >= 80){
      kb *= 0.8;
      cl[c].groundDownHitType = "Fly";
    }
    else {
      cl[c].groundDownHitType = "Stay";
    }
    cl[c].groundDownHit = true;
  }

  return kb;
}

function getAngle(trajectory, knockback, reverse, x, y) {
  //p = cos(a-arctan(x/y))*sqrt(x^2+y^2)
    var deadzone = false;
    if (knockback < 80 && grounded && (trajectory == 0 || trajectory == 180)){
      deadzone = true;
    }
    if (x < 0.2875 && x > -0.2875){
      x = 0;
    }
    if (y < 0.2875 && y > -0.2875){
      y = 0;
    }

    if (x == 0 && y < 0){
      diAngle = 270;
    }
    else if (x == 0 && y > 0){
      diAngle = 90;
    }
    else if (x == 0 && y == 0){
      deadzone = true;
    }
    else {
      diAngle = Math.atan(y/x) * (180 / Math.PI) * 1;
      if (x < 0){
        diAngle += 180;
      }
      else if (y < 0) {
        diAngle += 360;
      }
    }

    if (trajectory == 361) {
        if (knockback < 32.1) {
          if (reverse){
            trajectory = 180;
          }
          else {
            trajectory = 0;
          }
          sakurai = 0;
        }
        else if (knockback >= 32.1) {
          if (reverse){
            trajectory = 136;
          }
          else {
            trajectory = 44;
          }
          sakurai = 44;
        }
        else {
          prompt("Why would this ever get called?");
          trajectory = 440*(knockback-32);
          if (reverse){
            trajectory = 180 - trajectory;
              if (trajectory < 0){
                trajectory = 360 + trajectory;
              }
          }
        }
    }
    else {
      if (reverse){
        trajectory = 180 - trajectory;
          if (trajectory < 0){
            trajectory = 360 + trajectory;
          }
      }
    }

    if (!deadzone){
      var rAngle = trajectory - diAngle;
      if (rAngle > 180){
        rAngle -= 360;
      }

      var pDistance = Math.sin(rAngle * angleConversion) * Math.sqrt(x*x+y*y);

      var angleOffset = pDistance * pDistance * 18;
      if (angleOffset > 18){
        angleOffset = 18;
      }

      if (rAngle < 0 && rAngle > -180){
          angleOffset *= -1;
      }

    }
    else {
      var angleOffset = 0;
    }
    var newtraj = trajectory - angleOffset;
    if (newtraj < 0.01){
      newtraj = 0;
    }

    return newtraj;

}

function getDIAngles(angle){
  var angles = [];

  if ((angle > 73 && angle < 107) || (angle > 253 && angle < 287)){
    angles = [getAngle(angle,100,false,-1,0),getAngle(angle,100,false,1,0)];
  }
  else if ((angle > 163 && angle < 197) || (angle < 17 || angle > 343)){
    angles = [getAngle(angle,100,false,0,-1),getAngle(angle,100,false,0,1)];
  }
  else {
    if (angle < 18){
      angles = [angle+18,342+angle];
    }
    else if (angle > 342){
      angles = [angle-342,angle-18];
    }
    else {
      angles = [angle+18,angle-18];
    }
  }
  return angles;

}
