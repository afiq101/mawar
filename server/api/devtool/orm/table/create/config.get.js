import fileConfig from "./configuration.json";

export default defineEventHandler(async (event) => {
  try {
    // read configuration file if it exists and return error if it doesn't
    if (!fileConfig) {
      return {
        statusCode: 404,
        message: "Configuration file not found",
      };
    }

    return {
      statusCode: 200,
      message: "Configuration file successfully loaded",
      data: fileConfig,
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
