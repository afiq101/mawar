import OpenAI from "openai";
import showdown from "showdown";
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

    const messageResponse = await openai.beta.threads.messages.list(threadId);
    console.log("Message response: ", messageResponse);

    if (messageResponse.data.length === 0) {
      return {
        statusCode: 404,
        message: "No messages found",
      };
    }

    // Reverse the order of messages
    messageResponse.data.reverse();

    const message =
      messageResponse.data[messageResponse.data.length - 1].content[0];
    const role = messageResponse.data[messageResponse.data.length - 1].role;

    console.log("Message: ", message.text.value);
    console.log("Role: ", role);

    // Init showdown converter
    const converter = new showdown.Converter();
    // Convert markdown to HTML
    const htmlMsg = converter.makeHtml(message.text.value);

    return {
      statusCode: 200,
      message: "Successfully retrieve latest message",
      data: {
        chat: htmlMsg,
        type: role,
        contentType: message.type,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
