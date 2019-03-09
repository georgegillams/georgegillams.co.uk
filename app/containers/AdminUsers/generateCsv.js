const getAdditionalDataItem = (u, attribute) => {
  if (!u.additionalUserData) {
    return '';
  }
  return u.additionalUserData[attribute] || '';
};

const generateCsv = userData => {
  let csv =
    'userId,forename,surname,email,returningDelegate,university,degree,yearOfStudy,dietaryRequirements,alergies,otherRequirements,photoReleaseConsented,moneysReceived';
  userData.forEach(u => {
    const id = u.id;
    const forename = getAdditionalDataItem(u, 'name');
    const surname = getAdditionalDataItem(u, 'surname');
    const email = u.email || '';
    const university = getAdditionalDataItem(u, 'university');
    const returningDelegate = getAdditionalDataItem(u, 'returningDelegate');
    const degreeCourse = getAdditionalDataItem(u, 'degreeCourse');
    const yearOfStudy = getAdditionalDataItem(u, 'yearOfStudy');
    const dietaryRequirements = getAdditionalDataItem(u, 'dietaryRequirements');
    const alergies = getAdditionalDataItem(u, 'alergies');
    const otherRequirements = getAdditionalDataItem(u, 'otherRequirements');
    const photoReleaseConsented = getAdditionalDataItem(
      u,
      'photoReleaseConsented',
    );
    const moneysReceived = u.moneysReceived / 100 || '';

    csv += `\n${id},${forename},${surname},${email},${returningDelegate},${university},${degreeCourse},${yearOfStudy},${dietaryRequirements},${alergies},${otherRequirements},${photoReleaseConsented},${moneysReceived}`;
  });
  return csv;
};

export default generateCsv;
