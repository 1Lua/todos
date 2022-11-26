
export interface UpdateTodoDto {
    title: string
    content: string
    createdAt: number
    completedAt?: number
    deletedAt?: number
}
