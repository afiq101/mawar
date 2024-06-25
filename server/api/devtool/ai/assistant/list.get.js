import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const listAssistant = await openai.beta.assistants.list();
    if (!listAssistant) {
      return {
        statusCode: 500,
        message: "Failed to retrieve assistant",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve assistant",
      data: listAssistant,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
