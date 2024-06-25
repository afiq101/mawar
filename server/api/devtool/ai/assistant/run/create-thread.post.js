import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const { assistantId } = await readBody(event);

    if (!assistantId) {
      return {
        statusCode: 400,
        message: "assistantId is required",
      };
    }

    const createThreadAndRun = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
    });

    console.log("Thread created and run: ", createThreadAndRun);

    if (!createThreadAndRun) {
      return {
        statusCode: 500,
        message: "Failed to create thread",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully create thread",
      data: createThreadAndRun,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
