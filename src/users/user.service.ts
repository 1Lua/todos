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

    async getUser(id: string): Promise<UserDto> {
        const user = await this._userModel.findById(id)
        return user
    }

    async getUserByEmail(email: string): Promise<UserDto> {
        const user = await this._userModel.findOne({email})
        return user
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        if( await this.getUserByEmail(createUserDto.email)) {
            throw new Error("Email is alredy used")
        }

        const user = await this._userModel.create(createUserDto)
        await user.save()
    }
}