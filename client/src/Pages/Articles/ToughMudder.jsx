import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import TextLink from '../../components/TextLink';
import Quote from '../../components/Quote';
import PageSwitchScroller from '../../components/PageSwitchScroller';

const DATE_WRITTEN = new Date(2018, 2, 4, 17, 16, 0);
const PAGE_ID = 991948;

const ToughMudder = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <PageSwitchScroller />
      <Section name="Running 5 Tough Mudders">
        <ArticleDate date={DATE_WRITTEN} />
        <SubSection name="Why I did it">
          I&apos;d never considered doing a{' '}
          <TextLink external href="https://toughmudder.co.uk/">
            Tough Mudder{' '}
          </TextLink>
          (or anything similar) until my brother suggested it. It sounded like
          the sort of thing that I would completely steer clear of, but on my
          21st Birthday, after a few pints in a brewery, I agreed. I thought it
          couldn&apos;t be that bad if I had my 6ft 6" brother on side.
        </SubSection>
        <SubSection name="Tough Mudder 1">
          Ric and I did some training together to try and prepare ourselves for
          the crazy event we'd signed up to. We ran for several hours,
          improvised obstactles from anything we could find (playgrounds, etc)
          and pledged to not drink beer in the 24 hours leading up to the event
          (something we both failed to stick to).
          <br />
          <br />
          Before we knew it, the day had arrived. We were slightly nervous, but
          had done enough training and eaten enough pasta sandwiches in the
          preceding week to feel ready(ish). We parked up, ate several packs of
          giant Maryland cookies, and headed for registration, bag-drop, and the
          warm-up pen.
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>
            Tough Mudder is a challenge, not a competition.
          </span>{' '}
          And there's something really refreshing about that. Within a few pages
          of his book, Will Dean (Tough Mudder founder) says that one of his
          biggest frustrations after he completed his first marathon was his
          friend's obsession with his finishing time. He didn't think his time
          should be relevant. He believed that the achievement was in completing
          it. And now he's made a global event that's all about getting over the
          finish line - however long it takes.
          <br />
          <br />
          The sense of teamwork and comaraderie at Tough Mudder event is nothing
          but exceptional. The half-pipe looks impossible until you spot a group
          of people at the top with arms hanging down ready to catch you.
          Several obstacles are only possible with teamwork, and you can be
          given a legup buy a randommer at any time.
          <br />
          <br />
          The whole thing was a lot more fun than I imagined it could ever be,
          thanks to the teamwork involved. There were uncomfortable moments,
          mentally and physically, but you soon forget about all of them when
          you're handed your reward pint of beer at the finish line.
          <br />
          <br />
          After the event we headed back to base in Oxford, where we showered,
          drank, and then headed to the pub. After a half-marathon with ice, and
          electrocution, everyone is a light-weight, so the perfect oppotunity
          for a cheap night out! We all signed up to the next event within days.
        </SubSection>
        <SubSection name="Tough Mudder 2 (Half)">WRITE </SubSection>
        <SubSection name="Tough Mudder 3">
          Having successfully completed one Tough Mudder, I wanted to get my
          mates involved. I asked my housemates, old and new, and someone I'd
          been on 1 date with! We headed up north for the event which I assured
          them would be 'easier than it looks'. Admittedly I was possibly
          (definitely) lying (a bit)! As luck had it, I also had an exam
          scheduled for the next day, so I headed up north, books in hand to
          meet the team in a pub. Needless to say no work got done. We ate,
          drank, and preparad ourselves for vistory the next day.
        </SubSection>
        <SubSection name="Tough Mudder 4">
          Roll on two weeks from Tough Mudder 3, and I was back in the warm-up
          pen for London West. With (most) of the original team (except for my
          6ft 6" brother who had bailed). It wasn't ideal to be doing it without
          him. We'd actually have to get over the walls ourselves instead of
          being thrown, but we did it regardless. T-shirts, headbands and beer
          in hand, we agreed to do it again the next year. My challenge wasn't
          over for the day, though. I was due to be attending a ball in
          Southampton that evening, so I found a train and got back to
          Southampton double time. My food had been saved for me (I needed it).
          3 courses and a pint of Red Bull later I was trying not to fall asleep
          on the dodgems!
        </SubSection>
        <SubSection name="Tough Mudder 5">
          A year later, the 5th Tough Mudder was coming round. Although Ric will
          probably be with us this time, he's just spent 6 months in Japan
          eating nothing but sushi. We therefore expect him to be a deadweight
          we have to carry around the course! But, not all hope is lost. We have
          an excellent inspirational quote from his boss on the other side of
          the world:
          <br />
          <br />
          <Quote>
            "I generally find that there is a strong, negative correlation
            between how much fun something is and how prepared you are for it" -
            my brother's boss
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
