import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, getDoc, DocumentData, addDoc, deleteDoc, updateDoc, orderBy, query } from '@angular/fire/firestore';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { PurchaseOrder, CustomerOrder, ConsolidatedProduct, PurchaseOrderWithTotals, TotalizedPurchaseOrder } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private firestore: Firestore
  ) { }

  addPurchaseOrder(order: PurchaseOrder) {
    const orderRef = collection(this.firestore, 'purchaseOrders');
    return addDoc(orderRef, order);
  }

  updatePurchaseOrder(orderId: string, order: Partial<PurchaseOrder>) {
    const orderDocRef = doc(this.firestore, 'purchaseOrders', orderId);
    return updateDoc(orderDocRef, order);
  }

  deletePurchaseOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'purchaseOrders', orderId);
    return deleteDoc(orderDocRef);
  }

  getPurchaseOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'purchaseOrders', orderId);
    return getDoc(orderDocRef);
  }
  
  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    const purchaseOrdersRef = collection(this.firestore, 'purchaseOrders');
    const sortedQuery = query(purchaseOrdersRef, orderBy('date', 'desc'));
    return collectionData(sortedQuery, {idField: 'id'}) as Observable<PurchaseOrder[]>;
  }

  createTotalizedPurchaseOrder(purchaseOrder: PurchaseOrder): TotalizedPurchaseOrder {
    const consolidatedProducts = this.consolidateProducts(purchaseOrder.customerOrders);
    
    return {
      id: purchaseOrder.id,
      consolidatedProducts,
      totalAmount: purchaseOrder.totalAmount,
      totalPrice: purchaseOrder.totalPrice,
      date: purchaseOrder.date
    };
  }

  private consolidateProducts(customerOrders: CustomerOrder[]): ConsolidatedProduct[] {
    const productMap: { [key: string]: ConsolidatedProduct } = {};
    console.log("customer orders wacho")
    customerOrders.forEach(order => {
      order.items.forEach(item => {

        if (productMap[item.productId]) {
          productMap[item.productId].quantity += item.quantity;
          productMap[item.productId].totalPrice += item.quantity * item.priceAtOrder;
        } else {
          productMap[item.productId] = {
            productId: item.productId,
            name: item.name,
            unit: item.unit,  // Aquí podrías buscar el nombre real del producto si lo necesitas
            quantity: item.quantity,
            totalPrice: item.quantity * item.priceAtOrder,
            unitPrice: item.priceAtOrder
          };
        }
      });
    });

    return Object.values(productMap);
  }
}

