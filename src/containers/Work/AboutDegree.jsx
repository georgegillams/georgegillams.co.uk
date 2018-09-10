/* eslint-disable */
import React from "react";
import BpkImage, { withLoadingBehavior } from "bpk-component-image";
import { asyncConnect } from "redux-async-connect";
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  create as createComment
} from "redux/modules/comments";
import {
  Section,
  SubSection,
  TextLink,
  Comments,
  NotificationComp,
  NOTIFICATION_TYPES
} from "../../components";
import { CommentArea } from "containers";
import { cssModules } from "bpk-react-utils";

import STYLES from "../pages.scss";

const getClassName = cssModules(STYLES);

const PAGE_ID = "12462";

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      if (!isCommentsLoaded(getState(), PAGE_ID)) {
        promises.push(dispatch(loadComments(PAGE_ID)));
      }

      return Promise.all(promises);
    }
  }
])
class Degree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div>
        <NotificationComp type="error">
          This is a legacy page, so it may take some time to load.
        </NotificationComp>
        <iframe
          id="workDegreeInline"
          title="Inline Work Degree page"
          width="100%"
          height="50rem"
          style={{ border: "none", height: "130rem" }}
          src="https://georgegillams-depreciated.herokuapp.com/work/degree"
        />
        <div className={getClassName("pages__container")}>
          <CommentArea params={{ id: PAGE_ID }} />
        </div>
      </div>
    );
  }
}

export default Degree;
