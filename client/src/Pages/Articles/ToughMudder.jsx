import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import Tag, { TAG_TYPES } from '../../components/Tag';
import TextLink from '../../components/TextLink';
import Quote from '../../components/Quote';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';
import Strikethrough from '../../components/Strikethrough';

const DATE_WRITTEN = new Date(2018, 2, 19, 16, 43, 0);
const PAGE_ID = 991948;

const ToughMudder = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <br />
      <PageSwitchScroller />
      <Section name="Running 5 Tough Mudders">
        <ArticleDate date={DATE_WRITTEN} />
        <Tag type={TAG_TYPES.events} link />
        <SubSection name="Why I did it">
          I&apos;d never considered doing a{' '}
          <TextLink external href="https://toughmudder.co.uk/">
            Tough Mudder{' '}
          </TextLink>
          (or anything similar) until my{' '}
          <TextLink external href="http://ricgillamsphotography.co.uk/about-me">
            brother{' '}
          </TextLink>
          suggested it. It sounded like the sort of thing that I would
          completely steer clear of, but on my 21st Birthday, after a few pints
          in a brewery, I agreed. I thought it couldn&apos;t be that bad if I
          had a 6ft 6&quot; giant on-side.
        </SubSection>
        <SubSection name="Tough Mudder 1">
          Ric and I did some training together to try and prepare ourselves for
          the crazy event we&apos;d signed up to. We ran for several hours,
          improvised obstacles from anything we could find (playgrounds, etc)
          and pledged to not drink beer in the{' '}
          <Strikethrough>7 days</Strikethrough>{' '}
          <Strikethrough>24 hours</Strikethrough> 12 hours leading up to the
          event (something we both failed to stick to).
          <br />
          <br />
          Before we knew it the day had arrived. We were slightly nervous but
          had done enough training and eaten enough pasta sandwiches in the
          preceding week to feel ready(ish). We parked up, ate several packs of
          giant Maryland cookies, and headed for registration, bag-drop, and the
          warm-up pen.
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>
            Tough Mudder is a challenge, not a competition.
          </span>{' '}
          And there&apos;s something really refreshing about that. Within a few
          pages of his book, Will Dean (Tough Mudder founder) says that one of
          his biggest frustrations after he completed his first marathon, was
          his peers&apos; obsession with his finishing time. He didn&apos;t
          think his time should be relevant. He believed that the achievement
          was in completing it. And now he&apos;s made a global event
          that&apos;s all about getting over the finish line - irrespective of
          how long it takes.
          <br />
          <br />
          The sense of teamwork and camaraderie at the event was nothing but
          exceptional. Everest 2.0 seemed impossible until I spotted a group of
          large blokes at the top with arms hanging down ready to help. They
          singled me out to go next, and the dread I had been feeling suddenly
          disapeared, and I was happily scaling the half-pipe. Several obstacles
          are only possible with teamwork, and you can be given a leg-up buy a
          randommer at any time.
          <br />
          <br />
          The whole thing was a lot more fun than I imagined it could ever be,
          thanks to the teamwork involved. There were uncomfortable moments,
          mentally and physically, but you soon forget about all of them when
          you&apos;re handed your reward pint of beer at the finish line.
          <br />
          <br />
          After the event, we headed back to base in Oxford, where we showered,
          drank, and then headed to the pub. After a half-marathon with ice, and
          electrocution, everyone is a light-weight, so the perfect opportunity
          for a cheap night out! We all signed up for our next event within
          days.
        </SubSection>
        <SubSection name="Tough Mudder 2 (Half)">
          Just after my first full tough-mudder, they launched a new series of
          half-events. The idea was much the same though - just with a larger
          obstacle : running ratio. Tbh I felt like it was slightly lacking
          something. Some of the more daunting obstacles had been left out, and
          the whole thing was over far too quickly for my liking!
        </SubSection>
        <SubSection name="Tough Mudder 3">
          Having enjoyed a couple of Tough Mudder events I wanted to get my
          mates involved. I asked my housemates, old and new to get involved,
          and encouraged them to sign up by telling blatant lies about how
          it&apos;s &quot;easier than it looks&quot;! I also asked along someone
          I&apos;d been on 1 date with. It can&apos;t have been that bad because
          she&apos;s now my Fianc&eacute;! We headed up north for the event. As
          luck had it, I also had an exam scheduled for the next day at 0900, so
          I was on the coach to Nottingham, books in hand, to meet the team in a
          pub and <Strikethrough>do lots of revision</Strikethrough> drink beer.
          We ate, drank, and prepared ourselves for victory the next day.
        </SubSection>
        <SubSection name="Tough Mudder 4">
          Roll on two weeks from Tough Mudder 3, and I was back in the warm-up
          pen for London West. With (most) of the original team (except for my
          6ft 6&quot; brother, Ric, who had bailed due to now working in
          Tokyo!). It wasn&apos;t ideal to be doing it without him. We&apos;d
          actually have to get over the walls ourselves instead of being thrown,
          but we got through it. T-shirts, headbands and beer in hand, we agreed
          to do it again the next year. My challenge wasn&apos;t over for the
          day, though. I was due to be attending a ball in Southampton that
          evening, so I found a train and got back to Southampton double time.
          The rest of my table had insisted that my food could not be taken
          away, so when I arrived 3 courses and a pint of Red Bull were waiting.
          The dodgems made me feel pretty shaken up. Who has dodgems at a ball!?
        </SubSection>
        <SubSection name="Tough Mudder 5">
          Another year on and my 5th Tough Mudder is looming. Although Ric will
          probably be with us this time, he has just spent 6 months in Japan
          eating nothing but sushi. We, therefore, expect him to be nothing but
          an additional deadweight we have to carry around the course! But, not
          all hope is lost. We have an excellent inspirational quote from his
          boss on the other side of the world:
          <br />
          <br />
          <Quote>
            &quot;I generally find that there is a strong, negative correlation
            between how much fun something is and how prepared you are for
            it&quot; - Ric&apos;s boss
          </Quote>
          <br />
          <br />
        </SubSection>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

ToughMudder.propTypes = {
  className: PropTypes.string,
};

ToughMudder.defaultProps = {
  className: null,
};

export default ToughMudder;
