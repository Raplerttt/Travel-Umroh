import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Ahmad Rahman',
      role: 'Founder & CEO',
      description: 'With over 15 years of experience in Islamic travel, Ahmad founded Umroh Travel to help Muslims fulfill their spiritual dreams.',
      image: '👨‍💼'
    },
    {
      name: 'Sarah Ismail',
      role: 'Travel Consultant',
      description: 'Sarah specializes in creating personalized Umroh experiences and ensuring every detail is perfect for our clients.',
      image: '👩‍💼'
    },
    {
      name: 'Mohammed Ali',
      role: 'Spiritual Guide',
      description: 'A certified Islamic scholar with deep knowledge of Hajj and Umroh rituals, Mohammed provides spiritual guidance to our pilgrims.',
      image: '👳'
    },
  ];

  const values = [
    {
      icon: '🤲',
      title: 'Spiritual Focus',
      description: 'We prioritize the spiritual aspect of your journey above all else.'
    },
    {
      icon: '⭐',
      title: 'Quality Service',
      description: 'We maintain the highest standards in accommodation, transportation, and guidance.'
    },
    {
      icon: '💝',
      title: 'Compassionate Care',
      description: 'We treat every pilgrim with the care and respect they deserve.'
    },
    {
      icon: '🔄',
      title: 'Continuous Improvement',
      description: 'We constantly seek feedback to enhance our services and pilgrim experiences.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Umroh Travel
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over a decade, we have been helping Muslims around the world fulfill their spiritual dreams of performing Umroh with comfort, dignity, and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6 opacity-90">
                To facilitate meaningful spiritual journeys by providing comprehensive, reliable, and compassionate Umroh services that exceed expectations while maintaining the highest standards of Islamic values.
              </p>
              <p className="text-lg opacity-90">
                We believe that every Muslim deserves the opportunity to perform Umroh with ease, comfort, and proper guidance, allowing them to focus entirely on their worship and spiritual connection.
              </p>
            </div>
            <div className="text-center">
              <div className="text-8xl">🕌</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals committed to your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied pilgrims who have trusted us with their spiritual journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              View Packages
            </button>
            <button className="border border-primary-500 text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;