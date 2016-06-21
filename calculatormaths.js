function Hit(percent, damagestaled, damageunstaled, growth, base, setKnockback, trajectory, character, version, xPos, yPos, crouch, reverse, chargeInterrupt, tdiX, tdiY, fadeIn, doubleJump, sdix, sdiy, zdix, zdiy, adix, adiy, meteorCancel, vcancel, grounded, metal, ice, icg, isThrow, throwChar, throwType, combo, comboFrame) {

    /******* Internal functions start *******/
    var groundDownHit = false;
    var groundDownHitType;
    //Calculates base knockback from hit
    //Formula taken from http://www.ssbwiki.com/Knockback#Formula
    function getReleasePoint(xPos,yPos,character,throwChar,throwType,reverse,version,grounded){
      //Release Point = ThrowN + TransN + CharOffset
      var rpX = 0;
      var rpY = 0;

      var release = throwFrames[throwChar][throwType+"throw"].release;
      var firstActionable = throwFrames[throwChar][throwType+"throw"].firstA;

      // if weight dependent
      if (throwFrames[throwChar].weight[throwType]){
        //animation frame per game frame
        var animPerGame = 1/(characters[character][version+"weight"]/100);
        var animRelFrame = release + animPerGame - (release % animPerGame);

        //use mod 1, so interpolations above 1.00 will be calculated properly
        var interpolation = (animRelFrame - release) % 1;

        var diffXthrowN = throwAnim[throwChar][throwType+"throw"]["f"+Math.ceil(animRelFrame)].throwN[0] - throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].throwN[0];
        var diffYthrowN = throwAnim[throwChar][throwType+"throw"]["f"+Math.ceil(animRelFrame)].throwN[1] - throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].throwN[1];

        var interThrowNx = diffXthrowN * interpolation;
        var interThrowNy = diffYthrowN * interpolation;

        rpX += interThrowNx + throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].throwN[0];
        rpY += interThrowNy + throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].throwN[1];

        if (typeof throwAnim[throwChar][throwType+"throw"]["f"+release].transN !== "undefined"){
          var diffXtransN = throwAnim[throwChar][throwType+"throw"]["f"+Math.ceil(animRelFrame)].transN[0] - throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].transN[0];
          var diffYtransN = throwAnim[throwChar][throwType+"throw"]["f"+Math.ceil(animRelFrame)].transN[1] - throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].transN[1];

          var interTransNx = diffXtransN * interpolation;
          var interTransNy = diffYtransN * interpolation;

          rpX += interTransNx + throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].transN[0];
          rpY += interTransNy + throwAnim[throwChar][throwType+"throw"]["f"+Math.floor(animRelFrame)].transN[1];
        }
        /*trig
        release = 8.6528;
        frame1 = Math.floor(release);
        frame2 = Math.ceil(release);
        interMulti = release - frame1;
        adj = throwAnim[throwChar][throwType+"throw"]["f"+frame2].throwN[0] - throwAnim[throwChar][throwType+"throw"]["f"+frame1].throwN[0];
        opp = throwAnim[throwChar][throwType+"throw"]["f"+frame2].throwN[1] - throwAnim[throwChar][throwType+"throw"]["f"+frame1].throwN[1];
        hyp = Math.sqrt((adj*adj)+(opp*opp));
        theta = Math.atan(opp/adj);
        interHyp = hyp * interMulti;
        interX = Math.cos(theta) * interHyp;
        interY = Math.sin(theta) * interHyp;
        rpX += interX;
        rpY += interY;*/
      }
      else {
        //if throwN exists
        if (typeof throwAnim[throwChar][throwType+"throw"]["f"+release].throwN !== "undefined"){
          rpX += throwAnim[throwChar][throwType+"throw"]["f"+release].throwN[0];
          rpY += throwAnim[throwChar][throwType+"throw"]["f"+release].throwN[1];
        }
        // if transN exists
        if (typeof throwAnim[throwChar][throwType+"throw"]["f"+release].transN !== "undefined"){
          rpX += throwAnim[throwChar][throwType+"throw"]["f"+release].transN[0];
          rpY += throwAnim[throwChar][throwType+"throw"]["f"+release].transN[1];
        }
      }

      rpX += throwOffsets[character][0];
      rpY += throwOffsets[character][1];

      if (reverse){
        rpX *= -1;
      }

      if (grounded && rpY < 0){
        rpY = 0;
      }

      return [(xPos+rpX),(yPos+rpY)];
    }

    function getKnockback(percent, damagestaled, damageunstaled, weight, growth, base, setKnockback, crouch, chargeInterrupt, vcancel, grounded, trajectory, metal, ice, isThrow, character) {

      if (isThrow){
        weight = 100;
      }

      if (setKnockback == 0){
        //var percent = percent + damage;
        //var kb = ((((((percent / 10) + ((percent * damage) / 20)) * (200 / (weight + 100)) * 1.4) + 18) * (growth / 100)) + base);

        var kb = ((0.01 * growth) * ((1.4 * (((0.05 * (damageunstaled * (damagestaled + Math.floor(percent)))) + (damagestaled + Math.floor(percent)) * 0.1) * (2.0 - (2.0 * (weight * 0.01)) / (1.0 + (weight * 0.01))))) + 18) + base);

        //var kb = ((0.01 * knockback growth) * ((1.4 * (((0.05 * (attack damage unstaled * (attack damage staled + floor(current damage)))) + (attack damage staled + floor(current damage)) * 0.1) * (2.0 - (2.0 * (weight * 0.01)) / (1.0 + (weight * 0.01))))) + 18) + base knockback);
      }
      else {
        var kb = ((((setKnockback * 10 / 20) + 1) * 1.4 * (200/(weight + 100)) + 18) * (growth / 100)) + base;
      }
      if (crouch) {
        kb *= 0.667;
      }
      if (chargeInterrupt){
        kb *= 1.2;
      }
      if (vcancel){
        kb *= 0.95;
      }
      if (ice){
        kb *= 0.25;
      }
      if (metal){
        kb -= 30;
        if (kb < 0){
          kb = 0;
        }
      }
      if (character == "Nana"){
        kb -= 5;
        if (kb < 0){
          kb = 0;
        }
      }
      if (kb > 2500){
        kb = 2500;
      }
      if ((trajectory > 180 && trajectory != 361) && grounded){
        if (kb >= 80){
          kb *= 0.8;
          groundDownHitType = "Fly";
        }
        else {
          groundDownHitType = "Stay";
        }
        groundDownHit = true;
      }

      return kb;
    }

    //Calculates Sakurai angle for grounded opponents. Once support for different starting points exists, will need a check for in air / on ground
    //Function by Yeroc
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

          //$("#debugdIAngle").empty().append(diAngle);
          //$("#debugrAngle").empty().append(rAngle);
        }
        else {
          var angleOffset = 0;
        }
        var newtraj = trajectory - angleOffset;
        if (newtraj < 0.01){
          newtraj = 0;
        }

        //$("#debugAngle").empty().append(angleOffset);
        //var fCall = parseInt($("#debugFCall").text());
        //$("#debugFCall").empty().append((fCall+1));
        return newtraj;

    }

    //The initial horizontal velocity the hit causes
    function getHorizontalVelocity(knockback, angle) {
        var initialVelocity = knockback * 0.03;
        var horizontalAngle = Math.cos(angle * angleConversion);
        var horizontalVelocity = initialVelocity * horizontalAngle;
        horizontalVelocity = Math.round(horizontalVelocity * 100000) / 100000;
        return horizontalVelocity;
    }

    //The initial vertical velocity the hit causes
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

    var meteorCancelled = false;
    var stayGrounded = false;
    var yDisplacement = 0;
    var reduceByTraction = false;
    //Calculate position for every frame of hitstun
    function knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos, fadeIn, doubleJump, sdiVector, zdiVector, asdiVector, trajectory, meteorCancel, grounded, angle, releasePoint, icg) {
        var positions = [];
        var hPos = releasePoint[0];
        var vPos = releasePoint[1];
        var horVelChar = 0;
        var verVelChar = 0;
        var horVelKB = horizontalVelocity;
        var verVelKB = verticalVelocity;
        if (icg){
          verVelKB = 0;
        }
        var extendedDisplay = 0;
        //Gravity only plays into effect until max fallspeed is reached.
        var gravityFrames = Math.floor(characters[character]["terminalVelocity"] / characters[character]["gravity"]);
        //Since gravity generally doesn't divide into max fallspeed evenly, we have a < gravity frame
        var lastGravityFrame = characters[character]["terminalVelocity"] % characters[character]["gravity"];

        if (trajectory >= 260 && trajectory <= 280 && meteorCancel && !icg){
          hitstun = 8;
          meteorCancelled = true;
        }
        if (grounded && (trajectory == 0 || trajectory == 180) && knockback < 80){
          verVelKB = 0;
          //prompt("test");
          reduceByTraction = true;
        }

        if (groundDownHit){
          if (groundDownHitType == "Stay"){
            verVelKB = 0;
            reduceByTraction = true;
          }
          else {
            verVelKB = Math.abs(verVelKB);
            verticalDecay = Math.abs(verticalDecay);
          }
        }

        for (var i=0; i<hitstun; i++) {
          if (reduceByTraction){
            if (horVelKB != 0){
              if (horVelKB > 0){
                horVelKB -= characters[character]["traction"];
                if (horVelKB < 0){
                  horVelKB = 0;
                }
              }
              else {
                horVelKB += characters[character]["traction"];
                if (horVelKB > 0){
                  horVelKB = 0;
                }
              }
            }
          }
          else {
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

            if (i < gravityFrames) {
                verVelChar -= characters[character]["gravity"];
            }
            else if (i === gravityFrames) {
                verVelChar -= lastGravityFrame;
            }
          }

            hPos = hPos + horVelChar + horVelKB;
            vPos = vPos + verVelChar + verVelKB;




            if (i == 0){
              hPos += sdiVector[0] + zdiVector[0] + asdiVector[0];
              vPos += sdiVector[1] + zdiVector[1] + asdiVector[1];
              if (asdiVector[1] < 0 && grounded && (verVelChar + verVelKB + asdiVector[1] + sdiVector[1] + zdiVector[1] < 0) && (trajectory < 180 || trajectory == 361)){
                stayGrounded = true;
                yDisplacement = verVelChar + verVelKB + asdiVector[1] + sdiVector[1] + zdiVector[1];
                break;
              }
            }
            positions.push([hPos, vPos, horVelKB, verVelKB, horVelChar, verVelChar]);
        }

        var hasDoubleJumped = false;
        var e = 0;

        while ((Math.abs(horVelKB) > 0.001 || Math.abs(verVelKB) > 0.001 || (meteorCancelled && extendedDisplay < 25)) && !stayGrounded){

          if (reduceByTraction){
            if (horVelKB != 0){
              if (horVelKB > 0){
                horVelKB -= characters[character]["traction"];
                if (horVelKB < 0){
                  horVelKB = 0;
                }
              }
              else {
                horVelKB += characters[character]["traction"];
                if (horVelKB > 0){
                  horVelKB = 0;
                }
              }
            }
          }
          else {

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

          if (i < gravityFrames) {
              verVelChar -= characters[character]["gravity"];
          }
          else if (i == gravityFrames) {
              verVelChar -= lastGravityFrame;
          }

          if (meteorCancelled){
            horVelKB = 0;
            verVelKB = 0;
            extendedDisplay++;
          }

          if (doubleJump && !hasDoubleJumped){
            if (characters[character]["djSetY"]){
              verVelChar = characters[character]["djInitY"][e];
              if (characters[character]["djSetX"]){
                if (hPos > 0){
                  horVelChar += -characters[character]["djXValues"][e];
                }
                else if (hPos < 0){
                  horVelChar += characters[character]["djXValues"][e];
                }
              }
              e++;
            }
            else {
              verVelChar = characters[character]["djInitY"];
              if (fadeIn){
                if (hPos > 0){
                  horVelChar = -characters[character]["djInitX"];
                }
                else if (hPos < 0){
                  horVelChar = characters[character]["djInitX"];
                }
              }
              hasDoubleJumped = true;
            }
          }

          if (hasDoubleJumped){
            verVelChar -= characters[character]["gravity"];
            if (verVelChar < -characters[character]["terminalVelocity"]){
              verVelChar = -characters[character]["terminalVelocity"];
            }
          }



          if (fadeIn){

            if (hPos > 0){
              if (horVelChar < -characters[character]["driftMax"]){
                horVelChar += characters[character]["airFriction"];
                if (horVelChar > -characters[character]["driftMax"]){
                  horVelChar = -characters[character]["driftMax"];
                }
              }
              else {
                horVelChar -= characters[character]["driftAcc"];
                if (horVelChar < -characters[character]["driftMax"]){
                  horVelChar = -characters[character]["driftMax"];
                }
              }
            }
            else if (hPos < 0){
              if (horVelChar > characters[character]["driftMax"]){
                horVelChar -= characters[character]["airFriction"];
                if (horVelChar < characters[character]["driftMax"]){
                  horVelChar = characters[character]["driftMax"];
                }
              }
              else {
                horVelChar += characters[character]["driftAcc"];
                if (horVelChar > characters[character]["driftMax"]){
                  horVelChar = characters[character]["driftMax"];
                }
              }
            }
          }
        }
          i++;

          hPos = hPos + horVelChar + horVelKB;
          vPos = vPos + verVelChar + verVelKB;
          positions.push([hPos, vPos, horVelKB, verVelKB, horVelChar, verVelChar]);
        }

        return positions;
    }

    //Rate at which horizontal velocity decreases
    function getHorizontalDecay(angle) {
      var decay = 0.051 * Math.cos(angle * angleConversion)
      decay = Math.round(decay * 100000) / 100000;
      return decay;
    }

    //Rate at which vertical velocity decreases
    //Gravity also plays a role, but that is done in knockbackTravel
    function getVerticalDecay(angle) {
      var decay = 0.051 * Math.sin(angle * angleConversion)
      decay = Math.round(decay * 100000) / 100000;
      return decay;
    }

    //Frames of hitstun
    function getHitstun(knockback) {
      if (groundDownHitType == "Fly"){
        knockback *= 1.25;
      }
      return Math.floor(knockback * .4);
    }

    function calculateSDI(x,y,type,grounded,knockback,trajectory){

      /*If (xjoy * xjoy) + (yjoy * yjoy) < (0.7 * 0.7)
      Then apply no Smash DI.
      If cardinal direction change has not occurred in last 4 frames, then apply no smash DI.
      - Applying Smash DI -
      Set frames since last cardinal direction change for x & y to 254 frames.
      TopN x change = xjoy * 6.0
      TopN y change = yjoy * 6.0*/
      //prompt(grounded);
      if (x < 0.2875 && x > -0.2875){
        x = 0;
      }
      if (y < 0.2875 && y > -0.2875){
        y = 0;
      }
      if (((x * x) + (y * y)) < (0.7 * 0.7)){
        var xDistance = 0;
        var yDistance = 0;
      }
      else {
        var xDistance = 6.0 * x;
        var yDistance = 6.0 * y;
        if (type == "a"){
          xDistance *= 0.5;
          yDistance *= 0.5;
        }
        else if (grounded && yDistance < 0){
          yDistance = 0;
        }

        if (groundDownHit){
          if (groundDownHitType == "Stay" && yDistance > 0){
            yDistance = 0;
          }
          if (yDistance < 0){
            yDistance = 0;
          }
        }

        if (grounded && knockback < 80 && (trajectory == 0 || trajectory == 180)){
          yDistance = 0;
        }
      }
      return [xDistance, yDistance];
    }

    function transformComboVelocity(hit2x,hit2y,combo,comboFrame){
      var hit1x = t["t"+combo].curPositions[comboFrame][2];
      var hit1y = t["t"+combo].curPositions[comboFrame][3];
      var newHitx = 0;
      var newHity = 0;
      if (Math.sign(hit1x) == Math.sign(hit2x)){
        if (Math.abs(hit1x) > Math.abs(hit2x)){
          newHitx = hit1x;
        }
        else {
          newHitx = hit2x;
        }
      }
      else {
        newHitx = hit1x + hit2x;
      }
      if (Math.sign(hit1y) == Math.sign(hit2y)){
        if (Math.abs(hit1y) > Math.abs(hit2y)){
          newHity = hit1y;
        }
        else {
          newHity = hit2y;
        }
      }
      else {
        newHity = hit1y + hit2y;
      }
      return [newHitx,newHity];
    }

    function getNewAngle(x,y){
      // adj = x
      // opp = y

      var angle = Math.atan(Math.abs(y)/Math.abs(x));
      angle *= (180 / Math.PI);
      //prompt(angle);
      if (Math.sign(y) < 0){
        //angle += 180;
        if (Math.sign(x) > 0){
          angle = 360 - angle;
        }
        else {
          angle += 180;
        }
      }
      else if (Math.sign(x) < 0){
        angle = 180 - angle;
      }
      //prompt(angle);

      return angle;
    }

    function getNewKnockback(angle,horVel){
      /*var initialVelocity = knockback * 0.03;
      var horizontalAngle = Math.cos(angle * angleConversion);
      var horizontalVelocity = initialVelocity * horizontalAngle;
      horizontalVelocity = Math.round(horizontalVelocity * 100000) / 100000;
      return horizontalVelocity;*/

      var horAngle = Math.cos(angle*angleConversion);
      var initVel = Math.abs(horVel/horAngle);
      //console.log(horAngle);
      //console.log(initVel);
      //totalVel = Math.abs(horVel)+Math.abs(verVel);

      return initVel/0.03;

    }

    function getThrowFrames(throwChar,throwType,character){
      var release = throwFrames[throwChar][throwType+"throw"].release;
      var firstActionable = throwFrames[throwChar][throwType+"throw"].firstA;
      if (throwFrames[throwChar].weight[throwType]){
        release = Math.ceil(release*characters[character][version+"weight"]/100);
        firstActionable = Math.ceil(firstActionable*characters[character][version+"weight"]/100);
      }

      release += throwFrames[throwChar][throwType+"throw"].hLag;
      firstActionable += throwFrames[throwChar][throwType+"throw"].hLag;

      var totalLag = firstActionable - release;
      //console.log(totalLag);
      return [release,totalLag];
    }

		/******* Internal functions end *******/

		/******* Constants start *******/

    //Constant we multiply degrees against to get radians (for Math object)
    var angleConversion = Math.PI / 180;

    //Ugly, but if I use proper JSON spacing this would be like 3 pages long

    /******* Constants end *******/



    /******* Variable setup start *******/

    if (!characters[character]) {
        throw("Bad character name given. Aborting.");
    }

    var weight;

    if (version == "NTSC") {
        weight = characters[character]["NTSCweight"];
    }

    else {
        weight = characters[character]["PALweight"];
    }

    var gravity = characters[character]["gravity"];

    if (isThrow){
      var releasePoint = getReleasePoint(xPos,yPos,character,throwChar,throwType,reverse,version,grounded);
      var tFrames = getThrowFrames(throwChar,throwType,character);
    }
    else {
      var releasePoint = [xPos,yPos];
      var tFrames = [-1,-1];
    }

    var knockback = getKnockback(percent, damagestaled, damageunstaled, weight, growth, base, setKnockback, crouch, chargeInterrupt, vcancel, grounded, trajectory, metal, ice, isThrow, character);
    var oldknockback = knockback;

    var hitstun = getHitstun(knockback);

    //console.log("Knockback = "+knockback);

    var horizontalVelocity;
    var verticalVelocity;

    if (combo > 0 && comboFrame > 8){
      trajectory = getAngle(trajectory,knockback,reverse, 0, 0);
      //console.log("trajectory = "+trajectory);
      horizontalVelocity = getHorizontalVelocity(knockback, trajectory, gravity);
      verticalVelocity = getVerticalVelocity(knockback, trajectory, gravity, grounded);
      //console.log("horVel = "+horizontalVelocity);
      //console.log("verVel = "+verticalVelocity);
      var newVector = transformComboVelocity(horizontalVelocity,verticalVelocity,combo,comboFrame);
      horizontalVelocity = newVector[0];
      verticalVelocity = newVector[1];
      //console.log("newhorVel = "+horizontalVelocity);
      //console.log("newverVel = "+verticalVelocity);
      trajectory = getNewAngle(horizontalVelocity,verticalVelocity);
      //console.log("newTrajectory = "+trajectory);
      //var angle = getAngle(newAngle, knockback, reverse, tdiX, tdiY);
      knockback = getNewKnockback(trajectory,horizontalVelocity);
      //console.log("newKnockback = "+knockback);
      reverse = false;
    }
    var angle = getAngle(trajectory, knockback, reverse, tdiX, tdiY);
    //console.log("angle = "+angle);
    horizontalVelocity = getHorizontalVelocity(knockback, angle, gravity);
    verticalVelocity = getVerticalVelocity(knockback, angle, gravity, grounded);

    //console.log("horVel = "+horizontalVelocity);
    //console.log("verVel = "+verticalVelocity);


    var horizontalDecay = getHorizontalDecay(angle);
    if (combo > 0){
      //prompt(horizontalDecay);
    }

    var verticalDecay = getVerticalDecay(angle);

    if (combo > 0){
      //prompt(verticalDecay);
    }

    var sdiVector = calculateSDI(sdix,sdiy,"s",grounded,knockback,trajectory);

    var zdiVector = calculateSDI(zdix,zdiy,"s",grounded,knockback,trajectory);

    var asdiVector = calculateSDI(adix,adiy,"a",grounded,knockback,trajectory);

    this.positions = knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos, fadeIn, doubleJump, sdiVector, zdiVector, asdiVector, trajectory, meteorCancel, grounded, angle, releasePoint, icg);

    //prompt("test");

    this.hitstun = hitstun;
    if (combo > 0 && comboFrame > -1){
      this.knockback = oldknockback;
    }
    else {
      if (groundDownHitType == "Fly"){
        knockback /= 0.8;
      }
      this.knockback = knockback;
    }

    this.meteorCancelled = meteorCancelled;

    this.stayGrounded = stayGrounded;

    this.yDisplacement = yDisplacement;

    this.tFrames = tFrames;

    //Position on the last frame of hitstun. Not used yet, but potentially useful.
    //var endPosition = this.positions[this.positions.length - 1];

    /******* Variable setup end *******/

}
