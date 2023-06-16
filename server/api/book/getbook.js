import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { bookID: id } = await getQuery(event);

    const getBook = await prisma.book.findUnique({
      where: {
        bookID: parseInt(id),
      },
      select: {
        bookID: true,
        bookName: true,
        bookSynopsis: true,
        bookAuthor: true,
      },
    });

    return {
      statusCode: 200,
      message: "Berhasil mendapatkan data",
      data: getBook,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Masalah pada server",
    };
  }
});
