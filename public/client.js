// Selecteer alle thumbnail links uit de galerij.
// querySelectorAll geeft een NodeList terug met alle elementen
// die de class .gallery-thumbnail hebben.
const thumbnails = document.querySelectorAll(".gallery-thumbnail");

// Selecteer de hoofdafbeelding van de galerij.
// Deze afbeelding wordt aangepast wanneer een gebruiker
// op een thumbnail klikt.
const mainImage = document.querySelector(".gallery-main-image");

// Loop door alle thumbnails heen.
// Voor iedere thumbnail voeg ik een click event listener toe.
thumbnails.forEach((thumbnail) => {

thumbnail.addEventListener("click", (event) => {


// Voorkom dat de browser de link opent.
// Normaal gesproken zou de href worden gevolgd,
// maar ik wil de afbeelding client-side wisselen.


// Haal de URL van de aangeklikte thumbnail op.
// Deze URL gebruik ik later voor de hoofdafbeelding.
const largeImage = thumbnail.href;

// Vervang de standaard afbeelding.
// Dit is de fallback afbeelding voor browsers
// die geen srcset ondersteunen.
mainImage.src = `${largeImage}?width=800`;

// Stel meerdere afbeeldingsgroottes beschikbaar.
// De browser kiest automatisch de meest geschikte versie
// op basis van schermgrootte en resolutie.
// Hierdoor worden onnodig grote afbeeldingen voorkomen
// en verbetert de performance.
mainImage.srcset = `
  ${largeImage}?width=600 600w,
  ${largeImage}?width=900 900w,
  ${largeImage}?width=1200 1200w
`;

// Zoek de afbeelding binnen de thumbnail.
// Ik gebruik deze om de alt-tekst over te nemen.
const thumbnailImage = thumbnail.querySelector("img");

// Neem de alt-tekst van de thumbnail over.
// Zo blijft de hoofdafbeelding toegankelijk voor
// screenreaders en andere hulpmiddelen.
mainImage.alt = thumbnailImage.alt;

// Verwijder eerst de active class van alle thumbnails.
// Hierdoor is er altijd maar één actieve thumbnail zichtbaar.
thumbnails.forEach((item) => {
  item.classList.remove("active");
});

// Voeg de active class toe aan de thumbnail
// waarop de gebruiker heeft geklikt.
// Dit geeft visuele feedback welke afbeelding actief is.
thumbnail.classList.add("active");


});

});


const galleryMainImage = document.querySelector(".gallery-main-image");
const galleryThumbnails = document.querySelectorAll(".gallery-thumbnail");

const zoomOverlay = document.querySelector(".zoom-overlay");
const zoomImage = document.querySelector(".zoom-image");
const zoomClose = document.querySelector(".zoom-close");

const zoomPrev = document.querySelector(".zoom-arrow-left");
const zoomNext = document.querySelector(".zoom-arrow-right");

const zoomIn = document.querySelector(".zoom-in");
const zoomOut = document.querySelector(".zoom-out");
const zoomLevelText = document.querySelector(".zoom-level");
const galleryZoomButton = document.querySelector(".gallery-zoom-button");


// Houdt bij welke afbeelding momenteel actief is
// 0 = eerste afbeelding, 1 = tweede afbeelding, enzovoort
// gebruiken let zodat de waarde altijd kan veranderen
let currentImageIndex = 0;

// Houdt het huidige zoomniveau bij
// 1 betekent 100% normale grootte
let zoomLevel = 1;


// zet de NodeList gallery thumbnails om naar een echte array met array.from() Omdat .map() alleen op arrays werkt.
// .map() loopt door elk item heen.
const galleryImages = Array.from(galleryThumbnails).map((thumbnail) => {

  // Zoek binnen deze specifieke thumbnail naar de afbeelding het is een hele link en ik heb alleen de src en alt nodig
const image = thumbnail.querySelector("img");

// return geeft een waarde terug
// geeft een object terug met de src en alt van de afbeelding
// Binnen de map callback maak ik met {} een object, Map verzamelt alle teruggegeven objecten en stopt ze in een nieuwe array 
  return {
    src: `${thumbnail.href}?width=1200`,
    alt: image.alt,
  };
});



