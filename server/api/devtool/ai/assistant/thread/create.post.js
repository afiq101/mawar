import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const createEmptyThread = await openai.beta.threads.create();
    console.log("Thread created: ", createEmptyThread);

    if (!createEmptyThread) {
      return {
        statusCode: 500,
        message: "Failed to create thread",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully create thread",
      data: createEmptyThread,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
