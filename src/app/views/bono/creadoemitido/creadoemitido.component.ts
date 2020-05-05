import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as jwt_decode from 'jwt-decode';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Profile } from 'src/app/models/entity/usuario/profile';
import { Bono } from 'src/app/models/entity/bono/bono';


@Component({
  selector: 'app-creadoemitido',
  templateUrl: './creadoemitido.component.html',
  styleUrls: ['./creadoemitido.component.css']
})

export class CreadoemitidoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent;

  public bsModalRef: BsModalRef;
  public profile: Profile;

  public fForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];
  public bono: Bono;
  public estadocambio = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService,
  ) {
    this.fForm = this.formBuilder.group({
      foliobono: [null, Validators.compose(
        [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')])
      ]
    });
  }

  ngOnInit() {
    this.loadinit();
    this.loadprofile();
  }

  ngAfterViewInit() {
    setTimeout(() => {

    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loadinit() {
    this.bono = new Bono();
  }

  onLimpiar() {
    this.fForm.reset();
    this.limpiar();
  }

  limpiar() {
    this.bono = new Bono();
    this.estadocambio = false;
  }

  async onBuscarFolio() {
    this.progressBar.start();
    try {
      this.alertSwalError.title = 'El estado del bono debe ser : CREADO';
      this.alertSwalError.show();

      this.estadocambio = false;
    } catch (err) {
      this.alertSwalError.title = 'Folio Bono no existe';
      this.alertSwalError.show();
    }

    this.progressBar.complete();
    this.load = false;
  }

  async emitircambioestado(foliobono: string, fechaemision: string, codformapago: number) {
    try {
      if (!this.fForm.valid) {
        return;
      }
      this.loading = true;

      const cambioestado = {
        FolioBono: foliobono,
        RutUsuario: this.profile.RutUsuario,
        FechaEmision: fechaemision,
        CodFormaPago: codformapago
      };

      this.onLimpiar();

      this.alertSwalOK.title = 'Cambio Realizado DE CREADO-EMITIDO';
      this.alertSwalOK.show();

      this.progressBar.complete();
      this.loading = false;
    } catch (err) {
      this.alertSwalError.title = err.error.mensaje;
      this.alertSwalError.show();

      this.progressBar.complete();
      this.loading = false;
    }
  }

  setModalRegula() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-sm',
      initialState: {}
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
        titulo: 'Cambio de Estado ',
        mensaje: 'Desea cambiar estado del Bono de CREADO A EMITIDO ?'
      }
    };
    return dtModal;
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

  loadprofile() {
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadmin'));
    if (uiwebadmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiwebadmin.token);
      this.profile = new Profile();
      this.profile = decodedoken;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return console.log(err);
    }
  }
}
