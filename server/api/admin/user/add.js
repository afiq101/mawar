import { PrismaClient } from "@prisma/client";
import sha256 from "crypto-js/sha256";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const password = sha256("abc123").toString();
  let secretKey = generateSecretKey();

  try {
    // Get user from database
    const allUser = await prisma.user.findMany();

    // Check if the user already exists
    const userExist = allUser.find((user) => {
      return user?.userUsername.toLowerCase() === body?.username.toLowerCase();
    });

    if (userExist)
      return {
        statusCode: 400,
        message: "Username already exists",
      };

    //  Validate secret key
    do {
      secretKey = generateSecretKey();
    } while (
      allUser.find((user) => {
        return user?.userSecretKey === secretKey;
      })
    );

    // Check if roleID is valid
    const roleIDValid = await checkRoleID(body?.roleID);

    if (!roleIDValid)
      return {
        statusCode: 400,
        message: "Role is not valid or does not exist",
      };

    // Add New User
    const user = await prisma.user.create({
      data: {
        userSecretKey: secretKey,
        userUsername: body.username,
        userPassword: password,
        userFullName: body?.fullname || "",
        userEmail: body?.email || "",
        userPhone: body?.phone || "",
        userStatus: "ACTIVE",
        userCreatedDate: new Date(),
        userRoleID: body.role,
      },
    });

    if (user) {
      return {
        statusCode: 200,
        message: "User successfully added!",
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

function generateSecretKey() {
  //   Generate Secret Key number and alphabet. Format : xxxx-xxxx-xxxx-xxxx
  let secretKey = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      secretKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    if (i < 3) {
      secretKey += "-";
    }
  }

  return secretKey;
}

async function checkRoleID(roleID) {
  const role = await prisma.role.findFirst({
    where: {
      roleID: roleID,
    },
  });

  if (!role) {
    return false;
  } else {
    return true;
  }
}
