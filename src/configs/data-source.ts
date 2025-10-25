import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_ROOT_USERNAME,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: Number(process.env.MYSQL_PORT),
  type: 'mysql',
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/**/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  migrations: ['dist/src/migrations/*{.ts , .js}'],
  migrationsTableName: 'migration-aliBaba-db',
});
