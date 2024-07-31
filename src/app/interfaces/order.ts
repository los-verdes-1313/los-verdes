// src/app/interfaces/order.ts

export interface OrderItem {
  productId: string;
  name: string;
  unit: string;
  quantity: number;
  priceAtOrder: number;
}

export interface CustomerOrder {
  id?: string;
  clientName: string;
  items: OrderItem[];
  totalAmount: number;
  totalPrice: number;
  date: Date;
}

export interface PurchaseOrder {
  id?: string;
  customerOrders: CustomerOrder[];
  totalAmount: number;
  totalPrice: number;
  date: Date;
}

export interface ConsolidatedProduct {
  productId: string;
  name: string;
  unit: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

export interface TotalizedPurchaseOrder {
  id?: string;
  consolidatedProducts: ConsolidatedProduct[];
  totalAmount: number;
  totalPrice: number;
  date: Date;
}

export interface PurchaseOrderWithTotals {
  original: PurchaseOrder;
  totalized: TotalizedPurchaseOrder;
}