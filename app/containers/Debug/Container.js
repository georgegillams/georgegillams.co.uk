import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';
import { getTimeDifference } from 'helpers/time';
import { Checkbox } from 'gg-components/dist/Checkbox';

import STYLES from '../pages.scss';

import { Paragraph, Section, SubSection } from 'gg-components/dist/Typography';
const getClassName = cssModules(STYLES);

const StatusControl = props => {
  const { name, storageKey, ...rest } = props;
  console.log(`storageKey`, storageKey);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const isEnabled = window.localStorage.getItem(storageKey) === 'true';
    setIsEnabled(isEnabled);
  }, []);

  const onValueChanged = newValue => {
    setIsEnabled(newValue);
    window.localStorage.setItem(storageKey, newValue ? 'true' : 'false');
  };

  return (
    <Checkbox
      label={name}
      checked={isEnabled}
      onChange={event => {
        onValueChanged(event.target.checked);
      }}
      {...rest}
    />
  );
};

const Debug = props => {
  return (
    <div {...props}>
      <Helmet title="Debug" />
      <Section anchor={false} name="Debug">
        <StatusControl
          name="Show session debug views"
          storageKey="showSessionDebugViews"
        />
        <br />
        <br />
        <StatusControl
          name="Show page container debug colours"
          storageKey="showPageContainerDebugColor"
        />
        <br />
        <Paragraph>
          Note that changes will not take effect until you reload the page.
        </Paragraph>
      </Section>
    </div>
  );
};

export default Debug;