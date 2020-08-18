import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div />;

let LoadableBlogForm = () => <div>BLOG_FORM</div>;
if (process.env.NODE_ENV !== 'test') {
  LoadableBlogForm = Loadable({
    loader: () => import('components/Forms/BlogForm'),
    loading: Loading,
  });
}

export default LoadableBlogForm;
