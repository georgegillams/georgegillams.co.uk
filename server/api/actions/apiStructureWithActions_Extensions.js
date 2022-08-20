const apiStructureWithActionsExtensions = apiStructure => {
  // Blogs
  apiStructure.createBlog.action = require('./blogs/create');
  apiStructure.deleteBlog.action = require('./blogs/delete');
  apiStructure.loadBlogs.action = require('./blogs/loadAll');
  apiStructure.loadBlog.action = require('./blogs/loadSingle');
  apiStructure.updateBlog.action = require('./blogs/update');

  // Make payment
  apiStructure.loadPayment.action = require('./makePayment/load');
  apiStructure.createPaymentIntent.action = require('./makePayment/createIntent');
  apiStructure.resendPaymentReceipt.action = require('./makePayment/resendPaymentReceipt');

  // Payments
  apiStructure.createPayment.action = require('./payments/create');
  apiStructure.deletePayment.action = require('./payments/delete');
  apiStructure.loadPayments.action = require('./payments/loadAll');

  // Support
  apiStructure.createSupport.action = require('./support/create');
  apiStructure.deleteSupport.action = require('./support/delete');
  apiStructure.loadSupport.action = require('./support/loadAll');

  apiStructure.loadShowcaseImages.action = require('./photo-showcase/loadAll');

  return apiStructure;
};

export default { apiStructureWithActionsExtensions };
export { apiStructureWithActionsExtensions };
