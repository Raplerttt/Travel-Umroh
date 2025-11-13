import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  selectedPackage: null,
  bookingData: {
    packageId: null,
    departureDate: null,
    numberOfPax: 1,
    rooms: [],
    passengers: [],
    specialRequests: '',
    paymentMethod: '',
  },
  currentStep: 1,
  totalSteps: 4,
};

// Action types
const BOOKING_ACTIONS = {
  SET_PACKAGE: 'SET_PACKAGE',
  UPDATE_BOOKING_DATA: 'UPDATE_BOOKING_DATA',
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  RESET_BOOKING: 'RESET_BOOKING',
  ADD_PASSENGER: 'ADD_PASSENGER',
  UPDATE_PASSENGER: 'UPDATE_PASSENGER',
  REMOVE_PASSENGER: 'REMOVE_PASSENGER',
};

// Reducer
const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.SET_PACKAGE:
      return {
        ...state,
        selectedPackage: action.payload,
        bookingData: {
          ...state.bookingData,
          packageId: action.payload.id,
        },
      };

    case BOOKING_ACTIONS.UPDATE_BOOKING_DATA:
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          ...action.payload,
        },
      };

    case BOOKING_ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    case BOOKING_ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };

    case BOOKING_ACTIONS.PREV_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case BOOKING_ACTIONS.RESET_BOOKING:
      return initialState;

    case BOOKING_ACTIONS.ADD_PASSENGER:
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          passengers: [...state.bookingData.passengers, action.payload],
        },
      };

    case BOOKING_ACTIONS.UPDATE_PASSENGER:
      const updatedPassengers = state.bookingData.passengers.map((passenger, index) =>
        index === action.payload.index ? action.payload.data : passenger
      );
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          passengers: updatedPassengers,
        },
      };

    case BOOKING_ACTIONS.REMOVE_PASSENGER:
      const filteredPassengers = state.bookingData.passengers.filter(
        (_, index) => index !== action.payload
      );
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          passengers: filteredPassengers,
        },
      };

    default:
      return state;
  }
};

// Create context
const BookingContext = createContext();

// Provider component
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Actions
  const actions = {
    setPackage: (packageData) => {
      dispatch({ type: BOOKING_ACTIONS.SET_PACKAGE, payload: packageData });
    },

    updateBookingData: (data) => {
      dispatch({ type: BOOKING_ACTIONS.UPDATE_BOOKING_DATA, payload: data });
    },

    setStep: (step) => {
      dispatch({ type: BOOKING_ACTIONS.SET_STEP, payload: step });
    },

    nextStep: () => {
      dispatch({ type: BOOKING_ACTIONS.NEXT_STEP });
    },

    prevStep: () => {
      dispatch({ type: BOOKING_ACTIONS.PREV_STEP });
    },

    resetBooking: () => {
      dispatch({ type: BOOKING_ACTIONS.RESET_BOOKING });
    },

    addPassenger: (passengerData) => {
      dispatch({ type: BOOKING_ACTIONS.ADD_PASSENGER, payload: passengerData });
    },

    updatePassenger: (index, data) => {
      dispatch({ 
        type: BOOKING_ACTIONS.UPDATE_PASSENGER, 
        payload: { index, data } 
      });
    },

    removePassenger: (index) => {
      dispatch({ type: BOOKING_ACTIONS.REMOVE_PASSENGER, payload: index });
    },

    // Helper methods
    calculateTotal: () => {
      if (!state.selectedPackage) return 0;
      
      const basePrice = state.selectedPackage.price * state.bookingData.numberOfPax;
      const roomSupplements = state.bookingData.rooms.reduce(
        (total, room) => total + (room.supplement || 0), 0
      );
      
      return basePrice + roomSupplements;
    },

    isValidStep: (step) => {
      switch (step) {
        case 1:
          return !!state.bookingData.packageId;
        case 2:
          return state.bookingData.passengers.length === state.bookingData.numberOfPax;
        case 3:
          return state.bookingData.rooms.length > 0;
        case 4:
          return !!state.bookingData.paymentMethod;
        default:
          return false;
      }
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;