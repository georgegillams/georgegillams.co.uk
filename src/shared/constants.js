const DECIMAL_REGEX = /^[0-9\.]*$/gi;
const INT_REGEX = /^[0-9]*$/gi;
const SORT_CODE_REGEX = /^[0-9\.-]*$/gi;
const STRING_REGEX = /^[A-Za-z0-9\.\ ]*$/gi;
const MONZOME_LINK_REGEX = /^(https?:\/\/)?monzo\.me\/[A-Za-z_-]+$/gi;
const NON_EMOJI_REGEX = /[A-Za-z\ 0-9]*/gi;

export {
  DECIMAL_REGEX,
  INT_REGEX,
  SORT_CODE_REGEX,
  STRING_REGEX,
  MONZOME_LINK_REGEX,
  NON_EMOJI_REGEX,
};
export default {
  DECIMAL_REGEX,
  INT_REGEX,
  SORT_CODE_REGEX,
  STRING_REGEX,
  MONZOME_LINK_REGEX,
  NON_EMOJI_REGEX,
};
