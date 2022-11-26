import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { ManyTodos } from "./dtos/many-todos";
import { TodoDto } from "./dtos/todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { Todo } from "./schemas/todo.schema";

/**
 * Данный сервис отвечает за работу с сущностью Todo
 */

@Injectable()
export class TodosService {

    constructor(
        @InjectModel(Todo.name)
        private readonly _todosModel: Model<Todo>,
    ) {}

    /**
     * 
     * Создание и сохранение сущности Todo
     * Также добавляется createdAt - время создания сущности
     * 
     * @param createTodoDto 
     * @param userId id пользователя
     * @returns 
     */

    async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<TodoDto> {
        const todo = await this._todosModel.create({
            ...createTodoDto,
            user: userId,
            createdAt: Date.now()
        })
        await todo.save()
        return todo
    }

    /**
     * Получение всех Todo пользователя, сортировка по убыванию времени создания
     * 
     * @param userId 
     * @returns 
     */

    async getAllTodos(userId: string): Promise<TodoDto[]> {
        const todos = await this._todosModel
            .find({user: userId, deletedAt: null})
            .sort("-createdAt")
        return todos
    }

    /**
     * Получение части из всего объема Todo пользователя.
     * Максимальное количество возвращаемых экземпляров - 50 ед. 
     * 
     * 
     * @param userId id пользователя
     * @param skip указывает сколько экземпляров необходимо пропустить
     * @returns 
     */

    async getManyTodos(userId: string, skip = 0): Promise<ManyTodos> {

        const limit = 50
        
        const todos = await this._todosModel
            .find({user: userId, deletedAt: null})
            .sort("-createdAt")
            .limit(limit)
            .skip(skip)

        const count = await this._todosModel
            .find({user: userId, deletedAt: null})
            .count()
        
        return {
            result: todos,
            from: skip,
            count: todos.length,
            total: count
        } as ManyTodos
    }

    /**
     * Данный метод возвращает Todo по его id в случае, если userId совпадает с владельцем (поле user в Todo)
     * 
     * @param id
     * @param userId id пользователя
     * @returns 
     */

    async getTodo(id: string, userId: string):Promise<TodoDto> {
        const todo = await this._todosModel.findOne({
            id,
            user: userId
        })
        return todo
    }

    /**
     * Данный метод обновляет экземпляр Todo
     * 
     * 
     * @param id 
     * @param updateTodoDto 
     * @param userId id пользователя
     */

    async updateTodo(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<void> {
        const todo = await this._todosModel.findOneAndUpdate(
            { id, user: userId },
            { $set: updateTodoDto }
        )
    }


    /**
     * Данный метод мягко удаляет экземпляр Todo
     * полю DeletedAt устанавливается значение текущего времени
     * 
     * @param id 
     * @param userId id пользователя 
     */

    async deleteTodo(id: string, userId: string): Promise<void> {
        await this._todosModel.findOneAndUpdate(
            {id, user: userId}, 
            {
                $set: { deletedAt: Date.now()}
            }
        )
    }


}