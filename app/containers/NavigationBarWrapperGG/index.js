import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import reducer from './reducer';
import saga from './saga';
import Container from './Container';

import injectReducer from 'meta-redux/dist/utils/injectReducer';
import injectSaga from 'meta-redux/dist/utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import { mapSelectors } from 'meta-redux/dist/selectors';

const mapDispatchToProps = () => ({});

const mapStateToProps = createStructuredSelector(mapSelectors(appSelectors));

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'navigation', reducer });
const withSaga = injectSaga({ key: 'navigation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Container);
export { mapDispatchToProps };
