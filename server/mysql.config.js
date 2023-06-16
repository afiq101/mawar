const config = {
  db: {
    host: process.env.KNEX_DB_HOST,
    user: process.env.KNEX_DB_USER,
    password: process.env.KNEX_DB_PASSWORD,
    database: process.env.KNEX_DB_DATABASE,
  },
};
module.exports = config;
