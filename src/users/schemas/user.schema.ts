import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ type: String})
    email: string

    @Prop({ type: String})
    name: string

    @Prop({ type: String})
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)