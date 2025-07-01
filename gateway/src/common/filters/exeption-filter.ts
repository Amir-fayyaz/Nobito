import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export function exeptionFilter(status: number) {
  switch (status) {
    //404
    case (status = HttpStatus.NOT_FOUND):
      throw new NotFoundException();
    //400
    case (status = HttpStatus.BAD_REQUEST):
      throw new BadRequestException();
    //500
    case (status = HttpStatus.INTERNAL_SERVER_ERROR):
      throw new InternalServerErrorException();
    //409
    case (status = HttpStatus.CONFLICT):
      throw new ConflictException();
    //429
    case (status = HttpStatus.TOO_MANY_REQUESTS):
      throw new HttpException('Too many request', HttpStatus.TOO_MANY_REQUESTS);
    // 403
    case (status = HttpStatus.FORBIDDEN):
      throw new ForbiddenException();

    case (status = 503):
      throw new HttpException('Server is updating', 503);
  }
}
