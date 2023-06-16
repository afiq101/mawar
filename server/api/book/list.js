import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const books = await prisma.book.findMany({
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
      data: books,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Masalah pada server",
    };
  }
});
