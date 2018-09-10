/* eslint-disable */
import React from "react";
import { NotificationComp } from "../../components";

class DesignColours extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div>
        <NotificationComp type="error">
          This is a legacy page, so it may take some time to load.
        </NotificationComp>
        <iframe
          id="designColoursInline"
          title="Inline DesignColours page"
          width="100%"
          height="50rem"
          style={{ border: "none", height: "170rem" }}
          src="https://georgegillams-depreciated.herokuapp.com/design/colours"
        />
      </div>
    );
  }
}

export default DesignColours;
