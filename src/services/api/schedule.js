import { http } from '../httpClient';
import scheduleData from '../mockData/schedule.json';

const scheduleService = {
  // Get all schedules with filtering
  getSchedules: async (params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let filteredSchedules = [...scheduleData.schedules];
      
      // Filter by departure month
      if (params.departureMonth) {
        filteredSchedules = filteredSchedules.filter(schedule => {
          const departureDate = new Date(schedule.departureDate);
          return (departureDate.getMonth() + 1).toString() === params.departureMonth;
        });
      }
      
      // Filter by airline
      if (params.airline) {
        filteredSchedules = filteredSchedules.filter(
          schedule => schedule.airline === params.airline
        );
      }
      
      // Filter by price range
      if (params.minPrice) {
        filteredSchedules = filteredSchedules.filter(
          schedule => schedule.price >= parseInt(params.minPrice)
        );
      }
      
      if (params.maxPrice) {
        filteredSchedules = filteredSchedules.filter(
          schedule => schedule.price <= parseInt(params.maxPrice)
        );
      }
      
      // Filter by duration
      if (params.duration) {
        filteredSchedules = filteredSchedules.filter(schedule => {
          const scheduleDuration = parseInt(schedule.duration);
          return scheduleDuration >= parseInt(params.duration);
        });
      }
      
      // Sort schedules
      if (params.sort) {
        switch (params.sort) {
          case 'price-low':
            filteredSchedules.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredSchedules.sort((a, b) => b.price - a.price);
            break;
          case 'date-early':
            filteredSchedules.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
            break;
          case 'date-late':
            filteredSchedules.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));
            break;
          case 'duration':
            filteredSchedules.sort((a, b) => {
              const aDays = parseInt(a.duration);
              const bDays = parseInt(b.duration);
              return bDays - aDays;
            });
            break;
          default:
            break;
        }
      } else {
        // Default sort by departure date
        filteredSchedules.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
      }
      
      return {
        data: filteredSchedules,
        total: filteredSchedules.length,
        departureMonths: scheduleData.departureMonths,
        airlines: scheduleData.airlines
      };
    }
    
    const response = await http.get('/schedules', { params });
    return response.data;
  },

  // Get schedule by ID
  getScheduleById: async (id) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const schedule = scheduleData.schedules.find(
        item => item.id === parseInt(id)
      );
      
      if (!schedule) {
        throw {
          response: {
            data: {
              message: 'Jadwal tidak ditemukan'
            }
          }
        };
      }
      
      return {
        data: schedule
      };
    }
    
    const response = await http.get(`/schedules/${id}`);
    return response.data;
  },

  // Get schedules by package ID
  getSchedulesByPackage: async (packageId) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const packageSchedules = scheduleData.schedules.filter(
        schedule => schedule.packageId === parseInt(packageId)
      );
      
      return {
        data: packageSchedules,
        total: packageSchedules.length
      };
    }
    
    const response = await http.get(`/schedules/package/${packageId}`);
    return response.data;
  },

  // Check schedule availability
  checkAvailability: async (scheduleId, paxCount = 1) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const schedule = scheduleData.schedules.find(
        item => item.id === parseInt(scheduleId)
      );
      
      if (!schedule) {
        throw {
          response: {
            data: {
              message: 'Jadwal tidak ditemukan'
            }
          }
        };
      }
      
      const isAvailable = schedule.availableSlots >= paxCount;
      
      return {
        data: {
          available: isAvailable,
          availableSlots: schedule.availableSlots,
          requestedPax: paxCount,
          schedule: schedule.packageName
        }
      };
    }
    
    const response = await http.get(`/schedules/${scheduleId}/availability`, {
      params: { pax: paxCount }
    });
    return response.data;
  },

  // Get upcoming schedules
  getUpcomingSchedules: async (limit = 6) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const now = new Date();
      const upcoming = scheduleData.schedules
        .filter(schedule => new Date(schedule.departureDate) > now)
        .slice(0, limit);
      
      return {
        data: upcoming,
        total: upcoming.length
      };
    }
    
    const response = await http.get('/schedules/upcoming', {
      params: { limit }
    });
    return response.data;
  },

  // Book schedule
  bookSchedule: async (scheduleId, bookingData) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const schedule = scheduleData.schedules.find(
        item => item.id === parseInt(scheduleId)
      );
      
      if (!schedule) {
        throw {
          response: {
            data: {
              message: 'Jadwal tidak ditemukan'
            }
          }
        };
      }
      
      if (schedule.availableSlots < bookingData.paxCount) {
        throw {
          response: {
            data: {
              message: 'Kuota tidak mencukupi'
            }
          }
        };
      }
      
      // Simulate booking
      const booking = {
        id: Date.now(),
        scheduleId: parseInt(scheduleId),
        ...bookingData,
        bookingDate: new Date().toISOString(),
        status: 'pending',
        totalAmount: schedule.price * bookingData.paxCount
      };
      
      // Update available slots
      schedule.availableSlots -= bookingData.paxCount;
      
      return {
        data: booking,
        message: 'Booking berhasil dibuat'
      };
    }
    
    const response = await http.post(`/schedules/${scheduleId}/book`, bookingData);
    return response.data;
  }
};

export default scheduleService;