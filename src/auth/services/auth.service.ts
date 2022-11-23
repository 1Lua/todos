import { Inject, Injectable } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import { UsersService } from "../../users/user.service";
import { SignInDto } from "../dtos/sigh-in.dto";
import { SignUpDto } from "../dtos/sign-up.dto";
import { Token } from "../dtos/token.dto";
import { AuthException } from "./auth.filter";
import { JwtService } from "./jwt.service";
import { PasswordsService } from "./passwords.service";


@Injectable()
export class AuthService {

    constructor (
        @Inject(JwtService)
        private readonly _jwtService: JwtService,
        @Inject(PasswordsService)
        private readonly _passwordsService: PasswordsService,
        @Inject(UsersService)
        private readonly _usersService: UsersService,
    ) {}

    async signIn(signInDto: SignInDto): Promise<Token> {
        const {email, password} = signInDto
        const user = await this._usersService.getUserByEmail(email)
        if(!user) {
            throw new AuthException("Incorrect email")
        }
        const hashedPassword = user.password
        const result = await this._passwordsService.comparePassword(password, hashedPassword)

        if(!result) {
            throw new AuthException("Incorrect password")
        }

        const payload: JwtPayload = {
            sub: user._id
        }

        const token = await this._jwtService.createJWT(payload)
        return token
    }

    async signUp(sighUpDto: SignUpDto): Promise<void> {
        const hashedPassword = await this._passwordsService.hashPassword(sighUpDto.password)
        sighUpDto.password = hashedPassword
        try {
            await this._usersService.createUser(sighUpDto)
        } catch (err) {
            throw new AuthException(err.message)
        }
    }
}