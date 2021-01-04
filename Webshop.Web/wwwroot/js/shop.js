

$(function () {
    // Alle producten ophalen en tonen.
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
        $("main").append(markup);

        // Vervolgens de inhoud van de winkelkar tonen.
        $.get("/api/cart", function (productIds) {
            for (let i = 0; i < productIds.length; i++) {
                $("aside ol").append(`<li>Product ${productIds[i]}</li>`);
            }
        });

        // Event koppelen aan de 'Toevoegen' anchors zodat producten kunnen 
        // toegevoegd worden aan de winkelkar.
        $("div.card-body a.btn-primary").click(function () {
            let productId = $(this).parent().parent().attr("id");
            // Opgelet: productId is nu een string, dit moet omgezet worden naar een number
            productId = parseInt(productId);
            $.postJSON("/api/cart", productId, function () {
                console.log("awel?");
                $("aside ol").empty();
                $.get("/api/cart", function (productIds) {
                    for (let i = 0; i < productIds.length; i++) {
                        $("aside ol").append(`<li>Product ${productIds[i]}</li>`);
                    }
                });
            });
        });
    });
});


// https://stackoverflow.com/questions/40074899/unsupported-media-type-when-posting-json-data-to-api-using-jquery
$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': url,
        'data': JSON.stringify(data),
        // 'dataType': 'json', // dit doe je best weg: https://stackoverflow.com/questions/6186770/ajax-request-returns-200-ok-but-an-error-event-is-fired-instead-of-success
        'success': callback
    });
};