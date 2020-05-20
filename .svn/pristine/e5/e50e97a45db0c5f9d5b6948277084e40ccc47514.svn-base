import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { saveAs as importedSaveAs } from 'file-saver';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DateMenorValidation } from 'src/app/models/validations/DateMenorValidation';
// import { Consultabono } from 'src/app/models/entity/bono/consultabono';
// import { ConsultabonoService } from 'src/app/services/consultabono.service';
// import { InformesService } from 'src/app/services/informes.service';
import { Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Utils } from 'src/app/models/utils/utils';

@Component({
  selector: 'app-consultabono',
  templateUrl: './consultabono.component.html',
  styleUrls: ['./consultabono.component.css']
})
export class ConsultabonoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public fForm: FormGroup;
  public pForm: FormGroup;
  public bForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];

  public estadobusquedaf: boolean = false;
  public estadobusquedap: boolean = false;
  public estadobusquedab: boolean = false;

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  // public consultabonos: Array<Consultabono> = [];
  // public consultabonospag: Array<Consultabono> = [];
  public consultabonos: Array<any> = [];
  public consultabonospag: Array<any> = [];
  public tabSelect = 'tabFechaDesdeHastaRutB';
  public currentPage: number;

  public minDate = new Date();

  public expfechadesde: string;
  public expfechahasta: string;
  public exprutprestador: string;
  public exprutbeneficiario: string;
  public expfoliobono: string;

  constructor(
    public router: Router,
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public rutValidator: RutValidator,
    public localeService: BsLocaleService,
    // public informesService: InformesService,
    // public consultabonoService: ConsultabonoService
  ) {
    this.fForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required],
      rutbeneficiario: [null, [Validators.required, rutValidator]]
    }, {
      validator: [DateMenorValidation('fechadesde', 'fechahasta')]
    });

    this.pForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required],
      rutprestador: [null, [Validators.required, rutValidator]]
    }, {
      validator: [DateMenorValidation('fechadesde', 'fechahasta')]
    });

    this.bForm = this.formBuilder.group({
      foliobono: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.setDate();
  }

  ngAfterViewInit() {
    setTimeout(() => {

    });
  }

  onSelect(data: TabDirective): void {
    this.tabSelect = data.id;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.consultabonospag = this.consultabonos.slice(startItem, endItem);
  }

  onCerrar() {
    this.router.navigate(['/home']);
  }

  onBuscar() {
    // switch (this.tabSelect) {
    //   case 'tabFechaDesdeHastaRutB':
    //     if (this.fForm.valid) {
    //       this.buscarfecharutbeneficiario();
    //     } else {
    //       this.validateAllFormFields(this.fForm);
    //     }
    //     break;
    //   case 'tabFechaDesdeHastaRutP':
    //     if (this.pForm.valid) {
    //       this.buscarfecharutprestador();
    //     } else {
    //       this.validateAllFormFields(this.pForm);
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

  onExportarRutBeneficiario() {
    this.exportarfecharutbeneficiario();
  }

  onExportarRutPrestador() {
    this.exportarrutprestador();
  }

  onExportarFolioBono() {
    this.exportarfoliobono()
  }

  async buscarfecharutbeneficiario() {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   this.expfechadesde = this.datePipe.transform(this.fForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   this.expfechahasta = this.datePipe.transform(this.fForm.controls.fechahasta.value, 'yyyy-MM-dd');
    //   this.exprutbeneficiario = Utils.formatRut(this.fForm.controls.rutbeneficiario.value);

    //   this.consultabonos = await this.consultabonoService.getFechaDesdeHastaBeneficiario(
    //     this.expfechadesde, this.expfechahasta, this.exprutbeneficiario
    //   ).toPromise();

    //   this.setEstadoBusqueda();

    //   if (this.consultabonos.length > 0) {
    //     this.estadobusquedaf = true;
    //   } else {
    //     this.estadobusquedaf = false;
    //   }

    //   this.consultabonospag = this.consultabonos.slice(0, 10);
    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async buscarfecharutprestador() {
    // try {
    //   if (!this.pForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;


    //   this.expfechadesde = this.datePipe.transform(this.pForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   this.expfechahasta = this.datePipe.transform(this.pForm.controls.fechahasta.value, 'yyyy-MM-dd');
    //   this.exprutprestador = Utils.formatRut(this.pForm.controls.rutprestador.value);

    //   this.consultabonos = await this.consultabonoService.getFechaDesdeHastaPrestador(
    //     this.expfechadesde, this.expfechahasta, this.exprutprestador
    //   ).toPromise();

    //   this.setEstadoBusqueda();
    //   if (this.consultabonos.length > 0) {
    //     this.estadobusquedap = true;
    //   } else {
    //     this.estadobusquedap = false;
    //   }

    //   this.consultabonospag = this.consultabonos.slice(0, 10);
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

    //   this.consultabonos = await this.consultabonoService.getFolioBono(
    //     this.expfoliobono
    //   ).toPromise();

    //   this.setEstadoBusqueda();
    //   if (this.consultabonos.length > 0) {
    //     this.estadobusquedab = true;
    //   } else {
    //     this.estadobusquedab = false;
    //   }

    //   this.consultabonospag = this.consultabonos.slice(0, 10);
    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async exportarfecharutbeneficiario() {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   /*
    //   const fechadesde = this.datePipe.transform(this.fForm.controls['fechadesde'].value, 'yyyy-MM-dd');
    //   const fechahasta = this.datePipe.transform(this.fForm.controls['fechahasta'].value, 'yyyy-MM-dd');
    //   const rutbeneficiario = this.fForm.controls['rutbeneficiario'].value;
    //   */
    //   const data = await this.informesService.getFechaDesdeHastaBeneficiario(
    //     this.expfechadesde, this.expfechahasta, this.exprutbeneficiario
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

  async exportarrutprestador() {
    // try {
    //   if (!this.pForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   /*
    //   const fechadesde = this.datePipe.transform(this.pForm.controls['fechadesde'].value, 'yyyy-MM-dd');
    //   const fechahasta = this.datePipe.transform(this.pForm.controls['fechahasta'].value, 'yyyy-MM-dd');
    //   const rutprestador = this.pForm.controls['rutprestador'].value;
    //   */
    //   const data = await this.informesService.getFechaDesdeHastaPrestador(
    //     this.expfechadesde, this.expfechahasta, this.exprutprestador
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

  async exportarfoliobono() {
    // try {
    //   if (!this.bForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   // const foliobono = this.bForm.controls['foliobono'].value;

    //   const data = await this.informesService.getFolioBono(
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
    this.estadobusquedap = false;
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

    this.pForm.reset();
    this.pForm.controls.fechadesde.setValue(new Date());
    this.pForm.controls.fechahasta.setValue(new Date());

    this.bForm.reset();

    this.estadobusquedaf = false;
    this.estadobusquedap = false;
    this.estadobusquedab = false;

    // this.consultabonos = [];
    // this.consultabonospag = [];
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
