import { applyDecorators, Type } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

interface FilterOption {
  field?: string;
  example?: string;
  type?: Type;
  enum?: SwaggerEnumType;
}
interface SortOption {
  example: string;
}

interface PaginateOptionsInput {
  filterOptions?: FilterOption[];
  sortOptions?: SortOption[];
}

export function PaginationOptions(options: PaginateOptionsInput) {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'search', required: false, type: String }),

    ...(options.filterOptions ?? []).map((object) =>
      ApiQuery({
        name: `${object.field}`,
        example: object.example,
        required: false,
        type: String,
        enum: object.enum,
        description: `Filter by ${object.field} using operators like $eq, $gte, etc.`,
      }),
    ),
    ApiQuery({
      name: 'sortBy',
      required: false,
      isArray: true,
      type: String,
      style: 'form',
      explode: true,
      example: (options.sortOptions ?? []).map(({ example }) => example),
    }),
  );
}
