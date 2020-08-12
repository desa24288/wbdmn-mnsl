import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
/* LIBRERIAS */
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
/*SERVICES */
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { CambiarpasswordService } from 'src/app/services/cambiarpassword/cambiarpassword.service';
/*MODELS */
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-restablecerpassword',
  templateUrl: './restablecerpassword.component.html',
  styleUrls: ['./restablecerpassword.component.css']
})
export class RestablecerpasswordComponent implements OnInit, AfterViewInit {
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
  public cabecera = 'Restablecer Contraseña';

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public parametroService: ParametroService,
    public cambioService: CambiarpasswordService
  ) {
    this.lForm = this.formBuilder.group(
      {
        email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(250), Validators.email])]
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
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onEnviar() {
    const email = this.lForm.controls.email.value;
    this.loading = true;
    if (this.lForm.valid) {
      this.cambioService.postEnviarmail(email).subscribe(res => {
        console.log(res);
        this.alertSwal.title = 'Correo Enviado';
        this.alertSwal.text = 'Puede que el correo demore unos minutos o llegue a su bandeja de spam';
        this.alertSwal.show();
        this.loading = false;
      }, err => {
        if (err.error.mensaje === null || err.error.mensaje === undefined) {
          console.log(err);
          this.loading = false;
          this.alertSwalError.title = 'Ocurrio un error';
          this.alertSwalError.show();
          return;
        } else {
          if (err.error.mensaje === 'BLQ') {
            this.loading = false;
            this.alertSwalError.title = 'Cuenta Bloqueada favor comunicarse con Administrador';
            this.alertSwalError.show();
            return;
          } else if (err.error.mensaje === 'DEL') {
            this.loading = false;
            this.alertSwalError.title = 'Cuenta Eliminada favor comunicarse con Administrador';
            this.alertSwalError.show();
            return;
          } else {
            this.loading = false;
            this.alertSwalError.title = err.error.mensaje;
            this.alertSwalError.show();
            return;
          }
        }
      });
    }
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

