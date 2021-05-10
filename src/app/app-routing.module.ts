import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'heroe',
    component: HeroeComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
 

  {
    path: '',
    pathMatch:'full' ,
    redirectTo:'home'
  },
  {
    path: '**',
    pathMatch:'full' ,
    redirectTo:'home'
  }
  
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
