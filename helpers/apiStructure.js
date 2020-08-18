import appConfig from 'helpers/appConfig';

const GET = 'GET';
const POST = 'POST';

const apiStructure = {
  // Analytics
  createAnalytic: { method: POST, path: '/analytics/create' },
  loadAnalytics: { method: GET, path: '/analytics/load-all' },
  loadAnalyticsSummary: { method: GET, path: '/analytics/load' },

  // Auth
  loadAuth: { method: GET, path: '/auth/load' },
  logout: { method: POST, path: '/auth/logout' },
  requestVerificationEmail: {
    method: POST,
    path: '/auth/request-verification-email',
    isSensitive: true,
  },
  verifyEmail: { method: POST, path: '/auth/verify-email', isSensitive: true },

  // Login
  loginWithMagicLink: { method: POST, path: '/magic-links/login', isSensitive: true },
  requestMagicLink: { method: POST, path: '/magic-links/request', isSensitive: true },

  // Data
  backupAllData: { method: GET, path: '/data-management/backup', isSensitive: true },
  deleteEntity: { method: POST, path: '/data-management/delete-entity', isSensitive: true },
  deleteSet: { method: POST, path: '/data-management/delete-set', isSensitive: true },
  restoreBackup: { method: POST, path: '/data-management/restore', isSensitive: true },

  // Notifications
  createNotification: { method: POST, path: '/notifications/create' },
  deleteNotification: { method: POST, path: '/notifications/delete' },
  loadNotifications: { method: GET, path: '/notifications/load-all' },
  loadNotification: { method: GET, path: '/notifications/load/:id' },
  updateNotification: { method: POST, path: '/notifications/update' },

  // Users
  createUser: { method: POST, path: '/users/create' },
  deleteUser: { method: POST, path: '/users/delete' },
  loadUser: { method: GET, path: '/users/load' },
  loadUsers: { method: GET, path: '/users/load-all' },
  signUp: { method: POST, path: '/users/sign-up', isSensitive: true },
  updateUser: { method: POST, path: '/users/update' },

  // #region app-specific
  // Blogs
  createBlog: { method: POST, path: '/blogs/create' },
  deleteBlog: { method: POST, path: '/blogs/delete' },
  loadBlogs: { method: GET, path: '/blogs/load-all' },
  loadBlog: { method: GET, path: '/blogs/load/:id' },
  updateBlog: { method: POST, path: '/blogs/update' },

  // Make payment
  loadPayment: { method: POST, path: '/make-payment/load' },
  createPaymentIntent: { method: POST, path: '/make-payment/create-intent' },
  // TODO for admins to resend receipt
  resendPaymentReceipt: { method: POST, path: '/make-payment/resend-receipt' },

  // Payments
  createPayment: { method: POST, path: '/payments/create' },
  deletePayment: { method: POST, path: '/payments/delete' },
  loadPayments: { method: GET, path: '/payments/load-all' },

  // Support
  createSupport: { method: POST, path: '/support/create' },
  deleteSupport: { method: POST, path: '/support/delete' },
  loadSupport: { method: GET, path: '/support/load' },
  // #endregion app-specific
};

Object.keys(apiStructure).forEach(key => {
  apiStructure[key].fullPath = `${appConfig.apiEndpoint}${apiStructure[key].path}`;
});

export default apiStructure;
