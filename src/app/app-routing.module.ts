import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import { AuthGuardService } from './services/guards/auth-guards.service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
