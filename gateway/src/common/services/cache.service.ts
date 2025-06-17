import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, data: any, ttl: number) {
    await this.cacheManager.set(key, data, ttl);

    return { success: true };
  }

  async del(key: string) {
    await this.cacheManager.del(key);
    return { success: true };
  }
}
