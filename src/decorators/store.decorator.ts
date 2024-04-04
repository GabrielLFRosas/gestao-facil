import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const Store = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.tokenPayload) {
     
        return request.user;
    } else {
      throw new NotFoundException('Usuário não encontrado no request');
    }

  },
);
