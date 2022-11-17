import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const menuPath = path.join(process.cwd() + "/navigation/", "index.js");
    fs.writeFileSync(
      menuPath,
      `export default ${JSON.stringify(body.menuData, null, 2)}`
    );

    return {
      statusCode: 200,
      message: "Menu saved",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
