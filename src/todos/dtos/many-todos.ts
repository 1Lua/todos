import { TodoDto } from "./todo.dto";

export interface ManyTodos {
    result: TodoDto[],
    from: number
    count: number
    total: number
}