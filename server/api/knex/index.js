import knex from "~/server/knex.config";

export default defineEventHandler(async (event) => {
  // Get user
  const user = await knex.connect("user");

  return {
    statusCode: 200,
    data: user,
  };
});
