export default defineEventHandler(async (event) => {
  try {
    const { tableName, tableSchema, autoIcrementColumn } = await readBody(
      event
    );

    console.log(tableName);
    console.log(tableSchema);
    console.log(autoIcrementColumn);

    return {
      statusCode: 200,
      message: "Success Ka!!!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
