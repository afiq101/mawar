export default defineEventHandler(async (event) => {
  //  Get all api list from server folder

  try {
    const apiList = await getApiList();
    return {
      statusCode: 200,
      message: "API List successfully fetched",
      data: apiList,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
