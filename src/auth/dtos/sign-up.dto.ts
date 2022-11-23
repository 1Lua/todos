import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class SignUpDto {
    @IsEmail()
    email: string
    
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string
}