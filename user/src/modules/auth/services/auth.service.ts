import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { RegisterByPhoneType } from '../dto/registerByPhone.type';
import { OtpService } from './otp.service';
import { VerifyByPhone } from '../dto/verifyByPhone.type';
import { UserService } from 'src/modules/user/user.service';
import { JwtAppService } from './jwt.service';
import { Roles } from 'src/common/enum/role';
import { RegisterByEmail } from '../dto/registerByEmail.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtAppService,
  ) {}

  async registerByPhone(data: RegisterByPhoneType) {
    const user = await this.userRepository.findOneBy({ phone: data.phone });

    if (user) return { status: 409 };

    const { hashedOtp, otp } = await this.otpService.generateAndSend();

    return {
      otp,
      hashedOtp,
      status: 200,
    };
  }

  async verifyByPhone(data: VerifyByPhone) {
    const newUser: DeepPartial<User> = await this.userService.create(data);
    const token: string = await this.jwtService.generateToken({
      sub: newUser.id as number,
      role: Roles.USER,
    });

    return {
      status: 201,
      token,
    };
  }

  async registerByEmail({ email }: RegisterByEmail) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) return { status: 409, message: 'Conflict error !' };

    const { hashedOtp, otp } = await this.otpService.generateAndSend();

    return {
      otp,
      hashedOtp,
      status: 200,
    };
  }
}
