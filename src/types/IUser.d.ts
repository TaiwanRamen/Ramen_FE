import {UserRole} from '../enums/UserRole';
export interface IUser {
    avatar: string ,
    isVerified: boolean,
    userRole: UserRole,
    hasStore: any,
    notifications: any,
    followedStore: any,
    reviews: any,
    _id: string,
    fbUid: string,
    fbName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
// import UserRole from '../enums/UserRole';
// export type IUser = {
//     avatar?: string,
//     isVerified: boolean,
//     userRole: UserRole,
//     hasStore: string[],
//     notifications: string[],
//     followedStore: string[],
//     reviews: string[],
//     _id: string,
//     fbUid: string,
//     fbName: string,
//     email?: string,
//     createdAt: string,
//     updatedAt: string,
//     __v: number
// }



