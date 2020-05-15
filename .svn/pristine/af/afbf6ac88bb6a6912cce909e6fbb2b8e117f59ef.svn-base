import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';
// import { Detallebloqueoprestacion } from 'src/app/models/entity/bloqueo/detallebloqueoprestacion';
// import { OrigenVenta } from 'src/app/models/entity/bloqueo/origenventa';
// import { ParametrosService } from 'src/app/services/parametros.service';
// import { EstBloPrestacion } from 'src/app/models/entity/bloqueo/estbloprestacion';
// import { BloqueoprestacionService } from 'src/app/services/bloqueoprestacion.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditarbloqueoComponent } from '../editarbloqueo/editarbloqueo.component';

@Component({
  selector: 'app-bloqueo',
  templateUrl: './bloqueo.component.html',
  styleUrls: ['./bloqueo.component.css']
})
export class BloqueoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusqueda: TabsetComponent;

  public fForm: FormGroup;
  public bForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];

  public estadobusquedaf: boolean = false;

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  // public canales: Array<OrigenVenta> = [];
  // public estbloqueoprestaciones: Array<EstBloPrestacion> = [];

  // public bloqueoprestaciones: Array<Detallebloqueoprestacion> = [];
  // public bloqueoprestacionespag: Array<Detallebloqueoprestacion> = [];
  public bloqueoprestaciones: Array<any> = [];
  public bloqueoprestacionespag: Array<any> = [];
  public tabSelect = 'tabBusquedaCanal';
  public currentPage: number;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService,
    // public parametrosService: ParametrosService,
    // public bloqueoprestacionService: BloqueoprestacionService
  ) {
    this.fForm = this.formBuilder.group({
      canal: [null, Validators.required],
      estbloqueoprestacion: [null]
    });
    this.bForm = this.formBuilder.group({
      codprestacion: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadParametros();
    });
  }

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.bloqueoprestacionespag = this.bloqueoprestaciones.slice(startItem, endItem);
  }

  onCerrar() {
    this.router.navigate(['/home']);
  }

  onBuscar() {
    // switch (this.tabSelect) {
    //   case 'tabBusquedaCanal':
    //     if (this.fForm.valid) {
    //       this.buscarbloqueocanal();
    //     } else {
    //       this.validateAllFormFields(this.fForm);
    //     }
    //     break;
    //   case 'tabBusquedaCodPrestacion':
    //     if (this.bForm.valid) {
    //       this.buscarbloqueocodprestacion();
    //     } else {
    //       this.validateAllFormFields(this.bForm);
    //     }
    //     break;
    // }
  }

  onLimpiar() {
    this.fForm.reset();
    this.bForm.reset();

    // this.bloqueoprestaciones = [];
    // this.bloqueoprestacionespag = [];

    this.tabBusqueda.tabs[0].active = true;
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onNuevo() {
    const modalRef = this.bsModalService.show(EditarbloqueoComponent, this.setModal('Nuevo Bloqueo Prestación'));
    modalRef.content.data.subscribe((data) => {
      if (data.estado === true) {
        this.onBuscar();
      }
    });
  }

  onEditar(idbloprestacion: number) {
    const modalRef = this.bsModalService.show(EditarbloqueoComponent, this.setModal('Editar Bloqueo Prestación', idbloprestacion));
    modalRef.content.data.subscribe((data) => {
      if (data.estado === true) {
        this.onBuscar();
      }
    });
  }

  setModal(ltitulo: string, lidbloprestacion?: number) {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        titulo: ltitulo,
        idbloprestacion: lidbloprestacion
      }
    };
    return dtModal;
  }

  async buscarbloqueocanal() {
    // try {
    //   this.progressBar.start();
    //   this.load = true;

    //   const canal: OrigenVenta = this.fForm.controls.canal.value;

    //   if (canal.CodOrigenVenta === null) {
    //     this.bloqueoprestaciones = await this.bloqueoprestacionService.getBloPrestacionS(
    //     ).toPromise();
    //   } else {
    //     this.bloqueoprestaciones = await this.bloqueoprestacionService.getBloPrestacionSC(
    //       canal.CodOrigenVenta
    //     ).toPromise();
    //   }
    //   this.bloqueoprestacionespag = this.bloqueoprestaciones.slice(0, 8);

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async buscarbloqueocodprestacion() {
    // try {
    //   if (!this.bForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   const codprestacion = this.bForm.controls.codprestacion.value;

    //   this.bloqueoprestaciones = await this.bloqueoprestacionService.getBloPrestacionSCP(
    //     codprestacion
    //   ).toPromise();

    //   this.bloqueoprestacionespag = this.bloqueoprestaciones.slice(0, 8);

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async loadParametros() {
    // try {

    //   this.progressBar.start();
    //   this.load = true;

    //   this.canales = [];
    //   this.canales = await this.parametrosService.getOrigenVenta().toPromise();
    //   this.canales.push(new OrigenVenta(null, '<TODOS>'));
    //   this.canales.sort((a, b) => (a.CodOrigenVenta > b.CodOrigenVenta) ? 1 : -1);

    //   // this.estbloqueoprestaciones = [];
    //   // this.estbloqueoprestaciones = await this.parametrosService.getEstBloPrestacion().toPromise();

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {

    //   if (err.error === null) {
    //     this.alertSwalError.title = 'Error ' + err.statusText;
    //     this.alertSwalError.show();
    //   } else {
    //     this.alertSwalError.title = err.error.mensaje;
    //     this.alertSwalError.show();
    //   }

    //   this.progressBar.complete();
    //   this.load = false;
    // }
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
