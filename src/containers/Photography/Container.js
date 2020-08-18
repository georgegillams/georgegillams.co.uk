import React from 'react';
import FeatureCard, { FEATURE_CARD_LAYOUTS } from 'components/common/FeatureCard';
import { Image } from 'gg-components/Image';
import { Paragraph } from 'gg-components/Paragraph';
import { Section } from 'gg-components/Section';
import { Subsection } from 'gg-components/Subsection';
import PageTitle from 'components/common/PageTitle';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './photography.scss';

import { CreativeCommons } from 'components/CreativeCommons';
import GraphicContent, { withGraphicContentBehaviour } from 'components/GraphicContent';

const GcbGraphicContent = withGraphicContentBehaviour(GraphicContent);

const getClassName = cssModules(STYLES);

const Photography = () => {
  return (
    <>
      <PageTitle anchor={false} name="Photography"></PageTitle>
      <div style={{ paddingTop: '1rem' }} className={getClassName('photography__card-container')}>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('photography__card')}
          imageSrc="https://i.imgur.com/Jng7EhH.png"
          href="https://gurushots.com/georgegillams/achievements"
          title="Find me on GuruShots"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('photography__card')}
          imageSrc="https://i.imgur.com/u30cQWU.png"
          href="https://www.flickr.com/people/georgegillams/"
          title="Find me on Flickr"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('photography__card')}
          imageSrc="https://i.imgur.com/obBqvqK.png"
          href="https://unsplash.com/@georgegillams"
          title="Find me on Unsplash"
        />
      </div>
      <Section>
        <Subsection
          anchor={false}
          name="Harlequins vs Worcester Rugby Match"
          className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Harlequins vs Worcester Rugby Match',
            }}
            aspectX={4130}
            aspectY={2394}
            lightSrc="https://i.imgur.com/OsFI23z.jpg"
            darkSrc="https://i.imgur.com/OsFI23z.jpg"
          />
        </Subsection>
        <Subsection
          anchor={false}
          name="The cat looking handsome as ever!"
          className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'The cat looking handsome',
            }}
            aspectX={5184}
            aspectY={3456}
            lightSrc="https://i.imgur.com/Aqy3tuA.jpg"
            darkSrc="https://i.imgur.com/Aqy3tuA.jpg"
          />
        </Subsection>
        <Subsection
          anchor={false}
          name="A training scenario at EPICC 2017"
          className={getClassName('photography__subsection')}>
          <GcbGraphicContent className={getClassName('photography__image')}>
            <Image
              imgProps={{
                alt: 'A training scenario at EPICC 2017',
              }}
              aspectX={5184}
              aspectY={3132}
              lightSrc="https://i.imgur.com/6B35GTV.jpg"
              darkSrc="https://i.imgur.com/6B35GTV.jpg"
            />
          </GcbGraphicContent>
        </Subsection>
        <Subsection anchor={false} name="Dog running with a Stick" className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Dog running with a stick',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/8dnCZ5D.jpg"
            darkSrc="https://i.imgur.com/8dnCZ5D.jpg"
          />
        </Subsection>
        <Subsection anchor={false} name="Stunt Motorcyclist" className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Stunt Motorcyclist standing on the back of a bike',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/WlLYxDw.jpg"
            darkSrc="https://i.imgur.com/WlLYxDw.jpg"
          />
        </Subsection>
        <Subsection
          anchor={false}
          name="Longleat Festival of Light"
          className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Longleat Festival of Light',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/EHF7zqM.jpg"
            darkSrc="https://i.imgur.com/EHF7zqM.jpg"
          />
        </Subsection>
        <Subsection anchor={false} name="Serre Chevalier" className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Serre Chavelier Ski Slopes',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/gIccH4E.jpg"
            darkSrc="https://i.imgur.com/gIccH4E.jpg"
          />
        </Subsection>
        <Subsection
          anchor={false}
          name="Nick Matthew playing in the Canary Wharf Open"
          className={getClassName('photography__subsection')}>
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Nick Matthew playing in the Canary Wharf Open',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/h4BFWqS.jpg"
            darkSrc="https://i.imgur.com/h4BFWqS.jpg"
          />
        </Subsection>
      </Section>
      <Section name="Photoshop">
        <Subsection
          anchor={false}
          name="Tulips exploding with light"
          className={getClassName('photography__subsection')}>
          <Paragraph>
            For some reason the idea of light exploding out of tulips popped into my mind, so I went out to find some
            and made it a reality. I used a similar effect in Art that I had used in the past to create beams of
            sunlight breaking through the clouds, and then darkened the background a little.
          </Paragraph>
          <br />
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Exploding tulips',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/PIKQ2D6.jpg"
            darkSrc="https://i.imgur.com/PIKQ2D6.jpg"
          />
        </Subsection>
        <Subsection anchor={false} name="Miss Saigon sketch" className={getClassName('photography__subsection')}>
          <Paragraph>
            With Miss Saigon coming to cinemas soon for one day only, I was inspired to draw the production logo (aka
            tempted to procrastinate).
          </Paragraph>
          <br />
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Miss Saigon sketch',
            }}
            aspectX={2153}
            aspectY={3000}
            lightSrc="https://i.imgur.com/y3i2Ll1.jpg"
            darkSrc="https://i.imgur.com/y3i2Ll1.jpg"
          />
        </Subsection>
        <Subsection
          anchor={false}
          name="Dual-carriageway light-painting (in post)"
          className={getClassName('photography__subsection')}>
          <Paragraph>
            One evening after leaving work at an unearthly hour, I shot this uninspired photo. In Photoshop, I then used
            the brush tool and some layer styles to create a &#39;painting with light&#39; effect.
          </Paragraph>
          <br />
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Dual-carriageway light-painting',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/T502lkX.jpg"
            darkSrc="https://i.imgur.com/T502lkX.jpg"
          />
        </Subsection>
      </Section>
      <Section name="Food is art! (...sometimes)">
        <Subsection anchor={false} name="Guinness cake" className={getClassName('photography__subsection')}>
          <Paragraph>
            I like spending time on food presentation when the opportunity calls for it. So I created this masterpiece
            to share with the office and celebrate a legendary drink!
          </Paragraph>
          <br />
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Guinness cake',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/oBWlSDO.jpg"
            darkSrc="https://i.imgur.com/oBWlSDO.jpg"
          />
        </Subsection>
        <Subsection anchor={false} name="Ratatouille" className={getClassName('photography__subsection')}>
          <Paragraph>
            To get us in the mood for Disneyland, I cooked up this Ratatouille in the style of the dish served in the
            film. It came out better than I expected... Pretty pleased with the result!
          </Paragraph>
          <br />
          <Image
            className={getClassName('photography__image')}
            imgProps={{
              alt: 'Ratatouille',
            }}
            aspectX={3000}
            aspectY={2000}
            lightSrc="https://i.imgur.com/kRGhYxz.jpg"
            darkSrc="https://i.imgur.com/kRGhYxz.jpg"
          />
        </Subsection>
      </Section>
      <CreativeCommons />
    </>
  );
};

export default Photography;
