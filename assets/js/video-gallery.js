// video-gallery.js — Fully compatible with your 2025 modular refactor

import { products } from "./products.js";
import { formatPrice } from "./utils.js";
import {
  toggleWishlist,
  renderWishlistHearts,
  showHeartAnimation,
} from "./wishlist.js";

const videos = [
  {
    id: 15,
    title: "Playboy Pyjamas",
    price: 18000,
    video: "/assets/vids/playboy_1.mp4",
    thumb: "/assets/img/playboy_3.png",
    pdp: "prod_details.html?id=15",
    tagTime: 2.0,
  },
  {
    id: 26,
    title: "V-Decorated Panties",
    price: 2500,
    video: "/assets/vids/v_panties.mp4",
    thumb: "/assets/img/v_panties_1.webp",
    pdp: "prod_details.html?id=26",
    tagTime: 2.0,
  },
  {
    id: 48,
    title: "Lingerie Gown Set I",
    price: 10500,
    video: "/assets/vids/lingerie_1.mp4",
    thumb: "/assets/img/lin_gown_s1_2.webp",
    pdp: "prod_details.html?id=48",
    tagTime: 2.0,
  },
  {
    id: 49,
    title: "Loose Fit Cotton Gown I",
    price: 11000,
    video: "/assets/vids/long_shirts.mp4",
    thumb: "/assets/img/szless_gown_1.webp",
    pdp: "prod_details.html?id=49",
    tagTime: 2.0,
  },
  {
    id: 52,
    title: "2-Piece Full Pyjamas Set II",
    price: 18500,
    video: "/assets/vids/full_pyj_II_1.mp4",
    thumb: "/assets/img/f_pyj_l_slv_1.jpeg",
    pdp: "prod_details.html?id=52",
    tagTime: 2.0,
  },
  {
    id: 39,
    title: "2-Piece Full Pyjamas Set I",
    price: 22000,
    video: "/assets/vids/pyjamas_3.mp4",
    thumb: "/assets/img/full_pyj_I_3.webp",
    pdp: "prod_details.html?id=39",
    tagTime: 2.0,
  },
  {
    id: 28,
    title: "Silk Striped Pyjamas",
    price: 16000,
    video: "/assets/vids/pyjamas_4.mp4",
    thumb: "/assets/img/striped_pyj_3.webp",
    pdp: "prod_details.html?id=28",
    tagTime: 2.0,
  },
  {
    id: 81,
    title: "2-Piece (Cheer) Night Wear",
    price: 10500,
    video: "/assets/vids/up_&_down.mp4",
    thumb: "/assets/img/cheer_1.webp",
    pdp: "prod_details.html?id=81",
    tagTime: 2.0,
  },
  {
    id: 19,
    title: "Shaper Tights",
    price: 11000,
    video: "/assets/vids/shaper_tights_vid.mp4",
    thumb: "/assets/img/shaper_tights_1.jpg",
    pdp: "prod_details.html?id=19",
    tagTime: 2.0,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const mobileReel = document.getElementById("mobile-reel");
  const desktopGrid = document.getElementById("desktop-gallery-grid");

  // MOBILE REEL

  if (mobileReel) {
    videos.forEach((vid) => {
      const div = document.createElement("div");
      div.className = "reel-video";
      div.innerHTML = `
        <button class="wishlist-btn" data-id="${vid.id}">
          <i class="ph ph-heart"></i>
        </button>
        <video src="${
          vid.video
        }" loop muted playsinline preload="metadata" disablePictureInPicture></video>
        <div class="reel-overlay">
          <div class="reel-product-tag" onclick="window.location.href='prod_details.html?id=${
            vid.id
          }'">
            <div class="tap-modal" id="tap-modal">
              <span><i class="ph ph-hand-tap"></i></span>
            </div>
            <div class="reel-details">
              <h3>${vid.title}</h3>
              <span><i class="ph-fill ph-star"></i>4.7</span>
              <p class="price">${formatPrice(vid.price)}</p>
            </div>
          </div>
        </div>
      `;
      mobileReel.appendChild(div);

      const video = div.querySelector("video");
      const overlay = div.querySelector(".reel-overlay");

      const playVideo = () => {
        video.play().catch(() => {});
        setTimeout(() => overlay.classList.add("show"), vid.tagTime * 1000);
      };
      const pauseVideo = () => {
        video.pause();
        video.currentTime = 0;
        overlay.classList.remove("show");
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) =>
            entry.isIntersecting ? playVideo() : pauseVideo()
          );
        },
        { threshold: 0.8 }
      );
      observer.observe(div);

      // Double-tap to save
      let taps = 0;
      div.addEventListener("click", (e) => {
        taps++;
        if (taps === 1) setTimeout(() => (taps = 0), 300);
        else if (taps === 2) {
          taps = 0;
          e.preventDefault();
          toggleWishlist(vid.id);
          showHeartAnimation(e.clientX, e.clientY);
        }
      });
    });
  }

  // === DESKTOP 2-COLUMN GRID ===
  videos.forEach((vid) => {
    const card = document.createElement("div");
    card.className = "gallery-video-card";
    card.innerHTML = `
      <video src="${vid.video}" loop muted preload="metadata"></video>
      <button class="wishlist-btn" data-id="${vid.id}">
        <i class="ph ph-heart"></i>
      </button>
      <div class="gallery-overlay" onclick="window.location.href='prod_details.html?id=${
        vid.id
      }'">
        <h3>${vid.title}</h3>
        <span><i class="ph-fill ph-star"></i>4.7</span>
        <p class="price">${formatPrice(vid.price)}</p>
      </div>
    `;
    desktopGrid.appendChild(card);

    // Hover play/pause
    card.addEventListener("mouseenter", () =>
      card.querySelector("video").play()
    );
    card.addEventListener("mouseleave", () => {
      const v = card.querySelector("video");
      v.pause();
      v.currentTime = 0;
    });
  });

  // Final step: render hearts on all wishlist buttons (mobile + desktop)
  renderWishlistHearts();
});
