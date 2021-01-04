$(function () {
    let markup = "";
    $.get("/api/product", function (products) {
        for (let i = 0; i < products.length; i++) {
            if (i % 2 === 0) markup += "<div class='row'>";

            markup += `
<div id="${products[i].id}" class="col card">
    <div class="card-body">
        <h5 class="card-title">${products[i].name}</h5>
        <p class="card-text">${products[i].description}</p>
        <a href="#" class="btn btn-primary">Toevoegen</a>
    </div>
</div>`;

            if (i % 2 === 1) markup += "</div>";
        }

        $("h1").after(markup);
    });
});