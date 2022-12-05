import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if the role already exists
    const allRole = await prisma.role.findMany();

    const roleExist = allRole.find((role) => {
      return role?.roleName.toLowerCase() === body?.name.toLowerCase();
    });

    if (roleExist) {
      return {
        statusCode: 400,
        message: "Role already exists",
      };
    }

    // add new role
    const role = await prisma.role.create({
      data: {
        roleName: body.name,
        roleDescription: body.description,
        roleStatus: "ACTIVE",
        roleCreatedDate: new Date(),
      },
    });

    if (role) {
      return {
        statusCode: 200,
        message: "Role successfully added!",
      };
    } else {
      return {
        statusCode: 500,
        message: "Something went wrong! Please contact your administrator.",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
