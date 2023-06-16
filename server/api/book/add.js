import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const insertBook = await prisma.book.create({
      data: {
        bookName: nama,
        bookSynopsis: sinopsis,
        bookAuthor: pengarang,
      },
    });

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
