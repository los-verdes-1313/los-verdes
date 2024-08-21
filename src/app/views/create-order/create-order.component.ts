import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { Client } from '../../interfaces/client';
import { CustomerOrder, OrderItem, PurchaseOrder } from '../../interfaces/order';
import { Product } from '../../interfaces/product';
import { ClientService } from '../../services/client.service';
import { CustomerOrderService } from '../../services/customer-order.service';
import { ProductService } from '../../services/product.service';
import { PurchaseOrderService } from '../../services/purchase-order.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {
  clients: Client[] = [];
  products: Product[] = [];
  customerOrders: CustomerOrder[] = [];
  currentCustomerOrder: CustomerOrder | null = null;
  orderForm: FormGroup;
  selectedProduct: Product | null = null;
  windowWidth: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private customerOrderService: CustomerOrderService,
    private purchaseOrderService: PurchaseOrderService,
    private toastr: ToastrService
  ) {
    this.orderForm = this.fb.group({
      clientId: ['', Validators.required],  // Cambiado de clientName a clientId
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.windowWidth = window.innerWidth;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  isDesktop(): boolean {
    return this.windowWidth >= 768; // Consideramos desktop a partir de 768px
  }

  ngOnInit() {
    this.loadClients();
    this.loadProducts();
    this.initializeCustomerOrder();

    this.orderForm.get('clientId')?.valueChanges.subscribe(clientId => {
      if (this.currentCustomerOrder) {
        const selectedClient = this.clients.find(c => c.id === clientId);
        this.currentCustomerOrder.clientName = selectedClient ? selectedClient.name : '';
      }
    });

    this.orderForm.get('productId')?.valueChanges.subscribe(productId => {
      this.selectedProduct = this.products.find(p => p.id === productId) || null;
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe(
      (clients) => this.clients = clients,
      (error) => this.toastr.error('Error al cargar los clientes', 'Error')
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => this.products = products,
      (error) => this.toastr.error('Error al cargar los productos', 'Error')
    );
  }

  initializeCustomerOrder() {
    this.currentCustomerOrder = {
      clientName: this.orderForm.get('clientName')?.value || '',
      items: [],
      totalAmount: 0,
      totalPrice: 0,
      date: new Date()
    };
  }

  addProductToOrder() {
    if (this.orderForm.valid && this.currentCustomerOrder && this.selectedProduct) {
      const formValue = this.orderForm.value;
      const orderItem: OrderItem = {
        productId: this.selectedProduct.id!,
        name: this.selectedProduct.name,
        unit: this.selectedProduct.unit,
        quantity: formValue.quantity,
        priceAtOrder: this.selectedProduct.price
      };

      this.currentCustomerOrder.items.push(orderItem);
      this.currentCustomerOrder.totalAmount += orderItem.quantity;
      this.currentCustomerOrder.totalPrice += orderItem.quantity * orderItem.priceAtOrder;

      this.orderForm.patchValue({ productId: null, quantity: 1 });
      this.selectedProduct = null;
      this.toastr.success('Producto agregado al pedido', 'Éxito');
    } else {
      this.toastr.error('Por favor, complete todos los campos correctamente', 'Error');
    }
  }

  closeCustomerOrder() {
    if (this.currentCustomerOrder && this.currentCustomerOrder.items.length > 0) {
      this.customerOrderService.addCustomerOrder(this.currentCustomerOrder)
        .then(() => {
          this.customerOrders.push(this.currentCustomerOrder!);
          this.toastr.success('Pedido creado con éxito', 'Éxito');
          this.initializeCustomerOrder();
          this.orderForm.patchValue({ clientId: '', productId: null, quantity: 1 });
          this.selectedProduct = null;
        })
        .catch((error) => this.toastr.error('Error al crear el pedido', 'Error'));
    }
  }

  createPurchaseOrder() {
    if (this.customerOrders.length > 0) {
      const purchaseOrder: PurchaseOrder = {
        customerOrders: this.customerOrders,
        totalAmount: this.customerOrders.reduce((sum, order) => sum + order.totalAmount, 0),
        totalPrice: this.customerOrders.reduce((sum, order) => sum + order.totalPrice, 0),
        date: new Date()
      };

      this.purchaseOrderService.addPurchaseOrder(purchaseOrder)
        .then(() => {
          this.toastr.success('Orden de compra creada con éxito', 'Éxito');
          this.customerOrders = [];
        })
        .catch((error) => this.toastr.error('Error al crear la orden de compra', 'Error'));
    }
  }


  getProductDetails(productId: string): Product | undefined {
    return this.products.find(p => p.id === productId);
  }
}