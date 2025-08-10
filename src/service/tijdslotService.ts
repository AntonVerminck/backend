let { TIJDSLOTS } = require('../data/mock_data');

const getAllTijdslots = () => {
  return { items: TIJDSLOTS, count: TIJDSLOTS.length };
};

module.exports = {
    getAllTijdslots,
  };