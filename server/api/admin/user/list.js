import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get all users from database

  try {
    const users = await prisma.user.findMany({
      select: {
        userUsername: true,
        userFullName: true,
        userEmail: true,
        userPhone: true,
        role: {
          select: {
            roleID: true,
            roleName: true,
          },
        },
        userStatus: true,
        userCreatedDate: true,
        userModifiedDate: true,
      },
    });

    if (users) {
      return {
        statusCode: 200,
        message: "Users successfully fetched",
        data: users,
      };
    } else {
      return {
        statusCode: 404,
        message: "No users found",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
