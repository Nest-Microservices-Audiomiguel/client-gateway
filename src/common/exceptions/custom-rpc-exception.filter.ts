import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRcpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    console.log('rpcError', rpcError);

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
    // return throwError(() => exception.getError());
  }
}
