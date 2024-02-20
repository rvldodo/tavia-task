import db from "../api/models/index.js";

const init = async () => {
  const data = await db;
  const { Employee } = data.sequelize.models;
  return { Employee };
};

export const database = init();
