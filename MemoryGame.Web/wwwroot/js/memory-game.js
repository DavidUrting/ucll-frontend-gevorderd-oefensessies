// leaderData is game-overkoepelend: in deze array komt de data van meerdere gespeelde games.
let leaderData = [];
// starttijdstip van het huidige spel. Indien null: nog geen spel bezig.
let gameStart = null;
// eindtijdstip van het huidige spel. Indien null: nog geen spel bezig OF spel bezig maar nog niet afgelopen.
let gameEnd = null;
// In deze array wordt bijgehouden welke kaarten momenteel 'actief' zijn gespeeld.
// Deze array kan dus 0, 1 of 2 kaarten bevatten.
let currentFlippedCards = [];

// Alle game cards ophalen (dat zijn img elements met de class game-card).
let gameCards = document.querySelectorAll("img.game-card");

// Luisteren naar de kaarten
// Opgelet: event handlers best maar één keer registreren (dus niet bij de start van elk spel)
// Anders zit je op het einde met 10-tallen event handlers die allemaal hetzelfde doen.
for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].addEventListener("click", function (e) {
        // kaart omdraaien (als de kaart al omgedraaid is moet er natuurlijk niets gebeuren)
        if (e.target.className.indexOf("game-card-down") >= 0) {

            // Als er in flippedCards twee actieve kaarten zitten, dan betekent dat dat 
            // de speler twee verkeerde kaarten heeft aangeklikt.
            if (currentFlippedCards.length === 2) {
                // De kaarten terug verbergen.
                currentFlippedCards[0].className += " game-card-down";
                currentFlippedCards[1].className += " game-card-down";
                currentFlippedCards = [];
            }

            // Kaart omdraaien (tonen)
            e.target.className = e.target.className.replace("game-card-down", "");

            // Onthouden dat deze kaart is omgedraaid.
            currentFlippedCards.push(e.target);

            // Zijn er 2 kaarten omgedraaid?
            if (currentFlippedCards.length === 2) {
                // 2 dezelfde afbeeldingen?
                if (currentFlippedCards[0].src === currentFlippedCards[1].src) {
                    // yes! De flippedCards zijn nu defintief omgedraaid...
                    currentFlippedCards = [];

                    // alle kaarten omgedraaid?
                    if (document.querySelectorAll("img.game-card-down").length === 0) {
                        gameEnd = new Date();

                        // Benodigde tijd in seconden berekenen.
                        // https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates
                        let timeInSeconds = ((gameEnd - gameStart) / 1000);
                        document.getElementById("time").innerText = timeInSeconds;

                        // leader-data bijwerken
                        leaderData.push(timeInSeconds);

                        // leader-data sorteren
                        leaderData.sort();

                        // top 5 tonen
                        // NB: in onderdeel 5 gaan we een betere werkwijze zien (nl. gebruik maken van document.createElement)
                        let rowsMarkup = "";
                        for (let i = 0; i < 5; i++) {
                            // Wanneer het spel pas gestart is zijn er nog geen 5 'best' times.
                            if (i >= leaderData.length) break;
                            rowsMarkup += ("<tr><td>" + leaderData[i] + "</td></tr>");
                        }
                        document.querySelector("#leaderBoard tbody").innerHTML = rowsMarkup;

                        // game bord verbergen en score bord tonen.
                        document.getElementById("gameBoard").style.display = "none";
                        document.getElementById("scoreBoard").style.display = "initial";
                    }
                }
            }
        }
    });
}

// De logica om één nieuw spel te starten zit nu in een function zodat we meermaals een spel 
// kunnen spelen. Het voordeel van een function is dat je die meermaals kan aanroepen ...
// en dat is wat we nodig hebben om meermaals een spel te kunnen starten.
// Nog beter zou het gebruik van een class met game objects zijn ... maar dat is voor
// een volgende iteratie.
function playNewGame() {
    // game bord tonen en score bord verbergen.
    document.getElementById("gameBoard").style.display = "initial";
    document.getElementById("scoreBoard").style.display = "none";

    // De kaarten willekeurig leggen + met afbeelding naar beneden leggen
    let cardCount = [0, 0, 0, 0];
    for (let i = 0; i < gameCards.length; i++) {
        let gameCard = gameCards[i];
        gameCard.className += " game-card-down";
        let randomCardIndex;
        do {
            randomCardIndex = Math.random() * 3; // willekeurig getal in interval [0,3[        
            randomCardIndex = Math.round(randomCardIndex); // willekeurig getal in [0,1,2,3]
        } while (cardCount[randomCardIndex] >= 2);
        cardCount[randomCardIndex] += 1;
        gameCard.src = "img/card_0" + randomCardIndex + ".png";
    }

    // Tijdstip van start registreren.
    gameStart = new Date();
}

// De kans geven aan de speler om nogmaal te spelen op het einde.
document.getElementById("playAgain").addEventListener("click", function () {
    playNewGame();
});

// And here we go!
// Het spel een eerste maal spelen.
playNewGame();
