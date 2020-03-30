const actionMeta = {
  key: 'blogs',
  actionDefinitions: [
    {
      LOAD_BLOGS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingBlogs: true,
        loadBlogsError: false,
      },
    },
    {
      LOAD_BLOGS_REGISTER_SUCCESS: 'tbd',
      attributes: ['blogs'],
      stateMutations: {
        loadingBlogs: false,
        blogs: action => action.blogs,
      },
    },
    {
      LOAD_BLOGS_REGISTER_ERROR: 'tbd',
      attributes: ['loadBlogsError'],
      stateMutations: {
        loadingBlogs: false,
        loadBlogsError: action => action.loadBlogsError,
      },
    },
  ],
};

export default actionMeta;
