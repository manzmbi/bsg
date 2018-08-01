
// creation de l'objet Model " les donnees"
var model = {
    rows:6,
    cols : 6,

    // creation de la table et ses differentes lignes et cellules
    laGrillePhysique : function(){
        var container = document.getElementById("board");
        // Creation de l'objet "table" 
        var table = document.createElement("table");
        table.setAttribute("id", "table_properties");
        
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
            table.appendChild(row);
        } 
        container.appendChild(table);
    },



    //la grille virtuel du jeux en javascript
    grille: [
        "A0", "A1", "A2", "A3", "A4", "A5", "A6",
        "B0", "B1", "B2", "B3", "B4", "B5", "B6",
        "C0", "C1", "C2", "C3", "C4", "C5", "C6",
        "D0", "D1", "D2", "D3", "D4", "D5", "D6",
        "E0", "E1", "E2", "E3", "E4", "E5", "E6",
        "F0", "F1", "F2", "F3", "F4", "F5", "F6",
        "G0", "G1", "G2", "G3", "G4", "G5", "G6"
    ],

    // valeur de l'input html
    inputId: "inputHtml",

    // valeur du boutton html
    bouttonId: "fire",

    // Nombre maximum Hit
    maxNumberOfHits: 7,

    // Nombre maximum Miss
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
    maxNumberOfMissText: "Le nombre max de Miss est : ",

    // text to indicate the max number of hits
    maxNumberOfHitsText: "Le nombre max de Hit est: ",

    // text to indicate the current number of miss
    currentNumberOfMissText: "Le nombre actuel de Miss est: ",

    // text to indicate the current number of hits
    currentNumberOfHitsText: "Le nombre actuel de Hit est: ",

    // message to notify the user that he has win the game
    winningNotification: "Bravo, Vous avez gagne!",

    // message to notify the user that he has already enter a guess
    guessAlreadyEntered: " Ces coordonnees ont deja ete choisies",

    // message to notify the user that he has enter an incorrect guess
    incorrectGuessNotified: " Vous avez entre une mauvaise valeur !",

    // correct guess for store the correctGuess entered by the user
    correctGuess: [],

    // given guess limit for the end of the game
    hitLimit: [],

    // les images "Miss" et "Ship"
    images: ["<img src = images/miss.png>", "<img src = images/ship.png>"]
}






// l'objet "vue du system"
var view = {
    // fonction "Afficher un message sur la fenetre flottante"
    afficheMessage: function(message){

        alert(message);
    },

    // Fonction afficher "Miss" ou "Ship"
    displayHitOrMiss: function(tdId, image) {

        document.getElementById(tdId).innerHTML = image;
    },

    // afficher les Infos sur les parametres suivants
    displayGameRules: function (paragraphId, text, number) {

        document.getElementById(paragraphId).innerHTML = text + number;
    },
}
model.laGrillePhysique();






