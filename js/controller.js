// octopus octopus
var octopus = {

    // show to the user the game rules and his evolution
    showGameRules: function () {

        // show the max number of miss
        view.displayGameRules(model.maxNumberOfMissId, model.maxNumberOfMissText, model.maxNumberOfMiss);

        // show the max number of hits
        view.displayGameRules(model.maxNumberOfHitsId, model.maxNumberOfHitsText, model.maxNumberOfHits);

        // show the current number of hits found by the user
        view.displayGameRules(model.currentNumberOfHitsId, model.currentNumberOfHitsText, model.currentNumberOfHits);

        // show the current number of miss found by the user
        view.displayGameRules(model.currentNumberOfMissId, model.currentNumberOfMissText, model.currentNumberOfMiss);
    },

    // creating random ships
    createShipsCoordinate: function(hitNumber) {

        // creating empty array to add coordinate inside
        var shipsArray = [];
        for (i = 0; i < model.maxNumberOfHits; i ++) {

            // take a random string in boardCoordinates
            var coordinate = model.boardCoordinates[Math.floor(Math.random() * model.boardCoordinates.length)];

            // add coordinate inside shipArray if it is not contained inside
            if (shipsArray.indexOf(coordinate) !== -1) {
                i -= 1;
            } else {
                shipsArray.push(coordinate);
            }
        }
        return shipsArray;
    },

    // evaluate the value that the user enters
    verifyUserInput: function () {

        // creating objects
        // the value entered by the user
        var guessInput = document.getElementById(model.inputId).value.toUpperCase();

        // check string for store the guessInput
        var valueEnterByTheUser = [];

        // swiping the array
        for (index = 0; index < model.boardCoordinates.length; index ++) {

            if (guessInput === model.boardCoordinates[index]) {

                // give the value entered by the user to a valueEnterByTheUser
                valueEnterByTheUser.push(guessInput);
                break;
            }
        }

        // Verify if guess
        // verify if the value that the user enter is contained inside the table
        // when the user enter a correct guess
        if (valueEnterByTheUser.length == 1) {

            // verify if this guess is already contained in the property correctGuess located inside the model
            // when the guessInput already exist
            if (model.correctGuess.indexOf(guessInput) == -1) {

                // evaluate hit or miss
                if (octopus.createShipsCoordinate().indexOf(guessInput) == -1) {

                    // display a miss
                    view.displayHitOrMiss(guessInput, model.images[0]);

                    // show the current number of miss found by the user
                    view.displayGameRules(model.currentNumberOfMissId, model.currentNumberOfMissText, model.currentNumberOfMiss += 1);
                } else {

                    // keep the guessInput in the hitLimit
                    model.hitLimit.push(guessInput);

                    // display a hit
                    view.displayHitOrMiss(guessInput, model.images[1]);

                    // show the current number of hits found by the user
                    view.displayGameRules(model.currentNumberOfHitsId, model.currentNumberOfHitsText, model.currentNumberOfHits += 1);

                    // display a message which mean the end of game when user has sank all the ships
                    if (model.hitLimit.length == octopus.createShipsCoordinate().length) {

                        view.displayMessage(model.winningNotification);
                    }
                }
            }

            // when the guessInput is not already in correctGuess
            else {

                // notify him that the guessInput already exist in correctGuess
                view.displayMessage(guessInput + model.guessAlreadyEntered);
            }

            // store the guessInput in correctGuess in the model
            model.correctGuess.push(guessInput);
        }

        // when the user enter incorrect guess
        else {
            view.displayMessage(model.incorrectGuessNotified);
        }
    }
}