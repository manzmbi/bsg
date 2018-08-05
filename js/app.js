//octopus model
var model = {
    rows:6,
    cols : 6,
    boardBuilding : function(){
        var container = document.getElementById("board");
        var tbl = document.createElement("table");
        tbl.setAttribute("id", "table_properties");
        for(var i=0; i<=this.rows; i++){
            var row = document.createElement("tr");
            for(var j=0; j<=this.cols; j++){
                var cell = document.createElement("td");
                row.appendChild(cell);
                if(i==0){
                    cell.setAttribute("id", "A"+j)
                }
                if(i==1){
                    cell.setAttribute("id", "B"+j)
                }
                if(i==2){
                    cell.setAttribute("id", "C"+j)
                }
                if(i==3){
                    cell.setAttribute("id", "D"+j)
                }
                if(i==4){
                    cell.setAttribute("id", "E"+j)
                }
                if(i==5){
                    cell.setAttribute("id", "F"+j)
                }
                if(i==6){
                    cell.setAttribute("id", "G"+j)
                }
            }
            tbl.appendChild(row);
        } 
        container.appendChild(tbl);
    },

    //represent the grid in javascript
    boardCoordinates: [
        "A0", "A1", "A2", "A3", "A4", "A5", "A6",
        "B0", "B1", "B2", "B3", "B4", "B5", "B6",
        "C0", "C1", "C2", "C3", "C4", "C5", "C6",
        "D0", "D1", "D2", "D3", "D4", "D5", "D6",
        "E0", "E1", "E2", "E3", "E4", "E5", "E6",
        "F0", "F1", "F2", "F3", "F4", "F5", "F6",
        "G0", "G1", "G2", "G3", "G4", "G5", "G6"
    ],

    // id of input
    inputId: "modify_input",

    // id of button
    buttonId: "fire_color",

    // creating max number of hits
    maxNumberOfHits: 7,

    // creating max number of miss
    maxNumberOfMiss: 20,

    // creating current number of hits
    currentNumberOfHits: 0,

    // creating current number of miss
    currentNumberOfMiss: 0,

    // max number of miss id
    maxNumberOfMissId: "maxNumberOfMiss",

    // max number of hits id
    maxNumberOfHitsId: "maxNumberOfHits",

    // current number of Miss id
    currentNumberOfMissId: "currentNumberOfMiss",

    // current number of hits id
    currentNumberOfHitsId: "currentNumberOfHits",

    // text to indicate the max number of miss
    maxNumberOfMissText: "The max number of miss is: ",

    // text to indicate the max number of hits
    maxNumberOfHitsText: "The max number of hits is: ",

    // text to indicate the current number of miss
    currentNumberOfMissText: "The current number of miss is: ",

    // text to indicate the current number of hits
    currentNumberOfHitsText: "The current number of hits is: ",

    // message to notify the user that he has win the game
    winningNotification: "You sank my battleship",

    // message to notify the user that he has already enter a guess
    guessAlreadyEntered: " has already entered",

    // message to notify the user that he has enter an incorrect guess
    incorrectGuessNotified: "Incorrect guess !",

    // correct guess for store the correctGuess entered by the user
    correctGuess: [],

    // given guess limit for the end of the game
    hitLimit: [],

    // image displayed
    images: ["<img src = images/miss.png>", "<img src = images/ship.png>"]
}

// octopus view
var view = {
    // display message in a floating window
    displayMessage: function(message){

        alert(message);
    },

    // display miss or hit image
    displayHitOrMiss: function(tdId, image) {

        document.getElementById(tdId).innerHTML = image;
    },

    // display game rules
    displayGameRules: function (paragraphId, text, number) {

        document.getElementById(paragraphId).innerHTML = text + number;
    },
}
model.boardBuilding();




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

// octopus event
var eventHandler = {

    // the user click on fire button
    clickFireButton: function () {

        document.getElementById(model.buttonId).onclick = octopus.verifyUserInput;
        document.getElementById(model.inputId).addEventListener("keypress", eventHandler.enterEvent);

        // show the max number of miss
        octopus.showGameRules();
    },

    enterEvent: function(event) {

        // the user press on return
        if (event.key === "Enter") {
            octopus.verifyUserInput();
        }
    }
}

// after loading all the page, call a callback function
window.onload = eventHandler.clickFireButton;
