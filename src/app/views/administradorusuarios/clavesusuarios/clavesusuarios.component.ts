import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RutValidator } from 'ng2-rut';
import { Utils } from 'src/app/models/utils/utils';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
// import { Configuracion } from 'src/app/config/configuracion';
/*Services */
import { BsModalService } from 'ngx-bootstrap/modal';
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { ClaveusuariosService } from 'src/app/services/administradorusuarios/claveusuarios.service';
/*Models */
import { Paramusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/paramusuario';
import { Serviciosalud } from 'src/app/models/entity/adminusuarios/claveusuarios/serviciosalud';
import { Estadousuario } from 'src/app/models/entity/adminusuarios/claveusuarios/estadousuario';
import { NuevousuarioComponent } from '../nuevousuario/nuevousuario.component';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-clavesusuarios',
  templateUrl: './clavesusuarios.component.html',
  styleUrls: ['./clavesusuarios.component.css']
})
export class ClavesusuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalConfirmar') alertSwalConfirmar: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  @ViewChild('nrolicencia') nrolicenciaField: ElementRef;
  @ViewChild('rutbeneficiario') rutbeneficiarioField: ElementRef;
  @ViewChild('rutfuncionario') rutfuncionarioField: ElementRef;
  @ViewChild('estadolm') estadolmField: ElementRef;
  @ViewChild('tipolm') tipolmField: ElementRef;
  @ViewChild('fechainicio') fechainicioField: ElementRef;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public bsModalRef: BsModalRef;
  public alerts: any[] = [];
  public load = false;
  public currentPage = 1;
  public loading = false;

  public pForm: FormGroup;
  public qForm: FormGroup;
  public serviciosalud: Array<Serviciosalud> = [];
  public estadosusuarios: Array<Estadousuario> = [];
  public usuariosseleccionados: Array<Paramusuario> = [];
  public usuarios: Array<Paramusuario> = [];
  public usuariospag: Array<Paramusuario> = [];

  public usuario: Paramusuario = new Paramusuario();
  // private global: Configuracion = new Configuracion();
  public isIngresado = true;
  public tabSelect = 'tabServiciosaludestado';

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public rutValidator: RutValidator,
    public bsModalService: BsModalService,
    public parametroService: ParametroService,
    public claveusuariosService: ClaveusuariosService,
  ) {
    this.pForm = this.formBuilder.group({
      serviciosalud: [{ value: null, disabled: false }, Validators.required],
      estadousuario: [{ value: null, disabled: false }, Validators.required]
    });
    this.qForm = this.formBuilder.group({
      rutusuario: [{ value: null, disable: false }, Validators.required]
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getParam();
    });
  }

  async getParam() {
    this.progressBar.start();
    this.load = true;
    try {
      this.estadosusuarios = await this.parametroService.estadoUsuario().toPromise();
      this.serviciosalud = await this.parametroService.servicioSalud().toPromise();
      this.getBusquedausuario();
      this.progressBar.complete();
      this.load = false;
    } catch (err) {
      this.mensaje('danger', err.error.mensaje, 3000);
      this.progressBar.complete();
      this.load = false;
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.usuariosseleccionados = [];
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usuariospag  = this.usuarios.slice(startItem, endItem);
  }

  onAsignarserviciosalud() {}

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
  }

  async onCheck(event: any, usuario: Paramusuario) {
    if (event.target.checked) {
      if (this.usuariosseleccionados.indexOf(usuario) < 0) {
        this.usuariosseleccionados.push(usuario);
        // this.setParamBusquedarut(Utils.formatRut(usuario.Col_RutUsuario));
      }
    } else {
        this.usuariosseleccionados.splice(this.usuariosseleccionados.indexOf(usuario), 1);
      }
    this.setParamBusquedarut(Utils.formatRut(this.usuariosseleccionados[0].Col_RutUsuario));
  }

  onBuscar() {
    switch (this.tabSelect) {
      case 'tabServiciosaludestado':
        if (this.pForm.valid) {
          this.buscarUsuarios();
        } else {
          this.validateAllFormFields(this.pForm);
        }
        break;

      case 'tabBusquedaRut':
        if (this.qForm.valid) {
          this.buscarUsuariosrut();
        } else {
          this.validateAllFormFields(this.qForm);
        }
        break;
    }
  }

  async buscarUsuarios() {
      this.load = true;
      this.progressBar.start();
      const serviciosalud = this.pForm.controls.serviciosalud.value;
      const estadousuario = this.pForm.controls.estadousuario.value;
      this.claveusuariosService.getUsuario(
       serviciosalud,
       estadousuario
      ).subscribe(data => {
        this.usuarios = data;
        this.setRowPagination();
        this.setParametros(serviciosalud, estadousuario);
        this.progressBar.complete();
        this.load = false;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
  }

  async buscarUsuariosrut() {
    this.load = true;
    this.progressBar.start();
    const rutusuario = Utils.formatRut(this.qForm.controls.rutusuario.value);
    this.claveusuariosService.getUsuariorut(rutusuario).subscribe(data => {
      this.usuarios = data;
      this.setRowPagination();
      this.setParametrosrut(rutusuario);
      this.progressBar.complete();
      this.load = false;
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  async getBusquedausuario() {
    const admusuarios = JSON.parse(localStorage.getItem('busquedausuario'));
    const admusuariosrut = JSON.parse(localStorage.getItem('busquedausuariorut'));
    console.log(admusuarios);
    if (admusuarios !== null) {
      this.pForm.controls.serviciosalud.setValue(admusuarios.serviciosalud);
      this.pForm.controls.estadousuario.setValue(admusuarios.estadousuario);
      // localStorage.setItem('busquedausuario', JSON.stringify(admusuarios));
      this.buscarUsuarios();
    } else {
      this.qForm.controls.serviciosalud.setValue(admusuariosrut.rutusuario);
      this.buscarUsuariosrut();
    }
  }

 setParametros(paramserviciosalud: number, paramestado: number) {
    const paramusuario = {
      serviciosalud: paramserviciosalud,
      estadousuario: paramestado};
    localStorage.removeItem('busquedausuario');
    localStorage.setItem('busquedausuario', JSON.stringify(paramusuario));
  }

  setParametrosrut(rut: string) {
    const paramusuario = {
      rutusuario: rut };
    localStorage.removeItem('busquedausuariorut');
    localStorage.setItem('busquedausuariorut', JSON.stringify(paramusuario));
  }

 setParamBusquedarut(rut: string) {
    const paramusuario = {
      rutusuario: rut };
    localStorage.removeItem('busquedarut');
    localStorage.setItem('busquedarut', JSON.stringify(paramusuario));
  }

  onLimpiar() {
    this.pForm.controls.serviciosalud.setValue('');
    this.pForm.controls.estadousuario.setValue('');
  }

  setRowPagination() {
    this.currentPage = 1;
    this.usuariospag = this.usuarios.slice(0, 8);
  }

  /*ENVIA DATOS A MODAL */
  // onIngresorr() {
  //   this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicencia(1));
  //   this.bsModalRef.content.onClose.subscribe(estado => {
  //     if (estado === true) {
  //       this.licenciasseleccionadas = [];
  //     }
  //   });
  // }

  onNuevousuario() {
    this.bsModalRef = this.bsModalService.show(NuevousuarioComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  onModificarusuario() {
    if (this.validarseleccionuno()) {
      this.router.navigate(['/mantencionusuarios']);
    } else {}
  }

  onAccion(codaccion: number) {
    if (this.validarseleccionuno()) {
      let textstart = null;
      let textend = null;

      switch (codaccion) {
        case 1:
          textstart = 'Bloquear';
          textend = 'Bloqueado';
          break;
        case 2:
          textstart = 'Eliminar';
          textend = 'Eliminado';
          break;
        case 3:
          textstart = 'Reiniciar Contraseña';
          textend = 'Contraseña Reiniciada';
          break;
      }
      const rutusuario =  Utils.formatRut(this.usuariosseleccionados[0].Col_RutUsuario);
      this.alertSwalConfirmar.title = `¿Desea ${ textstart } Usuario ${ rutusuario } ?`; // <- poner rut usuario
      this.alertSwalConfirmar.show().then(ok => {
        if (ok.value) {
          if (codaccion === 1) {
            this.bloquearusuario(rutusuario);
          } else if (codaccion === 2) {
            this.borrarusuario(rutusuario);
          } else if (codaccion === 3) {
            this.reiniciarclave(rutusuario);
          }
          this.alertSwal.title = `Usuario ${ rutusuario } ${ textend }`;
          this.alertSwal.show();
        }
        this.buscarUsuarios();
        this.usuariosseleccionados = [];
      });
    }
  }

  bloquearusuario(rutusuario: string) {
    // const rutusuario = this.usuariosseleccionados[0].Col_RutUsuario;
    this.claveusuariosService.postBloquearUsuario(
      rutusuario
    ).subscribe(data => true );
  }

  borrarusuario(rutusuario: string) {
    this.claveusuariosService.postDeleteUsuario(
      rutusuario
    ).subscribe(data => true);
  }

  reiniciarclave(rutusuario: string) {
    // const rutusuario = this.usuariosseleccionados[0].Col_RutUsuario;
    this.claveusuariosService.postReiniciarClave(
      rutusuario
    ).subscribe(data => true );
  }

  validarseleccionuno() {
    if (this.usuariosseleccionados.length === 0) {
      this.alertSwalAlert.title = 'Debe seleccionar un Usuario';
      this.alertSwalAlert.show();
      return false;
    } else if (this.usuariosseleccionados.length > 1) {
      this.alertSwalAlert.title = 'Solo puede seleccionar un Usuario.';
      this.alertSwalAlert.show();
      return false;
    }
    return true;
  }

  validarselecciondos() {
    if (this.usuariosseleccionados.length === 0) {
      this.alertSwalAlert.title = 'Debe seleccionar uno o mas Usuarios.';
      this.alertSwalAlert.show();
      return false;
    }
    return true;
  }

  setModal() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        // nomreceptor: nomemisor,
      }
    };
    return dtModal;
  }

  // setModalLicenciamodificar(accionl: number, rr: Recursoreposicion) {
  //   let dtModal: any = {};
  //   dtModal = {
  //     keyboard: false,
  //     backdrop: 'static',
  //     class: 'modal-dialog-centered modal-lg',
  //     initialState: {
  //       // codtipolm: codtipolml,
  //       accion: accionl,
  //       recursoreposicion: rr
  //     }
  //   };
  //   return dtModal;
  // }

  setConfirmarBorrar() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered',
      initialState: {
        titulo: 'Eliminar',
        mensaje: 'Desea eliminar Usuario seleccionado?'
      }
    };
    return dtModal;
  }

  setModalConfirmar() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered',
      initialState: {
        titulo: 'Confirmar',
        mensaje: 'Desea confirmar la acción?'
      }
    };
    return dtModal;
  }

  onCerrar() {
    this.router.navigate(['/home']);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  compare_serviciosalud(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.NumServicioSalud === c2.NumServicioSalud : c1 === c2;
  }

  compare_estadousuarios(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.CodEstadoUsr === c2.CodEstadoUsr : c1 === c2;
  }


  mensaje(status: string, texto: string, time: number = 0) {
    this.alerts = [];
    if (time !== 0) {
      this.alerts.push({
        type: status,
        msg: texto,
        timeout: time
      });
    } else {
      this.alerts.push({
        type: status,
        msg: texto
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
