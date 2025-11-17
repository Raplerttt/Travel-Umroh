import React, { memo, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { usePackages } from '../../hooks/usePackages';
import { useGallery } from '../../hooks/useGallery';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

// Lazy load dengan fallback
const PackageCard = React.lazy(() => 
  import('../../components/ui/PackageCard/PackageCard')
);

// Static data dipindah ke luar component untuk prevent re-creation
const STATS_DATA = [
  { number: '5000+', label: 'Jamaah Bahagia' },
  { number: '50+', label: 'Paket Umroh' },
  { number: '10+', label: 'Tahun Pengalaman' },
  { number: '24/7', label: 'Dukungan Pelanggan' },
];

const FEATURES_DATA = [
  {
    icon: '🕌',
    title: 'Bimbingan Ahli',
    description: 'Pemandu berpengalaman mendampingi perjalanan spiritual Anda.'
  },
  {
    icon: '🏨',
    title: 'Akomodasi Berkualitas',
    description: 'Hotel nyaman dekat Masjidil Haram dengan fasilitas terbaik.'
  },
  {
    icon: '✈️',
    title: 'Penerbangan Langsung',
    description: 'Pengaturan penerbangan mudah dengan maskapai terpercaya.'
  },
  {
    icon: '📋',
    title: 'Dokumentasi Lengkap',
    description: 'Kami urus semua visa dan dokumen perjalanan Anda.'
  },
  {
    icon: '🍽️',
    title: 'Makanan Bergizi',
    description: 'Makanan sehat dan lezat selama perjalanan Anda.'
  },
  {
    icon: '🚌',
    title: 'Transportasi Nyaman',
    description: 'Bus ber-AC untuk semua kebutuhan transportasi Anda.'
  },
];

// Data Testimoni
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Ahmad & Siti',
    location: 'Jakarta',
    rating: 5,
    text: 'Alhamdulillah, perjalanan umroh kami sangat berkesan. Pelayanan Haymana Tour sangat profesional dan penuh perhatian.',
    image: '/images/testimonial-1.jpg',
    date: 'November 2024'
  },
  {
    id: 2,
    name: 'Budi Family',
    location: 'Bandung',
    rating: 5,
    text: 'Hotel dekat dengan Masjidil Haram, makanan enak, dan pemandu sangat sabar membimbing. Recommended!',
    image: '/images/testimonial-2.jpg',
    date: 'Oktober 2024'
  },
  {
    id: 3,
    name: 'Ibu Maryam',
    location: 'Surabaya',
    rating: 5,
    text: 'Sebagai jamaah lansia, saya sangat terbantu dengan pelayanan yang diberikan. Transportasi sangat nyaman.',
    image: '/images/testimonial-3.jpg',
    date: 'September 2024'
  }
];

