import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserDto } from "./dtos/user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    
    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>
    ) {}

    /**
     * Получение пользователя по id
     * @param id 
     * @returns 
     */

    async getUser(id: string): Promise<UserDto> {
        const user = await this._userModel.findById(id)
        return user
    }

    /**
     * Получение пользователя по email
     * @param email 
     * @returns 
     */

    async getUserByEmail(email: string): Promise<UserDto> {
        const user = await this._userModel.findOne({email})
        return user
    }


    /**
     * Создание пользователя.
     * При создании происходит проверка не занят ли указанный email
     * @param createUserDto 
     */

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        if( await this.getUserByEmail(createUserDto.email)) {
            throw new Error("Email is alredy used")
        }

        const user = await this._userModel.create(createUserDto)
        await user.save()
    }
}