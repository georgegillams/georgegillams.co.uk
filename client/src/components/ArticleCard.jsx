import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkCard from 'bpk-component-card';
import { NavLink } from 'react-router-dom';
import Section from './Section';
import SubSection from './SubSection';

import STYLES from './article-card.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class ArticleCard extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      day,
      month,
      imageBorder,
      light,
      linkUrl,
      imageSrc,
      title,
      className,
      ...rest
    } = this.props;

    const classNameFinal = [getClassName('article-card__outer-container')];
    if (className) classNameFinal.push(className);

    const bannerClassNames = [getClassName('article-card__banner')];
    if (this.state.hovering) {
      bannerClassNames.push(getClassName('article-card__banner--hovered'));
    }

    return (
      <NavLink to={linkUrl}>
        <div
          className={classNameFinal.join(' ')}
          {...rest}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          <div className={bannerClassNames.join(' ')} />
          <div className={getClassName('article-card__container')}>
            <div className={getClassName('article-card__date')}>
              <SubSection noAnchor noPadding link light={light} name={month} />
              <SubSection noAnchor noPadding link light={light} name={day} />
            </div>
            <Section
              light={light}
              name={title}
              link
              className={getClassName('article-card__title')}
            />
            <div
              className={getClassName('article-card__image')}
              style={{
                border: imageBorder ? `solid ${imageBorder} 0.1rem` : 'none',
                backgroundColor: light ? '#1E1E1E' : 'none',
                backgroundImage: `url(${imageSrc})`,
              }}
            />
          </div>
        </div>
      </NavLink>
    );
  }
}

ArticleCard.propTypes = {
  light: PropTypes.bool,
  imageBorder: PropTypes.bool,
  imageSrc: PropTypes.node,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

ArticleCard.defaultProps = {
  light: false,
  imageBorder: null,
  linkUrl: null,
  imageSrc: null,
  title: null,
  className: null,
};

export default ArticleCard;
