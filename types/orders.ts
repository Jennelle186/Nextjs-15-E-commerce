export type OrderStatus = 
    | 'pending'
    | 'processing'
    | 'paid'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        country: string;
        postalCode: string;
    };
    paymentInfo?: {
        paymentId: string;
        method: string;
    };
}

export interface OrderHistory {
    userId: string;
    orders: Order[];
    totalOrders: number;
}