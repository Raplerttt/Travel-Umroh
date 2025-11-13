import React, { useState } from 'react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState([]);

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'booking', name: 'Booking Process' },
    { id: 'documents', name: 'Documents & Visa' },
    { id: 'travel', name: 'Travel & Accommodation' },
    { id: 'religious', name: 'Religious Guidance' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is the difference between Hajj and Umroh?',
        answer: 'Hajj is the fifth pillar of Islam and is obligatory for every Muslim who is physically and financially able to perform it at least once in their lifetime. Umroh, often called the lesser pilgrimage, is a voluntary pilgrimage that can be performed at any time of the year.'
      },
      {
        question: 'When is the best time to perform Umroh?',
        answer: 'Umroh can be performed year-round except during the Hajj season. The most popular times are during Ramadan (for greater rewards) and the winter months (for more comfortable weather).'
      },
      {
        question: 'What is the duration of a typical Umroh package?',
        answer: 'Most Umroh packages range from 7 to 14 days, depending on the itinerary and included activities. Extended packages up to 21 days are also available for those who wish to spend more time in the holy cities.'
      }
    ],
    booking: [
      {
        question: 'How far in advance should I book my Umroh package?',
        answer: 'We recommend booking at least 2-3 months in advance, especially for peak seasons like Ramadan. This allows sufficient time for visa processing and ensures better availability for flights and accommodation.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made 60 days or more before departure receive a full refund. Between 30-60 days, 50% refund is provided. Cancellations within 30 days are non-refundable but may be transferable under certain conditions.'
      },
      {
        question: 'Can I customize my Umroh package?',
        answer: 'Yes, we offer customizable packages where you can choose your preferred hotel category, flight options, and additional services. Contact our travel consultants for personalized packages.'
      }
    ],
    documents: [
      {
        question: 'What documents are required for Umroh visa?',
        answer: 'Required documents include: valid passport (minimum 6 months validity), recent passport-sized photographs, completed visa application form, confirmed round-trip flight tickets, vaccination certificates (especially meningitis), and hotel reservations.'
      },
      {
        question: 'How long does visa processing take?',
        answer: 'Visa processing typically takes 2-4 weeks. During peak seasons, it may take longer. We recommend submitting all required documents at least 6-8 weeks before your intended travel date.'
      },
      {
        question: 'Do you provide visa assistance?',
        answer: 'Yes, we provide complete visa processing assistance. Our team will guide you through the entire process and handle all documentation and submission on your behalf.'
      }
    ],
    travel: [
      {
        question: 'What type of accommodation is provided?',
        answer: 'We offer various accommodation options ranging from 3-star to 5-star hotels. All our selected hotels are within walking distance or short transportation access to the Haram in Mecca and Medina.'
      },
      {
        question: 'What is included in the package price?',
        answer: 'Our packages typically include: round-trip flights, hotel accommodation, all ground transportation in Saudi Arabia, meals (as specified), Umroh visa fees, guidance from experienced mutawifs, and educational sessions.'
      },
      {
        question: 'What is not included in the package price?',
        answer: 'Typically excluded are: personal expenses, additional meals and drinks, tips for guides and drivers, travel insurance, and any services not specifically mentioned in the package inclusions.'
      }
    ],
    religious: [
      {
        question: 'Will there be religious guidance during the journey?',
        answer: 'Yes, each group is accompanied by experienced mutawifs (religious guides) who provide continuous guidance on Umroh rituals, lead prayers, and offer spiritual support throughout the journey.'
      },
      {
        question: 'What should I know about Ihram?',
        answer: 'Ihram is the sacred state a Muslim must enter before performing Umroh. For men, it involves wearing two white seamless cloths. For women, it involves modest Islamic dress. Certain restrictions apply while in Ihram, which our guides will explain in detail.'
      },
      {
        question: 'Are there educational sessions before departure?',
        answer: 'Yes, we conduct comprehensive pre-departure orientation sessions covering all aspects of Umroh rituals, practical tips, cultural guidance, and what to expect during the journey.'
      }
    ]
  };

  const toggleItem = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Umroh travel
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenItems([]);
              }}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs[activeCategory].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-primary-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-primary-700 mb-6">
              Our travel consultants are here to help you with any questions about your Umroh journey.
            </p>
            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;