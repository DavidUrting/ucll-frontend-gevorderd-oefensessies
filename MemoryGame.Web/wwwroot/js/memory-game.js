let gameCards = document.querySelectorAll("img.game-card");
for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].addEventListener("click", function (e) {
        e.target.className = "game-card";
    });
}