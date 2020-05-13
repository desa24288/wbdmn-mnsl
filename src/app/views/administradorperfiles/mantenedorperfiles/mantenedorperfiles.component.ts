import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
/* LIBRERIAS */
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { Userprofile } from 'src/app/config/userprofile';
/*SERVICES */
import { ParametroService } from 'src/app/services/parametros/parametro.service';
/*MODELS */

@Component({
  selector: 'app-mantenedorperfiles',
  templateUrl: './mantenedorperfiles.component.html',
  styleUrls: ['./mantenedorperfiles.component.css']
})
export class MantenedorperfilesComponent implements OnInit, AfterViewInit {
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  public lForm: FormGroup;
  public onClose: Subject<boolean>;
  public alerts: any[] = [];
  public load = false;
  public estado = false;
  public loading = false;

  public profile: Userprofile = new Userprofile();
  public cabecera = 'Mantenedor Perfiles de Usuarios';
  public tipoperfiles: Array<any> = [];
  public estadosperfiles: Array<any> = [];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public parametroService: ParametroService,
  ) {
    this.lForm = this.formBuilder.group(
      {
        codperfil: [{ value: null, disabled: true }, Validators.required],
        descperfil: [{ value: null }, Validators.required],
        tipoperfil: [{ value: null }, Validators.required],
        estadoperfil: [{ value: null }, Validators.required],
      });
  }

  ngOnInit() {
    this.loadInit();
  }
  ngAfterViewInit() {
    setTimeout(() => {
    });
  }

  onCerrar() {
    this.bsModalRef.hide();
  }

  loadInit() {
    this.onClose = new Subject();
    this.lForm.controls.descperfil.setValue('');
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onGuardar() {
    try {
      this.loading = true;
      // console.log(this.noexcede);
      this.loading = false;

    } catch (err) {
      this.loading = false;
      this.alertSwalError.title = 'Error al guardar';
      this.alertSwalError.show();
      return;
    }
  }

  onFocusDescperfil() {
    console.log(this.lForm.controls.descperfil.value);
  }

  onChangeTipoperfil(value: any) {
    console.log(value);
  }

  onChangeEstadoperfil(value: any) {
    console.log(value);
  }

  uimensaje(status: string, texto: string, time: number = 0) {
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
}

