export interface IComment {
    _id: string,
    createdAt: string,
    updatedAt: string,
    rating: number,
    text: string,
    author: {
        avatar: string,
        id: string,
        username: string
    }
}
