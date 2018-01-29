import React from "react";
import Card from "../../components/Card";
import LicenseInfo from "../../components/LicenseInfo";
import iceland from "../Travel/images/iceland2.jpg";
import longleat from "../Travel/images/longleatLight.jpg";
import munich from "../Travel/images/munich.jpg";
import mickeyMouse from "../Travel/images/mickeyMouse.jpg";
import serreChevalier from "../Travel/images/serreChevalier.jpg";

import STYLES from "../pages.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";

const Travel = () => (
  <div style={{ width: "100%" }}>
    <Card
      className={getClassName("pages__card")}
      light
      imageSrc={iceland}
      linkUrl="/travel/iceland-2018"
      title="Iceland 2018"
    />
    <Card
      className={getClassName("pages__card")}
      light
      imageSrc={longleat}
      linkUrl="/travel/longleat-2017"
      title="Longleat 2017"
    />
    <Card
      className={getClassName("pages__card")}
      light
      imageSrc={munich}
      linkUrl="/travel/munich-2017"
      title="Munich 2017"
    />
    <Card
      className={getClassName("pages__card")}
      light
      imageSrc={mickeyMouse}
      linkUrl="/travel/disneyland-2017"
      title="Disneyland 2017"
    />
    <Card
      className={getClassName("pages__card")}
      light
      imageSrc={serreChevalier}
      linkUrl="/travel/serre-chevalier-2017"
      title="Serre Chevalier 2017"
    />
    <LicenseInfo centered />
  </div>
);

export default Travel;
