import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get all users from database

  try {
    const roles = await prisma.role.findMany({
      select: {
        roleID: true,
        roleName: true,
        roleDescription: true,
        roleStatus: true,
        roleCreatedDate: true,
        roleModifiedDate: true,
      },
      where: {
        roleStatus: "ACTIVE",
        roleID: {
          not: 1,
        },
      },
    });

    if (roles) {
      return {
        statusCode: 200,
        message: "Roles successfully fetched",
        data: roles,
      };
    } else {
      return {
        statusCode: 404,
        message: "No Roles found",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
