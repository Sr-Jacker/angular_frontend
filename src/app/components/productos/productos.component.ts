import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductosService } from './productos.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  //lista de productos que se mostraran en la vista
  productos:Producto[];
  productoSeleccionado: Producto;

  constructor(private productoService:ProductosService, private modalService:ModalService) { }

  ngOnInit(): void {
    //llamamos la funcion getProductos para actualizar la lista de productos del componente
    this.productoService.getProductos().subscribe(productos =>this.productos=productos);
  }

  //llamada al metodo delete para eliminar un producto
  delete(producto:Producto):void{
    //se utiliza un alert de sweetalert2 para confirmar la eliminacion del producto
    swal.fire({
        title: '¿Esta seguro de eliminar este producto?',
        text: "No podra recuperar la información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          this.productoService.delete(producto.id).subscribe(
            response =>{
              this.productos=this.productos.filter(prod=>prod!==producto)
              swal.fire('Eliminado!','El producto se a eliminado.','success')
            })
          }
      })
  }

  abrirModal(producto: Producto){
    this.productoSeleccionado=producto;
    this.modalService.abrirModal();
  }

}
