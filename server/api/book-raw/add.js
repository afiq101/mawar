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
  // bookName, bookSynopsis, bookAuthor

  try {
    // New way
    const {
      bookName: nama,
      bookSynopsis: sinopsis,
      bookAuthor: pengarang,
    } = await readBody(event);

    if (!nama || !pengarang) {
      return {
        statusCode: 400,
        message: "Nama, dan pengarang harus diisi",
      };
    }

    //---------------------------------------------
    // Using ORM (Object Relational Mapping)
    //---------------------------------------------

    // const insertBook = await prisma_main_app.book.create({
    //   data: {
    //     bookName: nama,
    //     bookSynopsis: sinopsis,
    //     bookAuthor: pengarang,
    //   },
    // });

    //---------------------------------------------
    // Using Raw SQL
    //---------------------------------------------

    const insertBook =
      await prisma_main_app.$executeRaw`INSERT INTO book (bookName, bookSynopsis, bookAuthor) VALUES (${nama}, ${sinopsis}, ${pengarang})`;

    if (!insertBook) {
      return {
        statusCode: 500,
        message: "Gagal menyimpan data",
      };
    }

    return {
      statusCode: 200,
      message: "Berhasil menyimpan data",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Masalah pada server",
    };
  }
});
