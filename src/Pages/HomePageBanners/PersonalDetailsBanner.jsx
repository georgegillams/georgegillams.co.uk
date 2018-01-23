import React from "react";
import Logo from "../../components/Logo";
import PersonalDetails from "../../components/PersonalDetails";
import PageContentContainer from "../../components/PageContentContainer";
import blackwood from "../../images/blackwood.jpg";

import STYLES from "../pages.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";

const PersonalDetailsBanner = () => (
  <main className={getClassName("pages__banner")}>
    <div
      className={getClassName("pages__banner-image")}
      style={{ backgroundColor: "rgb(60, 68, 81)", backgroundImage: `url(${blackwood})` }}
    >
      <div>
        <PageContentContainer>
          <div
            className={`${getClassName("pages__banner-container")} ${getClassName(
              "pages__banner-container--vertical-spread"
            )}`}
          >
            <Logo alwaysCentered light />
            <PersonalDetails light />
          </div>
        </PageContentContainer>
      </div>
    </div>
  </main>
);

export default PersonalDetailsBanner;
