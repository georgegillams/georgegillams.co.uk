import { API_ENDPOINT } from './constants';

const GET = 'get';
const POST = 'post';

const apiStructure = {
  // Analytics
  createAnalytic: { method: POST, path: '/analytics/create' },
  loadAnalytics: { method: POST, path: '/analytics/load-all' },
  loadAnalyticsSummary: { method: POST, path: '/analytics/load' },

  // Auth
  loadAuth: { method: GET, path: '/auth/load' },
  logout: { method: POST, path: '/auth/logout' },
  requestVerificationEmail: {
    method: POST,
    path: '/auth/request-verification-email',
  },
  verifyEmail: { method: POST, path: '/auth/verify-email' },

  // Login
  loadMagicLinks: { method: GET, path: '/magic-links/load-all' },
  loginWithMagicLink: { method: POST, path: '/magic-links/login' },
  requestMagicLink: { method: POST, path: '/magic-links/request' },

  // Blogs
  createBlog: { method: POST, path: '/blogs/create' },
  deleteBlog: { method: POST, path: '/blogs/delete' },
  loadBlogs: { method: GET, path: '/blogs/load-all' },
  loadBlog: { method: GET, path: '/blogs/load/:id' },
  updateBlog: { method: POST, path: '/blogs/update' },

  // Comments
  createComment: { method: POST, path: '/comments/create' },
  deleteComment: { method: POST, path: '/comments/delete' },
  loadComments: { method: GET, path: '/comments/load-all' },
  loadComment: { method: GET, path: '/comments/load' },
  updateComment: { method: POST, path: '/comments/update' },

  // Data
  backupAllData: { method: GET, path: '/data-management/backup' },
  deleteEntity: { method: POST, path: '/data-management/delete-entity' },
  deleteSet: { method: POST, path: '/data-management/delete-set' },
  restoreBackup: { method: POST, path: '/data-management/restore' },

  // Make payment
  loadPayment: { method: POST, path: '/make-payment/load' },
  createPaymentIntent: { method: POST, path: '/make-payment/create-intent' },
  resendPaymentReceipt: { method: POST, path: '/make-payment/resend-receipt' },

  // Monzo
  loadMonzoPots: { method: GET, path: '/monzo/load-pots' },
  loadMonzoTransactions: { method: GET, path: '/monzo/load-transactions' },
  setMonzoAPIKey: { method: POST, path: '/monzo/set-key' },

  // Notifications
  createNotification: { method: POST, path: '/notifications/create' },
  deleteNotification: { method: POST, path: '/notifications/delete' },
  loadNotifications: { method: GET, path: '/notifications/load-all' },
  loadNotification: { method: GET, path: '/notifications/load/:id' },
  updateNotification: { method: POST, path: '/notifications/update' },

  // Payments
  createPayment: { method: POST, path: '/payments/create' },
  deletePayment: { method: POST, path: '/payments/delete' },
  loadPayments: { method: GET, path: '/payments/load-all' },

  // Support
  createSupport: { method: POST, path: '/support/create' },
  deleteSupport: { method: POST, path: '/support/delete' },
  loadSupport: { method: GET, path: '/support/load' },

  // Users
  // TODO Why do we have create vs signUp?
  createUser: { method: POST, path: '/users/create' },
  deleteUser: { method: POST, path: '/users/delete' },
  loadUser: { method: GET, path: '/users/load' },
  loadUsers: { method: GET, path: '/users/load-all' },
  signUp: { method: POST, path: '/users/sign-up' },
  updateUser: { method: POST, path: '/users/update' },
};

Object.keys(apiStructure).forEach(key => {
  apiStructure[key].fullPath = `${API_ENDPOINT}${apiStructure[key].path}`;
});

export default apiStructure;
