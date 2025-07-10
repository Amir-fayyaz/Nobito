import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Env } from '../common/constants/env';

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor() {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      host: Env.DB_HOST,
      type: Env.DB_TYPE as any,
      username: Env.DB_USERNAME,
      password: Env.DB_PASSWORD,
      database: Env.DB_DATABASE,
      port: Env.DB_PORT,
      entities: [
        'dist/**/**/**/*.entity{.ts,.js}',
        'dist/**/**/*.entity{.ts,.js}',
      ],
      synchronize: Env.NODE_ENV === 'production',
    };
  }
}
