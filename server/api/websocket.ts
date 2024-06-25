import OpenAI from "openai";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineWebSocketHandler({
  async open(peer) {
    console.log("[ws] open", peer);
    await OAIAssistantList();

    peer.subscribe("room:lobby");
    peer.publish("room:lobby", "Another user has joined the room.");
  },

  async message(peer, message) {
    console.log("[ws] message", peer, message);
    peer.publish("room:lobby", message.text());
    if (message.text().includes("ping")) {
      peer.send("pong");
    }
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});

async function OAIAssistantList() {
  try {
    const listAssistant = await openai.beta.assistants.list();
    console.log(listAssistant);

    if (!listAssistant) {
      return false;
    }

    return listAssistant;
  } catch (error) {
    console.log(error);
    return false;
  }
}
