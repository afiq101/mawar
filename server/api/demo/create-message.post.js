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
      role: "user",
      content: message,
    });

    if (!createMessage) {
      return {
        statusCode: 500,
        message: "Failed to create message",
      };
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      model: "gpt-4o",
      temperature: 0.7,
    });

    // Loop through thread runs retrieve
    let getRun;
    do {
      getRun = await openai.beta.threads.runs.retrieve(threadId, run.id);
      console.log("Run: ", getRun);
    } while (getRun.status !== "completed");

    return {
      statusCode: 200,
      message: "Successfully create message and run",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
