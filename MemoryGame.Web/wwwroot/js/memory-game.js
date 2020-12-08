let gameCards = document.querySelectorAll("img.game-card");

// willekeurig kaarten leggen
let cardCount = [0, 0, 0, 0];
for (let i = 0; i < gameCards.length; i++) {
    let gameCard = gameCards[i];
    let randomCardIndex;
    do {
        randomCardIndex = Math.random() * 3; // willekeurig getal in interval [0,3[
        randomCardIndex = randomCardIndex + 1; // willekeurig getal in interval [1, 4[
        randomCardIndex = Math.round(randomCardIndex); // willekeurig getal in [1,2,3,4]
    } while (cardCount[randomCardIndex] > 2);
    cardCount[randomCardIndex] += 1;
    gameCard.src = "img/card_0" + randomCardIndex + ".png";
}

// luisteren naar de kaarten :)
for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].addEventListener("click", function (e) {
        if (e.target.className.indexOf("game-card-down") >= 0) {
            e.target.className = e.target.className.replace("game-card-down", "");
        } else {
            e.target.className += "game-card-down";
        }        
    });
}