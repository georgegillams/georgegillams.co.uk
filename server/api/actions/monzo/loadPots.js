/* eslint-disable */
import { CardExpiryElement } from 'react-stripe-elements';

import { loadPotData, getMonthsElapsedPercentage } from './private/helpers';
import POT_CONFIGS from './private/potConfigs';

function loadPots(req) {
  return new Promise((resolve, reject) => {
    loadPotData(req.body.password).then(
      potData => {
        if (potData.error || potData.warning) {
          resolve(potData);
          return;
        }
        const processedData = POT_CONFIGS.map(potConfig => {
          const pot = potData.filter(
            p => p.name === potConfig.name && !p.deleted,
          )[0];
          if (!pot) {
            reject({
              error: 'unknown',
              errorMessage: `Pot ${potConfig.name} doesn't seem to exist`,
            });
            return null;
          }

          const goalAmount = parseFloat(pot.goal_amount) / 100;
          const balance = parseFloat(pot.balance) / 100;
          const monthsElapsedPercentage = getMonthsElapsedPercentage(potConfig);
          const expectedSavingsSoFar =
            (potConfig.startAmount || 0) +
            (goalAmount * monthsElapsedPercentage) / 100;
          const shortfall = expectedSavingsSoFar - balance;
          return {
            name: pot.name,
            balance,
            goalAmount,
            expected: expectedSavingsSoFar,
            shortfall: shortfall < 5 ? null : shortfall,
            percentageComplete: pot.goal_amount
              ? Math.ceil((100 * pot.balance) / pot.goal_amount)
              : 100,
          };
        });
        resolve(processedData);
      },
      err => reject(err),
    );
  });
}

export default loadPots;
