//saving it in the database
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

export type UserInfo = {
    id: string;
    updated_at: string | null;
    username: string | null;
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
    role: number | null;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    street: string | null;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    country: string | null;
  };
  
  export type UserInfoList = UserInfo[];
  
