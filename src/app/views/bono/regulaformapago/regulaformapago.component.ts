import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Formapago } from 'src/app/models/entity/bono/formapago';

@Component({
  selector: 'app-regulaformapago',
  templateUrl: './regulaformapago.component.html',
  styleUrls: ['./regulaformapago.component.css']
})
export class RegulaformapagoComponent implements OnInit {
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  public fForm: FormGroup;

  public formapagos: Array<Formapago> = [];

  constructor(
    private bsModalRef: BsModalRef,
    public formBuilder: FormBuilder
  ) {
    this.fForm = this.formBuilder.group({
      formapago: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadformapagos();
  }

  loadformapagos() {
    this.formapagos.push(new Formapago(6, 'DEBITO'));
    this.formapagos.push(new Formapago(7, 'CREDITO'));
  }

  onAceptar() {
    const forma = this.fForm.controls['formapago'].value;
    const resp = {
      estado: true,
      formapago: forma
    };
    this.data.emit(resp);

    this.bsModalRef.hide();
  }

  onCerrar() {
    this.bsModalRef.hide();
  }
}
