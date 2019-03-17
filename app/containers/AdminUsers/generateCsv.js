import { ticketReservationIsValid } from 'helpers/ticketing';

const getRegStatusItem = (u, attribute) => {
  if (!u.registrationStatus) {
    return '';
  }
  return u.registrationStatus[attribute] || '';
};

const getAdditionalDataItem = (u, attribute) => {
  if (!u.userDetails) {
    return '';
  }
  return u.userDetails[attribute] || '';
};

const getTicketDataItem = (u, attribute) => {
  if (!u.ticketReservation) {
    return '';
  }
  return u.ticketReservation[attribute] || '';
};

const generateCsv = userData => {
  let csv =
    'userId,forename,surname,email,returningDelegate,university,degree,yearOfStudy,dietaryRequirements,alergies,otherRequirements,photoReleaseConsented,ticketReservation,outstandingBalance,ticketValid, hasArrivedAtConference';
  userData.forEach(u => {
    const id = u.id;
    const forename = getAdditionalDataItem(u, 'name');
    const surname = getAdditionalDataItem(u, 'surname');
    const email = u.email || '';
    const university = getAdditionalDataItem(u, 'university');
    const returningDelegate = getAdditionalDataItem(u, 'returningDelegate')
      ? '✓'
      : '✘';
    const degreeCourse = getAdditionalDataItem(u, 'degreeCourse');
    const yearOfStudy = getAdditionalDataItem(u, 'yearOfStudy');
    const dietaryRequirements = getAdditionalDataItem(u, 'dietaryRequirements');
    const alergies = getAdditionalDataItem(u, 'alergies');
    const otherRequirements = getAdditionalDataItem(u, 'otherRequirements');
    const photoReleaseConsented = getAdditionalDataItem(
      u,
      'photoReleaseConsented',
    )
      ? '✓'
      : '✘';
    const outstandingBalance = getTicketDataItem(u, 'outstandingBalance');
    const ticketValid = u.ticketReservation
      ? ticketReservationIsValid(u.ticketReservation)
      : 'false';
    const ticketValidText = ticketValid ? '✓' : '';
    const reservedTicketType = ticketValid
      ? getTicketDataItem(u, 'ticketType')
      : '';
    const hasArrivedAtConference = getRegStatusItem(u, 'hasArrivedAtConference')
      ? '✓'
      : '';

    if (ticketValid) {
      csv += `\n${id},${forename},${surname},${email},${returningDelegate},${university},${degreeCourse},${yearOfStudy},${dietaryRequirements},${alergies},${otherRequirements},${photoReleaseConsented},${reservedTicketType},${outstandingBalance},${ticketValidText},${hasArrivedAtConference}`;
    }
  });
  return csv;
};

export default generateCsv;
