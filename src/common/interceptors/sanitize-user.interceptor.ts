import { deepRemoveSensitiveFields } from '@common/utility/deep-remove.utility';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SanitizeUserInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => deepRemoveSensitiveFields(data)));
  }
}