// Data Promo
const PROMO_DATA = [
  {
    id: 1,
    title: 'Paket Umroh Awal Tahun',
    discount: '15%',
    description: 'Diskon khusus untuk pendaftaran sebelum 31 Januari 2025',
    validUntil: '2025-01-31',
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600'
  },
  {
    id: 2,
    title: 'Paket Umroh Keluarga',
    discount: '2 FOR 1',
    description: 'Khusus paket keluarga - gratis 1 orang untuk setiap 5 pendaftar',
    validUntil: '2025-02-28',
    bgColor: 'bg-gradient-to-r from-blue-500 to-purple-600'
  },
  {
    id: 3,
    title: 'Paket Umroh Ramadhan',
    discount: '10%',
    description: 'Bersiaplah menyambut Ramadhan di tanah suci dengan promo spesial',
    validUntil: '2025-03-15',
    bgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

// Optimized components dengan memo
const StatItem = memo(({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
      {number}
    </div>
    <div className="text-gray-600 font-medium">
      {label}
    </div>
  </div>
));

const FeatureItem = memo(({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow duration-300">
    <div aria-hidden="true" className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
));

const TestimonialCard = memo(({ name, location, rating, text, image, date }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
        <span className="text-lg">🙏</span>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-gray-600 text-sm">{location} • {date}</p>
      </div>
    </div>
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">⭐</span>
      ))}
    </div>
    <p className="text-gray-700 italic">"{text}"</p>
  </div>
));

const PromoCard = memo(({ title, discount, description, validUntil, bgColor }) => (
  <div className={`${bgColor} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="text-center">
      <div className="text-4xl font-bold mb-2">{discount}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="mb-4 opacity-90">{description}</p>
      <div className="text-sm opacity-80">
        Berlaku hingga: {new Date(validUntil).toLocaleDateString('id-ID')}
      </div>
    </div>
  </div>
));

const GalleryItem = memo(({ image, title, description }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="aspect-w-16 aspect-h-12 bg-gray-200">
      <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <span className="text-4xl">🕌</span>
      </div>
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
      <div className="p-4 text-white">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  </div>
));

const Home = () => {
  const { featuredPackages, isLoading } = usePackages();
  const { gallery, loading: galleryLoading } = useGallery();

  // Optimize featured packages dengan useMemo
  const displayedPackages = useMemo(() => 
    featuredPackages.slice(0, 3), 
    [featuredPackages]
  );

  const limitedGallery = useMemo(() => gallery.slice(0, 6), [gallery]);

  return (
    <div>
      {/* Hero Section dengan Background Image */}
      <section 
        aria-label="Hero section – Mulai Perjalanan Spiritual Anda ke Mekah dan Madinah"
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Background Image dengan overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/kabah.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge Travel Terbaik */}
            <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-8 border border-white border-opacity-30">
              <span className="text-white text-lg font-semibold">
                🏆 Travel Umroh Terpercaya 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Haymana Tour
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-8 opacity-95 font-light">
              Travel Umroh Terbaik untuk Pengalaman Spiritual Tak Terlupakan
            </p>
            <p className="text-xl text-white mb-12 max-w-2xl mx-auto opacity-90">
              Percayakan perjalanan ibadah umroh Anda pada kami. Pengalaman 10+ tahun melayani jamaah Indonesia dengan hati dan profesionalisme.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.PACKAGES} aria-label="Lihat paket umroh kami">
                <Button size="lg" variant="secondary" className="bg-black text-primary-700 hover:bg-gray-100">
                  Lihat Paket Umroh
                </Button>
              </Link>
              <Link to={ROUTES.CONTACT} aria-label="Konsultasi gratis">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
                  Konsultasi Gratis
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {STATS_DATA.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white text-sm opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section aria-labelledby="promo-heading" className="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="promo-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Promo Spesial Umroh
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manfaatkan penawaran khusus kami untuk perjalanan spiritual Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROMO_DATA.map((promo) => (
              <PromoCard key={promo.id} {...promo} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-labelledby="features-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Haymana Tour?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan layanan umroh lengkap untuk memastikan perjalanan spiritual Anda nyaman dan bermakna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section aria-labelledby="testimonials-heading" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Testimoni Jamaah
            </h2>
            <p className="text-xl text-gray-600">
              Pengalaman langsung dari jamaah yang telah berangkat umroh bersama kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section aria-labelledby="packages-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="packages-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Paket Umroh Pilihan
            </h2>
            <p className="text-xl text-gray-600">
              Temukan paket umroh terpopuler kami untuk perjalanan spiritual Anda
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            }>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </Suspense>
          )}

          <div className="text-center mt-12">
            <Link to={ROUTES.PACKAGES} aria-label="Lihat semua paket umroh">
              <Button size="lg">
                Lihat Semua Paket
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery/Dokumentasi Section */}
      <section aria-labelledby="gallery-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dokumentasi Perjalanan
              </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Momen-momen berharga jamaah kami di tanah suci
            </p>
            </div>
            {galleryLoading ? (
              <div className="flex justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {limitedGallery.map(item => (
                <GalleryItem key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-16 bg-primary-600 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Gambar di sebelah kiri */}
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/umrah-journey.jpg" 
                  alt="Perjalanan umroh ke Mekah dan Madinah" 
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Perjalanan Spiritual Anda Menanti</p>
                </div>
              </div>
            </div>

            {/* Konten di sebelah kanan */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Siap Memulai Perjalanan Spiritual Anda?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Hubungi kami hari ini untuk mulai merencanakan perjalanan spiritual Anda ke kota suci Mekah dan Madinah
              </p>

              {/* Fitur tambahan untuk meningkatkan kepercayaan */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Bimbingan Lengkap</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Akomodasi Terjamin</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Pembimbing Berpengalaman</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Tombol WhatsApp yang menonjol */}
                <a 
                  href="https://wa.me/6281111119702?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20paket%20umroh"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444"/>
                  </svg>
                  Konsultasi via WhatsApp
                </a>

                <Link to={ROUTES.PACKAGES} aria-label="Lihat semua paket umroh">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
                    Lihat Paket
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm opacity-80">
                Respon cepat dalam 5 menit selama jam operasional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);