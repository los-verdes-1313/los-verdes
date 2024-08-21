import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnInit{

  productForm: FormGroup; 


  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  private productsSubscription: Subscription | undefined;
  editingProduct: Product | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) 
  {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  loadProducts() {
    this.productsSubscription = this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.applyFilter();
      },
      (e) => {
        this.toastr.error(e, 'Error');
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.getRawValue() as unknown as Product;
      this.productService.addProduct(newProduct)
        .then(() => {
          this.toastr.success('Producto agregado exitosamente', 'Éxito');
          this.productForm.reset();
          this.loadProducts();
        })
        .catch(() => {
          this.toastr.error('Error al agregar el producto', 'Error');
        });
    }
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId)
    .then(() => {
      this.toastr.success('Producto eliminado exitosamente', 'Éxito');
      this.loadProducts();
    })
    .catch(() => {
      this.toastr.error('Error al eliminar el producto', 'Error');
    });
  }

  startEditing(product: Product) {
    this.editingProduct = { ...product };
  }

  saveEdit(product: Product) {
    if (product.id) {
      this.productService.updateProduct(product.id, product)
        .then(() => {
          this.toastr.success('Producto actualizado exitosamente', 'Éxito');
          this.editingProduct = null;
          this.loadProducts();
        })
        .catch(error => {
          this.toastr.error('Error al actualizar el producto', 'Error');
        });
    }
  }

  cancelEdit() {
    this.editingProduct = null;
  }


  applyFilter() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}