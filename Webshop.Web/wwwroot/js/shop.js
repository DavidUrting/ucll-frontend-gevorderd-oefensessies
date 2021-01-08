// Onderstaand '$(function { ... })' statement zorgt ervoor dat deze function wordt aangeroepen nadat het html
// document en alle gerelateerde CSS en JavaScript geladen is.
$(function () {
    // Eerst gebeurt er een AJAX 'GET' HTTP request naar de backend.
    // De response op deze request zal een JSON array bevatten met daarin objecten die overeenkomen met de C# class 'Product'.
    // Het omzetten van een JSON array naar een JavaScript array hoeft hier niet: jQuery doet dat automatisch.
    // (Als je fetch zou gebruiken moet je dat nog wel omzetten.)
    $.get("/api/product", function (producten) {
        let markup = '';

        // Nu zal er over alle producten geloopt worden, en elk product zal als een Bootstrap 'card'
        // voorgesteld worden. De producten zullen in Bootstrap 'grid' rows geplaatst worden per twee.
        // Dat betekent dat elk 'even' product voorafgegaan moet worden met een <div class="row">
        // en elk 'oneven' product moet de rij dan weer afsluiten met een </div>
        for (let i = 0; i < producten.length; i++) {
            // Om na te gaan of het een 'even' product is wordt er gebruik gemaakt van % (modulo)
            // Dat is hetzelfde als de 'rest na deling'.
            // Dus als de rest gelijk is aan 0, dan is het een even product.
            if (i % 2 === 0) markup += '<div class="row">';

            // Hieronder wordt gebruik gemaakt van 'string interpolation'.
            // Je kan in een string dus variabelen opnemen die je gebruikt in JavaScript.
            // Bemerk dat we aan de buitenste div ook een id attribuut toekennen waaraan
            // we het product ID toekennen. 
            // Dat is belangrijk voor het click event op 'In winkelmandje' (zie verder).
            markup += `
                <div id="${producten[i].id}" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${producten[i].name}</h5>
                        <p class="card-text">${producten[i].description}</p>
                        <a href="#" class="btn btn-primary">In winkelmandje</a>
                    </div>
                </div>
            `;

            // Een oneven product (of het laatste product!) sluit de row weer af.
            if (i % 2 !== 0 || i === producten.length - 1) markup += '</div>';
        }

        // Eens dat alle 'cards' werden aangemaakt in de string worden deze in de <main> geplaatst.
        // jQuery zorgt er dan voor dat de string met markup wordt omgezet in de DOM.
        $("main").append(markup);

        // Vervolgens wordt een click handler gekoppeld aan de 'In winkelmandje' anchors.
        // (Bemerk dat er per product dus een 'In winkelmandj' anchor is: er zullen dus meerdere handlers gekoppeld worden!)
        $(".card-body a").click(function () {
            // 'this' verwijst naar het DOM element waarop geklikt is (een anchor in dit geval).
            // Met $(this) maken we daar een jQuery object van zodat we bijvoorbeeld gebruik kunnen maken van de parent() functie.
            // Een 'In winkelmandje' anchor heeft als parent een div met class="card-body".
            // En de parent van die div heeft een attribuut 'id' dat verwijst naar de id van het product.
            // Dat product id is nodig om aan de backend te laten weten welk product aan het winkelmandje moet toegegvoegd worden.
            // Let op: id is hier van het type 'string'. Vandaar gebeurt er dus een parseInt() om daarvan een number te maken.
            let idVanHetProduct = parseInt($(this).parent().parent().attr("id"));     

            // Vervolgens gebeurt er een Ajax 'POST' HTTP request.
            // Bemerk dat er hier wordt gebruik gemaakt van de fetch API.
            // Het gebruik van $.post() gaat spijtig genoeg niet zomaar, je kan wel gebruik maken van een zelf-gebrouwen $.postJSON() (zie onderaan dit bestand).
            // Het gebruik van $.ajax() gaat dan weer wel zonder problemen.
            fetch("/api/cart",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(idVanHetProduct) // Bemerk dat er hier een value van het type 'number' wordt doorgegeven. Als je dat niet doet krijg je een 400 (Bad Request) terug van de backend!
                })
                .then(function () {
                    // Als het toevoegen aan het winkelmandje in de backend gelukt is, dan halen we de volledige winkelmand weer op bij de backend.
                    // Optimalisatie: ipv van fillCart() aan te roepen zouden we het product ook gewoon kunnen appenden aan de lijst.
                    fillCart();
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    });

    // De winkelwagen wordt voor de eerste keer gevuld met de inhoud die door de backend gekend is.
    // Deze fillCart() wordt dus een eerste keer aangeroepen bij het laden van de pagina.
    fillCart();
});


// Dit is een herbruikbare functie om de inhoud van de winkelwagen op te halen bij de backend
// en vervolgens te tonen in de <ol> lijst.
// Hiervan werd een functie gemaakt zodat deze vanop verschillende plaatsen kan aangeroepen worden.
function fillCart() {
    // Eerst de huidige winkelwagen leegmaken
    $("aside ol").empty();

    // Dan een AJAX 'GET' HTTP request naar de backend.
    // De backend zal een JSON array met numbers teruggeven (dat zijn de ID's van de producten die het winkelmandje zitten)
    // (NB: jQuery zet die JSON array automatisch om in een JavaScript array).
    $.get("/api/cart", function (cartContents) {

        // Eerst wordt de <ol> lijst opgevuld de producten van het winkelmandje.
        // (Momenteel zijn dat nog ID's, dat is niet zo gebruiksvriendelijk maar het is dan ook een eerste versie.)
        for (let i = 0; i < cartContents.length; i++) {
            // Bemerk dat er ook een 'data-id' attribuut wordt gezet op elk item.
            // Dat attribuut is nodig zodat de click handler van de button weet welk item deze moet deleten bij de backend.
            $("aside ol").append(`<li data-id="${cartContents[i]}">${cartContents[i]} <button>X</button> </li>`);
        }

        // Aan de delete button van elk procuct in het winkelmandje wordt ook een click handler gekoppeld.
        $("button").click(function () {
            // De id van het te deleten product wordt opgehaald bij de <li> (= parent van de button)
            // Ook hier gebeurt er weer een parseInt omdat attr() steeds een string teruggeeft.
            let productIdToDelete = parseInt($(this).parent().attr("data-id"));

            // Vervolgens gebeurt een Ajax 'DELETE' HTTP request.
            // Bemerk dat je dus niet beperkt bent tot GET en POST requests!
            fetch("/api/cart",
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productIdToDelete)
                })
                .then(function () {
                    // Als het verwijderen uit het winkelmandje gelukt is, dan halen we het weer op bij de backend.
                    // Optimalisatie: ipv van fillCart() aan te roepen zouden we het product ook gewoon kunnen deleten uit de lijst.
                    fillCart();
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    });
}



// Indien je gebruik zou willen maken van jQuery's $.post(): dat werkt niet zo out of the box met json.
// Er is een propere workaround waarbij je jQuery 'uitbreidt'.
// Er wordt namelijk een extra methode 'postJSON' toegevoegd die onderliggende gebruik maakt van $.ajax().
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