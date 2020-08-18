import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div />;

let LoadableSupportForm = () => <div>SUPPORT_FORM</div>;
if (process.env.NODE_ENV !== 'test') {
  LoadableSupportForm = Loadable({
    loader: () => import('components/Forms/SupportForm'),
    loading: Loading,
  });
}

export default LoadableSupportForm;
