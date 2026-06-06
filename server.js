import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");


app.get("/", async function (request, response) {
  const apiResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_products?fields=*.*"
  );
 // Met fields=*.* worden ook gekoppelde relaties opgehaald, dan kan ik later ook de beschrijving van het product ophalen


  const data = await apiResponse.json();

  // Pak het eerste product uit de data-array.
  const product = data.data[0];

// Gebruik map() om door alle afbeeldingen te lopen
// en van elke Directus file ID een bruikbare afbeelding-URL te maken.
  const images = product.images.map((image) => {
    return `https://fdnd-agency.directus.app/assets/${image.directus_files_id}`;
  });

  response.render("index.liquid", {
    product: product,
    images: images,
  });
});

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console
  console.log(
    `Daarna kun je via http://localhost:${app.get("port")}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`,
  );
});
