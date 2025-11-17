import React, { memo } from 'react';
import { useImageSlider } from '../../../hooks/useImageSlidder';

const ImageSlider = memo(({ 
  images, 
  interval = 5000,
  showControls = true,
  showIndicators = true,
  autoPlay = true 
}) => {
  const {
    currentIndex,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
    currentImage
  } = useImageSlider(images, autoPlay ? interval : null);

  return (
    <div className="image-slider">
      <div className="slider-container">
        <div 
          className={`slide ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          key={currentImage.id}
        >
          <img 
            src={currentImage.url} 
            alt={currentImage.alt}
            className="slider-image"
          />
          <div className="slide-overlay">
            <div className="slide-content">
              <h2 className="slide-title">{currentImage.title}</h2>
              <p className="slide-description">{currentImage.description}</p>
            </div>
          </div>
        </div>

        {showControls && (
          <>
            <button 
              className="slider-control prev"
              onClick={prevSlide}
              aria-label="Gambar sebelumnya"
            >
              ‹
            </button>
            <button 
              className="slider-control next"
              onClick={nextSlide}
              aria-label="Gambar berikutnya"
            >
              ›
            </button>
          </>
        )}

        {showIndicators && (
          <div className="slider-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Pergi ke slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ImageSlider;