export type OrderItem = {
    order_items_id: string;
    order_id: string;
    isbn: string;
    quantity: number;
    price: number
    books?: {
      title: string;
      bookImageUrl: string;
      description: string;
      authors: {
        firstName: string;
        lastName: string;
      };
    };
  };
  
  type Order = {
    order_id: string;
    created_at: string;
    user_id: string;
    delivery_options: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    province: string;
    country: string
    postalCode: string;
    notes: string
    status: string;
    total: number;
    order_items: OrderItem[];
  };
  
  export type OrdersItems = Order[]

  