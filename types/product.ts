export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryID: string; // ID of the category the product belongs to
    createdAt: Date;
    updatedAt: Date;
    stock: number;
    images?: string[]; // Array of image URLs
    tags?: string[]; // Array of tags for the product
    isActive: boolean;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    weight?: number; // Weight of the product
    manufacturer?: string; // Manufacturer of the product
}