import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.filePath != body.formData.path) {
    try {
      // Check if last character is not slash
      if (body.filePath.slice(-1) != "/") {
        body.filePath = body.filePath + "/";
      }

      // Get old file path
      const oldFilePath = path.join(
        process.cwd() + "pages",
        body.filePath + "index.vue"
      );

      // Check if last character is not a slash
      if (body.formData.path.slice(-1) != "/") {
        body.formData.path = body.formData.path + "/";
      }

      // Get new file path
      const newFilePath = path.join(
        process.cwd(),
        "pages",
        body.formData.path,
        "index.vue"
      );

      // Create the folder if doesn't exist
      fs.mkdirSync(path.dirname(newFilePath), { recursive: true });

      // Create new file
      fs.writeFileSync(
        newFilePath,
        `<script setup>
          definePageMeta({
            title: "${
              body.formData.title ? body.formData.title : body.formData.name
            }",
          });
        </script>
        <template>
          <div>
            <LayoutsBreadcrumb />
          </div>
        </template>
      `
      );

      // copy old file to new file
      fs.copyFile(oldFilePath, newFilePath, (err) => {
        if (err) throw err;
        console.log("successfully copied old file to new file");
      });

      return {
        statusCode: 200,
        message: "Menu successfully saved",
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: error,
      };
    }

    // fs.writeFile;
  }

  return {
    statusCode: 200,
    message: "null",
  };
});
