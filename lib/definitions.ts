//Author: Torjus A.M
export type Employee = {
    id: number;
    first_name: string;
    surname: string;
    isClockedIn?: boolean;
    shiftStart?: Date;
    shiftEnd?: Date;
    profilePictureUrl?: string;
}
