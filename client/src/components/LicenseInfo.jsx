import React from "react";
import PropTypes from "prop-types";
import BpkImage from "bpk-component-image";
import TextLink from "./TextLink";
import Section from "./Section";

import STYLES from "./license.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";

const LicenseInfo = props => {
  const { centered, className, ...rest } = props;
  const classNameFinal = [];
  if (centered) {
    classNameFinal.push(getClassName("license--centered"));
  }
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(" ")} {...rest}>
      <TextLink external rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <BpkImage
          alt="Creative Commons Licence"
          width={88}
          height={31}
          style={{ width: "5rem", marginBottom: "1rem" }}
          src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
        />
      </TextLink>
      <br />
      <Section>
        {"My works are licensed under a "}
        <TextLink external rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          Creative Commons Attribution-ShareAlike 4.0 International License
        </TextLink>
      </Section>{" "}
    </div>
  );
};

LicenseInfo.propTypes = {
  className: PropTypes.string
};

LicenseInfo.defaultProps = {
  className: null
};

export default LicenseInfo;
