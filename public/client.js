// Pak alle thumbnails
const thumbnails = document.querySelectorAll(".gallery-thumbnail");

// Pak de hoofdafbeelding
const mainImage = document.querySelector(".gallery-main-image");

// Loop door alle thumbnails
thumbnails.forEach((thumbnail) => {

  thumbnail.addEventListener("click", (event) => {
    event.preventDefault();

    // Pak de grote afbeelding uit de href
    const largeImage = thumbnail.href;

    // Zet de hoofdafbeelding naar de grote versie
    mainImage.src = `${largeImage}?width=1600`;

    // Alt tekst overnemen
    const thumbnailImage = thumbnail.querySelector("img");
    mainImage.alt = thumbnailImage.alt;

    // Active class verwijderen
    thumbnails.forEach((item) => {
      item.classList.remove("active");
    });

    // Active class toevoegen
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



function updateZoomImage() {
  // Toon de afbeelding van de actieve index.
  zoomImage.src = galleryImages[currentImageIndex].src;
  zoomImage.alt = galleryImages[currentImageIndex].alt;

  // Hier verander ik de waarde van de variabele 
  zoomLevel = 1;
  zoomImage.style.transform = `scale(${zoomLevel})`;
  // // Werk de zoom percentage tekst bij.
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
