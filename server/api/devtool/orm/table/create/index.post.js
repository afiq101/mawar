import { exec, spawn } from "node:child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import os from "os";

export default defineEventHandler(async (event) => {
  try {
    const { tableName, tableSchema, autoIcrementColumn } = await readBody(
      event
    );

    if (!tableName || !tableSchema) {
      return {
        statusCode: 400,
        message: "Bad Request",
      };
    }

    // Create Table
    const isTableCreated = await createTable(
      tableName,
      tableSchema,
      autoIcrementColumn
    );

    if (isTableCreated.statusCode !== 200)
      return {
        statusCode: 500,
        message: isTableCreated.message,
      };

    // Run Prisma Command
    const isPrismaCommandRun = await runPrismaCommand();
    if (!isPrismaCommandRun)
      return {
        statusCode: 500,
        message: "Prisma Command Failed",
      };

    return {
      statusCode: 200,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});

async function createTable(tableName, tableSchema) {
  try {
    let rawSchema = ``;
    for (let i = 0; i < tableSchema.length; i++) {
      const column = tableSchema[i];

      // Sanitize rawSchema
      if (column.type.includes("[[") && column.type.includes("]]")) {
        const FKTableName = column.type.replace("[[", "").replace("]]", "");
        const primaryKey = await prisma.$queryRawUnsafe(
          "SHOW COLUMNS from " + FKTableName + " where `Key` = 'PRI'"
        );

        rawSchema += `${column.name} INT NOT NULL, FOREIGN KEY (${column.name}) REFERENCES ${FKTableName}(${primaryKey[0].Field})`;
      } else {
        rawSchema += `${column.name} 
        ${column.type}${column.length ? "(" + column.length + ")" : ""}
        ${column.defaultValue ? " DEFAULT " + column.defaultValue : ""} 
        ${column.nullable ? " NULL" : " NOT NULL "}
        ${column.primaryKey ? " PRIMARY KEY AUTO_INCREMENT" : ""}`;
      }

      if (i < tableSchema.length - 1) rawSchema += ", ";
    }

    const sqlStatement = `CREATE TABLE ${tableName} (${rawSchema})`;
    console.log(sqlStatement);

    const createTable = await prisma.$queryRawUnsafe(sqlStatement);
    if (!createTable)
      return {
        statusCode: 500,
        message: "Table Creation Failed",
      };

    return {
      statusCode: 200,
      message: "Table Created",
    };
  } catch (error) {
    console.log(error.message);

    // Get Message
    if (error.message.includes("already exists")) {
      return {
        statusCode: 500,
        message: `Table '${tableName}' already exists!`,
      };
    }

    if (error.message.includes("1064")) {
      return {
        statusCode: 500,
        message: "Please ensure the SQL syntax is correct!",
      };
    }

    return {
      statusCode: 500,
      message: "Table Creation Failed",
    };
  }
}

async function runPrismaCommand() {
  try {
    console.log("---------- Run Prisma Command ----------");
    let error = false;

    // Run command npx prisma db pull && npx prisma generate
    // Set delay for 1 second before running prisma db pull
    setTimeout(() => {
      // Run command npx prisma db pull
      const prismaDBPull = spawn("npx", ["prisma", "db", "pull"], {
        shell: true,
      });

      prismaDBPull.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      prismaDBPull.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        error = true;
      });

      if (error) return false;

      // Get the directory name of the current module
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const directory = resolve(__dirname, "../..");

      // Command to execute with elevated privileges
      const command = "npx prisma generate";

      // Determine the appropriate shell command based on the platform
      let shellCommand;
      switch (os.platform()) {
        case "win32":
          shellCommand = `Start-Process cmd -ArgumentList '/c cd "${directory}" && ${command}' -Verb RunAs`;
          break;
        case "darwin":
        case "linux":
          shellCommand = `cd "${directory}" && ${command}`;
          break;
        default:
          console.error("Unsupported platform:", os.platform());
          process.exit(1);
      }

      // Spawn child process using the appropriate shell command
      const childProcess = spawn(
        os.platform() === "win32" ? "powershell.exe" : "sh",
        os.platform() === "win32"
          ? ["-Command", shellCommand]
          : ["-c", shellCommand],
        {
          stdio: "inherit",
        }
      );

      // Listen for child process events
      childProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      childProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        error = true;
      });

      if (error) return false;
    }, 1000);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
