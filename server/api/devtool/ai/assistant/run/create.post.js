import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const { threadId, assistantId } = await readBody(event);

    if (!threadId) {
      return {
        statusCode: 400,
        message: "threadId is required",
      };
    }

    if (!assistantId) {
      return {
        statusCode: 400,
        message: "assistantId is required",
      };
    }

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

    const messageResponse = await openai.beta.threads.messages.list(threadId);
    console.log("Message response: ", messageResponse);

    return {
      statusCode: 200,
      message: "Successfully create run",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
