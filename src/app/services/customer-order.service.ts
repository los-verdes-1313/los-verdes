import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { CustomerOrder } from '../interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private firestore: Firestore) { }

  addCustomerOrder(order: CustomerOrder) {
    const orderRef = collection(this.firestore, 'customerOrders');
    return addDoc(orderRef, order);
  }

  updateCustomerOrder(orderId: string, order: Partial<CustomerOrder>) {
    const orderDocRef = doc(this.firestore, 'customerOrders', orderId);
    return updateDoc(orderDocRef, order);
  }

  deleteCustomerOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'customerOrders', orderId);
    return deleteDoc(orderDocRef);
  }

  getCustomerOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'customerOrders', orderId);
    return getDoc(orderDocRef);
  }
}