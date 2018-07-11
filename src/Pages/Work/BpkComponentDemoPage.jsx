import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLoadingBehavior } from 'bpk-component-image';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import withLazyLoading from '../../components/withLazyLoading';
import Section from '../../components/Section';
import Button from '../../components/Button';
import SubSection from '../../components/SubSection';
import bpkDemo from '../../components/bpk-component-demo/src/BpkDemo';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import BpkComponentDemoAnimatedButton from './BpkComponentDemoAnimatedButton';
import HelperFunctions from '../../HelperFunctions';

import STYLES from './apps.scss';
import STYLES_2 from '../pages.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

const ButtonDemo = bpkDemo(Button, 'Button', 'package-name-goes-here', {
  onClick: HelperFunctions.evalCompat('() => { alert("Button clicked"); }'),
});

const BpkComponentDemoPage = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('apps__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <PageSwitchScroller />
      <div
        className={`${getClassName('apps__showcase')} ${getClassName(
          'apps__showcase--grey',
        )}`}
      >
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
            name="Unrestricted documentation of stateless React components"
          />
        </Section>
        <div className={getClassName('apps__showcase--padded')}>
          <BpkComponentDemoAnimatedButton />
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
        <div
          className={getClassName('apps__feature-container')}
          style={{ marginBottom: '2rem' }}
        >
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
        <SubSection style={{ textAlign: 'left' }} name="Try it out">
          <ButtonDemo
            className={getClassName('pages__bpk-demo')}
            customPropValues={{
              children: 'Button',
            }}
          />
        </SubSection>
        <br />
        <br />
        <Button
          onClick={() => {
            window.open('https://backpack.github.io/', '_blank');
          }}
        >
          More information about Backpack
        </Button>
        <br />
        <br />
        <Button href="/design/components">See more examples</Button>
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
