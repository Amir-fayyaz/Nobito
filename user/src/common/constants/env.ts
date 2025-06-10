import { config } from 'dotenv';

config();

console.log(process.env.DB_PASSWORD);
export const Env = {
  //For db
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: Number(process.env.DB_PORT),
  DB_TYPE: process.env.DB_TYPE,

  //Node
  NODE_ENV: process.env.NODE_ENV,

  //Rabbitmq
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
