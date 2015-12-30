function Hit(percent, damage, growth, base, trajectory, character, NTSC, xPos, yPos, crouch, reverse, chargeInterrupt) {

    /******* Internal functions start *******/

    //Calculates base knockback from hit
    //Formula taken from http://www.ssbwiki.com/Knockback#Formula
    function getKnockback(percent, damage, weight, growth, base, crouch, chargeInterrupt) {
        var percent = percent + damage;
        var kb = ((((((percent / 10) + ((percent * damage) / 20)) * (200 / (weight + 100)) * 1.4) + 18) * (growth / 100)) + base);
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
    function getAngle(trajectory, knockback, reverse) {
        if (trajectory == 361) {
            if (knockback < 32) {
              if (reverse){
                return 180;
              }
              else {
                return 0;
              }
            }
            else if (knockback > 32.1) {
              if (reverse){
                return 136;
              }
              else {
                return 44;
              }
            }
            else {
              var temang = 440*(knockback-32);
              if (reverse){
                temang = 180 - temang;
                  if (temang < 0){
                    temang = 360 + temang;
                  }
              }
              return temang;
            }
        }
        else {
          var temang = trajectory;
          if (reverse){
            temang = 180 - temang;
              if (temang < 0){
                temang = 360 + temang;
              }
          }
          return temang;
        }
    }

    //The initial horizontal velocity the hit causes
    function getHorizontalVelocity(knockback, angle) {
        var initialVelocity = knockback * .03;
        var horizontalAngle = Math.cos(angle * angleConversion);
        var horizontalVelocity = initialVelocity * horizontalAngle;
        return horizontalVelocity;
    }

    //The initial vertical velocity the hit causes
    function getVerticalVelocity(knockback, angle) {
        var initialVelocity = knockback * .03;
        var verticalAngle = Math.sin(angle * angleConversion);
        var verticalVelocity = initialVelocity * verticalAngle;
        return verticalVelocity;
    }

    //Calculate position for every frame of hitstun
    function knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos) {
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
            horVelKB -= horizontalDecay;
            verVelKB -= verticalDecay;

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

        return positions;
    }

    //Rate at which horizontal velocity decreases
    function getHorizontalDecay(angle) {
        return .051 * Math.cos(angle * angleConversion);
    }

    //Rate at which vertical velocity decreases
    //Gravity also plays a role, but that is done in knockbackTravel
    function getVerticalDecay(angle, gravity) {
        return .051 * Math.sin(angle * angleConversion);
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
        "Bowser": {NTSCweight:117, PALweight: 118, gravity: 0.13, terminalVelocity: 1.9},
        "Donkey Kong": {NTSCweight:114, PALweight: 114, gravity: 0.1, terminalVelocity: 2.4},
        "Samus": {NTSCweight:110, PALweight: 110, gravity: 0.066, terminalVelocity: 1.4},
        "Ganon": {NTSCweight:109, PALweight: 109, gravity: 0.13, terminalVelocity: 2},
        "Yoshi": {NTSCweight:108, PALweight: 111, gravity: 0.093, terminalVelocity: 1.93},
        "Falcon": {NTSCweight:104, PALweight: 104, gravity: 0.13, terminalVelocity: 2.9},
        "Link": {NTSCweight:104, PALweight: 104, gravity: 0.11, terminalVelocity: 2.13},
        "Doc": {NTSCweight:100, PALweight: 100, gravity: 0.095, terminalVelocity: 1.7},
        "Luigi": {NTSCweight:100, PALweight: 100, gravity: 0.069, terminalVelocity: 1.6},
        "Mario": {NTSCweight:100, PALweight: 98, gravity: 0.095, terminalVelocity: 1.7},
        "Ness": {NTSCweight:94, PALweight: 94, gravity: 0.09, terminalVelocity: 1.83},
        "Peach": {NTSCweight:90, PALweight: 90, gravity: 0.08, terminalVelocity: 1.5},
        "Sheik": {NTSCweight:90, PALweight: 90, gravity: 0.12, terminalVelocity: 2.13},
        "Zelda": {NTSCweight:90, PALweight: 90, gravity: 0.073, terminalVelocity: 1.4},
        "ICs": {NTSCweight:88, PALweight: 88, gravity: 0.1, terminalVelocity: 1.6},
        "Marth": {NTSCweight:87, PALweight: 85, gravity: 0.085, terminalVelocity: 2.2},
        "Mewtwo": {NTSCweight:85, PALweight: 85, gravity: 0.082, terminalVelocity: 1.5},
        "Roy": {NTSCweight:85, PALweight: 85, gravity: 0.114, terminalVelocity: 2.4},
        "Young Link": {NTSCweight:85, PALweight: 85, gravity: 0.11, terminalVelocity: 2.13},
        "Falco": {NTSCweight:80, PALweight: 80, gravity: 0.17, terminalVelocity: 3.1},
        "Pika": {NTSCweight:80, PALweight: 80, gravity: 0.11, terminalVelocity: 1.9},
        "Fox": {NTSCweight:75, PALweight: 73, gravity: 0.23, terminalVelocity: 2.8},
        "Kirby": {NTSCweight:70, PALweight: 74, gravity: 0.08, terminalVelocity: 1.6},
        "Puff": {NTSCweight:60, PALweight: 60, gravity: 0.064, terminalVelocity: 1.3},
        "Mr. Game & Watch": {NTSCweight:60, PALweight: 60, gravity: 0.095, terminalVelocity: 1.7},
        "Pichu": {NTSCweight:55, PALweight: 55, gravity: 0.11, terminalVelocity: 1.9}
    };

    /******* Constants end *******/



    /******* Variable setup start *******/

    if (!characters[character]) {
        throw("Bad character name given. Aborting.");
    }

    var weight;

    if (NTSC == true) {
        weight = characters[character]["NTSCweight"];
    }

    else {
        weight = characters[character]["PALweight"];
    }

    var gravity = characters[character]["gravity"];

    var knockback = getKnockback(percent, damage, weight, growth, base, crouch, chargeInterrupt);

    var hitstun = getHitstun(knockback);

    var angle = getAngle(trajectory, knockback, reverse);

    var horizontalVelocity = getHorizontalVelocity(knockback, angle, gravity);

    var verticalVelocity = getVerticalVelocity(knockback, angle, gravity);

    var horizontalDecay = getHorizontalDecay(angle);

    var verticalDecay = getVerticalDecay(angle, gravity);

    this.positions = knockbackTravel(horizontalVelocity, horizontalDecay, verticalVelocity, verticalDecay, character, hitstun, xPos, yPos);

    //Position on the last frame of hitstun. Not used yet, but potentially useful.
    var endPosition = this.positions[this.positions.length - 1];

    /******* Variable setup end *******/

}
