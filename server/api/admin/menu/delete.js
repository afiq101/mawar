import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Get file path
    const filePath = path.join(process.cwd() + "/pages/", body.filePath);

    // Delete path
    fs.rmSync(filePath, { recursive: true, force: true });

    return {
      statusCode: 200,
      message: "Menu successfully added!",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
