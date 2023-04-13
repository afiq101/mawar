import fs from "fs";
import path from "path";
import { exec } from "child_process";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if last character is not slash
    if (body.formData.path.slice(-1) != "/") {
      body.formData.path = body.formData.path + "/";
    }

    // Check if the path already exists
    if (fs.existsSync(path.join(process.cwd(), "pages", body.formData.path))) {
      return {
        statusCode: 500,
        message: "Path already exists. Please choose another path.",
      };
    }

    // Create new file path with index.vue
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

    exec("yarn dev", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    return {
      statusCode: 200,
      message: "Menu successfully added!",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
