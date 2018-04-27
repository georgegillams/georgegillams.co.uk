import React from 'react';
import Funnies from 'funnies';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import SubSection from './SubSection';

const funnies = new Funnies();

const Loading = () => (
  <SubSection noAnchor style={{ textAlign: 'center' }} name="Loading...">
    {funnies.message()}
    <br />
    <br />
    <BpkExtraLargeSpinner large type={SPINNER_TYPES.dark} />
  </SubSection>
);

export default Loading;
