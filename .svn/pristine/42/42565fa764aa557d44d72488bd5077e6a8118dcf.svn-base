import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RutformatPipe } from './pipe/rutformat.pipe';
import { NumberonlyDirective } from './directive/numberonly.directive';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './templates/home/home.component';
import { ErrorComponent } from './templates/error/error.component';
import { LoginComponent } from './templates/login/login.component';
import { MenuComponent } from './templates/menu/menu.component';

import { AutofocusDirective } from './directive/autofocus.directive';
import { MaxlengthDirective } from './directive/maxlength.directive';
import { SelecttextDirective } from './directive/selecttext.directive';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2Rut } from 'ng2-rut';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TokenService } from './services/utils/token.service';
import { CaducadosComponent } from './views/gestion/informes/caducados/caducados.component';
import { ConfirmComponent } from './templates/confirm/confirm.component';
import { ConsultacambioestadoComponent } from './views/gestion/consulta/consultacambioestado/consultacambioestado.component';
import { ConsultabonoComponent } from './views/gestion/consulta/consultabono/consultabono.component';
import { ConsultaadjuntoComponent } from './views/gestion/consulta/consultaadjunto/consultaadjunto.component';
import { ClavesusuariosComponent } from './views/administradorusuarios/clavesusuarios/clavesusuarios.component';
import { MantencionusuariosComponent } from './views/administradorusuarios/mantencionusuarios/mantencionusuarios.component';
import { PropiedadescuentaComponent } from './views/administradorusuarios/propiedadescuenta/propiedadescuenta.component';
import { PerfilamientomodulosComponent } from './views/administradorperfiles/perfilamientomodulos/perfilamientomodulos.component';
import { MantenedorperfilesComponent } from './views/administradorperfiles/mantenedorperfiles/mantenedorperfiles.component';
import { NuevousuarioComponent } from './views/administradorusuarios/nuevousuario/nuevousuario.component';
import { CambiopasswordComponent } from './templates/cambiarpassword/cambiopassword.component';
import { RestablecerpasswordComponent } from './templates/cambiarpassword/restablecerpassword/restablecerpassword.component';
import { ValidarutComponent } from './templates/cambiarpassword/validarut/validarut.component';
import { RegistrarcorreoComponent } from './templates/registrarcorreo/registrarcorreo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    MenuComponent,
    AutofocusDirective,
    MaxlengthDirective,
    SelecttextDirective,
    RutformatPipe,
    NumberonlyDirective,
    CaducadosComponent,
    ConfirmComponent,
    ConsultacambioestadoComponent,
    ConsultabonoComponent,
    ConsultaadjuntoComponent,
    ClavesusuariosComponent,
    MantencionusuariosComponent,
    PropiedadescuentaComponent,
    PerfilamientomodulosComponent,
    MantenedorperfilesComponent,
    NuevousuarioComponent,
    CambiopasswordComponent,
    RestablecerpasswordComponent,
    ValidarutComponent,
    RegistrarcorreoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgProgressModule.withConfig({
      spinner: true,
      color: '#000000'
    }),
    NgxLoadingModule.forRoot({}),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary mr-4',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }),
    Ng2Rut,
    NgxMaskModule.forRoot()
  ],
  providers: [
    DatePipe,
    TokenService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    PropiedadescuentaComponent,
    MantenedorperfilesComponent,
    NuevousuarioComponent,
    RestablecerpasswordComponent,
    ValidarutComponent
  ]
})
export class AppModule { }
