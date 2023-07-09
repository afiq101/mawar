import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Overwrite vue code from path in body with new code
    const filePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/forms/",
      body.id + ".json"
    );

    // Convert object to string
    const jsonData = JSON.stringify(body.form, null, 2);

    fs.writeFileSync(filePath, jsonData, "utf8");

    // Overwrite list json with new name, id and image
    const listFilePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/list.json"
    );

    const listFileContent = fs.readFileSync(listFilePath, "utf8");

    // Convert string to array of objects
    const formsArray = JSON.parse(listFileContent);

    // Find data with same id and overwrite name and image
    const index = formsArray.findIndex((form) => form.id === body.id);

    formsArray[index].name = body.form.name;
    formsArray[index].bannerImg = body.form.bannerImg;

    // Convert the array back to JSON string
    const updatedFileContent = JSON.stringify(formsArray);

    // Overwrite file with new forms array using fs
    fs.writeFileSync(listFilePath, updatedFileContent, "utf8");

    return {
      statusCode: 200,
      message: "Code successfully saved",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
