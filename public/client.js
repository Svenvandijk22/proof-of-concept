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

