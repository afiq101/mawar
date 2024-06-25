import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const { threadId } = getQuery(event);

    if (!threadId) {
      return {
        statusCode: 400,
        message: "threadId is required",
      };
    }

    const getListThread = await openai.beta.threads.retrieve(threadId);
    console.log("Thread list: ", getListThread);

    if (!getListThread) {
      return {
        statusCode: 500,
        message: "Failed to retrieve thread",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve thread",
      data: getListThread,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
