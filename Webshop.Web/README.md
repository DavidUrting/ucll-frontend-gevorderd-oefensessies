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


