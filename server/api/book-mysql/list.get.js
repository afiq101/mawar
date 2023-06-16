import mysql from "mysql2/promise";
import config from "~/server/mysql.config";

export default defineEventHandler(async (event) => {
  try {
    //---------------------------------------------
    // Using nodejs-mysql
    //---------------------------------------------

    // Create the connection to database
    const connection = await mysql.createConnection(config.db);

    // Using promise wrapper (recommended) which works very well with ES7 async await. Github: https://github.com/sidorares/node-mysql2#using-promise-wrapper
    const [books] = await connection.query(
      "SELECT bookID, bookName, bookSynopsis, bookAuthor FROM book"
    );

    if (books.length === 0) {
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
