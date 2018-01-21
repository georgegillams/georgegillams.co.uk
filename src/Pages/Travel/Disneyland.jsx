import React from "react";
import PropTypes from "prop-types";
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior
} from "bpk-component-image";
import Section from "./../../components/Section";
import SubSection from "./../../components/SubSection";
import Comments from "../../components/Comments";
import mickeyMouse from "./images/mickeyMouse.jpg";

import STYLES from "../pages.scss";

const PAGE_ID = 904827;

const getClassName = className => STYLES[className] || "UNKNOWN";
const documentIfExists = typeof window !== "undefined" ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists)
);

const Disneyland = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName("pages__page")];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(" ")} {...rest}>
      <Section name="Disneyland 🏰️ Summer 2017">
        We went to Disneyland for the first time in the summer to experience the
        magic of the place. The attention to detail in the park was phenomenal,
        which I think is probably what makes the whole place seem so magical. We
        stayed in one of the official Disneyland hotel, making for a very
        comfortable visit!
        <br />
        <br />
        <a
          className={getClassName("pages__link")}
          href="https://flic.kr/s/aHsmbmRq2F"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection name="See the full album on Flickr →" link>
            <FadingLazyLoadedImage
              className={getClassName("pages__image")}
              altText=""
              width={3000}
              height={2000}
              src={mickeyMouse}
            />
          </SubSection>
        </a>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

Disneyland.propTypes = {
  className: PropTypes.string
};

Disneyland.defaultProps = {
  className: null
};

export default Disneyland;
