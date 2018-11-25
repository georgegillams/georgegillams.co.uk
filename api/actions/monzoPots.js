import fetch from 'node-fetch';

function monzoPots() {
  return new Promise((resolve, reject) => {
    const accessToken = process.env.MONZO_ACCESS_TOKEN;

    if (!accessToken) {
      reject('No access token configured');
      return;
    }

    fetch('https://api.monzo.com/pots', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.pots) {
          reject('Error retrieving data');
          return;
        }

        let reducedData = data.pots.filter(
          pot => !pot.delted && pot.balance > 0,
        );
        reducedData = reducedData.map(pot => {
          return {
            name: pot.name,
            balance: parseFloat(pot.balance) / 100,
            goalAmount: parseFloat(pot.goal_amount) / 100,
          };
        });
        console.log(`data0`, data.pots);
        console.log(`reduced`, reducedData);
        resolve(reducedData);
      });
  });
}

export default monzoPots;
