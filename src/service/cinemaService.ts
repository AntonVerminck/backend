import { CINEMAS } from '../data/mock_data';


let cinemas = [...CINEMAS];

// Get all cinemas
export const getAll = () => {
  return cinemas;
};

// Get a cinema by id
export const getById = (id: number) => {
  const cinema = cinemas.find(c => c.id === id);
  if (!cinema) {
    throw new Error(`Cinema with id ${id} not found`);
  }
  return cinema;
};

// Create a new cinema (id will be auto-generated)
export const create = ({ name, postcode, adres }: any) => {
  const newId = cinemas.length ? Math.max(...cinemas.map(c => c.id)) + 1 : 1;
  const newCinema = { id: newId, name, postcode, adres };
  cinemas.push(newCinema);
  return newCinema;
};

// Update an existing cinema by id
export const updateById = (
  id: number,
  { name, postcode, adres }: any,
) => {
  const index = cinemas.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error(`Cinema with id ${id} not found`);
  }
  // Update only provided fields
  cinemas[index] = {
    ...cinemas[index],
    ...(name !== undefined && { name }),
    ...(postcode !== undefined && { postcode }),
    ...(adres !== undefined && { adres }),
  };
  return cinemas[index];
};

// Delete a cinema by id
export const deleteById = (id: number) => {
  const index = cinemas.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error(`Cinema with id ${id} not found`);
  }
  const deleted = cinemas.splice(index, 1)[0];
  return deleted;
};