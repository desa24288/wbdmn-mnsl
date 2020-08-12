import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Utils } from 'src/app/models/utils/utils';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
/*Services */
import { BsModalService } from 'ngx-bootstrap/modal';
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { ClaveusuariosService } from 'src/app/services/administradorusuarios/claveusuarios.service';
/*Models */
import { Paramusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/paramusuario';
import { Serviciosalud } from 'src/app/models/entity/adminusuarios/claveusuarios/serviciosalud';
import { Estadousuario } from 'src/app/models/entity/adminusuarios/claveusuarios/estadousuario';
import { RutValidator } from 'ng2-rut';

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
  public isIngresado = true;
  public tabSelect = 'tabSSalud';
  public btnbuscar = false;
  public sucessfnc = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService,
    public parametroService: ParametroService,
    public claveusuariosService: ClaveusuariosService,
    public rutValidator: RutValidator
  ) {
    this.pForm = this.formBuilder.group({
      serviciosalud: [{ value: null, disabled: false }, Validators.required],
      estadousuario: [{ value: null, disabled: false }, Validators.required]
    });
    this.qForm = this.formBuilder.group({
      rutusuario: [null, [Validators.required, rutValidator]]
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

  async onCheck(event: any, usuario: Paramusuario) {
    if (event.target.checked) {
      if (this.usuariosseleccionados.indexOf(usuario) < 0) {
        this.usuariosseleccionados.push(usuario);
      }
    } else {
        this.usuariosseleccionados.splice(this.usuariosseleccionados.indexOf(usuario), 1);
      }
  }

  onBuscar() {
    switch (this.tabSelect) {
      case 'tabSSalud':
        if (this.pForm.valid) {
          this.buscarUsuarios();
        } else {
          this.validateAllFormFields(this.pForm);
        }
        break;

      case 'tabRut':
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
        this.usuariosseleccionados = [];
        this.usuarios = data;
        this.setRowPagination();
        this.setParametros(serviciosalud, estadousuario, null);
        this.progressBar.complete();
        this.load = false;
        this.loading = false;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
        this.loading = false;
      });
  }

  async buscarUsuariosrut() {
    this.load = true;
    this.progressBar.start();
    const rutusuario = Utils.formatRut(this.qForm.controls.rutusuario.value);
    this.claveusuariosService.getUsuariorut(rutusuario).subscribe(data => {
      this.usuariosseleccionados = [];
      this.usuarios = data;
      this.setRowPagination();
      this.setParametros(null, null, rutusuario);
      this.progressBar.complete();
      this.load = false;
      this.loading = false;
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
      this.loading = false;
    });
  }

  async getBusquedausuario() {
    const parambusqueda = JSON.parse(localStorage.getItem('claveusuariobusqueda'));
    if (parambusqueda === null) {
     return;
    } else {
      if (parambusqueda.tab === 'tabSSalud') {
        this.pForm.controls.serviciosalud.setValue(parambusqueda.serviciosalud);
        this.pForm.controls.estadousuario.setValue(parambusqueda.estadousuario);
        this.tabBusquedaTabs.tabs[0].active = true;
        this.buscarUsuarios();
      } else if (parambusqueda.tab === 'tabRut') {
        this.qForm.controls.rutusuario.setValue(parambusqueda.rutusuario);
        this.tabBusquedaTabs.tabs[1].active = true;
        this.buscarUsuariosrut();
      }
    }
    this.logicaGuardar();
  }

setParametros(paramserviciosalud: number, paramestado: number, rut: string) {
  const parambusqueda = {
    tab: this.tabSelect,
    serviciosalud: paramserviciosalud,
    estadousuario: paramestado,
    rutusuario: rut };
  localStorage.removeItem('claveusuariobusqueda');
  localStorage.setItem('claveusuariobusqueda', JSON.stringify(parambusqueda));
}

 setParamBusquedarut(rut: string) {
    const paramusuario = {
      rutusuario: rut };
    localStorage.removeItem('busquedarut');
    localStorage.setItem('busquedarut', JSON.stringify(paramusuario));
  }

  onLimpiar() {
    this.pForm.reset();
    this.qForm.reset();
    this.usuariospag = [];
    this.usuarios = [];
    this.btnbuscar = false;
  }

  setRowPagination() {
    this.currentPage = 1;
    this.usuariospag = this.usuarios.slice(0, 6);
  }

  onNuevousuario() {
    localStorage.removeItem('busquedarut');
    const indx = '2';
    localStorage.setItem('from_indx', indx);
    this.router.navigate(['/mantencionusuarios']);
  }

  onAccion(codaccion: number) {
    if (this.validarseleccionuno()) {
      this.setParamBusquedarut(Utils.formatRut(this.usuariosseleccionados[0].Col_RutUsuario));
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
        case 4:
          const indx = '1';
          localStorage.setItem('from_indx', indx);
          this.router.navigate(['/mantencionusuarios']);
          return;
      }
      const rutusuario =  Utils.formatRut(this.usuariosseleccionados[0].Col_RutUsuario);
      const nomusuario =  this.usuariosseleccionados[0].Col_NombreUsuario;
      const correousuario =  this.usuariosseleccionados[0].Col_CorreoUsuario;
      this.alertSwalConfirmar.title = `¿Desea ${ textstart } Usuario ${ rutusuario } ?`;
      this.alertSwalConfirmar.show().then(ok => {
        if (ok.value) {
          this.loading = true;
          if (codaccion === 1) {
            this.bloquearusuario(rutusuario);
          } else if (codaccion === 2) {
            this.borrarusuario(rutusuario);
          } else if (codaccion === 3) {
            this.reiniciarclave(rutusuario, nomusuario, correousuario);
          }
        }
      });
    }
  }

  successModal() {
    this.alertSwal.title = 'Proceso exitoso';
    this.alertSwal.show().then( ok => {
      if (ok.value) {
        if (this.tabSelect === 'tabSSalud') {
          this.usuariosseleccionados = [];
          this.buscarUsuarios();
        } else if (this.tabSelect === 'tabSSalud') {
          this.buscarUsuariosrut();
        } else {
          this.loading = false;
          this.progressBar.complete();
        }
      }
    });
  }

  async bloquearusuario(rutusuario: string) {
    this.claveusuariosService.postBloquearUsuario(
      rutusuario
      ).subscribe(data => {
        this.loading = false;
        this.successModal();
      }, err => {
        this.loading = false;
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
      } );
  }

  borrarusuario(rutusuario: string) {
    this.claveusuariosService.postDeleteUsuario(
      rutusuario
      ).subscribe(data => {
        this.loading = false;
        this.successModal();
      }, err => {
        this.loading = false;
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
      } );
    }

  reiniciarclave(rutusuario: string, nomusuario: string, correousuario: string) {
    this.claveusuariosService.postReiniciarClave(
      rutusuario,
      nomusuario,
      correousuario
    ).subscribe(data => {
      this.loading = false;
      this.successModal();
    }, err => {
      this.loading = false;
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.text = 'Verifique si usuario tiene correo asignado';
      this.alertSwalAlert.show();
    } );
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

  logicaGuardar() {
    if (this.qForm.valid || this.pForm.valid) {
      this.btnbuscar = true;
    }
  }

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
    switch (this.tabSelect) {
      case 'tabSSalud':
        setTimeout(() => {
          // this.fechainicioField.nativeElement.focus();
        }, 100);
        break;
      case 'tabRut':
        setTimeout(() => {
          // this.nrolicenciaField.nativeElement.focus();
        }, 100);
        break;
    }
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
