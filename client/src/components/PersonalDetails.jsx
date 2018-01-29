import React from "react";
import PropTypes from "prop-types";
import Section from "./Section";
import TextLink from "./TextLink";

const PersonalDetails = props => {
  const { className, light, fancy, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(" ")} {...rest}>
      <Section noPadding light fancy={fancy}>
        Open-source Software Engineer at{" "}
        <TextLink
          light={light}
          fancy={fancy}
          href="https://github.com/Skyscanner"
          external
        >
          Skyscanner
        </TextLink>
      </Section>
      <Section noPadding light fancy={fancy}>
        Master student at{" "}
        <TextLink
          light={light}
          fancy={fancy}
          href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules"
          external
        >
          Southampton
        </TextLink>
      </Section>
      <Section noPadding light fancy={fancy}>
        Based in London.
      </Section>
    </div>
  );
};

PersonalDetails.propTypes = {
  className: PropTypes.string,
  light: PropTypes.bool,
  fancy: PropTypes.bool,
  centralisedSpread: PropTypes.bool
};

PersonalDetails.defaultProps = {
  className: null,
  light: false,
  fancy: false,
  centralisedSpread: false
};

 export default PersonalDetails;
