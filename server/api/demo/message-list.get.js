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

    const getListMessages = await openai.beta.threads.messages.list(threadId);
    console.log("Messages list: ", getListMessages);

    if (!getListMessages) {
      return {
        statusCode: 500,
        message: "Failed to retrieve messages",
      };
    }

    // Store in an array to loop through
    const messages = [];

    for (let i = 0; i < getListMessages.data.length; i++) {
      let htmlMsg = "";
      let message = getListMessages.data[i].content[0];
      let role = getListMessages.data[i].role;
      //   console.log("Message: ", message);

      // Convert markdown to HTML
      const converter = new showdown.Converter();

      // Convert markdown to HTML
      htmlMsg = converter.makeHtml(message.text.value);

      // Add class to <pre> and <code> tags
      // htmlMsg = appendClassToPreCode(htmlMsg);

      messages.push({
        chat: htmlMsg,
        type: role,
        contentType: message.type,
      });
    }

    // Reverse the order of messages
    messages.reverse();

    return {
      statusCode: 200,
      message: "Successfully retrieve messages",
      data: messages,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});

const appendClassToPreCode = (htmlMsg) => {
  // Add class to <pre> and <code> tags
  const regex = /<pre><code class="vue language-vue">(.*?)<\/code><\/pre>/gs;
  const match = htmlMsg.match(regex);

  console.log("Match: ", match);

  if (match) {
    const newHtmlMsg = htmlMsg.replace(
      regex,
      `<pre class="language-javascript"><code>$1</code></pre>`
    );
    return newHtmlMsg;
  }

  return htmlMsg;
};
