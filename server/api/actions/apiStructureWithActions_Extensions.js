const apiStructureWithActionsExtensions = apiStructure => {
  // Blogs
  apiStructure.createBlog.action = require('./blogs/create');
  apiStructure.deleteBlog.action = require('./blogs/delete');
  apiStructure.loadBlogs.action = require('./blogs/loadAll');
  apiStructure.loadBlog.action = require('./blogs/loadSingle');
  apiStructure.updateBlog.action = require('./blogs/update');

  // Books
  apiStructure.createBook.action = require('./books/create');
  apiStructure.deleteBook.action = require('./books/delete');
  apiStructure.loadBooks.action = require('./books/loadAll');
  apiStructure.updateBook.action = require('./books/update');

  // Support
  apiStructure.createSupport.action = require('./support/create');
  apiStructure.deleteSupport.action = require('./support/delete');
  apiStructure.loadSupport.action = require('./support/loadAll');

  // Photo showcase
  apiStructure.loadShowcaseImages.action = require('./photo-showcase/loadAll');

  // Images
  apiStructure.createImage.action = require('./images/create');
  apiStructure.deleteImage.action = require('./images/delete');
  apiStructure.loadImages.action = require('./images/loadAll');
  apiStructure.loadImage.action = require('./images/loadSingle');
  apiStructure.downloadImagesZip.action = require('./images/downloadZip');

  // Webhooks
  apiStructure.createWebhookEndpoint.action = require('./webhooks/createEndpoint');
  apiStructure.updateWebhookEndpoint.action = require('./webhooks/updateEndpoint');
  apiStructure.deleteWebhookEndpoint.action = require('./webhooks/deleteEndpoint');
  apiStructure.loadWebhookEndpoints.action = require('./webhooks/loadAllEndpoints');

  // Webhook notifications
  apiStructure.createWebhookNotification.action = require('./webhooks/receiveNotification');
  apiStructure.loadWebhookNotifications.action = require('./webhooks/loadAllNotifications');
  apiStructure.deleteWebhookNotification.action = require('./webhooks/deleteNotification');
  apiStructure.readSingleNotification.action = require('./webhooks/readSingleNotification');

  return apiStructure;
};

export default { apiStructureWithActionsExtensions };
export { apiStructureWithActionsExtensions };
