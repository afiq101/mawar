import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Overwrite composable code from path in body with new code
    const filePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/list.json"
    );

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Convert string to array of objects
    const formsArray = JSON.parse(fileContent);

    // Append new form to array from body.form
    formsArray.push({
      id: body.form.id,
      name: body.form.name,
      bannerImg: body.form.bannerImg ? body.form.bannerImg : "/img/background/bg2.jpg",
    });

    // Convert the array back to JSON string
    const updatedFileContent = JSON.stringify(formsArray);

    // Overwrite file with new forms array using fs
    fs.writeFileSync(filePath, updatedFileContent, "utf8");

    // Write a new file inside rs-forms-builder
    const formFilePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/forms"
    );

    fs.writeFileSync(
      `${formFilePath}/${body.form.id}.json`,
      `${JSON.stringify(body.form, null, 2)}`,
      "utf8"
    );

    return {
      statusCode: 200,
      message: "Code successfully saved",
      data: formsArray,
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
