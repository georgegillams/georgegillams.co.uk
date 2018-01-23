import React from "react";
import PropTypes from "prop-types";
import BpkImage, { withLazyLoading, withLoadingBehavior } from "bpk-component-image";
import Section from "../../components/Section";
import SubSection from "../../components/SubSection";
import Comments from "../../components/Comments";
import guinnessCake from "../Art/images/20160215.jpg";
import tulips from "../Art/images/20160409.jpg";
import motorway from "../Art/images/20160419.jpg";
import ratatouille from "../Art/images/20170616.jpg";
import missSaigon from "../Art/images/20161010.jpg";

import STYLES from "../pages.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";
const PAGE_ID = 857216;
const documentIfExists = typeof window !== "undefined" ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const Art = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName("pages__page")];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(" ")} {...rest}>
      <Section name="Food is art! (...sometimes)">
        <SubSection name="Guinness cake">
          I like spending time on food presentation when the opportunity calls for it. So I created
          this masterpiece to share with the office and celebrate a legendary drink!
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName("pages__image")}
            altText="Guinness cake"
            width={3000}
            height={2000}
            src={guinnessCake}
          />
          <br />
          <SubSection name="Ratatouille">
            To get us in the mood for Disneyland, I cooked up this Ratatouille in the style of the
            dish served in the film. It came out better than I expected... Pretty pleased with the
            result!
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName("pages__image")}
              altText="Ratatouille"
              width={3000}
              height={2000}
              src={ratatouille}
            />
            <br />
          </SubSection>
        </SubSection>
        <Section name="Photoshop">
          <SubSection name="Tulips exploding with light">
            For some reason the idea of light exploding out of tulips popped into my mind, so I went
            out to find some and made it a reality. I used a similar effect in Art that I had used
            in the past to create beams of sunlight breaking through the clouds, and then darkened
            the background a little.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName("pages__image")}
              altText="Exploding tulips"
              width={3000}
              height={2000}
              src={tulips}
            />
            <br />
          </SubSection>
          <SubSection name="Miss Saigon sketch">
            With Miss Saigon coming to cinemas soon for one day only, I was inspired to draw the
            production logo (aka tempted to procrastinate).
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName("pages__image")}
              altText="Miss Saigon"
              width={2153}
              height={3000}
              src={missSaigon}
            />
            <br />
            <SubSection name="Dual-carriageway light-painting (in post)">
              One evening after leaving work at an unearthly hour, I shot this uninspired photo. In
              Photoshop, I then used the brush tool and some layer styles to create a 'painting with
              light' effect.
              <br />
              <br />
              <FadingLazyLoadedImage
                className={getClassName("pages__image")}
                altText="Dual-carriageway light-painting"
                width={3000}
                height={2000}
                src={motorway}
              />
              <br />
            </SubSection>
          </SubSection>
        </Section>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

Art.propTypes = {
  className: PropTypes.string
};

Art.defaultProps = {
  className: null
};

export default Art;
