import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const query = await getQuery(event);

  try {
    // Get vue code from path in query
    const filePath = path.join(process.cwd() + "/pages/", query.path + ".vue");
    const code = fs.readFileSync(filePath, "utf8");

    return {
      statusCode: 200,
      message: "Code successfully loaded",
      data: code,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
