export interface IStore {
    address: string,
    city: string,
    comments: string[],
    createdAt: string,
    descriptionHTML: string,
    descriptionText: string,
    followers?: string[],
    imageLarge?: string[],
    imageSmall?: string[],
    location: { type: string, coordinates: number[], geoHash: string },
    name: string,
    owners: string[],
    rating: number
    region: string,
    reviews: string[],
    tags: string[],
    updatedAt: string,
    __v: number,
    _id: string
}