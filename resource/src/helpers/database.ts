import { createPool } from "mysql2";
import { config } from "dotenv";

config();

// Create a pool of database connections
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0, // No limit for queued connections
});

// Export a function to execute SQL queries
export function query(sql: any, values?: any) {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      // Execute the query with optional values
      connection.query(sql, values, (err, results) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  });
}

export function testConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      return resolve(connection);
    });
  });
}
