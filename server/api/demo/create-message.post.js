import OpenAI from "openai";
import fs from "fs";
import path from "path";
const openai = new OpenAI({ project: "proj_p1rPkahsfJHrHQd1LvOqvkoy" });

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);
    //console.log(rawBody);

    console.log("body Param: ", body);

    let threadId = null;
    let message = null;
    let file = null;
    let fileName = null;

    let fileID = null;

    for (let i = 0; i < body.length; i++) {
      const el = body[i];

      if (el.name === "threadId") {
        threadId = el.data.toString();
      }

      if (el.name === "message") {
        message = el.data.toString();
      }

      if (el.name === "file") {
        file = el.data;
      }

      if (el.name === "fileName") {
        fileName = el.data.toString();
      }

      if (el.name === "fileID") {
        fileID = el.data.toString();
      }
    }

    if (!threadId) {
      return {
        statusCode: 400,
        message: "threadId is required",
      };
    }

    if (!message) {
      return {
        statusCode: 400,
        message: "message is required",
      };
    }

    if (file && fileName && !fileID) {
      // Create a folder to save the file
      const uploadFolderPath = path.join(process.cwd(), "assets", "file");
      console.log("uploadFolderPath: ", uploadFolderPath);

      // Check if the folder exists, if not create it
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
      }

      // Create a file path for the uploaded file
      const filePath = path.join(uploadFolderPath, fileName);
      console.log("filePath: ", filePath);

      // Write the file directly
      fs.writeFileSync(filePath, file);
      console.log("File written successfully");

      // Read the file back to verify its contents
      const fileContent = fs.readFileSync(filePath);
      console.log("File content length:", fileContent.length);
      console.log("First few bytes of saved file:", fileContent.slice(0, 10));

      // Create a readable stream for the file
      const fileStream = fs.createReadStream(filePath);

      const createFile = await openai.files.create({
        file: fileStream,
        purpose: "assistants",
      });
      console.log("Create file: ", createFile);

      if (!createFile) {
        return {
          statusCode: 500,
          message: "Failed to create file",
        };
      }

      // Clean up the temporary file
      fs.unlinkSync(filePath);

      fileID = createFile.id;
    }

    const arrayAttachments = fileID
      ? [
          {
            file_id: fileID,
            tools: [
              {
                type: "file_search",
              },
            ],
          },
        ]
      : [];

    const createMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
      attachments: arrayAttachments,
    });

    if (!createMessage) {
      return {
        statusCode: 500,
        message: "Failed to create message",
      };
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;

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

    return {
      statusCode: 200,
      message: "Successfully create message and run",
      data: {
        fileID: fileID ? fileID : null,
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
