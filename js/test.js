// defining function
function createShipsCoordinate(numberOfHits) {

    // creating object
    var boardCoordinates = ["A0", "A1", "A2","A3", "A4", "A5", "A6", "B0", "B1", "B2", "B3"];
    var shipArray = [];

    // add numberOfHits elements in the shipArray if it is not already included in there
    for (i = 0; i < numberOfHits; i ++) {
        var coordinate = boardCoordinates[Math.floor(Math.random() * boardCoordinates.length)];

        if (shipArray.indexOf(coordinate) === -1) {
            shipArray.push(coordinate);
        } else {
            i -= 1;
        }
    }
    return shipArray
}

// test zone

var numberOfHits = 3;
console.log(createShipsCoordinate(numberOfHits));

