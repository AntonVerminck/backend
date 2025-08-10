let { Gebruikers } = require('../data/mock_data');

const getAllGebruikers = () => {
  return { items: Gebruikers, count: Gebruikers.length };
};

module.exports = {
    getAllGebruikers,
  };