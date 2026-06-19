# Decathlon



## Inhoudsopgave

  * [discription](##discription)
  * [Usage](##Usage)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Discription

This project focuses on improving the Product Detail Page (PDP) for Decathlon Travel. The goal was to create a more user-friendly and mobile-friendly experience for the product gallery and adding interactive features.

The assignment included creating a responsive image gallery with thumbnails, a zoom feature and performance optimizations. Extra attention was given to accessibility, usability, and loading performance to improve the overall user experience.


## Usage

Browse through the product images using the thumbnails below the main image. Click on a thumbnail to change the active image. Open the zoom view for a closer look and use the navigation controls to switch between product photos.



https://github.com/user-attachments/assets/78a1a977-24d0-409c-bec7-4a9e042e4893




## Kenmerken

### html

The page is built using semantic HTML elements such as `<header>`, `<nav>`, `<section>`, `<article>`, and `<footer>`.

The HTML structure of the website is mainly composed of sections, with the exception of the popovers (zoom overlay and success state).

For the product gallery, an unordered list (`<ul>`) is used to display the thumbnails. Each thumbnail is wrapped in a link (`<a>`), which ensures that the gallery remains functional even when JavaScript is disabled.


### css

The website is built using a mobile-first approach. The base layout is designed for smaller screens first and is enhanced for larger screens using media queries.

```css
@media (min-width: 1200px) {
  .product-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 28rem;
  }
}
```

On mobile, the gallery and product information are stacked vertically. On desktop, CSS Grid places them next to each other.

The product gallery uses Flexbox to display the thumbnails.

```css
.gallery-thumbnails {
  display: flex;
  overflow-x: auto;
}
```

On mobile, users can scroll horizontally through the thumbnails.

```css
@media (min-width: 1200px) {
  .gallery-thumbnails {
    flex-direction: column;
    overflow-y: auto;
  }
}
```

On desktop, the thumbnails are displayed vertically and become scrollable along the y-axis.

The main image container uses relative positioning so the zoom button can be placed on top of the image.

```css
.gallery-main {
  position: relative;
}

.gallery-zoom-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
```

This ensures the zoom button always stays in the top-right corner of the image.

Based on user testing, a custom scrollbar was added to improve the discoverability of the thumbnail gallery.

```css
.gallery-thumbnails {
  scrollbar-color: transparent transparent;
}

.gallery-thumbnails:hover {
  scrollbar-color: #3643ba transparent;
}
```

The scrollbar remains hidden by default and only becomes visible when the user hovers over the gallery.

The review form uses CSS classes to provide visual feedback while a review is being submitted.

```css
.review-submit-button.loading .button-text {
  display: none;
}

.review-submit-button.loading .button-loader {
  display: inline-block;
}
```

When the `.loading` class is added through JavaScript, the button text is hidden and replaced with a loading spinner.

The success popup uses an overlay that is hidden by default.

```css
.review-success-overlay {
  display: none;
}

.review-success-overlay.active {
  display: flex;
}
```

When the `.active` class is added, the popup becomes visible and is centered on the screen using Flexbox.

To improve performance, the custom font uses `font-display: swap`.

```css
@font-face {
  font-family: "Decathlon";
  src: url("/fonts/Decathlon-VF.19016feb.woff2") format("woff2");
  font-display: swap;
}
```

This ensures that text remains visible while the custom font is loading, improving the perceived loading speed of the page.



## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
