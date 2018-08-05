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