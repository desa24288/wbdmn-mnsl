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

/*DATEPICKER */
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DateMenorValidation } from 'src/app/models/validations/DateMenorValidation';
import { DateRangeValidation } from 'src/app/models/validations/DateRangeValidation';
/*Models */
import { Paramusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/paramusuario';
import { Serviciosalud } from 'src/app/models/entity/adminusuarios/claveusuarios/serviciosalud';
import { Estadousuario } from 'src/app/models/entity/adminusuarios/claveusuarios/estadousuario';
import { RutValidator } from 'ng2-rut';
import { Invalidez } from 'src/app/models/entity/adminvalidez/invalidez';
import { GestioninvalidezService } from 'src/app/services/adminvalidez/gestioninvalidez.service';

@Component({
  selector: 'app-gestioninvalidez',
  templateUrl: './gestioninvalidez.component.html',
  styleUrls: ['./gestioninvalidez.component.css']
})
export class GestioninvalidezComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalConfirmar') alertSwalConfirmar: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  @ViewChild('nrolicencia') nrolicenciaField: ElementRef;
  @ViewChild('rutbeneficiario') rutbeneficiarioField: ElementRef;
  @ViewChild('rutfuncionario') rutfuncionarioField: ElementRef;
  @ViewChild('estadolm') estadolmField: ElementRef;
  @ViewChild('tipolm') tipolmField: ElementRef;
  // @ViewChild('fechainicio') fechainicioField: ElementRef;
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
  public invalidezseleccionados: Array<Invalidez> = [];
  public invalideces: Array<Invalidez> = [];
  public invalidecespag: Array<Invalidez> = [];

  /** Atributos Datepicker */
  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  public invalidez: Invalidez = new Invalidez();
  public isIngresado = true;
  public tabSelect = 'tabFecha';
  public btnbuscar = false;
  public sucessfnc = false;
  public vfechainicio: string;
  public vfechatermino: string;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService,
    public parametroService: ParametroService,
    public claveusuariosService: ClaveusuariosService,
    public rutValidator: RutValidator,
    public datePipe: DatePipe,
    public localeService: BsLocaleService,
    public gestionService: GestioninvalidezService
  ) {
    this.pForm = this.formBuilder.group({
      fechainicio: [{ value: new Date(), disabled: false }, Validators.required],
      fechatermino: [{ value: new Date(), disabled: false }, Validators.required],
    },
      { validators: [
        DateMenorValidation('fechainicio', 'fechatermino'),
        DateRangeValidation('fechainicio', 'fechatermino', 31)]}
    );
    this.qForm = this.formBuilder.group({
      rutusuario: [null, [Validators.required, rutValidator]]
    });
  }

  ngOnInit() {
    this.setDate();
    this.vfechainicio = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.vfechatermino = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      /** Busca los parametros de la última busqueda */
      this.getParam();
    });
  }

  setDate() {
    defineLocale(this.locale, esLocale);
    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  async getParam() {
    this.progressBar.start();
    this.load = true;
    try {
      this.getBusquedausuario();
      this.load = false;
    } catch (err) {
      this.mensaje('danger', err.error.mensaje, 3000);
      this.progressBar.complete();
      this.load = false;
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.invalidezseleccionados = [];
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.invalidecespag  = this.invalideces.slice(startItem, endItem);
  }

  onAsignarserviciosalud() {}

  async onCheck(event: any, invalidez: Invalidez) {
    if (event.target.checked) {
      if (this.invalidezseleccionados.indexOf(invalidez) < 0) {
        this.invalidezseleccionados.push(invalidez);
      }
    } else {
        this.invalidezseleccionados.splice(this.invalidezseleccionados.indexOf(invalidez), 1);
      }
  }

  onBuscar() {
    switch (this.tabSelect) {
      case 'tabFecha':
        if (this.pForm.valid) {
          this.buscarUsuariosfecha();
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

  async buscarUsuariosfecha() {
      this.load = true;
      this.progressBar.start();
      const finicio = this.formatearFecha(this.vfechainicio);
      const fterm = this.formatearFecha(this.vfechatermino);
      this.gestionService.getInvfecha(
        finicio,
        fterm
       ).subscribe(data => {
         this.invalidezseleccionados = [];
         this.invalideces = data;
         this.setRowPagination();
         this.setParametros(null);
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

  formatearFecha(value: string) {
    const prefecha = value.split('-');
    const dia = prefecha[0];
    const mes = prefecha[1];
    const anio = prefecha[2];
    const newfecha = anio.concat(mes.concat(dia));
    return newfecha;
  }

  async buscarUsuariosrut() {
    this.load = true;
    this.progressBar.start();
    const rutbeneficiario = Utils.formatRut(this.qForm.controls.rutusuario.value);
    this.gestionService.getInvrut(rutbeneficiario).subscribe(data => {
      this.invalidezseleccionados = [];
      this.invalideces = data;
      this.setRowPagination();
      this.setParametros(rutbeneficiario);
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
    const parambusqueda = JSON.parse(localStorage.getItem('invalidezbusqueda'));
    if (parambusqueda === null) {
     return;
    } else {
      if (parambusqueda.tab === 'tabFecha') {
        // const finicio = parambusqueda.fechainicio;
        // const fterm = parambusqueda.fechatermino;
        // this.pForm.controls.fechainicio.setValue(finicio);
        // this.pForm.controls.fechatermino.setValue(fterm);
        this.vfechainicio = parambusqueda.fechainicio;
        this.vfechatermino = parambusqueda.fechatermino;
        this.tabBusquedaTabs.tabs[0].active = true;
        this.buscarUsuariosfecha();
      } else if (parambusqueda.tab === 'tabRut') {
        this.qForm.controls.rutusuario.setValue(parambusqueda.rutusuario);
        this.tabBusquedaTabs.tabs[1].active = true;
        this.buscarUsuariosrut();
      }
    }
    this.logicaGuardar();
  }

  setParametros(rut: string) {
    localStorage.removeItem('invalidezbusqueda');
    // const fini: string = this.datePipe.transform(this.pForm.controls.fechainicio.value, 'dd-MM-yyyy');
    // const fterm: string =  this.datePipe.transform(this.pForm.controls.fechatermino.value, 'dd-MM-yyyy');
    const parambusqueda = {
      tab: this.tabSelect,
      fechainicio: this.vfechainicio,
      fechatermino: this.vfechatermino,
      rutusuario: rut };
    localStorage.setItem('invalidezbusqueda', JSON.stringify(parambusqueda));
  }

  setParamBusquedarut(rut: string) {// Posiblemente REMOVER
    const paramusuario = {
      rutusuario: rut };
    localStorage.removeItem('busquedainvalidezrut');
    localStorage.setItem('busquedainvalidezrut', JSON.stringify(paramusuario));
  }

  onLimpiar() {
    this.pForm.reset();
    this.qForm.reset();
    this.invalidecespag = [];
    this.invalideces = [];
    this.btnbuscar = false;
  }

  setRowPagination() {
    this.currentPage = 1;
    this.invalidecespag = this.invalideces.slice(0, 6);
  }

  onNuevousuario() {
    // localStorage.removeItem('busquedainvalidezrut');
    // const indx = '2';
    // localStorage.setItem('from_indx', indx);
    // this.router.navigate(['/mantencionusuarios']);
  }

  onAccion(codaccion: number) {
    if (this.validarseleccionuno()) {
      this.setParamBusquedarut(Utils.formatRut(this.invalidezseleccionados[0].RutTrabajador));
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
      const rutbeneficiario =  Utils.formatRut(this.invalidezseleccionados[0].RutTrabajador);
      const nomusuario =  this.invalidezseleccionados[0].NomTrabajador;
      this.alertSwalConfirmar.title = `¿Desea ${ textstart } Rut ${ rutbeneficiario } ?`;
      this.alertSwalConfirmar.show().then(ok => {
        if (ok.value) {
          this.loading = true;
          if (codaccion === 1) {
            this.bloquearusuario(rutbeneficiario);
          } else if (codaccion === 2) {
            this.borrarusuario(rutbeneficiario);
          } else if (codaccion === 3) {
          }
        }
      });
    }
  }

  successModal() {
    this.alertSwal.title = 'Proceso exitoso';
    this.alertSwal.show().then( ok => {
      if (ok.value) {
        if (this.tabSelect === 'tabFecha') {
          this.invalidezseleccionados = [];
          this.buscarUsuariosfecha();
        } else if (this.tabSelect === 'tabRut') {
          this.buscarUsuariosrut();
        } else {
          this.loading = false;
          this.progressBar.complete();
        }
      }
    });
  }

  async bloquearusuario(rutusuario: string) {
    // this.claveusuariosService.postBloquearUsuario(
    //   rutusuario
    //   ).subscribe(data => {
    //     this.loading = false;
    //     this.successModal();
    //   }, err => {
    //     this.loading = false;
    //     this.alertSwalAlert.title = err.error.mensaje;
    //     this.alertSwalAlert.show();
    //   } );
  }

  borrarusuario(rutusuario: string) { 
    this.gestionService.deleteInvrut(
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
    // this.claveusuariosService.postReiniciarClave(
    //   rutusuario,
    //   nomusuario,
    //   correousuario
    // ).subscribe(data => {
    //   this.loading = false;
    //   this.successModal();
    // }, err => {
    //   this.loading = false;
    //   this.alertSwalAlert.title = err.error.mensaje;
    //   this.alertSwalAlert.text = 'Verifique si usuario tiene correo asignado';
    //   this.alertSwalAlert.show();
    // } );
  }

  validarseleccionuno() {
    if (this.invalidezseleccionados.length === 0) {
      this.alertSwalAlert.title = 'Debe seleccionar un Registro';
      this.alertSwalAlert.show();
      return false;
    } else if (this.invalidezseleccionados.length > 1) {
      this.alertSwalAlert.title = 'Solo puede seleccionar un Registro.';
      this.alertSwalAlert.show();
      return false;
    }
    return true;
  }

  validarselecciondos() {
    if (this.invalidezseleccionados.length === 0) {
      this.alertSwalAlert.title = 'Debe seleccionar uno o mas Registros.';
      this.alertSwalAlert.show();
      return false;
    }
    return true;
  }

  logicaGuardar() {
    if (this.qForm.valid || this.pForm.valid) {
      this.btnbuscar = true;
    }
  }

  async onFechaInicio() {
    this.vfechainicio = this.datePipe.transform(this.pForm.controls.fechainicio.value, 'dd-MM-yyyy');
  }
  async onFechaTermino() {
    this.vfechatermino = this.datePipe.transform(this.pForm.controls.fechatermino.value, 'dd-MM-yyyy');
  }

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
    switch (this.tabSelect) {
      case 'tabFecha':
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

  // compare_serviciosalud(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.NumServicioSalud === c2.NumServicioSalud : c1 === c2;
  // }

  // compare_estadousuarios(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.CodEstadoUsr === c2.CodEstadoUsr : c1 === c2;
  // }


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

