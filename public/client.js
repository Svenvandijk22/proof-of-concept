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
