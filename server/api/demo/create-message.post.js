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

    // console.log("Thread ID: ", threadId);
    // console.log("Message: ", message);
    // console.log("=====================================");
    // console.log("File: ", JSON.stringify(file));
    // console.log("File Name: ", fileName);

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
      // Create a temporary file to store the uploaded data
      // Create a folder to save the PDF file
      const pdfFolderPath = path.join(process.cwd(), "assets", "file");
      console.log("pdfFolderPath: ", pdfFolderPath);

      // Check if the folder exists, if not create it
      if (!fs.existsSync(pdfFolderPath)) {
        fs.mkdirSync(pdfFolderPath, { recursive: true });
      }

      // Create a temporary file to store the uploaded data
      const tempFilePath = path.join(pdfFolderPath, fileName);
      console.log("tempFilePath: ", tempFilePath);

      const writeStream = fs.createWriteStream(tempFilePath);
      writeStream.write(file);
      writeStream.end();

      // Ensure the file is fully written before proceeding
      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      // Create a readable stream for the file
      const fileStream = fs.createReadStream(tempFilePath);
      console.log("fileStream: ", fileStream);

      return {
        statusCode: 200,
        message: "Successfully create message and run",
      };

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
      fs.unlinkSync(tempFilePath);

      fileID = createFile.id;
    }

    return {
      statusCode: 200,
      message: "Successfully create message and run",
    };

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
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
