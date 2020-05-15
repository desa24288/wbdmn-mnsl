import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { saveAs as importedSaveAs } from 'file-saver';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DateMenorValidation } from 'src/app/models/validations/DateMenorValidation';
// import { CreadoemitidoService } from 'src/app/services/creadoemitido.service';
// import { Cambioestadobono } from 'src/app/models/entity/bono/cambioestadobono';
// import { InformesService } from 'src/app/services/informes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultacambioestado',
  templateUrl: './consultacambioestado.component.html',
  styleUrls: ['./consultacambioestado.component.css']
})
export class ConsultacambioestadoComponent implements OnInit, AfterViewInit {

  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public fForm: FormGroup;
  public bForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  public estadobusquedaf: boolean = false;
  public estadobusquedab: boolean = false;

  public expfechadesde: string;
  public expfechahasta: string;
  public expfoliobono: string;

  // public cambioestadobonos: Array<Cambioestadobono> = [];
  // public cambioestadobonospag: Array<Cambioestadobono> = [];
  public cambioestadobonos: Array<any> = [];
  public cambioestadobonospag: Array<any> = [];
  public tabSelect = 'tabFechaDesdeHasta';
  public currentPage: number;

  constructor(
    public router: Router,
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public localeService: BsLocaleService,
    // public informesService: InformesService,
    // public creadoemitidoService: CreadoemitidoService
  ) {
    this.fForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required]
    }, {
      validator: [DateMenorValidation('fechadesde', 'fechahasta')]
    });

    this.bForm = this.formBuilder.group({
      foliobono: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.setDate();
  }

  ngAfterViewInit() {
    setTimeout(() => {

    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.cambioestadobonospag = this.cambioestadobonos.slice(startItem, endItem);
  }

  onExportarFecha() {
    this.exportarfecha();
  }

  onExportarFolio() {
    this.exportarfolio();
  }

  onCerrar() {
    this.router.navigate(['/home']);
  }

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
  }

  onBuscar() {
    // switch (this.tabSelect) {
    //   case 'tabFechaDesdeHasta':
    //     if (this.fForm.valid) {
    //       this.buscarfecha();
    //     } else {
    //       this.validateAllFormFields(this.fForm);
    //     }
    //     break;
    //   case 'tabFolioBono':
    //     if (this.bForm.valid) {
    //       this.buscarfoliobono();
    //     } else {
    //       this.validateAllFormFields(this.bForm);
    //     }
    //     break;
    // }
  }

  async buscarfecha() {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   this.expfechadesde = this.datePipe.transform(this.fForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   this.expfechahasta = this.datePipe.transform(this.fForm.controls.fechahasta.value, 'yyyy-MM-dd');

    //   this.cambioestadobonos = await this.creadoemitidoService.getConsultadesdehasta(this.expfechadesde, this.expfechahasta).toPromise();
    //   this.cambioestadobonospag = this.cambioestadobonos.slice(0, 10);

    //   this.setEstadoBusqueda();

    //   if (this.cambioestadobonos.length > 0) {
    //     this.estadobusquedaf = true;
    //   } else {
    //     this.estadobusquedaf = false;
    //   }

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async buscarfoliobono() {
    // try {
    //   if (!this.bForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   // const foliobono = this.bForm.controls['foliobono'].value;
    //   this.expfoliobono = this.bForm.controls.foliobono.value;

    //   this.cambioestadobonos = await this.creadoemitidoService.getConsultafoliobono(this.expfoliobono).toPromise();
    //   this.cambioestadobonospag = this.cambioestadobonos.slice(0, 10);

    //   this.setEstadoBusqueda();

    //   if (this.cambioestadobonos.length > 0) {
    //     this.estadobusquedab = true;
    //   } else {
    //     this.estadobusquedab = false;
    //   }

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async exportarfecha() {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   // const fechadesde = this.datePipe.transform(this.fForm.controls['fechadesde'].value, 'yyyy-MM-dd');
    //   // const fechahasta = this.datePipe.transform(this.fForm.controls['fechahasta'].value, 'yyyy-MM-dd');

    //   const data = await this.informesService.getFechaDesdeCaducado(
    //     this.expfechadesde, this.expfechahasta
    //   ).toPromise();

    //   this.descargarbinario(data);

    //   this.progressBar.complete();
    //   this.load = false;
    //   this.loading = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    //   this.loading = false;
    // }
  }

  async exportarfolio() {
    // try {
    //   if (!this.bForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   // const foliobono = this.bForm.controls['foliobono'].value;

    //   const data = await this.informesService.getFolioBonoCaducado(
    //     this.expfoliobono
    //   ).toPromise();

    //   this.descargarbinario(data);

    //   this.progressBar.complete();
    //   this.load = false;
    //   this.loading = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    //   this.loading = false;
    // }
  }

  setEstadoBusqueda() {
    this.estadobusquedaf = false;
    this.estadobusquedab = false;
  }

  setDate() {
    defineLocale(this.locale, esLocale);
    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onLimpiar() {
    this.fForm.reset();
    this.fForm.controls.fechadesde.setValue(new Date());
    this.fForm.controls.fechahasta.setValue(new Date());
    this.bForm.reset();

    // this.cambioestadobonospag = [];
    // this.cambioestadobonos = [];
  }

  descargarbinario(resp: any) {
    if (resp.headers.get('Content-Type') !== null) {
      if (resp.headers.get('Content-Disposition') !== null) {
        const acontent = resp.headers.get('Content-Disposition').split(';');
        const attachment = acontent[1].split('=');
        attachment[1] = attachment[1].toString().replace(/"/g, '');
        importedSaveAs(new Blob([resp.body], { type: resp.headers.get('Content-Disposition') }), attachment[1]);
      } else {
        this.alertSwalError.title = 'Content-Disposition no encontrado';
        this.alertSwalError.show();
      }
    } else {
      this.alertSwalError.title = 'Content-Type no encontrado';
      this.alertSwalError.show();
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
