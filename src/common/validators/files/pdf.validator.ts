import { PdfAllowedMimeTypes } from '@common/constants/constant';
import { BadRequestException } from '@nestjs/common';

export const Max_Pdf_Size = 5 * 1024 * 1024;

const PdfFileValidator = (_: any, file: Express.Multer.File, cb: Function) => {
  if (PdfAllowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException('Invalid file type. Only PDF or Word allowed.'),
      false,
    );
  }
};

export const PdfValidator = {
  limits: {
    fileSize: Max_Pdf_Size,
  },
  fileFilter: PdfFileValidator,
};
