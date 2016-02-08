function Hit(percent, damage, growth, base, setKnockback, trajectory, character, version, xPos, yPos, crouch, reverse, chargeInterrupt, tdiX, tdiY, fadeIn, doubleJump) {

    /******* Internal functions start *******/

    //Calculates base knockback from hit
    //Formula taken from http://www.ssbwiki.com/Knockback#Formula
    function getKnockback(percent, damage, weight, growth, base, setKnockback, crouch, chargeInterrupt) {
      if (setKnockback == 0){
        var percent = percent + damage;
        var kb = ((((((percent / 10) + ((percent * damage) / 20)) * (200 / (weight + 100)) * 1.4) + 18) * (growth / 100)) + base);
      }
      else {
        var kb = setKnockback;
      }
      if (crouch) {
        kb *= 0.667;
      }
      if (chargeInterrupt){
        kb *= 1.2;
      }
      return kb;
    }

    //Calculates Sakurai angle for grounded opponents. Once support for different starting points exists, will need a check for in air / on ground
    //Function by Yeroc
    function getAngle(trajectory, knockback, reverse, x, y) {
      //p = cos(a-arctan(x/y))*sqrt(x^2+y^2)
        var deadzone = false;
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
            if (knockback < 32) {
              if (reverse){
                trajectory = 180;
              }
              else {
                trajectory = 0;
              }
              sakurai = 0;
            }
            else if (knockback > 32.1) {
              if (reverse){
                trajectory = 136;
              }
              else {
                trajectory = 44;
              }
              sakurai = 44;
            }
            else {
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

        //$("#debugAngle").empty().append(angleOffset);
        var fCall = parseInt($("#debugFCall").text());
        //$("#debugFCall").empty().append((fCall+1));

        return (trajectory - angleOffset);

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
    function getVerticalVelocity(knockback, angle) {
        var initialVelocity = knockback * 0.03;
        var verticalAngle = Math.sin(angle * angleConversion);
        var verticalVelocity = initialVelocity * verticalAngle;
        verticalVelocity = Math.round(verticalVelocity * 100000) / 100000;
        return verticalVelocity;
    }

    //Calculate position for every frame of hitstun
    function knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos, fadeIn, doubleJump) {
        var positions = [];
        var hPos = xPos;
        var vPos = yPos;
        var horVelChar = 0;
        var verVelChar = 0;
        var horVelKB = horizontalVelocity;
        var verVelKB = verticalVelocity;
        //Gravity only plays into effect until max fallspeed is reached.
        var gravityFrames = Math.floor(characters[character]["terminalVelocity"] / characters[character]["gravity"]);
        //Since gravity generally doesn't divide into max fallspeed evenly, we have a < gravity frame
        var lastGravityFrame = characters[character]["terminalVelocity"] % characters[character]["gravity"];

        for (var i=0; i<hitstun; i++) {
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
                verVelChar -= (lastGravityFrame * characters[character]["gravity"]);
            }

            hPos = hPos + horVelChar + horVelKB;
            vPos = vPos + verVelChar + verVelKB;
            positions.push([hPos, vPos, horVelKB, verVelKB, horVelChar, verVelChar]);
        }

        var hasDoubleJumped = false;
        var e = 0;

        while (Math.abs(horVelKB) > 0 || Math.abs(verVelKB) > 0){

          i++;

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
              verVelChar -= (lastGravityFrame * characters[character]["gravity"]);
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
        return Math.floor(knockback * .4);
    }

		/******* Internal functions end *******/

		/******* Constants start *******/

    //Constant we multiply degrees against to get radians (for Math object)
    var angleConversion = Math.PI / 180;

    //Ugly, but if I use proper JSON spacing this would be like 3 pages long
    var characters = {
        "Giga Bowser": {NTSCweight:140, PALweight: 140, gravity: 0.25, terminalVelocity: 2.4},
        "Bowser": {NTSCweight:117, PALweight: 118, gravity: 0.13, terminalVelocity: 1.9, driftAcc: 0.05, driftMax: 0.8, djInitX: 0.9, djInitY: 2.8, airFriction: 0.01, djSetY: false},
        "DK": {NTSCweight:114, PALweight: 114, gravity: 0.1, terminalVelocity: 2.4, driftAcc: 0.04, driftMax:1.0 , djInitX: 1.0, djInitY: 2.457, airFriction: 0.02, djSetY: false},
        "Samus": {NTSCweight:110, PALweight: 110, gravity: 0.066, terminalVelocity: 1.4, driftAcc: 0.0325, driftMax: 0.89, djInitX: 0.89, djInitY: 1.89, airFriction: 0.01, djSetY: false},
        "Ganon": {NTSCweight:109, PALweight: 109, gravity: 0.13, terminalVelocity: 2, driftAcc: 0.06, driftMax: 0.78, djInitX: 1.0, djInitY: 2.47, airFriction: 0.02, djSetY: false},
        "Yoshi": {NTSCweight:108, PALweight: 111, gravity: 0.093, terminalVelocity: 1.93, driftAcc: 0.048, driftMax: 1.2, djInitX: 1.2, djInitY: [0,-0.77838,-0.66859,-0.55531,-0.43853,-0.31826,-0.19449,-0.06723,0.26181,0.63995,0.97864,1.27788,1.53769,1.75804,1.93897,2.08044,2.18247,2.24506,2.26820,2.23283,2.16528,2.09779,2.03035,1.96297,1.89564,1.82836,1.76115,1.69398,1.62688,1.55982,1.49282,1.42589,1.35899,1.29217,1.22539,1.15867,1.092,1.02541,0.95884,0.89233,0.82589,0.75952,0.69316,0.62690,0.56067,0.4945,0.42839,0.36234,0.29632,0.23038,0.16449,0.09866,0.03286,-0.01397,-0.04778,-0.09037,-0.14177,-0.20195,-0.27094,-0.34871,-0.43529,-0.53065,-0.63481,-0.74778,-0.86953,-1.00007,-1.13941,-1.28756,-1.44449,-1.61021], airFriction: 0.013, djSetY: true, djSetX: false},
        "Falcon": {NTSCweight:104, PALweight: 104, gravity: 0.13, terminalVelocity: 2.9, driftAcc: 0.06, driftMax: 1.12, djInitX: 0.97, djInitY: 2.79, airFriction: 0.01, djSetY: false},
        "Link": {NTSCweight:104, PALweight: 104, gravity: 0.11, terminalVelocity: 2.13, driftAcc: 0.06, driftMax: 1.0, djInitX: 1.0, djInitY: 2.2, airFriction: 0.005, djSetY: false},
        "Doc": {NTSCweight:100, PALweight: 100, gravity: 0.095, terminalVelocity: 1.7, driftAcc: 0.044, driftMax: 0.9, djInitX: 0.9, djInitY: 2.3, airFriction: 0.016, djSetY: false},
        "Luigi": {NTSCweight:100, PALweight: 100, gravity: 0.069, terminalVelocity: 1.6, driftAcc: 0.04, driftMax: 0.68, djInitX: 0.9, djInitY: 2.16, airFriction: 0.01, djSetY: false},
        "Mario": {NTSCweight:100, PALweight: 98, gravity: 0.095, terminalVelocity: 1.7, driftAcc: 0.045, driftMax: 0.86, djInitX: 0.9, djInitY: 2.3, airFriction:0.016, djSetY: false},
        "Ness": {NTSCweight:94, PALweight: 94, gravity: 0.09, terminalVelocity: 1.83, driftAcc: 0.06, driftMax: 0.93, djInitX: 0.8, djInitY: [0,0.30244,0.58189,0.71963,0.71568,0.57002,0.51223,0.63287,0.74762,0.85647,0.95944,1.05653,1.14772,1.23303,1.31244,1.38598,1.45361,1.51537,1.57123,1.62121,1.66529,1.7035,1.73581,1.72822,1.68299,1.63524,1.58498,1.53220,1.4769,1.41908,1.35875,1.2959,1.23054,1.16265,1.09225,1.01934,0.94390,0.86596,0.78548,0.7025,0.617,0.52898,0.43844,0.3454,0.24982,0.15174,0.05114,-0.03114,-0.09811,-0.17211,-0.25315,-0.34121,-0.43631,-0.64247,-0.9111,-1.11388,-1.25083,-1.32192], airFriction: 0.03, djSetY: true, djXValues: [0,0.13542,0.31782,0.41254,0.41958,0.33896,0.26914,0.26027,0.23897,0.20522,0.15904,0.10041,0.02934,-0.03375,-0.02251,-0.01968,-0.02061,-0.02154,-0.02246,-0.02339,-0.02431,-0.02524,-0.02617,-0.02709,-0.02802,-0.02894,-0.02987,-0.03904,-0.05421,-0.06573,-0.07362,-0.07787,-0.07847,-0.07543,-0.06876,-0.05844,-0.04448,-0.02689,-0.00876,-0.00512,-0.00148,0.00216,0.00580,0.00944,0.01308,0.01672,0.02036,0.00975,-0.00095,0.00255,0.00604,0.00954,0.01303,0.01653,0.02003,0.02352,0.02702,0.03051], djSetX: true},
        "Peach": {NTSCweight:90, PALweight: 90, gravity: 0.08, terminalVelocity: 1.5, driftAcc: 0.07, driftMax: 1.1, djInitX: 0.9, djInitY: [0,-0.67032,-0.83146,-0.81447,-0.61932,-0.24603,0.10064,0.28843,0.45597,0.60326,0.73030,0.83710,0.92364,0.98994,1.03598,1.06178,1.06733,1.05262,1.01767,0.96248,0.94947,0.98848,1.022,1.05001,1.07253,1.08955,1.10107,1.10710,1.10762,1.10265,1.09219,1.07621,1.05474,1.02778,0.99532,0.95736,0.91391,0.86494,0.81922,0.77866,0.73552,0.6898,0.64149,0.5906,0.53713,0.48107,0.42243,0.36121,0.29741,0.23101,0.11491,-0.03033,-0.14726,-0.23591,-0.29626,-0.32831,-0.33207,-0.30753,-0.2547,-0.17357], airFriction: 0.005, djSetY: true, djSetX: false},
        "Sheik": {NTSCweight:90, PALweight: 90, gravity: 0.12, terminalVelocity: 2.13, driftAcc: 0.06, driftMax: 0.8, djInitX: 1.00, djInitY: 3.08, airFriction: 0.04, djSetY: false},
        "Zelda": {NTSCweight:90, PALweight: 90, gravity: 0.073, terminalVelocity: 1.4, driftAcc: 0.048, driftMax: 0.95, djInitX: 0.9, djInitY: 1.806, airFriction: 0.005, djSetY: false},
        "ICs": {NTSCweight:88, PALweight: 88, gravity: 0.1, terminalVelocity: 1.6, driftAcc: 0.047, driftMax: 0.7, djInitX: 0.9, djInitY: 2.6, airFriction: 0.02, djSetY: false},
        "Marth": {NTSCweight:87, PALweight: 85, gravity: 0.085, terminalVelocity: 2.2, driftAcc: 0.05, driftMax: 0.9, djInitX: 1.0, djInitY: 2.112, airFriction: 0.005, djSetY: false},
        "Mewtwo": {NTSCweight:85, PALweight: 85, gravity: 0.082, terminalVelocity: 1.5, driftAcc: 0.05, driftMax: 1.2, djInitX: 0.9, djInitY: [0,0.11291,0.33667,0.53134,0.69692,0.83342,0.94083,1.01914,1.06838,1.08851,1.07957,1.04153,0.97441,1.02718,1.20680,1.36777,1.51009,1.63375,1.73877,1.82513,1.89284,1.94189,1.97230,1.98405,1.97715,1.95159,1.90739,1.84453,1.95039,2.18743,2.34953,2.43670,2.44894,2.38623,2.24859,2.036,1.74848,1.38603,0.94863,0.61615,0.43864,0.26125,0.08401,-0.09311,-0.27008,-0.44693,-0.62363,-0.80021], airFriction: 0.016, djSetY: true, djSetX: false},
        "Roy": {NTSCweight:85, PALweight: 85, gravity: 0.114, terminalVelocity: 2.4, driftAcc: 0.05, driftMax: 0.9, djInitX: 1.0, djInitY: 2.288, airFriction: 0.005, djSetY: false},
        "Y.Link": {NTSCweight:85, PALweight: 85, gravity: 0.11, terminalVelocity: 2.13, driftAcc: 0.06, driftMax: 1.0, djInitX: 1.0, djInitY: 2.3056, airFriction: 0.005, djSetY: false},
        "Falco": {NTSCweight:80, PALweight: 80, gravity: 0.17, terminalVelocity: 3.1, driftAcc: 0.07, driftMax: 0.83, djInitX: 0.94, djInitY: 3.854, airFriction: 0.02, djSetY: false},
        "Pika": {NTSCweight:80, PALweight: 80, gravity: 0.11, terminalVelocity: 1.9, driftAcc: 0.05, driftMax: 0.85, djInitX: 0.85, djInitY: 2.6, airFriction: 0.01, djSetY: false},
        "Fox": {NTSCweight:75, PALweight: 73, gravity: 0.23, terminalVelocity: 2.8, driftAcc: 0.08, driftMax: 0.83, djInitX: 0.90, djInitY: 4.416, airFriction: 0.02, djSetY: false},
        "Kirby": {NTSCweight:70, PALweight: 74, gravity: 0.08, terminalVelocity: 1.6, driftAcc: 0.06, driftMax: 0.78, djInitX: 0.472, djInitY:2.00 , airFriction: 0.02, djSetY: false},
        "Puff": {NTSCweight:60, PALweight: 60, gravity: 0.064, terminalVelocity: 1.3, driftAcc: 0.28, driftMax: 1.35, djInitX: 0.292, djInitY: 1.65, airFriction: 0.05, djSetY: false},
        "MrG&W": {NTSCweight:60, PALweight: 60, gravity: 0.095, terminalVelocity: 1.7, driftAcc: 0.05, driftMax: 1.0, djInitX: 0.9, djInitY: 2.23, airFriction: 0.016, djSetY: false},
        "Pichu": {NTSCweight:55, PALweight: 55, gravity: 0.11, terminalVelocity: 1.9, driftAcc: 0.05, driftMax: 0.85, djInitX: 0.85, djInitY: 2.6, airFriction: 0.01, djSetY: false}
    };

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

    var knockback = getKnockback(percent, damage, weight, growth, base, setKnockback, crouch, chargeInterrupt);

    var hitstun = getHitstun(knockback);

    var angle = getAngle(trajectory, knockback, reverse, tdiX, tdiY);

    var horizontalVelocity = getHorizontalVelocity(knockback, angle, gravity);

    var verticalVelocity = getVerticalVelocity(knockback, angle, gravity);

    var horizontalDecay = getHorizontalDecay(angle);

    var verticalDecay = getVerticalDecay(angle);

    this.positions = knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos, fadeIn, doubleJump);

    this.hitstun = hitstun;

    //Position on the last frame of hitstun. Not used yet, but potentially useful.
    //var endPosition = this.positions[this.positions.length - 1];

    /******* Variable setup end *******/

}
