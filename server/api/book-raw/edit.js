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
      bookId: id,
      bookName: nama,
      bookSynopsis: sinopsis,
      bookAuthor: pengarang,
    } = await readBody(event);

    if (!nama || !pengarang || !id) {
      return {
        statusCode: 400,
        message: "Id, nama, dan pengarang harus diisi",
      };
    }

    //---------------------------------------------
    // Using ORM (Object Relational Mapping)
    //---------------------------------------------

    // const updateBook = await prisma_main_app.book.update({
    //   where: {
    //     bookID: parseInt(id),
    //   },
    //   data: {
    //     bookName: nama,
    //     bookSynopsis: sinopsis,
    //     bookAuthor: pengarang,
    //   },
    // });

    //---------------------------------------------
    // Using Raw SQL
    //---------------------------------------------

    const updateBook =
      await prisma_main_app.$executeRaw`UPDATE book SET bookName = ${nama}, bookSynopsis = ${sinopsis}, bookAuthor = ${pengarang} WHERE bookID = ${id}`;

    if (!updateBook) {
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
