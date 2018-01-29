import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import TextLink from "../components/TextLink";

import STYLES from "./for-oh-four.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";

const ForOhFour = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName("for-oh-four__container")];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(" ")} {...rest}>
      <Section className={getClassName("for-oh-four__container")} name="Oops.">
        <SubSection>
          The page you&apos;re looking for just isn&apos;t here.
          <br />
          Maybe the <TextLink href="/site-map">sitemap</TextLink> can help
        </SubSection>
      </Section>
    </main>
  );
};

ForOhFour.propTypes = {
  className: PropTypes.string
};

ForOhFour.defaultProps = {
  className: null
};

export default ForOhFour;
