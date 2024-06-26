export default defineEventHandler(async (event) => {
  try {
    return {
      statusCode: 200,
      message: "Successfully retrieve list of chat messages",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
