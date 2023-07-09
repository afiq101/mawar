import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const query = await getQuery(event);

  try {
    // Read query id and return file content
    const filePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/forms/",
      query.id + ".json"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");

    // eval() is used to convert string to object
    const formData = JSON.parse(fileContent);

    return {
      statusCode: 200,
      message: "Form successfully retrieved",
      data: formData,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
