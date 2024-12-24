export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    role: 'user' | 'admin';
    isActive: boolean;
    orders?: string[]; // Array of order IDs
    phoneNumber?: string;
}