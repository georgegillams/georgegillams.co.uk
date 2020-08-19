import React from 'react';

import { Input } from '../Input';

const textAreaComp = iProps => <textarea {...iProps} />;

const TextArea = props => <Input component={textAreaComp} {...props} />;

export default TextArea;
