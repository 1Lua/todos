import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { User } from "../../users/schemas/user.schema"

@Schema()
export class Todo extends Document {
    @Prop({type: String})
    title: string

    @Prop({type: String})
    content: string

    @Prop({type: Number})
    createdAt: number

    @Prop({type: Number})
    completedAt: number

    @Prop({type: Number})
    deletedAt: number

    @Prop({type: Types.ObjectId, ref: User.name})
    user: User
}

export const TodoSchema = SchemaFactory.createForClass(Todo)