// Expose default exports
export getmagiclink from "./getmagiclink";
export loadAuth from "./loadAuth";
export loadInfo from "./loadInfo";
export login from "./login";
export loginmagiclink from "./loginmagiclink";
export verifyemail from "./verifyemail";
export logout from "./logout";
export logoutall from "./logoutall";

// Expose non-default exports
export * as payments from "./payments/index";
export * as comments from "./comments/index";
export * as notifications from "./notifications/index";
export * as blogs from "./blogs/index";
export * as sessions from "./sessions/index";
export * as survey from "./survey/index";
export * as users from "./users/index";
export * as widget from "./widget/index";
export * as staticfiles from "./staticfiles/index";