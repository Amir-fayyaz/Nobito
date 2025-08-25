import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, data: any, ttl: number): Promise<void> {
    return await this.cacheManager.set(key, data, ttl * 1000);
  }

  async del(key: string): Promise<boolean> {
    return await this.cacheManager.del(key);
  }

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
}
