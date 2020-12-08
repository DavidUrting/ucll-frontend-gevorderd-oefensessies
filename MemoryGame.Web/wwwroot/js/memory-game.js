let gameCards = document.querySelectorAll("img.game-card");

// willekeurig kaarten leggen
for (let i = 0; i < gameCards.length; i++) {
    let gameCard = gameCards[i];
    let willekeurigGetal = Math.random() * 3; // willekeurig getal in interval [0,3[
    willekeurigGetal = willekeurigGetal + 1; // willekeurig getal in interval [1, 4[
    willekeurigGetal = Math.round(willekeurigGetal); // willekeurig getal in [1,2,3,4]
    gameCard.src = "img/card_0" + willekeurigGetal + ".png";
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