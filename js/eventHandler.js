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
