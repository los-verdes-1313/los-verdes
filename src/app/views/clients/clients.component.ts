import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, OnDestroy{
  clientForm: FormGroup;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  private clientsSubscription: Subscription | undefined;
  editingClient: Client | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadClients();
  }

  ngOnDestroy() {
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }

  loadClients() {
    this.clientsSubscription = this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
        this.applyFilter();
      },
      () => {
        this.toastr.error('Error al cargar los clientes', 'Error');
      }
    );
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const newClient: Client = this.clientForm.getRawValue() as unknown as Client;
      this.clientService.addClient(newClient)
        .then(() => {
          this.toastr.success('Cliente agregado exitosamente', 'Éxito');
          this.clientForm.reset();
          this.loadClients();
        })
        .catch(() => {
          this.toastr.error('Error al agregar el cliente', 'Error');
        });
    }
  }

  deleteClient(clientId: string) {
    this.clientService.deleteClient(clientId)
    .then(() => {
      this.toastr.success('Cliente eliminado exitosamente', 'Éxito');
      this.loadClients();
    })
    .catch(() => {
      this.toastr.error('Error al eliminar el cliente', 'Error');
    });
  }

  startEditing(client: Client) {
    this.editingClient = { ...client };
  }

  saveEdit(client: Client) {
    if (client.id) {
      this.clientService.updateClient(client.id, client)
        .then(() => {
          this.toastr.success('Cliente actualizado exitosamente', 'Éxito');
          this.editingClient = null;
          this.loadClients();
        })
        .catch(error => {
          this.toastr.error('Error al actualizar el cliente', 'Error');
        });
    }
  }

  cancelEdit() {
    this.editingClient = null;
  }

  applyFilter() {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
