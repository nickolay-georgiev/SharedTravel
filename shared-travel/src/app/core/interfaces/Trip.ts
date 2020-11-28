 export interface ITrip {
    id: string;
    city: string;
    country: string;
    creator?: string;
    description: string;
    duration: {
        startDate: Date;
        endDate: Date;
    };
    groupType: string;
    imgPath: string;
    members: Array<string>;
    groupSize: number;
}