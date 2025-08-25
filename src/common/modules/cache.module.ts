import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          stores: [createKeyv(configService.get<string>('REDIS_URL'))],
          ttl: 300 * 1000,
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
})
export class AppCacheModule {}
