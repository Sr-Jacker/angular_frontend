import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable, of ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class ProductosService {

  private urlEndPoint:string='http://localhost:8080/api/productos';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

//la siguiente seccion de codigo se destina a crear los metodos CRUD que se comunican con el backend
  //listar productos
  getProductos():Observable<Producto[]>{
    //retornamos la lista de clientes traida del backend
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  //crear producto
  create(producto:Producto):Observable<Producto>{
    //retornamos el producto y lo enviamos al backend
    return this.http.post<Producto>(this.urlEndPoint,producto,{headers:this.httpHeaders})
  }

  //buscar un producto por id
  getProducto(id):Observable<Producto>{
    //retornamos el producto buscado atraves del id
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  //actulizar un producto en backend a traves del id
  update(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`,producto,{headers:this.httpHeaders});
  }

  //eliminar producto por id
  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
  }

  subirFoto(archivo: File, id): Observable<Producto>{
    let formData=new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response:any)=> response.producto as Producto),
      catchError(e=>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

}
