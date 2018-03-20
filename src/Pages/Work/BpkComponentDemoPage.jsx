import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkBadge from 'bpk-component-badge';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import Section from '../../components/Section';
// import BpkDemo from 'bpk-component-demo';
import BpkDemo from '../../components/bpk-component-demo/index';
import Button from '../../components/Button';
import SubSection from '../../components/SubSection';
import passwordCharacterExtractorUseGif from './images/passwordCharacterExtractorUse.gif';

import STYLES from './apps.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const ButtonDemo = BpkDemo(Button, 'Button', 'package-name-goes-here', {});

const BpkComponentDemoPage = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('apps__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <div className={getClassName('apps__showcase')}>
        <GitHubForkRibbon
          position="right-bottom"
          color="red"
          href="https://github.com/Skyscanner/Backpack/"
          target="_blank"
        >
          View on GitHub
        </GitHubForkRibbon>
        <Section light name="React component demonstrator">
          <SubSection
            noAnchor
            light
            name="Unrestricted documentation of React component features"
          />
        </Section>
        <div className={getClassName('apps__showcase--padded')}>
          <BpkBadge className={getClassName('apps__image')}>Component</BpkBadge>
        </div>
      </div>
      <div className={getClassName('apps__download-container')}>
        {/* <Button
          bouncy
          light
          onClick={() => {
            window.open(
              'https://www.npmjs.com/package/bpk-component-demo/',
              '_blank',
            );
          }}
        >
          View on npmjs.com
        </Button>
         <Button
          onClick={() => {
            window.open(
              'https://backpack.github.io/components/web/badge/',
              '_blank',
            );
          }}
        >
          See it in action
        </Button> */}
        <Section noAnchor noPadding light>
          Real world examples coming soon!
        </Section>
      </div>
      <Section name="Features">
        <div className={getClassName('apps__feature-container')}>
          <SubSection
            name="Cover all use-cases"
            className={getClassName('apps__feature-section')}
          >
            Sometimes it's hard to imagine every use case a component will solve
            throughout its lifetime. With this tool, developers and consumers
            can see the exact behaviour of any component without writing any
            code.
            <br />
            <br />
            So no more feature requests for things that can already be done!
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Password Character Extraction Tool"
              style={{ width: '100%' }}
              width={1154}
              height={422}
              src={passwordCharacterExtractorUseGif}
            />
          </SubSection>
          <SubSection
            name="Easy"
            className={getClassName('apps__feature-section')}
          >
            It&apos;s far easier to document your component's props like this,
            than having to copy a list of prop-types into a Readme file.
            It&apos;s easier for your designers and consumers too!
            <br />
            <br />
            So everyone wins.
          </SubSection>
        </div>
        <ButtonDemo
          compact={false}
          customPropValues={{
            children: 'Hello!',
            bouncy: true,
          }}
        />
        <br />
        <br />
        <Button
          onClick={() => {
            window.open('https://backpack.github.io/', '_blank');
          }}
        >
          More information about Backpack
        </Button>
      </Section>
    </main>
  );
};

BpkComponentDemoPage.propTypes = {
  className: PropTypes.string,
};

BpkComponentDemoPage.defaultProps = {
  className: null,
};

export default BpkComponentDemoPage;
