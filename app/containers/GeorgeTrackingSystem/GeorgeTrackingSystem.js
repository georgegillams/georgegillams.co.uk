import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection } from 'components/Typography';
import GTSEntity from 'components/GTS';
import LoadingIndicator from 'components/LoadingIndicator';
import 'containers/pages.scss';

const getClassName = c => c;

export default class GeorgeTrackingSystem extends React.Component {
  componentWillMount = () => {
    this.props.loadGtsLatest();
  };

  render() {
    const {
      loading,
      error,
      gtsData,
      loadGtsLatest,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [
      getClassName('pages__container'),
      getClassName('pages__container--centered'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Tracking" />
        <LoadingIndicator loading={loading} error={error}>
          {!gtsData && (
            <Section name="No live tracking currently available">
              <Section name="🗺" />
            </Section>
          )}
          {gtsData && <GTSEntity gts={gtsData} />}
        </LoadingIndicator>
      </div>
    );
  }
}

GeorgeTrackingSystem.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  gtsData: PropTypes.object,
  loadGtsLatest: PropTypes.func.isRequired,
  className: PropTypes.string,
};
