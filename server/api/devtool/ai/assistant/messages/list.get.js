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

    const getListMessages = await openai.beta.threads.messages.list(threadId);
    // console.log("Messages list: ", getListMessages);

    if (!getListMessages) {
      return {
        statusCode: 500,
        message: "Failed to retrieve messages",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve messages",
      data: getListMessages,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
