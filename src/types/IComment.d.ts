export type IComment = {
    _id: string,
    createdAt:Date,
    rating: number,
    text:string,
    __v:number,
    author: {
        avatar: string,
        id: string,
        username: string
    }
}
