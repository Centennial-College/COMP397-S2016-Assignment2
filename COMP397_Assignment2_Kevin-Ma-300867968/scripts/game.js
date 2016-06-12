/**
*  File name: game.ts
*  Author: Kevin Ma (Student #300867968)
*
*  Description: This is the main typescript file that controls all
*               the functionalities of the web game.
*
*  Date Created: June 11, 2016
*  Date Last Modified: June 12, 2016
*  Version:  0.6 added enemy statistics to the game
*/
/// <reference path="typings/impress/impress.d.ts" />
/**
 * This immediately invoked function expression (IIFE) will be used
 * in order to load all the functionalities of the game when the
 * webpage loads.
 */
(function () {
    // Initializations ++++++++++++++++++++++++++++++++++++
    "use strict";
    console.log("Game started...");
    impress().init();
    // Game Variables ++++++++++++++++++++++++++++++++++++++
    var strength;
    var enemyStrength;
    var hoursRemaining;
    var gameOver = false;
    // Keep enemy's statistics window hidden until encounter
    $('#enemyStats').hide();
    // Event Listeners +++++++++++++++++++++++++++++++++++++
    $('a').on('click', function () {
        // assign the name of the div that the anchor will go to, to this var
        var destination = this.href.substring(this.href.indexOf('#') + 1);
        console.log(this.href);
        console.log("destination: " + destination);
        /**
            This switch serves as a trigger board. It handles
            different events which occur during the storyline
            of the game.
        */
        switch (destination) {
            // The story begins at div id #1, need to initialize variables
            case "stage1":
                strength = 90;
                enemyStrength = 10;
                hoursRemaining = 10;
                break;
            case "stage2.1-stage1-choice1":
                strength += 20; // from push-ups
                enemyStrength += 100; // because you did not take sword, enemy did
                break;
        }
        //if (destination == '2') {
        //    strength += 100;
        //    hoursRemaining -= 3;
        //    console.log(location.href.substring(0, location.href.length - 2) + '4');
        //}
        //if (hoursRemaining <= 0) {
        //    gameOver = true;
        //}
        //if (gameOver) {
        //    location.href = location.href.substring(0, location.href.length - 2) + '4';
        //}
        // updates the in-game stats whenever moving to new stage
        $('#enemyStr').text(enemyStrength.toString());
        $('#str').text(strength.toString());
        $('.time').text(hoursRemaining.toString());
    });
    console.log(strength);
    console.log(hoursRemaining);
})();
//# sourceMappingURL=game.js.map