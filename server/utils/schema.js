import fs from "fs";
import path from "path";

function getPrismaSchema() {
  try {
    const schemaPath = path.join(
      process.cwd(),
      "prisma",
      "json",
      "json-schema.json"
    );
    if (!fs.existsSync(schemaPath)) return false;

    const schema = fs.readFileSync(schemaPath, "utf8");
    if (!schema) return false;

    return JSON.parse(schema);
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

function getPrismaSchemaTable(table = null) {
  const JSONSchema = getPrismaSchema();

  if (!JSONSchema) return false;

  if (table) return JSONSchema.definitions[table];

  const keys = Object.keys(JSONSchema.definitions);

  let schema = [];
  for (let i = 0; i < keys.length; i++) {
    const tbl = JSONSchema.definitions[keys[i]];

    schema.push({
      name: keys[i],
      fields: Object.keys(tbl.properties),
    });
  }

  return schema;
}

export { getPrismaSchema, getPrismaSchemaTable };
