/* @flow */

import React, { type Node, type ComponentType } from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'bpk-react-utils';
import cookie from 'react-cookies';

type WithGraphicContentBehaviourProps = {
  className: ?string,
  style: ?{},
};

type WithGraphicContentBehaviourState = {
  graphicContentInView: boolean,
  alwaysShowGraphicContent: boolean,
};

export default function withGraphicContentBehaviour(
  Component: ComponentType<any>,
): ComponentType<any> {
  class WithGraphicContentBehaviour extends React.Component<
    WithGraphicContentBehaviourProps,
    WithGraphicContentBehaviourState,
  > {
    element: ?HTMLElement;
    state: WithGraphicContentBehaviourState;

    static defaultProps: {};

    constructor(): void {
      super();

      this.state = {
        graphicContentInView: cookie.load('alwaysShowGraphicContent'),
        alwaysShowGraphicContent: false,
      };
    }

    // componentDidMount(): void {
    //   const reloadCookies = () => {
    //     this.setState({
    //       graphicContentInView: cookie.load('alwaysShowGraphicContent'),
    //     });
    //   };
    //
    //   reloadCookies();
    //   setInterval(reloadCookies, 1000);
    // }

    onClick = (): null => {
      console.log('clicked');
      this.setState({ graphicContentInView: true });
      if (this.state.alwaysShowGraphicContent) {
        cookie.save('alwaysShowGraphicContent', true, {
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
        });
      }
      console.log(this.state);
    };

    onToggle = (event): null => {
      console.log('toggled');
      console.log(event.target.checked);
      this.setState({ alwaysShowGraphicContent: event.target.checked });
      console.log(this.state);
    };

    render(): Node {
      const { style, className, ...rest } = this.props;

      return (
        <div style={style} className={className}>
          <Component
            graphicContentInView={this.state.graphicContentInView}
            alwaysShowGraphicContent={this.state.alwaysShowGraphicContent}
            onClick={this.onClick}
            onAlwaysShowChanged={this.onToggle}
            {...rest}
          />
        </div>
      );
    }
  }
  WithGraphicContentBehaviour.displayName = wrapDisplayName(
    Component,
    'withGraphicContentBehaviour',
  );

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
