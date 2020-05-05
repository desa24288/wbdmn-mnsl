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
import { Router } from '@angular/router';
import { Adjunto } from 'src/app/models/entity/adjunto/adjunto';
import { AdjuntosportalService } from 'src/app/services/adjuntosportal.service';
import { RutValidator } from 'ng2-rut';
import { Utils } from 'src/app/models/utils/utils';


@Component({
  selector: 'app-consultaadjunto',
  templateUrl: './consultaadjunto.component.html',
  styleUrls: ['./consultaadjunto.component.css']
})
export class ConsultaadjuntoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public fForm: FormGroup;
  public bForm: FormGroup;
  public rForm: FormGroup;
  public eForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  public adjuntos: Array<Adjunto> = [];
  public adjuntospag: Array<Adjunto> = [];
  public tabSelect = 'tabFechaDesdeHasta';
  public currentPage: number;

  constructor(
    public router: Router,
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public rutValidator: RutValidator,
    public localeService: BsLocaleService,
    public adjuntosportalService: AdjuntosportalService
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

    this.rForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required],
      rutprestador: [null, [Validators.required, rutValidator]]
    }, {
      validator: [DateMenorValidation('fechadesde', 'fechahasta')]
    });

    this.eForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required],
      rutbeneficiario: [null, [Validators.required, rutValidator]]
    }, {
      validator: [DateMenorValidation('fechadesde', 'fechahasta')]
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
    this.adjuntospag = this.adjuntos.slice(startItem, endItem);
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
    //   case 'tabRutPrestador':
    //     if (this.rForm.valid) {
    //       this.buscarrutprestador();
    //     } else {
    //       this.validateAllFormFields(this.rForm);
    //     }
    //     break;
    //   case 'tabRutBeneficiario':
    //     if (this.eForm.valid) {
    //       this.buscarrutbeneficiario();
    //     } else {
    //       this.validateAllFormFields(this.rForm);
    //     }
    //     break;
    // }
  }

  async onDescargarAdjunto(idadjunto: number) {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;
    //   this.loading = true;

    //   const data = await this.adjuntosportalService.getDocumento(idadjunto).toPromise();

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

  async buscarfecha() {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   const fechadesde = this.datePipe.transform(this.fForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   const fechahasta = this.datePipe.transform(this.fForm.controls.fechahasta.value, 'yyyy-MM-dd');

    //   this.adjuntos = await this.adjuntosportalService.getConsultadesdehasta(fechadesde, fechahasta).toPromise();
    //   this.adjuntospag = this.adjuntos.slice(0, 10);

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

    //   const foliobono = this.bForm.controls.foliobono.value;

    //   this.adjuntos = await this.adjuntosportalService.getConsultafoliobono(foliobono).toPromise();
    //   this.adjuntospag = this.adjuntos.slice(0, 10);

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async buscarrutprestador() {
    // try {
    //   if (!this.rForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   const fechadesde = this.datePipe.transform(this.rForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   const fechahasta = this.datePipe.transform(this.rForm.controls.fechahasta.value, 'yyyy-MM-dd');
    //   const rutprestador = Utils.formatRut(this.rForm.controls.rutprestador.value);

    //   this.adjuntos = await this.adjuntosportalService.getConsultarutprestadorfecha(rutprestador, fechadesde, fechahasta).toPromise();
    //   this.adjuntospag = this.adjuntos.slice(0, 10);

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
  }

  async buscarrutbeneficiario() {
    // try {
    //   if (!this.eForm.valid) {
    //     return;
    //   }
    //   this.progressBar.start();
    //   this.load = true;

    //   const fechadesde = this.datePipe.transform(this.eForm.controls.fechadesde.value, 'yyyy-MM-dd');
    //   const fechahasta = this.datePipe.transform(this.eForm.controls.fechahasta.value, 'yyyy-MM-dd');
    //   const rutbeneficiario = Utils.formatRut(this.eForm.controls.rutbeneficiario.value);

    //   this.adjuntos = await this.adjuntosportalService.getConsultarutbeneficiariofecha(rutbeneficiario, fechadesde, fechahasta).toPromise();
    //   this.adjuntospag = this.adjuntos.slice(0, 10);

    //   this.progressBar.complete();
    //   this.load = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.load = false;
    // }
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
    this.rForm.reset();
    this.eForm.reset();

    this.adjuntospag = [];
    this.adjuntos = [];
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
