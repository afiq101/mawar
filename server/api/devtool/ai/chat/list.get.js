export default defineEventHandler(async (event) => {
  try {
    const { userID } = event.context.user;

    const messagesList = await prisma.chat.findMany({
      where: {
        userID: userID,
      },
      select: {
        chatMessage: true,
      },
      orderBy: {
        chatID: "desc",
      },
    });

    if (!messagesList) {
      return {
        statusCode: 404,
        message: "No chat messages found",
      };
    }

    return {
      statusCode: 200,
      message: "Successfully retrieve list of chat messages",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Something went wrong. Please try again later.",
    };
  }
});
