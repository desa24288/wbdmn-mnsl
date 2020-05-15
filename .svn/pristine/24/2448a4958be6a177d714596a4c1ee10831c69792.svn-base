import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as jwt_decode from 'jwt-decode';

import { Bono } from '../../../models/entity/bono/bono';
import { Prestaciones } from '../../../models/entity/bono/prestaciones';

import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from 'src/app/templates/confirm/confirm.component';
import { Profile } from 'src/app/models/entity/usuario/profile';

@Component({
  selector: 'app-emitidoanulado',
  templateUrl: './emitidoanulado.component.html',
  styleUrls: ['./emitidoanulado.component.css']
})
export class EmitidoanuladoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('tabBusqueda') tabBusquedaTabs: TabsetComponent; 

  public profile: Profile;
  public bsModalRef: BsModalRef;

  public fForm: FormGroup;
  public load = false;
  public loading = false;
  public alerts: any[] = [];
  public bono: Bono;
  public estadocambio = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService
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
    this.bono.Prestaciones = Array<Prestaciones[]>();
  }

  onLimpiar() {
    this.fForm.reset();
    this.limpiar();
  }

  limpiar() {
    this.bono = new Bono();
    this.bono.Prestaciones = Array<Prestaciones[]>();
    this.estadocambio = false;
  }

  async onBuscarFolio() {

  }

  onRegula() {
    this.bsModalRef = this.bsModalService.show(ConfirmComponent, this.setModalConfirmar());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
        this.emitircambioestado(this.bono.FolioBono);
      }
    });

  }

  async emitircambioestado(foliobono: string) {
    // try {
    //   if (!this.fForm.valid) {
    //     return;
    //   }
    //   this.loading = true;

    //   const cambioestado = {
    //     FolioBono: foliobono,
    //     RutUsuario: this.profile.RutUsuario
    //   };

    //   await this.creadoemitidoService.postCambioEmitidoAnulado(cambioestado).toPromise();

    //   this.onLimpiar();

    //   this.bono = await this.creadoemitidoService.getBusqueda(foliobono).toPromise();

    //   this.alertSwalOK.title = 'Cambio Realizado de EMITIDO-ANULADO';
    //   this.alertSwalOK.show();

    //   this.progressBar.complete();
    //   this.loading = false;
    // } catch (err) {
    //   this.alertSwalError.title = err.error.mensaje;
    //   this.alertSwalError.show();

    //   this.progressBar.complete();
    //   this.loading = false;
    // }
  }

  setModalConfirmar() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered',
      initialState: {
        titulo: 'Cambio de Estado ',
        mensaje: 'Desea cambiar estado del Bono de EMITIDO A ANULADO ?'
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
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadmin-minsal'));
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