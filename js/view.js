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