import { http } from '../httpClient';
import contactData from '../mockData/contact.json';

const contactService = {
  // Send contact message
  sendMessage: async (messageData) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate required fields
      if (!messageData.name || !messageData.email || !messageData.message) {
        throw {
          response: {
            data: {
              message: 'Nama, email, dan pesan harus diisi'
            }
          }
        };
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(messageData.email)) {
        throw {
          response: {
            data: {
              message: 'Format email tidak valid'
            }
          }
        };
      }
      
      // Create new message
      const newMessage = {
        id: Date.now(),
        ...messageData,
        status: 'unread',
        createdAt: new Date().toISOString(),
        read: false
      };
      
      // Add to mock data
      contactData.contactMessages.unshift(newMessage);
      
      return {
        data: newMessage,
        message: 'Pesan Anda telah terkirim. Kami akan membalas dalam 1x24 jam.'
      };
    }
    
    const response = await http.post('/contact', messageData);
    return response.data;
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw {
          response: {
            data: {
              message: 'Format email tidak valid'
            }
          }
        };
      }
      
      // Check if already subscribed
      const existingSubscriber = contactData.newsletterSubscribers.find(
        sub => sub.email === email
      );
      
      if (existingSubscriber) {
        throw {
          response: {
            data: {
              message: 'Email sudah terdaftar dalam newsletter'
            }
          }
        };
      }
      
      // Add new subscriber
      const newSubscriber = {
        id: Date.now(),
        email: email,
        subscribedAt: new Date().toISOString(),
        isActive: true,
        token: `unsub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      contactData.newsletterSubscribers.push(newSubscriber);
      
      return {
        data: { email },
        message: 'Terima kasih telah berlangganan newsletter kami!'
      };
    }
    
    const response = await http.post('/contact/newsletter', { email });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribeNewsletter: async (token) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const subscriberIndex = contactData.newsletterSubscribers.findIndex(
        sub => sub.token === token
      );
      
      if (subscriberIndex === -1) {
        throw {
          response: {
            data: {
              message: 'Token unsubscribe tidak valid'
            }
          }
        };
      }
      
      // Mark as inactive
      contactData.newsletterSubscribers[subscriberIndex].isActive = false;
      
      return {
        message: 'Anda telah berhasil berhenti berlangganan newsletter'
      };
    }
    
    const response = await http.post('/contact/unsubscribe', { token });
    return response.data;
  },

  // Get contact information
  getContactInfo: async () => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        data: contactData.contactInfo
      };
    }
    
    const response = await http.get('/contact/info');
    return response.data;
  },

  // Get FAQ categories and questions
  getFAQs: async (category = null) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      let filteredFAQs = [...contactData.faqs];
      
      // Filter by category if provided
      if (category) {
        filteredFAQs = filteredFAQs.filter(faq => faq.category === category);
      }
      
      // Sort by featured first, then by views
      filteredFAQs.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.views - a.views;
      });
      
      return {
        data: filteredFAQs,
        total: filteredFAQs.length,
        category: category ? contactData.faqCategories.find(cat => cat.id === category) : null
      };
    }
    
    const params = category ? { category } : {};
    const response = await http.get('/contact/faqs', { params });
    return response.data;
  },

  // Get FAQ categories
  getFAQCategories: async () => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        data: contactData.faqCategories
      };
    }
    
    const response = await http.get('/contact/faqs/categories');
    return response.data;
  },

  // Search FAQs
  searchFAQs: async (query) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!query || query.trim() === '') {
        return {
          data: [],
          total: 0,
          query: query
        };
      }
      
      const searchTerm = query.toLowerCase().trim();
      const results = contactData.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
      );
      
      // Increment views for searched items
      results.forEach(faq => {
        faq.views += 1;
      });
      
      return {
        data: results,
        total: results.length,
        query: query
      };
    }
    
    const response = await http.get('/contact/faqs/search', {
      params: { q: query }
    });
    return response.data;
  },

  // Get featured FAQs
  getFeaturedFAQs: async (limit = 5) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const featuredFAQs = contactData.faqs
        .filter(faq => faq.isFeatured)
        .slice(0, limit);
      
      return {
        data: featuredFAQs,
        total: featuredFAQs.length
      };
    }
    
    const response = await http.get('/contact/faqs/featured', {
      params: { limit }
    });
    return response.data;
  },

  // Increment FAQ views
  incrementFAQViews: async (faqId) => {
    if (process.env.NODE_ENV === 'development') {
      // Don't wait for this in development
      const faq = contactData.faqs.find(f => f.id === parseInt(faqId));
      if (faq) {
        faq.views += 1;
      }
      return { success: true };
    }
    
    const response = await http.post(`/contact/faqs/${faqId}/view`);
    return response.data;
  }
};

export default contactService;