import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Public = () => SetMetadata('isPublic', true);

export const UseLocalStrategy = () => {
  return applyDecorators(Public(), UseGuards(AuthGuard('local')));
};
