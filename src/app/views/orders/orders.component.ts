import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrder, TotalizedPurchaseOrder, ConsolidatedProduct, CustomerOrder } from '../../interfaces/order';
import * as ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  selectedPurchaseOrder: PurchaseOrder | null = null;
  selectedTotalizedOrder: TotalizedPurchaseOrder | null = null;
  isEditing: boolean = false;
  showConsolidatedTab: boolean = true;  // Nueva propiedad para controlar las pestañas

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadPurchaseOrders();
  }

  loadPurchaseOrders() {
    this.purchaseOrderService.getPurchaseOrders().subscribe(
      orders => {
        this.purchaseOrders = orders;
        console.log('Órdenes de compra cargadas:', this.purchaseOrders);
      },
      error => {
        console.error('Error al cargar las órdenes de compra:', error);
        this.toastr.error('Error al cargar las órdenes de compra', 'Error');
      }
    );
  }

  viewPurchaseOrderDetails(order: PurchaseOrder) {
    this.selectedPurchaseOrder = order;
    this.selectedTotalizedOrder = this.purchaseOrderService.createTotalizedPurchaseOrder(order);
    this.isEditing = false;
    this.showConsolidatedTab = true;  // Mostrar la pestaña consolidada por defecto
    console.log('Orden seleccionada:', this.selectedPurchaseOrder);
    console.log('Orden totalizada:', this.selectedTotalizedOrder);
    
    if (!this.selectedPurchaseOrder.customerOrders || this.selectedPurchaseOrder.customerOrders.length === 0) {
      console.warn('No se encontraron pedidos individuales para esta orden de compra.');
    } else {
      console.log('Pedidos individuales:', this.selectedPurchaseOrder.customerOrders);
    }
  }

  switchTab(showConsolidated: boolean) {
    this.showConsolidatedTab = showConsolidated;
  }

  convertTimestampToDate(timestamp: any): Date {
    if (!timestamp) {
      return new Date();
    }
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    return new Date(milliseconds);
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.selectedPurchaseOrder) {
      this.viewPurchaseOrderDetails(this.selectedPurchaseOrder);
    }
  }

  updateQuantity(product: ConsolidatedProduct, newQuantity: number) {
    if (this.selectedTotalizedOrder && this.isEditing) {
      product.quantity = newQuantity;
      product.totalPrice = product.unitPrice * newQuantity;
      this.updateOrderTotals();
    }
  }

  updateOrderTotals() {
    if (this.selectedTotalizedOrder) {
      this.selectedTotalizedOrder.totalAmount = 0;
      this.selectedTotalizedOrder.totalPrice = 0;
      for (const product of this.selectedTotalizedOrder.consolidatedProducts) {
        this.selectedTotalizedOrder.totalAmount += product.quantity;
        this.selectedTotalizedOrder.totalPrice += product.totalPrice;
      }
    }
  }

  saveChanges() {
    if (this.selectedTotalizedOrder) {
      console.log('Guardando cambios:', this.selectedTotalizedOrder);
      // Aquí iría la lógica para guardar los cambios en la base de datos
      this.toastr.success('Cambios guardados exitosamente', 'Éxito');
      this.isEditing = false;
    }
  }

  async generateExcel() {
    if (this.selectedTotalizedOrder) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Orden de Compra');

      // Añadir título y fecha
      worksheet.addRow(['Orden de Compra']);
      worksheet.addRow(['Fecha:', this.formatDate(this.selectedTotalizedOrder.date)]);
      worksheet.addRow([]);  // Fila vacía para separación

      // Añadir encabezados
      worksheet.addRow(['Producto', 'Cantidad', 'Unidad', 'Precio Unitario', 'Subtotal']);

      // Añadir datos
      this.selectedTotalizedOrder.consolidatedProducts.forEach(product => {
        worksheet.addRow([
          product.name,
          product.quantity,
          product.unit,
          product.unitPrice,
          product.totalPrice
        ]);
      });

      // Añadir total
      worksheet.addRow([]);  // Fila vacía para separación
      worksheet.addRow(['Total', '', '', '', this.selectedTotalizedOrder.totalPrice]);

      // Aplicar algunos estilos básicos
      worksheet.getColumn(1).width = 30;  // Ajustar ancho de la columna de productos
      worksheet.getRow(1).font = { bold: true, size: 16 };  // Estilo para el título
      worksheet.getRow(4).font = { bold: true };  // Estilo para los encabezados

      // Generar el archivo
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Orden_${this.selectedTotalizedOrder.id}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      this.toastr.success('Archivo Excel generado con éxito', 'Éxito');
    }
  }

  generatePDF() {
    if (this.selectedTotalizedOrder) {
      const doc = new jsPDF();
      
      // Configurar fuente y tamaño
      doc.setFont("helvetica");
      doc.setFontSize(18);
      
      // Título
      doc.text("Orden de Compra", 14, 20);
      
      // Información de la orden
      doc.setFontSize(12);
      doc.text(`Orden #: ${this.selectedTotalizedOrder.id}`, 14, 30);
      doc.text(`Fecha: ${this.formatDate(this.selectedTotalizedOrder.date)}`, 14, 38);
      
      // Crear la tabla de productos
      const tableColumn = ["Producto", "Cantidad", "Unidad", "Precio Unitario", "Subtotal"];
      const tableRows = this.selectedTotalizedOrder.consolidatedProducts.map(product => [
        product.name,
        product.quantity,
        product.unit,
        product.unitPrice.toFixed(2),
        product.totalPrice.toFixed(2)
      ]);
      
      // Añadir la tabla al documento
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 1.5, overflow: 'linebreak' },
        columnStyles: { 0: { cellWidth: 60 } }  // Dar más espacio a la columna de productos
      });
      
      // Añadir el total
      const finalY = (doc as any).lastAutoTable.finalY || 45;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Total: $${this.selectedTotalizedOrder.totalPrice.toFixed(2)}`, 14, finalY + 10);
      
      // Guardar el PDF
      doc.save(`Orden_${this.selectedTotalizedOrder.id}.pdf`);
      
      this.toastr.success('Archivo PDF generado con éxito', 'Éxito');
    }
  }
  
  // Función auxiliar para formatear la fecha
  private formatDate(date: Date | any): string {
    if (date && date.toDate) {
      date = date.toDate();
    }
    if (date instanceof Date) {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return 'Fecha no disponible';
  }
}