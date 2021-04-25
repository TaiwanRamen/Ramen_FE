import UserRole from '../enums/UserRole';
export type IUser = {
    id: string,
    avatar: string,
    isActivated: boolean,
    notifications: string[],
    fbName: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    followedStore: string[],
    userRole: UserRole
}


