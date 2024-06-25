import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

async function OAIAssistantList() {
  try {
    const listAssistant = await openai.beta.assistants.list();
    if (!listAssistant) {
      return false;
    }

    return listAssistant;
  } catch (error) {
    console.log(error);
    return false;
  }
}
