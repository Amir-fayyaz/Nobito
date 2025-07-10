import { config } from 'dotenv';

config();

export const Env = {
  //rabbit-mq
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
