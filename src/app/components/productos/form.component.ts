import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductosService } from './productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public producto:Producto=new Producto();
  public titulo:String="Crear Cliente";

  constructor(private productoService:ProductosService, private router:Router,
  private activatedRoute: ActivatedRoute) { }

  //Se cargan los datos del producto en caso de que se abra el componente para editar este
  ngOnInit(): void {
    this.cargarProducto();
  }

  //validamos que los campos se llenen con la informacion del producto desde el
  //se llamo el componente
  cargarProducto():void{
    this.activatedRoute.params.subscribe(params =>{
      let id=params['id'];
      if(id){
        this.productoService.getProducto(id).subscribe((producto)=>this.producto=producto);
      }
    })
  }

  //se crean productos a traves del metodo create del productoService
  public create():void{
    this.productoService.create(this.producto).subscribe(
      producto=>{
        this.router.navigate(['./productos'])
        swal.fire('Nuevo producto',`Producto ${producto.nombre} creado con exito!`,'success');
      })
  }

  //Se actualiza la informacion de un producto
  update():void{
    this.productoService.update(this.producto).subscribe(producto=>{this.router.navigate(['/productos'])
    swal.fire('Producto Actualizado', `Producto ${producto.nombre} actualizado con exito!`,'success')
  });
  }

}
