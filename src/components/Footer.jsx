import React, { Component } from "react";
import PropTypes from "prop-types";
import SubSection from "./SubSection";
import TechSpecs from "./TechSpecs";
import TextLink from "./TextLink";
import GetSocial from "./GetSocial";
import Logo from "./Logo";
import PersonalDetails from "./PersonalDetails";
import blackPaper from "../images/blackPaper.jpg";

import STYLES from "./footer.scss";
import PAGE_STYLES from "../Pages/pages.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";
const getClassNamePages = className => PAGE_STYLES[className] || "UNKNOWN";

import { colorGray700 } from "bpk-tokens/tokens/base.es6";

const mainLinkStyle = {
  color: "#3e9eeb",
  fontFamily: "Neuton",
  fontWeight: "bold"
};
const linkStyle = { color: colorGray700, fontFamily: "Neuton" };

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentYear = new Date().getFullYear();

    const { className, ...rest } = this.props;
    const outerClassNameFinal = [
      getClassName("footer__container"),
      getClassName("footer__container--outer")
    ];
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <footer
        className={outerClassNameFinal.join(" ")}
        style={{ backgroundImage: `url(${blackPaper})` }}
        {...rest}
      >
        <GetSocial light alwaysCentered />
        <TextLink light href="/site-map" className={getClassName("footer__component")}>
          {" "}
          Site map →{" "}
        </TextLink>
        <div className={getClassName("footer__container--horizontal")}>
          <div className={getClassName("footer__container")}>
            <PersonalDetails light className={getClassName("footer__component")} />
            <TechSpecs light className={getClassName("footer__component")} />
          </div>
          <div className={getClassName("footer__container")}>
            <Logo small style={{ marginTop: "-1rem" }} />
            <SubSection
              className={getClassName("footer__component")}
              style={{ marginTop: "-1.7rem" }}
              fancy
              noPadding
              light
            >{`© copyright George Gillams 2017 - ${currentYear}`}</SubSection>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string
};

Footer.defaultProps = {
  className: null
};

export default Footer;
