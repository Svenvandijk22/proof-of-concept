// Stap 1: Pak alle thumbnails uit de HTML
const thumbnails = document.querySelectorAll(".gallery-thumbnail");

// Stap 2: Pak de grote hoofdafbeelding uit de HTML
const mainImage = document.querySelector(".gallery-main-image");

// Stap 3: Loop door alle thumbnails heen
thumbnails.forEach((thumbnail) => {
  // Stap 4: Luister naar een klik op elke thumbnail
  thumbnail.addEventListener("click", (event) => {
    // Stap 5: Voorkom dat de link de afbeelding opent
    event.preventDefault();

    // Stap 6: Pak de img uit de aangeklikte thumbnail
    const thumbnailImage = thumbnail.querySelector("img");

    // Stap 7: Vervang de hoofdafbeelding met de thumbnail-afbeelding
    mainImage.src = thumbnailImage.src;

    // Stap 8: Neem ook de alt-tekst over voor accessibility
    mainImage.alt = thumbnailImage.alt;

    // Stap 9: Haal eerst de active class weg bij alle thumbnails
    thumbnails.forEach((item) => {
      item.classList.remove("active");
    });

    // Stap 10: Zet de active class op de aangeklikte thumbnail
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
    src: image.src,
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

