import mysql from "mysql2/promise";
import config from "~/server/mysql.config";

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
    // Using nodejs-mysql
    //---------------------------------------------

    // Create the connection to database
    const connection = await mysql.createConnection(config.db);

    // Using promise wrapper (recommended) which works very well with ES7 async await. Github: https://github.com/sidorares/node-mysql2#using-promise-wrapper
    const [insertBook] = await connection.query(
      "INSERT INTO book (bookName, bookSynopsis, bookAuthor) VALUES (?, ?, ?)",
      [nama, sinopsis, pengarang]
    );

    if (insertBook.affectedRows === 0) {
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
