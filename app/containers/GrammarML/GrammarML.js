import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import { cssModules } from 'bpk-react-utils';
import GGButton from 'components/GGButton';
import { Section, SubSection } from 'components/Typography';
import FormBuilder from 'components/Forms';
import { ANYTHING_REGEX } from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import Skeleton from './Skeleton';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class GrammarML extends React.Component {
  constructor(props) {
    super(props);

    this.state = { testData: {}, newData: {} };
  }

  componentDidMount = () => {
    this.props.loadData();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadData,

      test,
      createData,
      deleteData,
      deleteAll,

      data,
      result,

      loading,
      success,
      error,

      creating,
      createSuccess,
      createError,

      deleting,
      deleteSuccess,
      deleteError,

      deletingAll,
      deleteAllSuccess,
      deleteAllError,

      testing,
      testSuccess,
      testError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Section name="Machine learning - grammar">
          <SubSection name="Live test">
            <FormBuilder
              entity={this.state.testData}
              submitLabel="Test"
              formFields={[
                {
                  id: 'text',
                  name: 'Test data',
                  validationRegex: ANYTHING_REGEX,
                  show: true,
                },
              ]}
              disabled={testing}
              submitOnChange
              onDataChanged={testData => {
                this.setState({ testData });
              }}
              onSubmit={() => {
                test(this.state.testData);
              }}
            />
            {result && result.result && (
              <span>RESULT: The sentence is valid</span>
            )}
            {result && !result.result && (
              <span>RESULT: The sentence is invalid</span>
            )}
          </SubSection>
          <SubSection name="Training data">
            <FormBuilder
              entity={this.state.newData}
              submitLabel="Add training data"
              formFields={[
                {
                  id: 'text',
                  name: 'Training data',
                  validationRegex: ANYTHING_REGEX,
                  show: true,
                  long: true,
                },
              ]}
              disabled={creating}
              onDataChanged={newData => {
                this.setState({ newData });
              }}
              onSubmit={() => {
                createData(this.state.newData);
              }}
            />
            <GGButton
              large
              destructive
              disabled={deleting}
              style={{ marginBottom: '1rem' }}
              onClick={() => deleteAll()}
            >
              Reset training
            </GGButton>
            {data &&
              data.map &&
              data.map(b => (
                <Card
                  className={getClassName(
                    'pages__component',
                    'pages__bpk-card',
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{b.text}</span>
                  <GGButton
                    large
                    destructive
                    disabled={deleting}
                    onClick={() => deleteData(b)}
                  >
                    Delete
                  </GGButton>
                </Card>
              ))}
          </SubSection>
        </Section>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Machine Learning - Grammar" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!data && loading)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="ML Grammar"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadData,
            data,
            loading,
            success,
            error,
          }}
        />
      </Fragment>
    );
  }
}

GrammarML.propTypes = {
  createData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  creatingData: PropTypes.bool,
  deleting: PropTypes.bool,
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

GrammarML.defaultProps = {
  data: null,
  error: null,
  success: false,
  loading: false,
  className: null,
  creatingData: false,
  deleting: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};
