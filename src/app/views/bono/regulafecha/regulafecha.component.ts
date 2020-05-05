import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';


@Component({
  selector: 'app-regulafecha',
  templateUrl: './regulafecha.component.html',
  styleUrls: ['./regulafecha.component.css']
})
export class RegulafechaComponent implements OnInit {
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  public onClose: Subject<boolean>;
  public fForm: FormGroup;

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  constructor(
    public datePipe: DatePipe,
    private bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    public localeService: BsLocaleService
  ) {
    this.fForm = this.formBuilder.group({
      fechaemision: [new Date(), Validators.required],
    });
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.setDate();
  }

  setDate() {
    defineLocale(this.locale, esLocale);
    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onAceptar() {
    const fecha = this.datePipe.transform(this.fForm.controls['fechaemision'].value, 'yyyy-MM-dd');
    const resp = {
      estado: true,
      fechaemision: fecha
    };
    this.data.emit(resp);

    this.bsModalRef.hide();
  }

  onCerrar() {
    this.bsModalRef.hide();
  }
}
