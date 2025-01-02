export interface User {
    id: string;
    fullName: string;
    email: string;
    username:string;
    updated_at: Date;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    phoneNumber?: string;
}