import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor() {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.MYSQL_TYPE,
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_ROOT_PASSWORD,
      username: process.env.MYSQL_ROOT_USERNAME,
      database: process.env.MYSQL_DATABASE,
      synchronize: process.env.NODE_ENV === 'development',
    };
  }
}
