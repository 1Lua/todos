export interface TodoDto {
    _id: string
    title: string
    content: string
    createdAt: number
    completedAt?: number
    deletedAt?: number
}
