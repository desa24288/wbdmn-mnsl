import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './templates/home/home.component';
import { LoginComponent } from './templates/login/login.component';
import { ErrorComponent } from './templates/error/error.component';
import { CreadoemitidoComponent } from './views/bono/creadoemitido/creadoemitido.component';
import { EmitidoanuladoComponent } from './views/bono/emitidoanulado/emitidoanulado.component';
import { ConsultacambioestadoComponent } from './views/gestion/consulta/consultacambioestado/consultacambioestado.component';
import { ConsultabonoComponent } from './views/gestion/consulta/consultabono/consultabono.component';
import { BloqueoComponent } from './views/prestacion/bloqueo/bloqueo.component';
import { ConsultaadjuntoComponent } from './views/gestion/consulta/consultaadjunto/consultaadjunto.component';
import { ClavesusuariosComponent } from './views/administradorusuarios/clavesusuarios/clavesusuarios.component';
import { MantencionusuariosComponent } from './views/administradorusuarios/mantencionusuarios/mantencionusuarios.component';
import { PerfilamientomodulosComponent } from './views/administradorperfiles/perfilamientomodulos/perfilamientomodulos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'creadoemitido', component: CreadoemitidoComponent },
  { path: 'emitidoanulado', component: EmitidoanuladoComponent },

  { path: 'consultabono', component: ConsultabonoComponent },
  { path: 'consultacambioestado', component: ConsultacambioestadoComponent },
  { path: 'consultaadjunto', component: ConsultaadjuntoComponent },

  { path: 'bloqueoprestacion', component: BloqueoComponent },

  { path: 'claveusuarios', component: ClavesusuariosComponent },
  { path: 'mantencionusuarios', component: MantencionusuariosComponent },
  { path: 'perfilamiento', component: PerfilamientomodulosComponent },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
