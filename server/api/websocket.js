import prisma from "../websocket/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ project: process.env.OPENAI_PROJECT_ID });

export default defineWebSocketHandler({
  async open(peer) {
    console.log("[ws] open", peer);
  },

  async message(peer, message) {
    console.log("[ws] message", peer, message);
    // peer.publish("room:lobby", message.text());

    const messageText = message.text();

    const sendToOAI = await OAISendMessage(messageText);
    console.log("Send to OAI: ", sendToOAI);
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});

async function OAISendMessage(message) {
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

    for (let i = 0; i < response.data.length; i++) {
      const msg = response[i];

      // Upsert into DB
      const upsertMsg = await prisma.chat.upsert({
        create: {
          chatMessage: msg.content[0].text.value,
          chatOAIAssistantID: assistantID,
          chatOAIMessageID: msg.id,
          chatCreatedDate: new Date(msg.created_at),
        },
        update: {
          chatMessage: msg.content[0].text.value,
          chatOAIAssistantID: assistantID,
          chatOAIMessageID: msg.id,
          chatModifiedDate: new Date(msg.created_at),
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

    if (!upsertMsg) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
