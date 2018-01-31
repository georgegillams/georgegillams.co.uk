import React from "react";
import PropTypes from "prop-types";

import STYLES from "./button.scss";

const getClassName = className => STYLES[className] || "UNKNOWN";

const Button = props => {
  const { destructive, light, bouncy, onClick, className, children, ...rest } = props;

  const classNameFinal = [getClassName("button__outer")];
  if (destructive) {
    classNameFinal.push(getClassName("button__outer--destructive"));
  }
  if (bouncy) {
    if (!light) {
      classNameFinal.push(getClassName("button__outer--dark-text"));
    }
    classNameFinal.push(getClassName("button__outer--bouncy"));
    if (destructive) {
      classNameFinal.push(getClassName("button__outer--bouncy--destructive"));
    }
  } else {
    classNameFinal.push(getClassName("button__outer--no-bouncy"));
    if (destructive) {
      classNameFinal.push(getClassName("button__outer--no-bouncy--destructive"));
    }
  }
  if (className) classNameFinal.push(className);

  return (
    <button onClick={onClick} className={classNameFinal.join(" ")} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  bouncy: PropTypes.bool,
  destructive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};

Button.defaultProps = {
  bouncy: false,
  destructive: false,
  onClick: null,
  className: null,
  children: null
};

export default Button;
