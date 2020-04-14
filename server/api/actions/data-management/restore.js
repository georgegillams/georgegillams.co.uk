// import { datumCreate } from '../datum';
//
// import guestsAllowedAttributes from './guestsAllowedAttributes';
//
// import authentication from 'utils/authentication';
// import { UNAUTHORISED_WRITE } from 'helpers/constants';
// import reqSecure from 'utils/reqSecure';
//
// export default function create(req) {
//   const reqSecured = reqSecure(req, guestsAllowedAttributes);
//   return new Promise((resolve, reject) => {
//     authentication(reqSecured).then(
//       user => {
//         if (user && user.admin) {
//           resolve(datumCreate({ redisKey: 'guests', user }, reqSecured));
//         } else {
//           reject(UNAUTHORISED_WRITE);
//         }
//       },
//       err => reject(err),
//     );
//   });
// }
