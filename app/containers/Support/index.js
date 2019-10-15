import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import actionMeta from './actionMeta';

import { selectors, actions, reducer } from './redux-definitions';
import { mapSelectors, mapActions } from 'helpers/redux';
import appSelectors from 'containers/App/selectors';
import saga from './saga';
import Support from './Support';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => mapActions(dispatch, { ...actions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...selectors, ...appSelectors }),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: actionMeta.key, reducer });
const withSaga = injectSaga({ key: actionMeta.key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Support);
export { mapDispatchToProps };
