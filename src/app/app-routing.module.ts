import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './templates/home/home.component';
import { LoginComponent } from './templates/login/login.component';
import { ErrorComponent } from './templates/error/error.component';
import { ConsultacambioestadoComponent } from './views/gestion/consulta/consultacambioestado/consultacambioestado.component';
import { ConsultabonoComponent } from './views/gestion/consulta/consultabono/consultabono.component';
import { ConsultaadjuntoComponent } from './views/gestion/consulta/consultaadjunto/consultaadjunto.component';
import { ClavesusuariosComponent } from './views/administradorusuarios/clavesusuarios/clavesusuarios.component';
import { MantencionusuariosComponent } from './views/administradorusuarios/mantencionusuarios/mantencionusuarios.component';
import { PerfilamientomodulosComponent } from './views/administradorperfiles/perfilamientomodulos/perfilamientomodulos.component';
import { CambiopasswordComponent } from './templates/cambiopassword/cambiopassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cambiopass', component: CambiopasswordComponent, canActivate: [AuthGuard] },

  { path: 'consultabono', component: ConsultabonoComponent, canActivate: [AuthGuard] },
  { path: 'consultacambioestado', component: ConsultacambioestadoComponent, canActivate: [AuthGuard] },
  { path: 'consultaadjunto', component: ConsultaadjuntoComponent, canActivate: [AuthGuard] },

  { path: 'claveusuarios', component: ClavesusuariosComponent, canActivate: [AuthGuard] },
  { path: 'mantencionusuarios', component: MantencionusuariosComponent, canActivate: [AuthGuard] },
  { path: 'perfilamiento', component: PerfilamientomodulosComponent, canActivate: [AuthGuard] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
