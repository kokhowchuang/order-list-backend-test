import mysql from "mysql";
import { variable } from "../config/environment_variable";

const env = process.env.NODE_ENV || "development";
const dbUserName =
  process.env.DATABASE_USERNAME || variable[env].DATABASE.USERNAME;
const dbPassword =
  process.env.DATABASE_PASSWORD || variable[env].DATABASE.PASSWORD;
const dbDatabaseName = process.env.DATABASE_NAME || variable[env].DATABASE.NAME;

const conn = mysql.createConnection({
  host: "localhost",
  user: dbUserName,
  password: dbPassword,
  database: dbDatabaseName,
});

conn.connect();
export default conn;

console.log("MySQL connected to appConnection");
