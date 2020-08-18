import React from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import cookie from 'react-cookies';

export default function withGraphicContentBehaviour(Component) {
  class WithGraphicContentBehaviour extends React.Component {
    constructor() {
      super();

      this.graphicContentInView = cookie.load('alwaysShowGraphicContent');
      this.alwaysShowGraphicContent = false;
    }

    componentDidMount() {
      const reloadCookies = () => {
        this.setState({
          graphicContentInView: cookie.load('alwaysShowGraphicContent') || this.graphicContentInView,
        });
      };

      reloadCookies();
      this.interval = setInterval(reloadCookies, 1000);
    }

    componentWillUnmount = () => {
      clearInterval(this.interval);
    };

    onClick = () => {
      this.graphicContentInView = true;
      if (this.alwaysShowGraphicContent) {
        cookie.save('alwaysShowGraphicContent', true, {
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
        });
      }
    };

    onToggle = event => {
      this.alwaysShowGraphicContent = event.target.checked;
    };

    render() {
      return (
        <Component
          graphicContentInView={this.graphicContentInView}
          alwaysShowGraphicContent={this.alwaysShowGraphicContent}
          onClick={this.onClick}
          onAlwaysShowChanged={this.onToggle}
          {...this.props}
        />
      );
    }
  }
  WithGraphicContentBehaviour.displayName = wrapDisplayName(Component, 'withGraphicContentBehaviour');

  WithGraphicContentBehaviour.propTypes = {
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string,
  };

  WithGraphicContentBehaviour.defaultProps = {
    style: null,
    className: null,
  };

  return WithGraphicContentBehaviour;
}
