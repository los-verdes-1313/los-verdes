import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { PurchaseOrder } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private firestore: Firestore) { }

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
}