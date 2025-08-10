let { Gebruikers } = require('../data/mock_data');

export const getAllGebruikers = () => {
  return { items: Gebruikers, count: Gebruikers.length };
};

