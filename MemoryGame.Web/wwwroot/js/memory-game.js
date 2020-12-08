let gameStart = null;
let gameEnd = null;

// Alle game cards ophalen (dat zijn img elements met de class game-card).
let gameCards = document.querySelectorAll("img.game-card");

// De kaarten willekeurig leggen
let cardCount = [0, 0, 0, 0];
for (let i = 0; i < gameCards.length; i++) {
    let gameCard = gameCards[i];
    let randomCardIndex;
    do {
        randomCardIndex = Math.random() * 3; // willekeurig getal in interval [0,3[        
        randomCardIndex = Math.round(randomCardIndex); // willekeurig getal in [0,1,2,3]
    } while (cardCount[randomCardIndex] >= 2);
    cardCount[randomCardIndex] += 1;
    gameCard.src = "img/card_0" + randomCardIndex + ".png";
}

// In deze array wordt bijgehouden welke kaarten momenteel 'actief' zijn gespeeld.
// Deze array kan dus 0, 1 of 2 kaarten bevatten.
let currentFlippedCards = [];

// luisteren naar de kaarten :)
for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].addEventListener("click", function (e) {
        // kaart omdraaien (als de kaart al omgedraaid is moet er natuurlijk niets gebeuren)
        if (e.target.className.indexOf("game-card-down") >= 0) {

            // Als er in flippedCards twee actieve kaarten zitten, dan betekent dat dat 
            // de speler twee verkeerde kaarten heeft aangeklikt.
            if (currentFlippedCards.length === 2) {
                // De kaarten terug verbergen.
                currentFlippedCards[0].className += "game-card-down";
                currentFlippedCards[1].className += "game-card-down";
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
                        document.getElementById("time").innerText = ((gameEnd - gameStart) / 1000);

                        // game bord verbergen en score bord tonen.
                        document.getElementById("gameBoard").style.display = "none";
                        document.getElementById("scoreBoard").style.display = "initial";
                    }
                }
            }
        }  
    });
}

gameStart = new Date();