import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const updateBook = await prisma.book.update({
      where: {
        bookID: parseInt(id),
      },
      data: {
        bookName: nama,
        bookSynopsis: sinopsis,
        bookAuthor: pengarang,
      },
    });

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
