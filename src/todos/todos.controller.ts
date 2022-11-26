import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from "@nestjs/common";
import { query, Request } from "express";
import { AuthExceptionFilter } from "../auth/auth.filter";
import { AuthGuard } from "../auth/auth.guard";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { ManyTodos } from "./dtos/many-todos";
import { TodoDto } from "./dtos/todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { TodosService } from "./todos.service";


@Controller("todo")
export class TodosController {
    
    constructor(
        @Inject(TodosService)
        private readonly _todosService: TodosService
    ) {}

    @Post()
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async createTodo(
        @Body() createTodoDto: CreateTodoDto, 
        @Req() req: Request & {userId: string}
    ): Promise<TodoDto> {
        return await this._todosService.createTodo(createTodoDto, req.userId)
    }

    @Get("all")
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async getAllTodos(
        @Param("id") id: string,
        @Req() req: Request & {userId: string}
    ): Promise<TodoDto[]> {
        return await this._todosService.getAllTodos(req.userId)
    }

    @Get("many")
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async getManyTodos(
        @Query("from") from: number,
        @Req() req: Request & {userId: string}
    ): Promise<ManyTodos> {
        return await this._todosService.getManyTodos(req.userId, from)
    }

    @Get(":id")
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async getTodo(
        @Param("id") id: string,
        @Req() req: Request & {userId: string}
    ): Promise<TodoDto> {
        return await this._todosService.getTodo(id, req.userId)
    }

    @Patch(":id")
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async updateTodo(
        @Param("id") id: string,
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req: Request & {userId: string}
    ): Promise<void> {
        await this._todosService.updateTodo(id, updateTodoDto,req.userId)
    }

    @Delete(":id")
    @UseFilters(AuthExceptionFilter)
    @UseGuards(AuthGuard)
    async deleteTodo(
        @Param("id") id: string,
        @Req() req: Request & {userId: string}
    ): Promise<void> {
        await this._todosService.deleteTodo(id, req.userId)
    }
}