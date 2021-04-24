export interface IStore {
    address: string,
    city: string,
    comments: string[],
    createdAt: Date,
    descriptionHTML: string,
    descriptionText: string ,
    followers: string[],
    imageLarge: string[],
    imageSmall: string[],
    location: {type: string[], coordinates: number[], formattedAddress: string},
    name: string,
    owners: string[],
    rating: number
    region: string,
    reviews: string[],
    tags: string[],
    updatedAt: Date,
    __v: number,
    _id: string
 }