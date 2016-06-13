/**
 *  File name: game.ts
 *  Author: Kevin Ma (Student #300867968)
 *
 *  Description: This is the main typescript file that controls all
 *               the functionalities of the web game, Game of Survival.
 *
 *  Date Created: June 11, 2016
 *  Date Last Modified: June 13, 2016
 *  Version:  1.2 - refactored trigger board into switch and re-calculated time
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
    var evtLog;
    // INITIALIZATION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    console.log("Game started...");
    impress().init();
    $('#enemyStats').hide();
    $('#events-log').hide();
    $('#playerStats').hide();
    // NAMED FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * This function assigns a string argument to the evtLog variable which
     * will be displayed in the evt-log-body in the index.html file.
     *
     * @method evtLogMsg
     * @param msg
     * @returns {void}
     */
    function evtLogMsg(msg) {
        evtLog = msg + '<br /><br />' + "You have " + hoursRemaining +
            " hour(s) left before nuclear warheads are going to hit the island."
            + '<br /><br />------<br /><br />';
    }
    // EVENT LISTENERS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // This event listener will trigger each time the player makes a choice
    $('a').on('click', function () {
        // assign the name of the div that the anchor will go to, to this var
        var destination = this.href.substring(this.href.indexOf('#') + 1);
        evtLog = ""; // clear contents everytime enter new stage
        /**
            This switch construct serves as a trigger board. It handles
            different events which occur during the storyline
            of the game.
        */
        switch (destination) {
            // When player starts a [new] game hide game panels
            case "game":
                $('#enemyStats').hide();
                $('#events-log').hide();
                $('#playerStats').hide();
                break;
            // The story begins at div id #stage1, need to initialize variables
            case "stage1":
                $('#evt-log-body').html(''); // clear contents of event log
                $('#events-log').show(); // display other game panels when game starts
                $('#playerStats').show();
                strength = 90; // player starts with 90 strength
                enemyStrength = 10; // enemy starts with 10 strength
                hoursRemaining = 10; // 10 hours before game over
                evtLogMsg('=================================' + '<br />' +
                    'GAME START!' + '<br />' +
                    '=================================' + '<br />' +
                    'You wake up and do not know where you are...');
                break;
            // remain at forest of origin
            case "stage2.1-stage1-choice1":
                hoursRemaining -= 2; // you waited 2 hours
                strength += 20; // from push-ups
                enemyStrength += 100; // because you did not take sword, enemy did
                evtLogMsg('You observed from a distance.<br />[-2 hours remaining]<br />' +
                    '<br /> You developed your muscles from doing push-ups.<br />[+20 STR]');
                break;
            // head towards mysterious light
            case "stage2.2-stage1-choice2":
                hoursRemaining -= 5;
                evtLogMsg('You walk for a long time...<br />[-5 hours remaining]');
                break;
            // head towards Void of Darkness
            case "stage3.1-stage2.1-choice1":
                hoursRemaining -= 5;
                evtLogMsg('You slowly find your way to the origin of the light.<br />[-5 hours remaining]');
                break;
            // Display the enemy's statistics due to encounter
            // escape to the island's heart
            case "stage3.2-stage2.1-choice2":
                hoursRemaining -= 6;
                $('#enemyStats').show();
                evtLogMsg("Without any light, it takes you a long time to find the Island's Heart." +
                    "<br />[-6 hours remaining]");
                break;
            // run away with the sword to the island's heart
            case "stage3.3-stage2.2-choice1":
                hoursRemaining -= 3;
                strength += 100; // acquired Sword of Light
                evtLogMsg("When you took the sword, the light vanished. Without any light, it takes you a" +
                    " long time to find the Island's Heart.<br />[-3 hours remaining]");
                $('#enemyStats').show();
                break;
            // run away from the light, to the island's heart
            case "stage3.4-stage2.2-choice2":
                hoursRemaining -= 3;
                enemyStrength += 100; // because you didn't take the sword, enemy took it
                evtLogMsg("As you leave the vicinity, the light suddenly vanishes. Without any light, it takes you a" +
                    " long time to find the Island's Heart.<br />[-3 hours remaining]");
                $('#enemyStats').show();
                //evtLog = "Test messsage. Moved to stage: " + destination + '<br />------<br />' + evtLog;
                break;
            // RESULTS -------------------------------------------------------------------------------
            // Monster kills you
            case "result1-stage3.1-choice1":
                evtLogMsg("You decide to bring the sheath closer to your eye...");
                $('#game-over-body').text('A demon suddenly leaps from within the sheath and devours your body!');
                break;
            // Too Slow
            case "result2-stage3.1-choice2":
                evtLogMsg('You decide to run away from the scary looking sheath...');
                $('#game-over-body').text('You were too late. With no portal left, you watch in despair as the nuclear missles rain down from above.');
                break;
            // Stalemate fight
            case "result3-stage3.2-choice1":
                evtLogMsg('You decide to engage in a fist fight with the enemy...');
                $('#game-over-body').text('As the fight dragged out, the time remaining disappeared. The both of you watch in despair as nuclear missles rain down from above.');
                break;
            // Backstabbed by enemy
            case "result4-stage3.2-choice2":
                evtLogMsg('You decide to negotiate with the enemy for a peaceful resolution...');
                $('#game-over-body').text('While you were deep in thought, the other person took a knife and stabbed you in the back. The knife plunged through your heart almost instantly.');
                break;
            // Kill the enemy
            case "result5-stage3.3-choice1":
                evtLogMsg('You decide to kill the enemy...');
                $('#win-game-body').text('And off comes his/her head! As a fountain of blood errupts from the severed body, you make a quick victory dance. You then enter the portal and safely make it back home.');
                break;
            // Run out of time thinking of solution
            case "result6-stage3.3-choice2":
                evtLogMsg("You decide to peacefully come up with a solution that will benefit both parties...");
                $('#game-over-body').text('The two of you bounce ideas back and forth in an attempt to find a suitable solution. Unfortunately, there was not enough time. Nuclear missles started plummeting down from above.');
                break;
            // slaughtered by enemy
            case "result7-stage3.4-choice1":
                evtLogMsg('You decide to charge at the enemy...');
                $('#game-over-body').text('But you are completely outpowered. The enemy easily deflects all your attacks and with one swift slash, cuts you in half. Your organs plummet to the ground as your enemy disappears through the portal.');
                break;
            // beheaded by enemy while pleading for mercy
            case "result8-stage3.4-choice2":
                evtLogMsg('You decide to beg for your life...');
                $('#game-over-body').text('While you are still talking you hear a snicker, before you feel a quick but sharp pain at the back of your neck.The next thing you know, your head rolls across the floor, and you see blood spewing from what looks like your body...');
                break;
            // GAME END -------------------------------------------------------------------------------
            // Didn't use evtLogMsg here because don't want the hours remaining message to display here
            case "game-over":
                hoursRemaining = 0;
                evtLog = '=================================' + '<br />' +
                    'GAME OVER...' + '<br />' +
                    '=================================' + '<br />' +
                    'You have lived a valiant life but due to poor decisions made, you have died.' +
                    '<br /><br />Please try again!<br />------<br /><br />';
                break;
            case "win-game":
                hoursRemaining = 0;
                evtLog = '=================================' + '<br />' +
                    'YOU WIN!' + '<br />' +
                    '=================================' + '<br />' +
                    'Through your determination and sheer willpower you have successfully made it out ' +
                    'alive from the Game of Survival.<br /><br />Do you dare to play again?<br />------<br /><br />';
                break;
        }
        // updates the in-game stats whenever moving to new stage
        $('#enemyStr').text(enemyStrength.toString());
        $('#str').text(strength.toString());
        $('.time').text(hoursRemaining.toString());
        $('#evt-log-body').html(evtLog + $('#evt-log-body').html());
    }); // End of the anchor click event listener
})(); // End of IIFE
