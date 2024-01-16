import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';


const routes: Routes = [
  { path: 'categoria', component: CategoriaComponent },
  { path: 'lista', component: ListaCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
