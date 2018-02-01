import React from 'react';
import 'whatwg-fetch';

import NavigationBar from './NavigationBar';
import Footer from './Footer';
import PageContentContainer from './PageContentContainer';

import STYLES from './default-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class DefaultLayout extends React.Component {
  state = {
    response: 'no response yet',
  };

  componentWillMount() {
    document.getElementById('body').className = getClassName('default-layout__body');
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };
  //
  // componentDidMount() {
  //   this.callApi()
  //     .then((res) => {
  //       this.setState({ response: res.express });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    const location = `${window.location}`;
    const isLocalhost = location.includes('localhost');
    const needsRedirect = !isLocalhost && !location.includes('https');
    if (needsRedirect) {
      window.location = location.replace('http', 'https');
    }

    const { children } = this.props;

    return (
      <div className={getClassName('default-layout__site')}>
        <NavigationBar />
        <div className={getClassName('default-layout__main')}>
          <PageContentContainer>{children}</PageContentContainer>
          <br />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
