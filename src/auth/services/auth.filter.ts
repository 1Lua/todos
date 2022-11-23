import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

export class AuthException extends HttpException {
    private _message: string

    constructor (message: string) {
        super(message, HttpStatus.FORBIDDEN)
    }
}

@Catch(AuthException)
export class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: AuthException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const message = exception.getResponse()

        response
            .status(status)
            .json({
                status,
                message
            })
    }
} 