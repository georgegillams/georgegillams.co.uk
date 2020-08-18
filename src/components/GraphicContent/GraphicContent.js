import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'gg-components/Checkbox';
import { cssModules } from 'gg-components/helpers/cssModules';
import Button from 'components/common/Button';

import STYLES from './graphic-content.scss';

const getClassName = cssModules(STYLES);

const GraphicContent = props => {
  const {
    className,
    children,
    graphicContentInView,
    alwaysShowGraphicContent,
    onAlwaysShowChanged,
    onClick,
    ...rest
  } = props;

  const classNameFinal = [getClassName('graphic-content__outer-container')];
  if (className) {
    classNameFinal.push(className);
  }

  const contentContainerClassNames = [getClassName('graphic-content__content-container')];
  if (!graphicContentInView) {
    contentContainerClassNames.push([getClassName('graphic-content__content-container--hidden')]);
  }

  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <div className={contentContainerClassNames.join(' ')}>{children}</div>
      {!graphicContentInView && (
        <div className={getClassName('graphic-content__warning-container')}>
          <div className={getClassName('graphic-content__warning-container__inner')}>
            <div className={getClassName('graphic-content__text')}>This image contains graphic content</div>
            <br />
            {isServer && (
              <div className={getClassName('graphic-content__text')}>Enable JavaScript to view this content</div>
            )}
            {!isServer && (
              <>
                <Button onClick={onClick} className={getClassName('graphic-content__text')}>
                  Show graphic content
                </Button>
                <br />
                <Checkbox
                  labelClassName={getClassName('graphic-content__text')}
                  name="Always show graphic content"
                  label="Always show graphic content"
                  checked={alwaysShowGraphicContent}
                  onChange={onAlwaysShowChanged}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

GraphicContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  graphicContentInView: PropTypes.bool,
  alwaysShowGraphicContent: PropTypes.bool,
  onClick: PropTypes.func,
  onAlwaysShowChanged: PropTypes.func,
};

GraphicContent.defaultProps = {
  className: null,
  graphicContentInView: false,
  alwaysShowGraphicContent: false,
  onClick: null,
  onAlwaysShowChanged: null,
};

export default GraphicContent;
