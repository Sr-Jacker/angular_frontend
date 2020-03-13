import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosService } from './components/productos/productos.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/productos/form.component';
import { DetalleComponent } from './components/productos/detalle/detalle.component';

const routes: Routes=[
  {path:'',redirectTo:'/productos',pathMatch:'full'},
  {path:'productos', component:ProductosComponent},
  {path:'productos/form',component:FormComponent},
  {path:'productos/form/:id',component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    FormComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
