import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc, updateDoc, deleteDoc, getDoc, collectionData } from '@angular/fire/firestore';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) { }

  addClient(client: Client) {
    const clientRef = collection(this.firestore, 'clients');
    return addDoc(clientRef, client);
  }

  updateClient(clientId: string, client: Partial<Client>) {
    const clientDocRef = doc(this.firestore, 'clients', clientId);
    return updateDoc(clientDocRef, client);
  }

  deleteClient(clientId: string) {
    const clientDocRef = doc(this.firestore, 'clients', clientId);
    return deleteDoc(clientDocRef);
  }

  getClient(clientId: string) {
    const clientDocRef = doc(this.firestore, 'clients', clientId);
    return getDoc(clientDocRef);
  }

  getClients(): Observable<Client[]> {
    const clientDocRef = collection(this.firestore, 'clients');
    return collectionData(clientDocRef, {idField: 'id'}) as Observable<Client[]>;
  }
}