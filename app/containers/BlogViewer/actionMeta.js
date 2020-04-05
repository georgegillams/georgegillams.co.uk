const actionMeta = {
  key: 'blog-viewer',
  actionDefinitions: [
    {
      LOAD_BLOG: 'tbd',
      attributes: ['blogId'],
      stateMutations: {
        blogId: action => action.blogId,
        loading: true,
        loadBlogError: false,
      },
    },
    {
      LOAD_BLOG_REGISTER_SUCCESS: 'tbd',
      attributes: ['blog'],
      stateMutations: {
        loading: false,
        blogs: (action, prevValue) => ({
          ...prevValue,
          [action.blog.id]: action.blog,
        }),
      },
    },
    {
      LOAD_BLOG_REGISTER_ERROR: 'tbd',
      attributes: ['loadBlogError'],
      stateMutations: {
        loading: false,
        loadBlogError: action => action.loadBlogError,
      },
    },
  ],
};

export default actionMeta;
