// GSAP

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: "power2.out",
  duration: 1,
});

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  tl.from(".reveal2", { y: 50, opacity: 0 })
});


//

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(
    ".slider-container.spilled-slider"
  );
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const originalSlides = gsap.utils.toArray(".slide");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  const slideGap = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--slide-gap")
  );
  const totalOriginalSlides = originalSlides.length;

  let slides = [];
  let currentSlideWidth = 0;
  let slidesPerView = 1;
  let currentOriginalIndex = 0;
  let wrapIndex;
  let draggableInstance;
  let animationTween;

  // Throttle for mouse wheel event
  let scrollTimeout;
  const SCROLL_DEBOUNCE_TIME = 100; // ms to wait before allowing another scroll snap

  // --- Clone Slides for Truly Infinite Loop Effect ---
  function setupClones() {
    sliderWrapper.innerHTML = "";
    slides = [];

    const numRepeats = 3;

    for (let r = 0; r < numRepeats; r++) {
      originalSlides.forEach((originalSlide) => {
        const clone = originalSlide.cloneNode(true);
        sliderWrapper.appendChild(clone);
        slides.push(clone);
      });
    }

    wrapIndex = gsap.utils.wrap(0, totalOriginalSlides);
  }

  // --- Determine Slides Per View based on CSS Media Queries ---
  function getSlidesPerView() {
    return parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--slides-per-view"
      )
    );
  }

  // --- Calculate the X offset to center the current slide ---
  function getCenteringOffset() {
    const sliderContainerWidth = sliderContainer.offsetWidth;
    return sliderContainerWidth / 2 - currentSlideWidth / 2;
  }

  // --- Update Slider Layout and Position ---
  function updateSliderLayout() {
    slidesPerView = getSlidesPerView();
    setupClones();

    currentSlideWidth = slides[0].offsetWidth;

    const totalWrapperWidth = slides.length * (currentSlideWidth + slideGap);
    gsap.set(sliderWrapper, { width: totalWrapperWidth });

    const initialOffset = totalOriginalSlides * (currentSlideWidth + slideGap);
    const startX = -initialOffset + getCenteringOffset();
    gsap.set(sliderWrapper, { x: startX });

    currentOriginalIndex = 0;
    updateActiveSlideClasses();
    animateSlideContent(slides[totalOriginalSlides]);

    if (draggableInstance) {
      draggableInstance.kill();
    }
    setupDraggable();
    // Mouse wheel listener is set up only once
  }

  // --- Setup Draggable Function (for touch swipe) ---
  function setupDraggable() {
    const slideDistance = currentSlideWidth + slideGap;

    // Draggable will handle touch-based scrolling. We can make its bounds very wide
    // or effectively infinite, as `onThrowUpdate` will handle the snapping.
    const minDragX = -(slides.length - 1) * slideDistance;
    const maxDragX = 0;

    draggableInstance = Draggable.create(sliderWrapper, {
      type: "x",
      bounds: { minX: minDragX, maxX: maxDragX }, // Very wide bounds
      edgeResistance: 1, // No resistance, feels more like scrolling
      throwProps: true,
      onDrag: function () {
        handleInfiniteLoopSnap(this.x);
        updateCurrentOriginalIndexFromX(this.x);
      },
      onThrowUpdate: function () {
        handleInfiniteLoopSnap(this.x);
        updateCurrentOriginalIndexFromX(this.x);
      },
      onDragEnd: function () {
        // After drag, snap to the nearest slide
        snapToNearestSlide();
      },
      onRelease: function () {
        snapToNearestSlide();
      },
      onClick: function () {
        if (this.isDragging) return false;
      },
    })[0];
  }

  // --- Mouse Wheel Scrolling ---
  function handleMouseWheel(e) {
    // Prevent page scroll if mouse is over the slider
    e.preventDefault();

    // Debounce scroll events
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const direction = e.deltaY > 0 ? 1 : -1; // Positive deltaY means scrolling down (next slide), negative up (prev slide)
      goToSlide(currentOriginalIndex + direction);
    }, SCROLL_DEBOUNCE_TIME);
  }

  // --- Handles the seamless loop snapping during animation or drag ---
  function handleInfiniteLoopSnap(currentX) {
    const slideDistance = currentSlideWidth + slideGap;
    const loopThreshold = totalOriginalSlides * slideDistance;

    // Determine if we've moved significantly past the central block of original slides
    const currentWrapperX = currentX;
    const centerPointOffset = getCenteringOffset();

    // If we cross the "left" boundary of the primary loop region (e.g., scrolled past the second set of originals to the far left clones)
    if (
      currentWrapperX <
      centerPointOffset - totalOriginalSlides * slideDistance * 1.5
    ) {
      // Adjust multiplier as needed
      gsap.set(sliderWrapper, { x: currentWrapperX + loopThreshold });
      // console.log("Snapped right");
    }
    // If we cross the "right" boundary of the primary loop region (e.g., scrolled past the first set of originals to the far right clones)
    else if (
      currentWrapperX >
      centerPointOffset - totalOriginalSlides * slideDistance * 0.5
    ) {
      // Adjust multiplier as needed
      gsap.set(sliderWrapper, { x: currentWrapperX - loopThreshold });
      // console.log("Snapped left");
    }
  }

  // --- Update Current Original Index from current wrapper X position ---
  // Used by draggable to update dots and active state during interaction
  function updateCurrentOriginalIndexFromX(xPos) {
    const slideDistance = currentSlideWidth + slideGap;
    // Calculate the effective index in the "logical" sequence of clones
    const centerIndexFromX = Math.round(
      (-xPos + getCenteringOffset()) / slideDistance
    );

    // Map this logical index back to the 0-to-totalOriginalSlides-1 range
    const newOriginalIndex = wrapIndex(centerIndexFromX % totalOriginalSlides);

    if (newOriginalIndex !== currentOriginalIndex) {
      currentOriginalIndex = newOriginalIndex;
      updateActiveSlideClasses(); // Update active class on physical slide and content
      // Only animate content if it's a significant change, not on every tiny drag pixel
      // This is implicitly handled by animateSlideContent only targeting the `currentOriginalIndex`
    }
  }

  // --- Snap to nearest slide after drag/wheel scroll ---
  function snapToNearestSlide() {
    const currentWrapperX = gsap.getProperty(sliderWrapper, "x");
    const slideDistance = currentSlideWidth + slideGap;

    // Calculate the current logical index from the wrapper's position
    const logicalIndex = Math.round(
      (-currentWrapperX + getCenteringOffset()) / slideDistance
    );

    // Map this back to the original index
    currentOriginalIndex = wrapIndex(logicalIndex % totalOriginalSlides);

    goToSlide(currentOriginalIndex); // Animate to this slide
  }

  // --- Core Slide Animation Function ---
  function goToSlide(targetOriginalIndex, animate = true) {
    if (draggableInstance && draggableInstance.isThrowing) {
      draggableInstance.endDrag();
    }
    if (animationTween && animationTween.isActive()) {
      animationTween.kill(); // Kill previous animation if a new one starts
    }

    currentOriginalIndex = wrapIndex(targetOriginalIndex);

    const slideDistance = currentSlideWidth + slideGap;
    let currentWrapperX = gsap.getProperty(sliderWrapper, "x");
    const centerWrapperIndex =
      (-currentWrapperX + getCenteringOffset()) / slideDistance;

    let closestFullIndex = -1;
    let minDistance = Infinity;

    slides.forEach((slide, i) => {
      if (i % totalOriginalSlides === currentOriginalIndex) {
        const distance = Math.abs(i - centerWrapperIndex);
        if (distance < minDistance) {
          minDistance = distance;
          closestFullIndex = i;
        }
      }
    });

    const targetX = -closestFullIndex * slideDistance + getCenteringOffset();

    animationTween = gsap.to(sliderWrapper, {
      x: targetX,
      duration: animate ? 0.8 : 0,
      ease: "power3.inOut",
      overwrite: "auto",
      onUpdate: () => {
        handleInfiniteLoopSnap(gsap.getProperty(sliderWrapper, "x"));
        updateCurrentOriginalIndexFromX(gsap.getProperty(sliderWrapper, "x")); // Update index during animation too
      },
      onComplete: () => {
        updatePaginationDots();
        updateActiveSlideClasses();
        animateSlideContent(originalSlides[currentOriginalIndex]);
        animationTween = null; // Clear tween reference
      },
    });

    updateActiveSlideClasses();
    animateSlideContent(originalSlides[currentOriginalIndex]);
  }

  // --- Navigation for prev/next buttons ---
  function navigate(direction) {
    goToSlide(currentOriginalIndex + direction);
  }

  // --- Update Active Slide Classes ---
  function updateActiveSlideClasses() {
    slides.forEach((slide) => slide.classList.remove("active"));

    const currentWrapperX = gsap.getProperty(sliderWrapper, "x");
    const slideDistance = currentSlideWidth + slideGap;
    const centeredSlideIndex = Math.round(
      (-currentWrapperX + getCenteringOffset()) / slideDistance
    );

    // if (slides[centeredSlideIndex]) {
    //   slides[centeredSlideIndex].classList.add("active");
    // }
  }

  // --- Content Animation for Current Slide ---
  function animateSlideContent(currentOriginalSlideElement) {
    // Only reset content for the *previous* active slide, not all.
    // This is more efficient. We need to store the previously active content.
    // For simplicity for now, we'll reset all, but for larger sliders this could be refined.
    originalSlides.forEach((oslide) => {
      const h2 = oslide.querySelector("h2");
      const p = oslide.querySelector("p");
      if (h2) gsap.set(h2, { y: 20, autoAlpha: 0 });
      if (p) gsap.set(p, { y: 20, autoAlpha: 0 });
    });

    const content = currentOriginalSlideElement.querySelector(".slide-content");
    if (content) {
      gsap
        .timeline()
        .fromTo(
          content.querySelector("h2"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          content.querySelector("p"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
    }
  }

  // --- Event Listeners ---
  prevButton.addEventListener("click", () => {
    navigate(-1);
  });

  nextButton.addEventListener("click", () => {
    navigate(1);
  });

  // Add mouse wheel listener to the slider container
  sliderContainer.addEventListener("wheel", handleMouseWheel);

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateSliderLayout, 200);
  });

  // --- Initialization ---
  gsap.registerPlugin(Draggable);
  updateSliderLayout();
});