//  Object "Octopus"
var octopus = {

    // Fonction generer les bateaux aletoirement dans la grille
    afficherInfos: function () {

        // Elle pemettra d'Afficher le nombre maximum de Miss
        view.displayGameRules(model.maxNumberOfMissId, model.maxNumberOfMissText, model.maxNumberOfMiss);

        // Elle pemettra d'Afficher le nombre maximum de Hit
        view.displayGameRules(model.maxNumberOfHitsId, model.maxNumberOfHitsText, model.maxNumberOfHits);

        // Elle pemettra d'Afficher le nombre actuel de Hit
        view.displayGameRules(model.currentNumberOfHitsId, model.currentNumberOfHitsText, model.currentNumberOfHits);

        // Elle pemettra d'Afficher le nombre actuel de Miss
        view.displayGameRules(model.currentNumberOfMissId, model.currentNumberOfMissText, model.currentNumberOfMiss);
    },

    // Fonction generer les bateaux aletoirement dans la grille
    genereLeBateauxDansLagrilleAlea: function(hitNumber) {

        // creation de l'objet contenant les coordonnees utilisees
        var coordonneDejaUtilisees = [];
        for (i = 0; i < model.maxNumberOfHits; i ++) {

            // selection aleatoire d'une coordonnee dans la grille et la stocker dans un nouveau objet
            var coordonneGenereAlea = model.grille[Math.floor(Math.random() * model.grille.length)];

            // Verification des coordonnees invalides et ajout de celle valides
            if (coordonneDejaUtilisees.indexOf(coordonneGenereAlea) !== -1) {
                i -= 1;
            } else {
                // stocker les coordonnees non utilisees
                coordonneDejaUtilisees.push(coordonneGenereAlea);
            }
        }
        return coordonneDejaUtilisees;
    },

    // Verification des coordonnees entrees par l'utilisateur
    verifiEntreeUtilisateur: function () {

        // Recuperation des coordonnees entree par Utilisateur et sa mise en miniscule
        var coordonneeUtilisateur = document.getElementById(model.inputId).value.toUpperCase();

        // creation d'un objet contenant les coordonnees deja utilisees par l'utilisateur
        var valeurDejaUtilisees = [];

        for (index = 0; index < model.grille.length; index ++) {

            if (coordonneeUtilisateur === model.grille[index]) {

                // stocker les valeurs non utilisees
                valeurDejaUtilisees.push(coordonneeUtilisateur);
                break;
            }
        }





        // Verification des coordonnes valides
        if (valeurDejaUtilisees.length == 1) {

            //  Verification si ses coordonnees ne sont pas deja dans la liste de celles-ci valides
            if (model.correctGuess.indexOf(coordonneeUtilisateur) == -1) {

                //  Verification si les coordonnees saisies ne sont pas dans la grille
                if (octopus.genereLeBateauxDansLagrilleAlea().indexOf(coordonneeUtilisateur) == -1) {

                    //  Afficher l'image "miss"
                    view.displayHitOrMiss(coordonneeUtilisateur, model.images[0]);

                    // Afficher le nombre actuel de Miss
                    view.displayGameRules(model.currentNumberOfMissId, model.currentNumberOfMissText, model.currentNumberOfMiss += 1);
                } else {

                    // conserver les coordonnees de l'Utilisateur dans un objet "limiteDeJouer"
                    model.hitLimit.push(coordonneeUtilisateur);

                    //  Afficher l'image "Ship"
                    view.displayHitOrMiss(coordonneeUtilisateur, model.images[1]);

                    //  Afficher le nombre courant d'essaie
                    view.displayGameRules(model.currentNumberOfHitsId, model.currentNumberOfHitsText, model.currentNumberOfHits += 1);

                    // Afficher un message a la fin du Jeux
                    if (model.hitLimit.length == octopus.genereLeBateauxDansLagrilleAlea().length) {

                        view.afficheMessage(model.winningNotification);
                    }
                }
            }

            // Quand les coordonnees de l'Utilisateur sont deja dans la liste Des Entree Valide
            else {

                // Afficher les coordonnees saisies sont deja utilisees
                view.afficheMessage(coordonneeUtilisateur + model.guessAlreadyEntered);
            }

            // conserver les coordonnees de l'Utilisateur dans un objet "listeDesEntreeValide"
            model.correctGuess.push(coordonneeUtilisateur);
        }

        //  Quand il saisi les coordonnes non valides "Afficher ..."
        else {
            view.afficheMessage(model.incorrectGuessNotified);
        }
    }
}




// Controlleur des evenements
var eventHandler = {

    // Creation de la fonction clique Sur boutton
    cliqueSurFire: function () {
        document.getElementById(model.bouttonId).onclick = octopus.verifiEntreeUtilisateur;
        document.getElementById(model.inputId).addEventListener("keypress", eventHandler.evenementEntrer);

        // show the max number of miss
        octopus.afficherInfos();
    },

    evenementEntrer: function(event) {

        // the user press on return
        if (event.key === "Enter") {
            octopus.verifiEntreeUtilisateur();
        }
    }
}

// after loading all the page, call a callback function
window.onload = eventHandler.cliqueSurFire;
