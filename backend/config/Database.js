import { Sequelize } from "sequelize";

const db = new Sequelize("s_d_enterprises", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
