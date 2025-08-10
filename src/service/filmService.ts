let { FILMS } = require('../data/mock_data');

const getAllFilms = () => {
  return { items: FILMS, count: FILMS.length };
};

module.exports = {
    getAllFilms,
  };