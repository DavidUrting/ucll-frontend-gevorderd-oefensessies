#Iteraties

## Epic 1: tonen van alle producten
Eerst wat backend werk:
1. Opzet van een nieuw project (ASP.NET Core Web - Versie: 3.1 - Template: API). Ook https aanvinken.
   Stel het 'Webshop.Web' project in als startup project en run het project: normaal moet je de 'Weather forecast' JSON data zien.   
2. Verwijder de **Controllers/WeatherController** en **WeatherForecast** bestanden.
3. Voeg een **Models** map toe, met daarin een **Product.cs** class. Objecten van deze class zullen de producten van de webshop voorstellen. Welke eigenschappen zou je die class geven?
  - **Id**: unieke ID van het product (int)
  - **Name**: naam van het product
  - **Description**: omschrijving van het product.
  - **Category**: categorie van het product.
  - **Price**: prijs in euro (decimal). 
4. Voorzie vervolgens een **Controllers/ProductController.cs** controller toe via **Add - Controller** (Let er wel voor op dat je in de 'API' template categorie zit. Kies voor een controller met read/write actions.). 
   Die controller moet minstens één methode hebben die via een GET naar /product een JSON array met alle producten teruggeeft.
   Verder mag er ook een methode zijn die één product teruggeeft op basis van de id van het product.
   Verwijder eventueel de Post, Put en Delete methods tenzij je ook al een admin interface wenst te voorzien die toelaat om producten te beheren (= voor de shop eigenaar)?
   Je kan eventueel gebruik maken van Entity Framework om producten in de database bij te houden, maar wij gaan het eenvoudig houden met een static array zoals in onderdeel 6.
   Vul die array op met een 4-tal producten (vb. CPU's en GPU's :)
   Pas ook de startup url aan in de properties van het project om de url /product te openen.
5. Test je ProductController eens door te navigeren naar /api/product en /api/product/0
   Gebruik eventueel ook eens PostMan. 

Dan frontend werk:
6. Opzetten van /wwwroot met daarin een /wwwroot/index.html en een /wwwroot/js/shop.js bestand. Startup.cs aanpassen met de 2 middlewares.
7. Toevoegen Bootstrap 4 via CDN.
8. Toevoegen eventuele andere libraries zoals jQuery (als je de Bootstrap 4 starter template gebruikt heb je dat normaal gezien al maar let op: niet de 'slim' versie gebruiken! Best is de officiele CDN van jQuery te gebruiken in dat geval.).
9. Wat dummy markup voorzien 'zodat we al een idee hebben'.
   Startup url aanpassen van 'api/product' naar ''.
10. Dummy markup vervangen door dynamisch gegenereerde markup op basis van een GET call naar /api/product. Bijvoorbeeld via $.get of fetch().
    Om de markup toe te voegen kan je gebruik maken van $.after().

## Epic 2: een eenvoudige winkelkar
Eerst weer wat backend werk:
11. Voorzie een nieuwe 'CartController' met Get (= ophalen van alle items in de winkelkar), Post (= plaatsen van een product in de winkelkar) en Delete (= verwijderen van een product uit de kar).
    Vooralsnog gaan we een gedeelde winkelkar maken: iedereen ziet dezelfde winkelkar (dus nog geen login of zo).
    We gaan ook maar ondersteuning bieden voor max één item van een product in de kar (dus geen 'aantal' items van een bepaald product).
    Verder gaan we de inhoud van de kar ook enkel bijhouden in een static List (zoals de producten), dus geen interactie met een database.
    (!) Opgelet met DELETE: de method verwacht de id via de URL en niet in de body. Dit kan je oplossen door die "{id}" weg te doen en [FromBody] bij het argument te zetten zoals bij Post.
12. Test de verschillende methods van de Cart controller, dus een GET naar /cart, een POST naar /cart (via PostMan!) en een DELETE naar /cart (via PostMan!).
    Voor de Post en Delete zal je dus gebruik moeten maken van Postman want via de URL adresbalk van een browser kan je die methods niet uitvoeren.

Terug naar de frontend:
13. Pas de layout aan zodat alle producten over een breedte van 10 kolommen worden getoond in een <main> en de cart in een <aside> van twee kolommen.
    Bemerk dat je dus rows in rows in rows ... kan gebruiken bij gebruik van Bootstrap.
14. Vul de <aside> met alle producten die in de winkelkar zitten.
15. Koppel een event aan de 'Toevoegen' anchor zodat het product wordt toegevoegd (via een POST), waarna de lijst opnieuw wordt bijgewerkt.
    $.post werkt spijtig genoeg niet zomaar out of the box met json, waardoor je zal moeten teruggrijpen naar ajax.
    Maar er is een propere workaround waarbij we jQuery 'uitbreiden' met een nieuwe postJSON methode: https://stackoverflow.com/questions/40074899/unsupported-media-type-when-posting-json-data-to-api-using-jquery