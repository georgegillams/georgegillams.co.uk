const dateNow = Date.now();
const dateSept2024 = new Date('2024-09-01').getTime();
const isAfterSept2024 = dateNow > dateSept2024;
const currentLevel = isAfterSept2024 ? 'Expert' : 'Senior';
const currentLevelWithAOrAn = isAfterSept2024 ? 'an Expert' : 'a Senior';

module.exports = { currentLevel, currentLevelWithAOrAn };
