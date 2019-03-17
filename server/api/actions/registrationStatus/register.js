import { datumLoadSingle, datumCreate } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import getRegistrationStatus from 'utils/getRegistrationStatus';
import { REG_EMAIL, UNAUTHORISED_READ } from 'helpers/constants';
import registratiomStatusAllowedAttributes from './registratiomStatusAllowedAttributes';
import { find } from 'utils/find';

export default function register(req) {
  const reqSecured = reqSecure(req, registratiomStatusAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && (user.admin || user.email === REG_EMAIL)) {
          console.log(`authorised to register`);
          datumLoadSingle({
            redisKey: 'tickets',
            resolveIfNotFound: true,
            filter: t => t.id === reqSecured.body.ticketId,
          }).then(loadedTicket => {
            console.log(`loadedTicket`, loadedTicket);
            datumLoadSingle({
              redisKey: 'users',
              resolveIfNotFound: true,
              filter: u => loadedTicket && u.id === loadedTicket.reservedTo,
            }).then(loadedUser => {
              console.log(`loadedUser`, loadedUser);
              if (
                loadedTicket &&
                loadedUser &&
                loadedUser.email === reqSecured.body.email
              ) {
                console.log(`ticket details match`);
                getRegistrationStatus({ id: loadedUser.id }).then(result => {
                  console.log(`regStatus`, result);

                  if (!result.hasArrivedAtConference) {
                    datumCreate(
                      { redisKey: 'registrations' },
                      { body: { userId: loadedUser.id } },
                    );
                  }
                  resolve({ ...result, ...{ hasArrivedAtConference: true } });
                });
              } else {
                resolve({ error: 'Ticket email mismatch' });
              }
            });
          });
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
