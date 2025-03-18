const GET = 'GET';
const POST = 'POST';

const apiStructureExtensions = {
  // Blogs
  createBlog: { method: POST, path: '/blogs/create' },
  deleteBlog: { method: POST, path: '/blogs/delete' },
  loadBlogs: { method: GET, path: '/blogs/load-all' },
  loadBlog: { method: GET, path: '/blogs/load/:id' },
  updateBlog: { method: POST, path: '/blogs/update' },

  // Books
  createBook: { method: POST, path: '/books/create' },
  deleteBook: { method: POST, path: '/books/delete' },
  loadBooks: { method: GET, path: '/books/load-all' },
  updateBook: { method: POST, path: '/books/update' },

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

  // Photo showcase
  loadShowcaseImages: { method: GET, path: '/photo-showcase/load-all' },

  // Webhooks
  createWebhookEndpoint: {
    method: POST,
    path: '/webhooks/create',
  },
  updateWebhookEndpoint: {
    method: POST,
    path: '/webhooks/update',
  },
  deleteWebhookEndpoint: {
    method: POST,
    path: '/webhooks/delete',
  },
  loadWebhookEndpoints: {
    method: GET,
    path: '/webhooks/load-all',
  },
  loadWebhookNotifications: {
    method: GET,
    path: '/webhooks/notifications/load-all/:id',
  },
  deleteWebhookNotification: {
    method: POST,
    path: '/webhooks/notifications/delete',
  },

  // Webhook notifications
  createWebhookNotification: {
    method: POST,
    path: '/v1/webhook/:id/notification',
  },
};

export default { apiStructureExtensions };
export { apiStructureExtensions };
