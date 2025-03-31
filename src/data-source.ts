import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = 5432;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: "public",

  entities: [
    `${__dirname}/entities/Customer.ts`,
    `${__dirname}/entities/Tables.ts`,
    `${__dirname}/entities/Room.ts`,
  ],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
