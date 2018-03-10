import React from 'react';
import SimpleBanner from './SimpleBanner';
import passwordCharacterExtractorUse from '../Work/images/passwordCharacterExtractorBanner.png';

const PasswordCharacterExtractorBanner = () => (
  <SimpleBanner
    imageSrc={passwordCharacterExtractorUse}
    linkUrl="/apps/password-character-extractor"
    title="Password Character Extractor"
  />
);

export default PasswordCharacterExtractorBanner;
