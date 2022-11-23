import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordsService {
    
    async hashPassword(password: string): Promise<string> {
        const ROUND = 12
        const salt = await bcrypt.genSalt(ROUND)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}