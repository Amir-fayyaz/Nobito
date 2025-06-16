import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          stores: [createKeyv(configService.get<string>('REDIS_URL'))],
          ttl: configService.get<number>('CACHE_TTL', 5000),
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
})
export class AppCacheModule {}
