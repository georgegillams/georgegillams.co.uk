import { datumLoad } from '../datum';
import { ticketCanBeReserved } from 'helpers/ticketing';

export default function loadRemaining(req) {
  return new Promise((resolve, reject) => {
    datumLoad({
      redisKey: 'tickets',
      sortKey: 'publishedTimestamp',
    }).then(ticketData => {
      const ticketCounts = {
        EB_ONE_DAY: 0,
        EB_TWO_DAY: 0,
        R_ONE_DAY: 0,
        R_TWO_DAY: 0,
        EB_ONE_DAY_TOTAL: 0,
        EB_TWO_DAY_TOTAL: 0,
        R_ONE_DAY_TOTAL: 0,
        R_TWO_DAY_TOTAL: 0,
        EB_ONE_DAY_UNPAID: 0,
        EB_TWO_DAY_UNPAID: 0,
        R_ONE_DAY_UNPAID: 0,
        R_TWO_DAY_UNPAID: 0,
      };
      ticketData.forEach(t => {
        if (Object.keys(ticketCounts).includes(t.ticketType)) {
          ticketCounts[`${t.ticketType}_TOTAL`] += 1;
          if (ticketCanBeReserved(t)) {
            ticketCounts[t.ticketType] += 1;
          }
          if (!t.reservedUntil || t.reservedUntil < 9000000000000000) {
            ticketCounts[`${t.ticketType}_UNPAID`] += 1;
          }
        }
      });
      resolve(ticketCounts);
    });
  });
}
