import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { ProductosService } from '../productos.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() producto: Producto;
  private fotoSeleccionada: File;
  constructor(private productoService:ProductosService,
    private activatedRoute:ActivatedRoute,
    public modalService:ModalService) { }

  ngOnInit(): void {  }

  seleccionarFoto(event){
    this.fotoSeleccionada=event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      swal.fire('Error U: ', 'Debe seleccionar una foto','error');
      this.fotoSeleccionada=null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error U: ', 'Debe seleccionar una foto','error');
    }else{
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.id)
      .subscribe(producto =>{
        this.producto=producto;
        swal.fire('La foto se ha subido correctamente!', `La foto " ${this.producto.foto} " se a subido con exito!`,'success');
      })
    }

  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
  }
}
