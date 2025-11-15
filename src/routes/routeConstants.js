export const ROUTES = {
  // Public routes
  HOME: '/',
  PACKAGES: '/packages',
  PACKAGE_DETAIL: (id) => `/packages/${id}`,
  SCHEDULE: '/schedule',
  ABOUT: '/about',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  FAQ: '/faq',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User routes
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  BOOKINGS: '/dashboard/bookings',
  BOOKING_DETAIL: (id) => `/dashboard/bookings/${id}`,
  DOCUMENTS: '/dashboard/documents',
  CHANGE_PASSWORD: '/dashboard/change-password',
  
  // Booking process
  BOOKING: (packageId) => `/booking/${packageId}`,
  BOOKING_CONFIRMATION: (bookingId) => `/booking/${bookingId}/confirmation`,
  PAYMENT: (bookingId) => `/booking/${bookingId}/payment`,
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_PACKAGES: '/admin/packages',
  ADMIN_NEW_PACKAGE: '/admin/packages/new',
  ADMIN_EDIT_PACKAGE: (id) => `/admin/packages/edit/${id}`,
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_BOOKING_DETAIL: (id) => `/admin/bookings/${id}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: (id) => `/admin/users/${id}`,
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_SETTINGS: '/admin/settings',
};

// Route guards configuration
export const ROUTE_GUARDS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  ADMIN: 'admin',
  AUTH: 'auth', // Hanya untuk non-authenticated users
};

// Route permissions mapping
export const ROUTE_PERMISSIONS = {
  [ROUTES.HOME]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.PACKAGES]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.ABOUT]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.CONTACT]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.GALLERY]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.FAQ]: ROUTE_GUARDS.PUBLIC,
  [ROUTES.LOGIN]: ROUTE_GUARDS.AUTH,
  [ROUTES.REGISTER]: ROUTE_GUARDS.AUTH,
  [ROUTES.FORGOT_PASSWORD]: ROUTE_GUARDS.AUTH,
  [ROUTES.RESET_PASSWORD]: ROUTE_GUARDS.AUTH,
  [ROUTES.DASHBOARD]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.PROFILE]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.BOOKINGS]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.DOCUMENTS]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.CHANGE_PASSWORD]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.BOOKING]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.BOOKING_CONFIRMATION]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.PAYMENT]: ROUTE_GUARDS.PRIVATE,
  [ROUTES.ADMIN]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_PACKAGES]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_BOOKINGS]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_USERS]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_PAYMENTS]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_GALLERY]: ROUTE_GUARDS.ADMIN,
  [ROUTES.ADMIN_SETTINGS]: ROUTE_GUARDS.ADMIN,
};
