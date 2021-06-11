import {IStore} from "./IStore";

export interface IReview {
    author: {
        avatar: string,
        id: string,
        username: string
    },
    _id: string,
    rating: number,
    text: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    store: string | IStore
}

