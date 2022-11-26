import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtService } from "./services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        @Inject(JwtService)
        private readonly _jwtService: JwtService
    ) {}

    /**
     * Данный метод проверяет токен авторизации у контекста запроса
     * При успешной проверке помещает userId в тело запроса req
     * 
     * @param context 
     * @returns 
     */

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request & {userId?:string}
        const {authorization} = request.headers
        if(!authorization) {
            return false
        }
        const payload = await this._jwtService.decodeJWT(authorization)
        const id = payload.sub

        request.userId = id
        return true
    }
}