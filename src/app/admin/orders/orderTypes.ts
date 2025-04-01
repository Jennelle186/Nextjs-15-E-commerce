// export type Order = {
//   order_id: string; // Unique identifier for the order
//   created_at: string; // ISO date string
//   user_id: string; // User ID associated with the order
//   delivery_options: string; // Delivery method (e.g., "cod")
//   firstName: string; // Customer's first name
//   middleName?: string; // Customer's middle name (optional)
//   lastName: string; // Customer's last name
//   email: string; // Customer's email address
//   phoneNumber: string; // Customer's phone number
//   street: string; // Street address
//   city: string; // City
//   province: string; // Province
//   country: string; // Country
//   postalCode: string; // Postal code
//   notes?: string | null; // Notes for the order (optional or null)
//   status: string; // Current status of the order (e.g., "shipped")
//   total: number; // Total amount for the order
// };

export type OrderItem = {
  order_items_id: string;
  order_id: string;
  isbn: string;
  quantity: number;
  price: number;
  books?: {
    title: string;
    bookImageUrl: string;
    description: string;
    genre: string;
    price: number;
    authors: {
      firstName: string;
      lastName: string;
    };
  };
};

export type Order = {
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
  country: string;
  postalCode: string;
  notes: string;
  status: "processing" | "shipped" | "delivered" | "cancelled"; // adjust as needed
  total: number;
  order_items: OrderItem[];
};

export type OrderListing = Order[]
