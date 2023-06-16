import { PrismaClient } from "@prisma/client";

// Calling the below default prisma client without override datasources will use the default database that has been setup in ./prisma/schema.prisma
// const prisma = new PrismaClient();

//------------------------------------------------------------------------------------------------------------
// Below are two different prisma client that will be used to call different database (mawardb and main_app)
//------------------------------------------------------------------------------------------------------------

// Database mawardb
const prisma_mawardb = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

// Database main_app
const prisma_main_app = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL_2 } },
});

export default defineEventHandler(async (event) => {
  try {
    //---------------------------------------------
    // Using ORM (Object Relational Mapping)
    //---------------------------------------------

    // const books = await prisma_main_app.book.findMany({
    //   select: {
    //     bookID: true,
    //     bookName: true,
    //     bookSynopsis: true,
    //     bookAuthor: true,
    //   },
    // });

    //---------------------------------------------
    // Using Raw SQL and call from another database (main_app)
    //---------------------------------------------

    const books =
      await prisma_main_app.$queryRaw`SELECT bookID, bookName, bookSynopsis, bookAuthor FROM book`;

    if (!books) {
      return {
        statusCode: 400,
        message: "Gagal mendapatkan data",
      };
    }

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
