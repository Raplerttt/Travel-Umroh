import React, { useRef, useState, useCallback } from 'react';

const PartnerSlider = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const partners = [
    { 
      name: "Saudi Airlines", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Saudi_Airlines_logo.svg/1280px-Saudi_Airlines_logo.svg.png",
      type: "Maskapai"
    },
    { 
      name: "Garuda Indonesia", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Garuda_Indonesia_Logo_%282009%29.svg/1280px-Garuda_Indonesia_Logo_%282009%29.svg.png",
      type: "Maskapai"
    },
    { 
      name: "Emirates", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Emirates_logo.svg/2560px-Emirates_logo.svg.png",
      type: "Maskapai"
    },
    { 
      name: "Qatar Airways", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Qatar_Airways_Logo.svg/1280px-Qatar_Airways_Logo.svg.png",
      type: "Maskapai"
    },
    { 
      name: "Mövenpick Hotels", 
      logo: "https://seeklogo.com/images/M/movenpick-logo-4D3E40951A-seeklogo.com.png",
      type: "Hotel"
    },
    { 
      name: "Hilton Hotels", 
      logo: "https://seeklogo.com/images/H/hilton-logo-0E54E6D8A1-seeklogo.com.png",
      type: "Hotel"
    },
    { 
      name: "Marriott", 
      logo: "https://seeklogo.com/images/M/marriott-hotels-logo-8D313EEF6E-seeklogo.com.png",
      type: "Hotel"
    },
    { 
      name: "Turkish Airlines", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Turkish_Airlines_logo_2019_compact.svg/1280px-Turkish_Airlines_logo_2019_compact.svg.png",
      type: "Maskapai"
    },
    { 
      name: "Swissôtel", 
      logo: "https://seeklogo.com/images/S/swissotel-logo-8EBD199D1D-seeklogo.com.png",
      type: "Hotel"
    },
    { 
      name: "Pullman Hotels", 
      logo: "https://seeklogo.com/images/P/pullman-hotels-logo-67D30D0FE7-seeklogo.com.png",
      type: "Hotel"
    }
  ];

  // Mouse down event
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.userSelect = 'none';
  }, []);

  // Mouse leave event
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  }, []);

  // Mouse up event
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.removeProperty('user-select');
    }
  }, []);

  // Mouse move event
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Touch events untuk mobile
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section aria-labelledby="partners-heading" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="partners-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mitra Kerjasama Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bekerjasama dengan berbagai pihak terpercaya untuk memastikan kenyamanan perjalanan ibadah umroh Anda
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

          {/* Scroll Hint */}
          <div className="absolute -top-10 right-4 flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Geser untuk melihat lebih banyak
          </div>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 lg:gap-8 py-4 px-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 lg:w-56 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center justify-center h-16 mb-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
                <span className="text-base font-semibold text-gray-800 text-center leading-tight">
                  {partner.name}
                </span>
                <span className="text-sm text-gray-600 mt-2 bg-gray-200 px-2 py-1 rounded-full">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots untuk menunjukkan progress scroll */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm text-gray-600">Geser untuk menjelajahi mitra kami</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Badge Legal */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Terdaftar dan diawasi oleh Kementerian Agama Republik Indonesia
          </p>
          <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-primary-50 rounded-full">
            <span className="text-primary-600 font-semibold text-sm">No. SPT: 1234/DPU/XI/2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSlider;