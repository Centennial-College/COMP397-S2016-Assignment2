/// <reference path="typings/impress/impress.d.ts" />

//IIFE
(function () {
    "use strict";
    console.log("Game started...");
    impress().init();

    // Game Variables ++++++++++++++++++++++++++++++++++++++
    var strength: number = 10;
    var hoursRemaining: number = 10;
    var gameOver: boolean = false;

    // Event Listeners +++++++++++++++++++++++++++++++++++++
    $('a').on('click', function () {

        var destination = this.href.charAt(this.href.length - 1);

        console.log("destination: " + destination);
        //if (lastActiveDiv == '1' && gameOver) {
        //    gameOver = false;
        //    strength = 10;
        //    hoursRemaining = 10;
        //}
        if (destination == '2') {
            strength += 100;
            hoursRemaining -= 3;
            console.log(location.href.substring(0, location.href.length - 2) + '4');
        }

        //if (hoursRemaining <= 0) {
        //    gameOver = true;
        //}
        //if (gameOver) {
        //    location.href = location.href.substring(0, location.href.length - 2) + '4';
        //}


        // updates the in-game stats whenever moving to new stage
        //$('#stats-display').html("Strength: " + strength + "<br>Hours Remaining: " + hoursRemaining);
        $('#str').text(strength.toString());
        $('#time').text(hoursRemaining.toString());

    });

    console.log(strength);
    console.log(hoursRemaining);
})();