import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";

import { Todo, TodoSchema } from "./schemas/todo.schema";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Todo.name, schema: TodoSchema}
        ]),
        AuthModule,
    ],
    providers: [
        TodosService
    ],
    controllers: [
        TodosController
    ],
    exports: [
        TodosService
    ]
})
export class TodosModule {}