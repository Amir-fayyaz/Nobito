import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  constructor(private readonly axios: HttpService) {}

  sendOtp() {}
}
