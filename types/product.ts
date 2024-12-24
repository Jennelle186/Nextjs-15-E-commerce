export interface Product {
    id: string;
    productName: string;
    productDescription: string;
    price: number;
    categoryID: string; // ID of the category the product belongs to
    createdAt: Date;
    updatedAt: Date;
    stock: number;
    images?: string[]; // Array of image URLs
    isActive: boolean;
}