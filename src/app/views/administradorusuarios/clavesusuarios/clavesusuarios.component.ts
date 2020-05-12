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
  public serviciosalud: Array<Serviciosalud> = [];
  public estadosusuarios: Array<Estadousuario> = [];
  public usuariosseleccionados: Array<Paramusuario> = [];
  public usuarios: Array<Paramusuario> = [];

  public usuario: Paramusuario = new Paramusuario();
  // private global: Configuracion = new Configuracion();
  public isIngresado = true;

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
      estadousuarios: [{ value: null, disabled: false }, Validators.required]
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getBusqueda();
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usuariosseleccionados = this.usuarios.slice(startItem, endItem);
  }

  onSelectServiciosalud(value: any) {
    console.log(value);
  }

  onSelectEstadousuarios(value: any) {
    console.log(value);
  }

  async onCheck(event: any, usuario: Paramusuario) {
    if (event.target.checked) {
      if (this.usuariosseleccionados.indexOf(usuario) < 0) {
        this.usuariosseleccionados.push(usuario);
      }
    } else {
        this.usuariosseleccionados.splice(this.usuariosseleccionados.indexOf(usuario), 1);
      }
    // this.logicaEstado();
  }

  // logicaEstado() {
  //   /* Método que desactiva MODIFICAR y ELIMINAR en caso que el RR sea estado 2 (PROCESADO) */
  //   if (this.licenciasseleccionadas.length === 0) {
  //     this.isIngresado = true;
  //   } else {
  //     for (const lm of this.licenciasseleccionadas) {
  //       if (lm.CodEstIngresoLM === '2') {
  //           this.isIngresado = false;
  //           return;
  //         } else { this.isIngresado = true; }
  //     }
  //   }
  // }

  onBuscar() {
    if (this.pForm.valid) {
      this.buscarusuarios();
    } else {
      this.validateAllFormFields(this.pForm);
    }
  }

  async buscarusuarios() {
    if (this.pForm.valid) {
      this.load = true;
      const serviciosalud = this.pForm.controls.serviciosalud.value();
      this.progressBar.start();
      this.claveusuariosService.buscarUsuarios(
       serviciosalud
      ).subscribe(data => {
        this.usuarios = data;
        this.setRowPagination();
        this.progressBar.complete();
        this.load = false;
      }, err => {
        this.mensaje('danger', err.error.mensaje, 3000);
        this.progressBar.complete();
        this.load = false;
      }
      );
    }
  }

  borrarusuario() {
    // const numservicio = this.licenciasseleccionadas[0].xNumServicio;
    // const numformulario = this.licenciasseleccionadas[0].xNumFormulario;
    // const codtipolm = this.licenciasseleccionadas[0].xCodTipoLM;
    const rutusuario = this.usuariosseleccionados[0].rut;
    this.claveusuariosService.deleteUsuario(
      rutusuario
    ).subscribe(data => {
      return data;
    }
    );
  }

  // setBusquedaNro(nrolicencia: string) {
  //   const admreposicion = {
  //     tabNroLicencia: {
  //       nrolicencia
  //     }
  //   };
  //   localStorage.setItem('admreposicion', JSON.stringify(admreposicion));
  // }

  // setBusquedaRut(rutbeneficiario: string, fechainicio: string, fechatermino: string) {
  //   const admreposicion = {
  //     tabRut: {
  //       rutbeneficiario,
  //       fechainicio,
  //       fechatermino
  //     }
  //   };
  //   localStorage.setItem('admreposicion', JSON.stringify(admreposicion));
  // }

  getBusqueda() {
    const admusuarios = JSON.parse(localStorage.getItem('admusuarios'));
    if (admusuarios !== null) {
      this.pForm.controls.serviciosalud.setValue(admusuarios.serviciosalud);
      this.pForm.controls.estadousuarios.setValue(admusuarios.estadousuarios);
      localStorage.setItem('admusuarios', JSON.stringify(admusuarios));
    }
  }

  onLimpiar() {
    this.pForm.controls.serviciosalud.setValue('');
    this.pForm.controls.estadousuarios.setValue('');
  }

  // setParametros(vlicencia: Selectivapendiente) {
  //   this.licencia = new ParamLicencia(
  //     vlicencia.NumServicioSalud,
  //     vlicencia.AnoRecepcion,
  //     vlicencia.FolioCompin,
  //     vlicencia.CorrelHijo,
  //     vlicencia.NumServicio,
  //     vlicencia.NumFormulario,
  //     vlicencia.NombresTra,
  //     vlicencia.RutTrabajador,
  //     vlicencia.xLm,
  //     vlicencia.SwAlertaFueraPLazo,
  //     '1'
  //   );
  //   localStorage.removeItem('licencia');
  //   localStorage.setItem('licencia', JSON.stringify(this.licencia));
  // }

  setRowPagination() {
    this.currentPage = 1;
    this.usuariosseleccionados = this.usuarios.slice(0, 8);
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
    // this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicencia(12, 10));
    // this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicencia(10));
    // this.bsModalRef.content.onClose.subscribe(estado => {
    //   if (estado === true) {
    //     this.licenciasseleccionadas = [];
    //   }
    // });
  }

  onModificarusuario() {
    // this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicencia(13, 60));
    // this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicencia(60));
    // this.bsModalRef.content.onClose.subscribe(estado => {
    //   if (estado === true) {
    //     this.licenciasseleccionadas = [];
    //   }
    // });
  }

  onEliminarusuario() {
    if (this.validarseleccionuno()) {
      // this.setParametros();
      this.alertSwalConfirmar.title = '¿Desea eliminar Usuario ..'; // <- poner rut usuario
      this.alertSwalConfirmar.show().then(ok => {
        if (ok.value) {
          this.borrarusuario();
          this.alertSwal.title = 'Usuario eliminado';
          this.alertSwal.show();
          this.getBusqueda();
          this.usuariosseleccionados = [];
        }
      });
    }
  }

  onBloquearusuario() {
    // const recursorep: Recursoreposicion = this.licenciasseleccionadas[0];
    // if (this.validarseleccionuno()) {
    //   this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicenciamodificar(2, recursorep));
    //   this.bsModalRef.content.onClose.subscribe(estado => {
    //     if (estado === true) {
    //       this.licenciasseleccionadas = [];
    //       this.getBusqueda();
    //     }
    //   });
    // }
  }

  onReiniciarcontrasena() {
    // const recursorep: Recursoreposicion = this.licenciasseleccionadas[0];
    // if (this.validarseleccionuno()) {
    //   this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicenciamodificar(2, recursorep));
    //   this.bsModalRef.content.onClose.subscribe(estado => {
    //     if (estado === true) {
    //       this.licenciasseleccionadas = [];
    //       this.getBusqueda();
    //     }
    //   });
    // }
  }

  onAsignarserviciosalud() {
    // const recursorep: Recursoreposicion = this.licenciasseleccionadas[0];
    // if (this.validarseleccionuno()) {
    //   this.bsModalRef = this.bsModalService.show(CambiorecursoComponent, this.setModalLicenciamodificar(2, recursorep));
    //   this.bsModalRef.content.onClose.subscribe(estado => {
    //     if (estado === true) {
    //       this.licenciasseleccionadas = [];
    //       this.getBusqueda();
    //     }
    //   });
    // }
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

  setModalLicencia(accionl: number) {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        // codtipolm: codtipolml,
        accion: accionl
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
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  compare_estadousuarios(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
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