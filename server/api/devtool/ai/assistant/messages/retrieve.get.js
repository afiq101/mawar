import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const { threadId, messageId } = getQuery(event);

    if (!threadId) {
      return {
        statusCode: 400,
        message: "threadId is required",
      };
    }

    if (!messageId) {
      return {
        statusCode: 400,
        message: "messageId is required",
      };
    }

    const getMessage = await openai.beta.threads.messages.retrieve(
      threadId,
      messageId
    );
    if (!getMessage) {
      return {
        statusCode: 500,
        message: "Failed to retrieve message",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve message",
      data: getMessage,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
