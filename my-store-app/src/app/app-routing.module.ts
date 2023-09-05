import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoreLandingComponent } from './store-landing/store-landing.component';
import { ClienDetailsComponent } from './clien-details/clien-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on the root path
  { path: 'login', component: LoginComponent },
  { path: 'store-landing', component: StoreLandingComponent },
  { path: 'clien-details', component: ClienDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
