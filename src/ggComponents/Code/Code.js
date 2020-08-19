import React from 'react';
import PropTypes from 'prop-types';

import { TextLink } from '../TextLink';
import { cssModules } from '../helpers/cssModules';

import STYLES from './code.module.scss';

const getClassName = cssModules(STYLES);

const Code = props => {
  const { children, lang, githubUrl, className, ...rest } = props;

  const classNameFinal = [getClassName('code__outer-container')];
  if (className) classNameFinal.push(className);

  const showTag = lang || githubUrl;
  const showSpace = lang && githubUrl;

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <code>
        {children}
        {showTag && (
          <span className={getClassName('code__lang')}>
            {lang && lang}
            {showSpace && <span>&nbsp;</span>}
            {githubUrl && (
              <TextLink light href={githubUrl} hrefExternal className={getClassName('code__text-link')}>
                View on Github{' '}
              </TextLink>
            )}
          </span>
        )}
      </code>
    </div>
  );
};

Code.propTypes = {
  lang: PropTypes.string,
  githubUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Code.defaultProps = {
  lang: null,
  githubUrl: null,
  className: null,
};

export default Code;
