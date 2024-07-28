export interface OrderItem {
    productId: string;
    quantity: number;
    priceAtOrder: number;
}
  
  // src/app/shared/models/customer-order.model.ts
export interface CustomerOrder {
    id?: string;
    clientId: string;
    items: OrderItem[];
    totalAmount: number;
    totalPrice: number;
    date: Date;
}
  
  // src/app/shared/models/purchase-order.model.ts
export interface PurchaseOrder {
    id?: string;
    customerOrders: CustomerOrder[]; // Array of CustomerOrder IDs
    totalAmount: number;
    totalPrice: number;
    date: Date;
}