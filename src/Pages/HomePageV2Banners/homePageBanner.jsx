import React, { ComponentType } from 'react';
import Button from '../../components/Button';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import PersonalDetails from '../../components/PersonalDetails';
import PageContentContainer from '../../components/PageContentContainer';
import astonMartin from '../../images/drivingExperience1.jpg';

import STYLES from './home-page-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

export default function homePageBanner(
  Component: ComponentType<any>,
  staticContainerHeight,
  instanceId,
): ComponentType<any> {
  class HomePageBanner extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        percentageComplete: 0,
        movingContainerOffset: 0,
        movingContainerPosition: 'absolute',
      };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }

    handleScroll = () => {
      const staticContainer = document.getElementById(
        `outerBanner${instanceId}`,
      );
      if (!staticContainer) return;
      // console.log(staticContainer);
      const staticContainerRect = staticContainer.getBoundingClientRect();
      // console.log(staticContainerRect);

      const movingContainer = document.getElementById(
        `innerBanner${instanceId}`,
      );
      if (!movingContainer) return;
      // console.log(movingContainer);
      const movingContainerRect = movingContainer.getBoundingClientRect();
      // console.log(movingContainerRect);

      let newPosition = 'fixed';
      let newMovingContainerOffset = 0 - staticContainerRect.y;

      const newMovingContainerOffsetMax =
        staticContainerRect.height - movingContainerRect.height;
      // console.log(staticContainerRect.height);
      // console.log(movingContainerRect.height);
      // console.log(newMovingContainerOffsetMax);

      if (newMovingContainerOffset < 0) {
        newMovingContainerOffset = 0;
        newPosition = 'absolute';
      } else if (newMovingContainerOffset > newMovingContainerOffsetMax) {
        newMovingContainerOffset = newMovingContainerOffsetMax;
        newPosition = 'absolute';
      }
      // const winHeight = window.innerHeight;

      // Annoying to compute doc height due to browser inconsistency
      // const { body } = document;
      // const html = document.documentElement;
      // const docHeight = Math.max(
      //   body.scrollHeight,
      //   body.offsetHeight,
      //   html.clientHeight,
      //   html.scrollHeight,
      //   html.offsetHeight,
      // );

      // const value = window.pageYOffset;
      this.setState({
        percentageComplete:
          newMovingContainerOffset * 100 / newMovingContainerOffsetMax,
        movingContainerOffset: newMovingContainerOffset,
        movingContainerPosition: newPosition,
      });
    };

    render() {
      // const {} = this.props;

      const outerStyle =
        staticContainerHeight === null ? {} : { height: staticContainerHeight };

      return (
        <main
          id={`outerBanner${instanceId}`}
          className={getClassName('home-page-banner__static-container')}
          style={outerStyle}
        >
          <div
            id={`innerBanner${instanceId}`}
            className={getClassName('home-page-banner__moving-container')}
            style={{
              position: this.state.movingContainerPosition,
              top:
                this.state.movingContainerPosition === 'fixed'
                  ? 0
                  : this.state.movingContainerOffset,
            }}
          >
            <Component percentageComplete={this.state.percentageComplete} />
            {/* <div className={getClassName('home-page-banner__debug-percentage')}>
              {`${this.state.percentageComplete}%`}
            </div> */}
          </div>
        </main>
      );
    }
  }

  return HomePageBanner;
}
