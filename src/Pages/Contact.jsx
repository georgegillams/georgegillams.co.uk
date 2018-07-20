import React from 'react';
import Section from '../components/Section';
import ArticleCard, { CARD_LAYOUTS } from '../components/ArticleCard';
import SubSection from '../components/SubSection';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import withLazyLoading from '../components/withLazyLoading';
import AnimatedContent from '../components/AnimatedContent';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const Contact = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <LlAnimatedContent>
        <Section name="Get in touch">
          <LlAnimatedContent>
            <div
              style={{ paddingTop: '1rem' }}
              className={getClassName('pages__compact-card-container')}
            >
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                imageSrc="https://i.imgur.com/nmkJVkO.png"
                href="https://www.fb.com/george333123"
                title="Facebook"
                tallLayout
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                imageSrc="https://i.imgur.com/54unoGD.png"
                href="mailto:g@georgegillams.co.uk"
                title="Email"
                tallLayout
              >
                <Section>g@georgegillams.co.uk</Section>
              </ArticleCard>
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                imageSrc="https://i.imgur.com/9hcLfgF.png"
                href="tel:+447867592615"
                title="Phone"
                tallLayout
              >
                <Section>+44 78675 92615</Section>
              </ArticleCard>
              <LlAnimatedContent>
                <Button href="https://youtu.be/0vL4HLTZQ_Q?t=29">
                  Download contact
                </Button>
                <SubSection
                  className={getClassName('pages__card')}
                  noAnchor
                  name="Questions about Black Panther should be emailed to me using WhatsApp 🤦‍"
                >
                  <TextLink external href="https://youtu.be/0vL4HLTZQ_Q?t=29">
                    Context
                  </TextLink>
                </SubSection>
              </LlAnimatedContent>
            </div>
          </LlAnimatedContent>
          {/* <br />
        <a
          href="https://www.fb.com/george333123"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Facebook george333123" link />
        </a>
        <a
          href="mailto:g@georgegillams.co.uk"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Email g@georgegillams.co.uk" link />
        </a>
        <a href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <SubSection noAnchor name="Call +44 (0) 786759 2615" link />
        </a>
      <a
          href="https://georgegillams.typeform.com/to/oBmiJZ"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Contact me online" link />
        </a>   */}
        </Section>
      </LlAnimatedContent>
    </main>
  );
};
// <div dangerouslySetInnerHTML={{ __html: thisIsMyCopy }} />

export default Contact;
