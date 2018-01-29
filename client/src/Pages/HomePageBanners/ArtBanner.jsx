import React from "react";
import SimpleBanner from "./SimpleBanner";
import canvasses from "../Art/images/20160109.jpg";

const ArtBanner = () => (
  <SimpleBanner
    light
    imageSrc={canvasses}
    linkUrl="/art"
    title="Artistic creations"
  />
);

export default ArtBanner;
