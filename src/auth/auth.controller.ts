import { Body, Controller, HttpStatus, Inject, Post, Res, UseFilters } from "@nestjs/common";
import { Response } from "express";
import { SignInDto } from "./dtos/sigh-in.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import { Token } from "./dtos/token.dto";
import { AuthExceptionFilter } from "./services/auth.filter";
import { AuthService } from "./services/auth.service";

@Controller()
export class AuthController {

    constructor (
        @Inject(AuthService)
        private readonly _authService: AuthService
    ) {}
    
    @Post("sighin")
    @UseFilters(AuthExceptionFilter)
    async signIn(@Body() signInDto: SignInDto): Promise<Token> {
        return await this._authService.signIn(signInDto)
    }

    @Post("sighup")
    @UseFilters(AuthExceptionFilter)
    async signUp(@Body() sighUpDto: SignUpDto, @Res() res: Response): Promise<void> {
        await this._authService.signUp(sighUpDto)
        res.status(HttpStatus.OK)
        res.send("ok")
    }
}