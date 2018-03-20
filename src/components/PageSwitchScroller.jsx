import React from 'react';

import scrollIntoView from 'scroll-into-view';

class PageSwitchScroller extends React.Component {
  componentDidMount() {
    if (this.scroller !== null && !`${window.location}`.includes('#')) {
      scrollIntoView(this.scroller, {
        time: 400,
      });
    }
  }

  render() {
    const comp = (
      <div
        ref={scroller => {
          this.scroller = scroller;
        }}
        style={{ width: '100%', height: '1px' }}
      />
    );

    return comp;
  }
}

export default PageSwitchScroller;
