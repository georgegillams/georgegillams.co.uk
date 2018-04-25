import React, { ComponentType } from 'react';
import scrollIntoView from 'scroll-into-view';
import ScrollerButton from '../../components/ScrollerButton';

import STYLES from './home-page-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SCROLL_INTO_VIEW_LIMIT = 2000;

export default function homePageBanner(
  Component: ComponentType<any>,
  staticContainerHeight,
  instanceId,
  scrollToPositions,
  debug,
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
      const staticContainerRect = staticContainer.getBoundingClientRect();

      const movingContainer = document.getElementById(
        `innerBanner${instanceId}`,
      );
      if (!movingContainer) return;
      const movingContainerRect = movingContainer.getBoundingClientRect();

      let newPosition = 'fixed';
      let newMovingContainerOffset = 0 - staticContainerRect.y;

      const newMovingContainerOffsetMax =
        staticContainerRect.height - movingContainerRect.height;

      if (newMovingContainerOffset < 0) {
        newMovingContainerOffset = 0;
        newPosition = 'absolute';
      } else if (newMovingContainerOffset > newMovingContainerOffsetMax) {
        newMovingContainerOffset = newMovingContainerOffsetMax;
        newPosition = 'absolute';
      }

      this.setState({
        percentageComplete:
          newMovingContainerOffset * 100 / newMovingContainerOffsetMax,
        movingContainerOffset: newMovingContainerOffset,
        movingContainerPosition: newPosition,
      });
    };

    render() {
      const outerStyle =
        staticContainerHeight === null
          ? {}
          : { height: `${staticContainerHeight}vh` };
      const outerStyleHeightCalc =
        staticContainerHeight === null ? 300 : staticContainerHeight;

      // WheelReact.config({
      //   up: () => {
      //     if (
      //       this.state.lastScrollIntoView + SCROLL_INTO_VIEW_LIMIT >
      //       Date.now()
      //     ) {
      //       return;
      //     }
      //     const newCurrentScrollToPositionIndex =
      //       this.state.currentScrollToPositionIndex + 1;
      //     this.setState({
      //       currentScrollToPositionIndex: newCurrentScrollToPositionIndex,
      //     });
      //     console.log('wheel up detected.');
      //     console.log(
      //       `looking for scroller_${newCurrentScrollToPositionIndex}`,
      //     );
      //
      //     const newCurrentScrollTo = document.getElementById(
      //       `scroller_${newCurrentScrollToPositionIndex}`,
      //     );
      //     console.log(newCurrentScrollTo);
      //     if (!newCurrentScrollTo) return;
      //
      //     this.setState({
      //       lastScrollIntoView: Date.now(),
      //     });
      //     scrollIntoView(newCurrentScrollTo, {
      //       time: SCROLL_INTO_VIEW_LIMIT,
      //     });
      //   },
      //   down: () => {
      //     if (
      //       this.state.lastScrollIntoView + SCROLL_INTO_VIEW_LIMIT >
      //       Date.now()
      //     ) {
      //       return;
      //     }
      //     const newCurrentScrollToPositionIndex =
      //       this.state.currentScrollToPositionIndex - 1;
      //     this.setState({
      //       currentScrollToPositionIndex: newCurrentScrollToPositionIndex,
      //     });
      //     console.log('wheel down detected.');
      //     console.log(
      //       `looking for scroller_${newCurrentScrollToPositionIndex}`,
      //     );
      //
      //     const newCurrentScrollTo = document.getElementById(
      //       `scroller_${newCurrentScrollToPositionIndex}`,
      //     );
      //     console.log(newCurrentScrollTo);
      //     if (!newCurrentScrollTo) return;
      //
      //     this.setState({
      //       lastScrollIntoView: Date.now(),
      //     });
      //     scrollIntoView(newCurrentScrollTo, {
      //       time: SCROLL_INTO_VIEW_LIMIT,
      //     });
      //   },
      // });

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
            {debug && (
              <div
                className={getClassName('home-page-banner__debug-percentage')}
              >
                {`${this.state.percentageComplete}%`}
              </div>
            )}
          </div>

          <div
            style={{
              position: this.state.movingContainerPosition,
              top: 0,
              right: '1rem',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              {Object.keys(scrollToPositions).map((scrollToPosition, i) => (
                <ScrollerButton
                  style={{ margin: '.5rem 0' }}
                  onClick={() => {
                    const newCurrentScrollTo = document.getElementById(
                      `scroller_${i}`,
                    );
                    if (!newCurrentScrollTo) return;

                    scrollIntoView(newCurrentScrollTo, {
                      time: SCROLL_INTO_VIEW_LIMIT,
                    });
                  }}
                >
                  {scrollToPosition}
                </ScrollerButton>
              ))}
            </div>
          </div>
          {Object.keys(scrollToPositions).map((scrollToPosition, i) => (
            <div
              id={`scroller_${i}`}
              style={{
                position: 'absolute',
                opacity: 0,
                marginTop: `${scrollToPositions[scrollToPosition] *
                  outerStyleHeightCalc /
                  100}vh`,
              }}
            >{`${scrollToPosition} ${i}`}</div>
          ))}
        </main>
      );
    }
  }

  return HomePageBanner;
}
