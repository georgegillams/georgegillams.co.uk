export function find(values, id, matchOn = "id") {
  let existingValue = null;
  let existingValueIndex = -1;
  for (let it = 0; it < values.length; it += 1) {
    if (values[it][matchOn] === id) {
      existingValue = values[it];
      existingValueIndex = it;
    }
  }

  return { existingValue, existingValueIndex };
}

export function emailFingerprint(emailAddress) {
  const emailSplit = emailAddress.split("@");
  let user = emailSplit[0].split(".").join("");
  user = user.split("+")[0];
  const emailDomain = emailSplit[1];

  return `${user}@${emailDomain}`;
}
