import { URLSearchParams } from 'url';

import fetch from 'node-fetch';

import { datumLoadSingle } from '../../actions/datum';

import POT_CONFIGS from './potConfigs';

function loadLatestTransactions(req) {
  return new Promise(resolve => {
    datumLoadSingle({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp',
    }).then(accessToken => {
      const accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        resolve({ error: 'No access token configured' });
        return;
      }

      if (!req.body.password || req.body.password !== accessPassword) {
        resolve({ warning: 'Access password incorrect' });
        return;
      }

      fetch('https://api.monzo.com/accounts', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken.key}`,
        },
      })
        .then(res => res.json())
        .then(accountData => {
          const accountID = accountData.accounts.find(
            a => a.type === 'uk_retail',
          ).id;

          const params = new URLSearchParams();
          params.append('account_id', accountID);

          fetch(`https://api.monzo.com/pots`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken.key}`,
            },
          })
            .then(res => res.json())
            .then(potData => {
              if (!potData || !potData.pots) {
                resolve({
                  error:
                    'The Monzo token has expired. Tell George to generate a new one.',
                });
                return;
              }
              const potConfigsAnnotated = POT_CONFIGS.map(pc => {
                const pot = potData.pots.find(
                  p => p.name === pc.name && !p.deleted,
                );
                if (!pot) {
                  return pc;
                }
                const potId = pot.id;
                return {
                  ...pc,
                  potId,
                };
              });
              fetch(`https://api.monzo.com/transactions?${params.toString()}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken.key}`,
                },
              })
                .then(res => res.json())
                .then(transactionData => {
                  let potTransfers = transactionData.transactions.filter(t => {
                    let potOfInterest = false;
                    potConfigsAnnotated.forEach(pc => {
                      if (pc.potId === t.metadata.pot_id) {
                        potOfInterest = true;
                      }
                    });
                    return t.scheme === 'uk_retail_pot' && potOfInterest;
                  });
                  potTransfers = potTransfers.reverse().map(p => {
                    const potName = potConfigsAnnotated.find(
                      pc => pc.potId === p.metadata.pot_id,
                    ).name;
                    return { amount: p.amount, potName };
                  });
                  const potWithdrawals = potTransfers.filter(
                    pt => pt.amount > 0,
                  );
                  const potDeposits = potTransfers.filter(pt => pt.amount < 0);
                  const processedData = POT_CONFIGS.map(pc => {
                    const matchingWithdrawal = potWithdrawals.find(
                      pw => pw.potName === pc.name,
                    );
                    const matchingDeposit = potDeposits.find(
                      pw => pw.potName === pc.name,
                    );
                    return {
                      name: pc.name,
                      lastDepositAmount: matchingDeposit
                        ? -matchingDeposit.amount
                        : 0,
                      lastWithdrawalAmount: matchingWithdrawal
                        ? matchingWithdrawal.amount
                        : 0,
                    };
                  });
                  resolve(processedData);
                });
            });
        });
    });
  });
}

export default loadLatestTransactions;
