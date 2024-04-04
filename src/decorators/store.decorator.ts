import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const Store = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request)
    if (request.tokenPayload) {
      if (filter) {
        return request.tokenPayload.storeId;
      } else {
        return request.tokenPayload.storeId;
      }
    } else {
      throw new NotFoundException('Loja não encontrada no request');
    }

  },
);
