import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const { threadId, user, message } = await readBody(event);

    if (!threadId) {
      return {
        statusCode: 400,
        message: "threadId is required",
      };
    }

    if (!message) {
      return {
        statusCode: 400,
        message: "message is required",
      };
    }

    const createMessage = await openai.beta.threads.messages.create(threadId, {
      role: !user ? "assistant" : "user",
      content: message,
    });

    if (!createMessage) {
      return {
        statusCode: 500,
        message: "Failed to create message",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully create message",
      data: createMessage,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
