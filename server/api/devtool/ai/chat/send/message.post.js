import OpenAI from "openai";

const openai = new OpenAI({ project: process.env.OPENAI_PROJECT_ID });

export default defineEventHandler(async (event) => {
  try {
    const { message } = await readBody(event);

    const { userID } = event.context.user;

    if (!message) {
      return {
        statusCode: 400,
        message: "Invalid request. Please provide a message.",
      };
    }

    const sendMessage = await OAISendMessage(message, userID);
    if (!sendMessage) {
      return {
        statusCode: 500,
        message: "Something went wrong. Please try again later.",
      };
    }

    const getLatestMsg = await prisma.chat.findFirst({
      where: {
        userID: userID,
      },
      select: {
        chatMessage: true,
      },
      orderBy: {
        chatID: "desc",
      },
    });

    if (!getLatestMsg) {
      return {
        statusCode: 404,
        message: "No chat messages found",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve assistant",
      data: getLatestMsg,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});

async function OAISendMessage(message, userID) {
  try {
    const assistantID = process.env.OPENAI_ASSISTANT_ID;

    if (!assistantID) {
      return false;
    }

    // Create thread
    const thread = await openai.beta.threads.create();
    console.log("Thread created: ", thread);

    if (!thread) {
      return false;
    }

    // Insert into DB
    const insertThread = await prisma.thread.create({
      data: {
        threadOAIID: thread.id,
      },
    });
    console.log("Insert thread into DB: ", insertThread);

    if (!insertThread) {
      return false;
    }

    // Send message
    const sendMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });
    console.log("Message sent: ", sendMessage);

    if (!sendMessage) {
      return false;
    }

    // Create run to assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantID,
      model: "gpt-4o",
      temperature: 0.7,
    });

    let runChat;
    do {
      runChat = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log("Run: ", runChat);
    } while (runChat.status !== "completed");

    const response = await openai.beta.threads.messages.list(thread.id);
    console.log("Message response: ", response);

    console.log("Message response data: ", response.data);

    for (let i = 0; i < response.data.length; i++) {
      const msg = response.data[i];

      if (!msg.content[0].text) {
        continue;
      }

      // Upsert into DB
      const upsertMsg = await prisma.chat.upsert({
        create: {
          chatRole: msg.role,
          chatMessage: msg.content[0].text.value,
          chatOAIAssistantID: assistantID,
          chatOAIMessageID: msg.id,
          chatCreatedDate: new Date(msg.created_at),
          threadID: insertThread.threadID,
          userID: userID,
        },
        update: {
          chatRole: msg.role,
          chatMessage: msg.content[0].text.value,
          chatOAIAssistantID: assistantID,
          chatOAIMessageID: msg.id,
          chatModifiedDate: new Date(msg.created_at),
          userID: userID,
        },
        where: {
          chatOAIMessageID: msg.id,
        },
      });

      console.log("Upsert message into DB: ", upsertMsg);

      if (!upsertMsg) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
