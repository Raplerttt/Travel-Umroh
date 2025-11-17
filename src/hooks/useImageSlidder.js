import { useState, useEffect, useRef } from "react";

export const useImageSlider = (images = [], interval = 5000) => {
  const safeImages = Array.isArray(images) ? images : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  // Clear interval helper
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (safeImages.length === 0 || !interval) return;

    clearTimer(); // prevent multiple intervals

    timerRef.current = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === safeImages.length - 1 ? 0 : prev + 1
        );
        setIsTransitioning(false);
      }, 500); // fade duration
    }, interval);

    return clearTimer;
  }, [safeImages.length, interval]);

  const goToSlide = (index) => {
    if (safeImages.length === 0) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => {
    goToSlide(
      currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    goToSlide(
      currentIndex === 0 ? safeImages.length - 1 : currentIndex - 1
    );
  };

  return {
    currentIndex,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
    currentImage: safeImages[currentIndex] || null,
  };
};
