let gameCards = document.querySelectorAll("img.game-card");
for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].addEventListener("click", function (e) {
        if (e.target.className.indexOf("game-card-down") >= 0) {
            e.target.className = e.target.className.replace("game-card-down", "");
        } else {
            e.target.className += "game-card-down";
        }        
    });
}