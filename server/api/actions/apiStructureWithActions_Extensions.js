const apiStructureWithActionsExtensions = apiStructure => {
  // Blogs
  apiStructure.createBlog.action = require('./blogs/create');
  apiStructure.deleteBlog.action = require('./blogs/delete');
  apiStructure.loadBlogs.action = require('./blogs/loadAll');
  apiStructure.loadBlog.action = require('./blogs/loadSingle');
  apiStructure.updateBlog.action = require('./blogs/update');

  // Support
  apiStructure.createSupport.action = require('./support/create');
  apiStructure.deleteSupport.action = require('./support/delete');
  apiStructure.loadSupport.action = require('./support/loadAll');

  apiStructure.loadShowcaseImages.action = require('./photo-showcase/loadAll');

  return apiStructure;
};

export default { apiStructureWithActionsExtensions };
export { apiStructureWithActionsExtensions };
