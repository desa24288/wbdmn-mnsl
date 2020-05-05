import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DateMenorValidation } from 'src/app/models/validations/DateMenorValidation';

@Component({
  selector: 'app-caducados',
  templateUrl: './caducados.component.html',
  styleUrls: ['./caducados.component.css']
})
export class CaducadosComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public fForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  constructor(
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public localeService: BsLocaleService
  ) {
    this.fForm = this.formBuilder.group({
      fechadesde: [new Date(), Validators.required],
      fechahasta: [new Date(), Validators.required]
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

  onBuscarFecha() {

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
    this.fForm.controls['fechadesde'].setValue(new Date());
    this.fForm.controls['fechahasta'].setValue(new Date());
  }

}
