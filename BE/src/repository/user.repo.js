import { database } from "./root.js";

const createUser = async (data) => {
  const model = await database;
  return await model.Employee.create(data);
};

const findByQuery = async (query = {}) => {
  const model = await database;
  return await model.Employee.findOne({ where: query });
};

const updateUserById = async (id, data) => {
  const model = await database;
  return await model.Employee.update(data, { where: { id } });
};

const bulkInsertData = async (data) => {
  const model = await database;
  return await model.Employee.bulkCreate(data);
};

export default { createUser, findByQuery, updateUserById, bulkInsertData };
