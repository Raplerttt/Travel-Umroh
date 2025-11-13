import { http } from '../httpClient';

const contactService = {
  // Send contact message
  sendMessage: async (messageData) => {
    const response = await http.post('/contact', messageData);
    return response.data;
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email) => {
    const response = await http.post('/contact/newsletter', { email });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribeNewsletter: async (token) => {
    const response = await http.post('/contact/unsubscribe', { token });
    return response.data;
  },

  // Get contact information
  getContactInfo: async () => {
    const response = await http.get('/contact/info');
    return response.data;
  },

  // Get FAQ categories and questions
  getFAQs: async (category = null) => {
    const params = category ? { category } : {};
    const response = await http.get('/contact/faqs', { params });
    return response.data;
  },

  // Get FAQ categories
  getFAQCategories: async () => {
    const response = await http.get('/contact/faqs/categories');
    return response.data;
  }
};

export default contactService;