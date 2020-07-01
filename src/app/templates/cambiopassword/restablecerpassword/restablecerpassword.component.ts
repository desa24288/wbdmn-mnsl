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
import { ClaveusuariosService } from 'src/app/services/administradorusuarios/claveusuarios.service';
/*MODELS */
import { Crearusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/crearusuario';
import { RutValidator } from 'ng2-rut';
import { Utils } from 'src/app/models/utils/utils';

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
  public nuevousuario: Crearusuario = new Crearusuario();

  public tipoperfiles: Array<any> = [];
  public estadosperfiles: Array<any> = [];

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public parametroService: ParametroService,
    public claveusuarioService: ClaveusuariosService
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
    this.loading = true;
    // const rut = Utils.formatRut(this.lForm.controls.rutusuario.value);
    const email = this.lForm.controls.email.value;
    console.log(email);
    if (this.lForm.valid) {
      try {
      // this.claveusuarioService.postCrearUsuario(this.nuevousuario).subscribe(res => {
        this.loading = false;
        this.alertSwal.title = 'Correo Enviado';
        this.alertSwal.text = 'Puede que el correo demore unos minutos o llegue a su bandeja de spam';
        this.alertSwal.show();
      } catch(err) {
      // }, err => {
        this.loading = false;
        this.alertSwalError.title = err.error.mensaje;
        this.alertSwalError.show();
        return;
      // });
      }
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
