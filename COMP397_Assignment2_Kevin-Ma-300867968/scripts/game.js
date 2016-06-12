/**
 *  File name: game.ts
 *  Author: Kevin Ma (Student #300867968)
 *
 *  Description: This is the main typescript file that controls all
 *               the functionalities of the web game.
 *
 *  Date Created: June 11, 2016
 *  Date Last Modified: June 12, 2016
 *  Version:  0.8 - added a overflow enabled scrolling events log
 */
/// <reference path="typings/impress/impress.d.ts" />
/**
 * This immediately invoked function expression (IIFE) will be used
 * in order to load all the functionalities of the game when the
 * webpage loads.
 */
(function () {
    "use strict";
    // GAME VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var strength;
    var enemyStrength;
    var hoursRemaining;
    var gameOver = false;
    var evtLog;
    // INITIALIZATION OF GAME SETTINGS +++++++++++++++++++++++++++++++++++++++++++
    console.log("Game started...");
    impress().init();
    evtLog = ""; // the log is initially empty
    // Keep enemy's statistics window hidden until encounter
    $('#enemyStats').hide();
    // EVENT LISTENERS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
            // The story begins at div id #stage1, need to initialize variables
            case "stage1":
                strength = 90;
                enemyStrength = 10;
                hoursRemaining = 10;
                evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;
            case "stage2.1-stage1-choice1":
                strength += 20; // from push-ups
                enemyStrength += 100; // because you did not take sword, enemy did
                evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;
            // Display the enemy's statistics due to encounter
            case "stage3.2-stage2.1-choice2":
            case "stage3.3-stage2.2-choice1":
            case "stage3.4-stage2.2-choice2":
                $('#enemyStats').show();
                evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;
            default:
                evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;
        }
        // updates the in-game stats whenever moving to new stage
        $('#enemyStr').text(enemyStrength.toString());
        $('#str').text(strength.toString());
        $('.time').text(hoursRemaining.toString());
        $('#evt-log-body').html(evtLog);
    });
    console.log(strength);
    console.log(hoursRemaining);
})();
