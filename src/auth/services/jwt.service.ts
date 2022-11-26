import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Algorithm, JwtPayload, SignOptions, sign, verify, decode} from "jsonwebtoken"
import {v4 as uuid} from "uuid"
import * as fs from "fs"

import { Token } from "../dtos/token.dto";
import { AuthException } from "../auth.filter";

const DEFAULT_TOKEN_TTL = 3600
const DEFAULT_ALGORITHM = "RS256"
const DEFAULT_TOKEN_TYPE = "Bearer"

@Injectable()
export class JwtService {
    private _tokenTTL: number
    private _jwtOption: SignOptions
    private _alg: Algorithm
    private _tokenType: string
    private _jwtPrivateKey: Buffer
    private _jwtPublicKey: Buffer

    constructor(private readonly _configService: ConfigService) {
        this._tokenTTL = this._configService.get<number>('TOKEN_TTL', DEFAULT_TOKEN_TTL)
        this._alg = this._configService.get<Algorithm>('ALGORITHM', DEFAULT_ALGORITHM)
        this._tokenType = this._configService.get<string>('TOKEN_TYPE',DEFAULT_TOKEN_TYPE)
        this._jwtOption = {
            algorithm: this._alg,
            expiresIn: Number(this._tokenTTL),
            keyid: 'main',
        }
        this._jwtPrivateKey = fs.readFileSync(`${process.cwd()}/assets/private.key`)
        this._jwtPublicKey = fs.readFileSync(`${process.cwd()}/assets/public.key`)
    }
    
    async createJWT(jwtPayload: JwtPayload): Promise<Token> {
        const options = this._jwtOption
        options.jwtid = uuid()
        const token = sign(jwtPayload, this._jwtPrivateKey, options)
        return {
            token,
            expiresIn: this._tokenTTL,
            type: this._tokenType,
        } as Token
    }

    async decodeJWT(token: string): Promise<JwtPayload> {
        try {
            verify(token, this._jwtPublicKey, { algorithms: [this._alg] })
        } catch (err) {
            throw new AuthException('Token didnt verified')
        }

        const parsedToken = decode(token, { json: true })

        if (parsedToken == null) {
            throw new AuthException('Token didnt parsed')
        }
        return parsedToken
    }

}