// Deze functie updateZoomImage() zorgt ervoor dat de juiste afbeelding in de zoom-overlay wordt getoond. 
// Daarnaast wordt de zoom teruggezet naar 100%

function updateZoomImage() {
  // Toon de afbeelding van de actieve index.
  // current image index pakt het eerste object uit de array
  // De variabele galleryImages is een array met informatie van alle gallery thumbnails

  zoomImage.src = galleryImages[currentImageIndex].src;
  zoomImage.alt = galleryImages[currentImageIndex].alt;

  // Hier verander ik de waarde van de variabele 
  zoomLevel = 1;
  zoomImage.style.transform = `scale(${zoomLevel})`;
  // Werk de zoom percentage tekst bij.
  zoomLevelText.textContent = "100%";
}



function openZoomOverlay() {
  const activeThumbnail = document.querySelector(".gallery-thumbnail.active");

  currentImageIndex = Array.from(galleryThumbnails).indexOf(activeThumbnail);

  zoomOverlay.classList.add("active");

  updateZoomImage();
}

galleryMainImage.addEventListener("click", openZoomOverlay);

galleryZoomButton.addEventListener("click", openZoomOverlay);

zoomClose.addEventListener("click", () => {
  zoomOverlay.classList.remove("active");
});
// dit is om hem te sluiten hij haalt de active state weg 



// voor de pijltjes
zoomNext.addEventListener("click", () => {
 currentImageIndex = currentImageIndex + 1;
 // pakt de huidige afbeelding en doet plus 1 inde array en pakt bij de klik de volgende 

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
// Controleer of we voorbij de laatste afbeelding zijn gegaan.
// Zo ja, begin weer bij de eerste afbeelding.
  

  updateZoomImage();
});

zoomPrev.addEventListener("click", () => {
currentImageIndex = currentImageIndex - 1;
// pakt de huidige afbeelding en gaat er 1 terug

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }
  // Spring naar de laatste afbeelding wanneer we vóór de eerste afbeelding komen.

  updateZoomImage();
});

zoomIn.addEventListener("click", () => {
zoomLevel = zoomLevel + 0.25;
// hier pas ik de zoom level en verhoog het met 0.25

  if (zoomLevel > 1.75) {
    zoomLevel = 1.75;
  }
  // weer een controle als het over 1.75 springt dat hij terug gaat
  

 // Pas de CSS transform aan zodat de afbeelding groter of kleiner wordt.
  zoomImage.style.transform = `scale(${zoomLevel})`;
  // Zet het zoomLevel om naar een percentage en toon dit in de overlay.
  zoomLevelText.textContent = `${Math.round(zoomLevel * 100)}%`;
});

zoomOut.addEventListener("click", () => {
  zoomLevel -= 0.25;

  if (zoomLevel < 1) {
    zoomLevel = 1;
  }

  zoomImage.style.transform = `scale(${zoomLevel})`;
  zoomLevelText.textContent = `${Math.round(zoomLevel * 100)}%`;
});

// testen :)

document.addEventListener("keydown", (event) => {
  if (!zoomOverlay.classList.contains("active")) return;

  if (event.key === "Escape") {
    zoomOverlay.classList.remove("active");
  }

  if (event.key === "ArrowRight") {
    zoomNext.click();
  }

  if (event.key === "ArrowLeft") {
    zoomPrev.click();
  }

    if (event.key === "+" || event.key === "=") {
    zoomIn.click();
  }

  if (event.key === "-" || event.key === "_") {
    zoomOut.click();
  }
});




//de form, button, de overlay/ popup en afsluitbutton
const reviewForm = document.querySelector(".review-form");
const submitButton = document.querySelector(".review-submit-button");
const successOverlay = document.querySelector(".review-success-overlay");
const successClose = document.querySelector(".success-close");

// submit event toevoegen aan de form
reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // loading state toevoegen

   submitButton.classList.add("loading");
  submitButton.disabled = true;

  // form data ophalen
  const formData = new FormData(reviewForm);
const searchParams = new URLSearchParams(formData);

await fetch("/reviews", {
  method: "POST",
  body: searchParams,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

  submitButton.classList.remove("loading");
  submitButton.disabled = false;

  reviewForm.reset();

  successOverlay.classList.add("active");
});

successClose.addEventListener("click", () => {
  successOverlay.classList.remove("active");
    window.location.reload();
});
