import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Get form builder list
    const filePath = path.join(
      process.cwd() + "/assets/js/rs-form-builder/list.json"
    );

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Convert string to array of objects
    const formsArray = JSON.parse(fileContent);

    // Remove form from array
    const updatedFormsArray = formsArray.filter(
      (form) => form.id !== body.formId
    );

    // Convert the array back to JSON string
    const updatedFileContent = JSON.stringify(updatedFormsArray);

    // Overwrite file with new forms array using fs
    fs.writeFileSync(filePath, updatedFileContent, "utf8");

    // Get form file
    const formFilePath = path.join(
      process.cwd() +
        "/assets/js/rs-form-builder/forms" +
        `/${body.formId}.json`
    );

    //  Delete form file
    fs.unlinkSync(formFilePath);

    return {
      statusCode: 200,
      message: "Form successfully deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
