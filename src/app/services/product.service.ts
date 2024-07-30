import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc, updateDoc, deleteDoc, getDoc, collectionData } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  updateProduct(productId: string, product: Partial<Product>) {
    const productRef = doc(this.firestore, 'products', productId);
    return updateDoc(productRef, product);
  }

  deleteProduct(productId: string) {
    const productRef = doc(this.firestore, 'products', productId);
    //POSIBLE FORMA DE HACERLO EN CASO DE Q ESTA NO FUNCIONE
    //const productRef = doc(this.firestore, `products/${productId}`);
    return deleteDoc(productRef);
  }

  getProduct(productId: string) {
    const productRef = doc(this.firestore, 'products', productId);
    return getDoc(productRef);
  }

  getProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, {idField: 'id'}) as Observable<Product[]>;
  }
}