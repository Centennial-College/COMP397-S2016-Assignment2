/**
 *  File name: game.ts
 *  Author: Kevin Ma (Student #300867968)
 *
 *  Description: This is the main typescript file that controls all
 *               the functionalities of the web game, Game of Survival.
 *
 *  Date Created: June 11, 2016
 *  Date Last Modified: June 12, 2016
 *  Version:  0.10 - connected all paths flow from beginning to end
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
    var strength: number;
    var enemyStrength: number;
    var hoursRemaining: number;
    var gameOver: boolean = false;
    var evtLog: string;

    // INITIALIZATION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    console.log("Game started...");
    impress().init();
    $('#enemyStats').hide();
    $('#events-log').hide();
    $('#playerStats').hide();

    // NAMED FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * This function sets assigns a string argument to the evtLog variable which
     * will be displayed in the evt-log-body in the index.html file.
     *
     * @method evtLogMsg
     * @param msg
     * @returns {void}
     */
    function evtLogMsg(msg: string) {
        evtLog = msg + '<br />------<br /><br />';
    }

    // EVENT LISTENERS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('a').on('click', function () {

        // assign the name of the div that the anchor will go to, to this var
        var destination = this.href.substring(this.href.indexOf('#') + 1);
        evtLog = "";    // clear contents everytime enter new stage

        console.log(this.href);
        console.log("destination: " + destination);

        /**
            This switch serves as a trigger board. It handles
            different events which occur during the storyline
            of the game.
        */
        switch (destination) {

            // When player starts a [new] game
            case "game":
                $('#enemyStats').hide();
                $('#events-log').hide();
                $('#playerStats').hide();
                break;

            // The story begins at div id #stage1, need to initialize variables
            case "stage1":
                $('#evt-log-body').html('');
                $('#events-log').show();
                $('#playerStats').show();
                strength = 90;
                enemyStrength = 10;
                hoursRemaining = 10;
                evtLogMsg('=================================' + '<br />' +
                    'GAME START!' + '<br />' +
                    '=================================' + '<br />' +
                    'You wake up and do not know where you are...' + '<br /><br />' +
                    "You have " + hoursRemaining + " hours left before nuclear warheads are going to hit the island."
                );
                break;

            case "stage2.1-stage1-choice1":
                hoursRemaining -= 3; // TEST
                strength += 20; // from push-ups
                enemyStrength += 100; // because you did not take sword, enemy did
                //evtLog = "You developed your muscles from doing push-ups.<br />[+20 STR]<br /><br />" + evtLog;
                //evtLog = "You have " + hoursRemaining + " hours left before nuclear warheads are going to hit the island."
                //    + '<br /><br />' + evtLog;
                //evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;

            // Display the enemy's statistics due to encounter
            case "stage3.2-stage2.1-choice2":
            case "stage3.3-stage2.2-choice1":
            case "stage3.4-stage2.2-choice2":
                $('#enemyStats').show();
                //evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;

            // RESULTS -------------------------------------------------------------------------------
            case "result1-stage3.1-choice1":
                $('#game-over-body').text('A demon suddenly leaps from within the sheath and devours your body!');
                break;

            case "result2-stage3.1-choice2":
                $('#game-over-body').text('You were too late. With no portal left, you watch in despair as the nuclear missles rain down from above.');
                break;

            case "result3-stage3.2-choice1":
                $('#game-over-body').text('As the fight dragged out, the time remaining disappeared. The both of you watch in despair as nuclear missles rain down from above.');
                break;

            case "result4-stage3.2-choice2":
                $('#game-over-body').text('While you were deep in thought, the other person took a knife and stabbed you in the back. The knife plunged through your heart almost instantly.');
                break;

            case "result5-stage3.3-choice1":
                $('#win-game-body').text('And off comes his/her head! As a fountain of blood errupts from the severed body, you make a quick victory dance. You then enter the portal and safely make it back home.');
                break;

            case "result6-stage3.3-choice2":
                $('#game-over-body').text('The two of you bounce ideas back and forth in an attempt to find a suitable solution. Unfortunately, there was not enough time. Nuclear missles started plummeting down from above.');
                break;

            case "result7-stage3.4-choice1":
                $('#game-over-body').text('But you are completely outpowered. The enemy easily deflects all your attacks and with one swift slash, cuts you in half. Your organs plummet to the ground as your enemy disappears through the portal.');
                break;

            case "result8-stage3.4-choice2":
                $('#game-over-body').text('While you are still talking you hear a snicker, before you feel a quick but sharp pain at the back of your neck.The next thing you know, your head rolls across the floor, and you see blood spewing from what looks like your body...');
                break;

            default:
                evtLogMsg("Test messsage. Moved to stage: " + destination);
                break;

        }

        // updates the in-game stats whenever moving to new stage
        $('#enemyStr').text(enemyStrength.toString());
        $('#str').text(strength.toString());
        $('.time').text(hoursRemaining.toString());
        $('#evt-log-body').html(evtLog + $('#evt-log-body').html());

    });

})();