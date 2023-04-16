import knex from "knex";

const client = process.env.KNEX_DB_CLIENT || "";
const database = process.env.KNEX_DB_DATABASE || "";
const host = process.env.KNEX_DB_HOST || "";
const user = process.env.KNEX_DB_USER || "";
const password = process.env.KNEX_DB_PASSWORD || "";

const connection = {
  host,
  user,
  password,
  database,
};

// Create a connection
function execute() {
  return knex({
    client: client,
    connection,
  });
}

const connect = knex({ client: client, connection });

export default { execute, connect };
