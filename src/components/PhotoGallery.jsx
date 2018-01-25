import React from "react";
import PropTypes from "prop-types";
import BpkCard from "bpk-component-card";
import Section from "./Section";
import BpkImage, { withLazyLoading, withLoadingBehavior } from "bpk-component-image";

import STYLES from "./photo-gallery.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";
const documentIfExists = typeof window !== "undefined" ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const PhotoGallery = props => {
  const { images, className, ...rest } = props;

  const classNameFinal = [getClassName("photo-gallery__container")];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(" ")} {...rest}>
      <FadingLazyLoadedImage
        className={getClassName("pages__image")}
        style={{ gridArea: "image1" }}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[0]}
      />
      <FadingLazyLoadedImage
        className={getClassName("pages__image")}
        style={{ gridArea: "image2" }}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={800}
        src={images[1]}
      />
      <FadingLazyLoadedImage
        className={getClassName("pages__image")}
        style={{ gridArea: "image3" }}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[2]}
      />
      <FadingLazyLoadedImage
        className={getClassName("pages__image")}
        style={{ gridArea: "image4" }}
        altText="Netflix download speeds on a number of American ISPs"
        width={970}
        height={575}
        src={images[3]}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string
};

PhotoGallery.defaultProps = {
  className: null
};

export default PhotoGallery;
