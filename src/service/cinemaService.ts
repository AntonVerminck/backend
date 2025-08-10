
const { db } = require('../data');
const{Cinema} = db;




const getAll = async () => {
  console.log(Cinema); 
  return await Cinema.findAndCountAll() ;
};

const getById = async (id) => {
  try {
    const cinema = await Cinema.findByPk(id);
    return cinema
  } catch (error) {
    throw handleDBError(error);
  }
}


const create = async ({ naam, postcode, adress }) => {
  try {
    const id = await Cinema.create({ naam, postcode, adress });
    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const updateById = async (id, { name, rating }) => {
  try {
    await Cinema.updateById(id, { name, rating });
    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await placeRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No place with id ${id} exists`, { id });
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById
  };