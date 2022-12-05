import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body);

  try {
    const user = await prisma.user.updateMany({
      where: {
        userUsername: body.username,
      },
      data: {
        userFullName: body?.fullname || "",
        userEmail: body?.email || "",
        userPhone: body?.phone || "",
        userStatus: body.status,
        userRoleID: body.roleID,
        userModifiedDate: new Date(),
      },
    });

    if (user) {
      return {
        statusCode: 200,
        message: "User updated successfully",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
