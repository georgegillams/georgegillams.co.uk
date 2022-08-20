const apiStructureWithDescriptionsExtensions = apiStructure => {
  // Blogs
  apiStructure.createBlog.description = 'Create a new blog';
  apiStructure.createBlog.authorisation = 'Admin only';
  apiStructure.deleteBlog.description = 'Remove a blog';
  apiStructure.deleteBlog.authorisation = 'Admin only';
  apiStructure.loadBlogs.description = 'Load all blogs. If not admin, only non-deleted, published blogs will be loaded';
  apiStructure.loadBlogs.authorisation = 'None';
  apiStructure.loadBlog.description = 'Load a single blog. If not admin, will fail if deleted or not published';
  apiStructure.loadBlog.authorisation = 'None';
  apiStructure.loadBlog.arguments = 'id: the blog ID to load';
  apiStructure.updateBlog.description = 'Update a blog';
  apiStructure.updateBlog.authorisation = 'Admin only';

  // Make payment
  apiStructure.loadPayment.description = 'TODO';
  apiStructure.loadPayment.authorisation = 'TODO';
  apiStructure.createPaymentIntent.description = 'TODO';
  apiStructure.createPaymentIntent.authorisation = 'TODO';
  apiStructure.resendPaymentReceipt.description = 'TODO';
  apiStructure.resendPaymentReceipt.authorisation = 'Admin only';

  // Payments
  apiStructure.createPayment.description = 'TODO';
  apiStructure.createPayment.authorisation = 'TODO';
  apiStructure.deletePayment.description = 'TODO';
  apiStructure.deletePayment.authorisation = 'TODO';
  apiStructure.loadPayments.description = 'TODO';
  apiStructure.loadPayments.authorisation = 'TODO';

  // Support
  apiStructure.createSupport.description = 'TODO';
  apiStructure.createSupport.authorisation = 'Admin only';
  apiStructure.deleteSupport.description = 'TODO';
  apiStructure.deleteSupport.authorisation = 'Admin only';
  apiStructure.loadSupport.description = 'TODO';
  apiStructure.loadSupport.authorisation = 'None';

  apiStructure.loadShowcaseImages.description = 'Load images from Flickr showcase album';
  apiStructure.loadShowcaseImages.authorisation = 'None';

  return apiStructure;
};

export default { apiStructureWithDescriptionsExtensions };
export { apiStructureWithDescriptionsExtensions };
