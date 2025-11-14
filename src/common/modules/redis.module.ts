import { REDIS_PROVIDER } from '@common/constants/tokens';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Module({
  providers: [ConfigService],
})
export class RedisModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          inject: [ConfigService],
          provide: REDIS_PROVIDER,
          useFactory: async (configService: ConfigService) => {
            return createClient({
              url: configService.get<string>('REDIS_URL'),
            })
              .on('error', () => {
                Logger.error('redis connection Error', 'Redis Module');
              })
              .on('connect', () => {
                Logger.log('redis client connected', 'Redis Module');
              })
              .connect();
          },
        },
      ],
      exports: [REDIS_PROVIDER],
      global: true,
    };
  }
}
