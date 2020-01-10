import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { FormBuilder } from 'gg-components/dist/FormBuilder';

import { Button } from 'gg-components/dist/Button';
import {
  Paragraph,
  Section,
  SubSection,
  TextLink,
} from 'gg-components/dist/Typography';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (this.props.user && this.props.user.admin) {
      this.props.loadPayments();
    }
  }

  render() {
    const {
      user,

      addLink,
      addLinkLoading,
      addLinkSuccess,
      addLinkErrored,

      links,
      loadLinks,
      loadingLinks,
      loadLinksSuccess,
      loadLinksError,
      deleteLink,
      deleteLinkLoading,
      deleteLinkSuccess,
      deleteLinkError,

      className,
      ...rest
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const isAdmin = user && user.admin;

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Section name="Pay online">
          <FormBuilder
            disabled={addLinkLoading}
            entity={this.state.newPayment || {}}
            submitLabel="Continue to payment"
            formFields={[
              { id: 'amount', name: 'Amount (GBP)', show: true },
              { id: 'email', name: 'Email', show: true },
            ]}
            onDataChanged={newPayment => {
              this.setState({ newPayment });
            }}
            onSubmit={() => {
              addLink(this.state.newPayment);
            }}
          />
        </Section>
        {/* showLinks &&
        <Section name="Admin - payments">
              links.map(l => (
                <SubSection anchor={false} name={l.name || 'untitled'}>
                  {l.url && (
                    <TextLink external href={l.url}>
                      {l.url}
                    </TextLink>
                  )}
                  {l.description && (
                    <Fragment>
                      <br />
                      {l.description}
                    </Fragment>
                  )}
                  {isAdmin && (
                    <Fragment>
                      <br />
                      <Button
                        destructive
                        onClick={() => {
                          deleteLink(l);
                        }}
                      >
                        Delete
                      </Button>
                    </Fragment>
                  )}
                </SubSection>
                ))
        </Section>
               */}
      </div>
    );
  }
}

PaymentForm.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PaymentForm.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};
