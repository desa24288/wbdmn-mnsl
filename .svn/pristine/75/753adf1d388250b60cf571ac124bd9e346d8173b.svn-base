import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';
import { CambiarpasswordService } from 'src/app/services/cambiarpassword/cambiarpassword.service';
import { UsuarioService } from 'src/app/services/usuario.service';
/** MODELS */
import { Propiedadesclave } from 'src/app/models/entity/adminusuarios/propiedadescuenta/propiedadesclave';
// import { Userprofile } from 'src/app/config/userprofile';
import { Cambiarmail } from 'src/app/models/entity/usuario/cambiarmail';
import { Userprofile } from 'src/app/config/userprofile';

@Component({
  selector: 'app-registrarcorreo',
  templateUrl: './registrarcorreo.component.html',
  styleUrls: ['./registrarcorreo.component.css']
})
export class RegistrarcorreoComponent implements OnInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  public loading = false;
  public bsModalRefRecovery: BsModalRef;
  public bsModalRefCambiar: BsModalRef;
  public alerts: any[] = [];
  public lForm: FormGroup;
  public load = false;
  public propiedadesclave: Propiedadesclave = new Propiedadesclave();
  public mincaracteres = 30;
  public letrasnum = '1';
  public cantpassusadas = 0;
  public passpattern = null;
  /** DATOS USUARIO */
  // public profile: Userprofile =  new Userprofile();
  public email = '';
  public aplicativo = 'webadmin-minsal';
  public intentoslog = 0;
  public cambioemail: Cambiarmail = new Cambiarmail();
  public rutusuario = '';
  public usrconectado = false;
  public cabecera = 'Registrar Correo';
  public userprofile: Userprofile = new Userprofile();

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public cambioService: CambiarpasswordService,
    public usuarioService: UsuarioService
  ) {
    this.cargaPropiedades();
    this.lForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.maxLength(250), Validators.email])],
      remail: [null, Validators.compose([Validators.required, Validators.maxLength(250), Validators.email])]
    });
  }

  ngOnInit() {
    console.log(this.usrconectado);
  }

  async cargaPropiedades() {
    this.propiedadesclave = JSON.parse(localStorage.getItem('propiedadesclave'));
    this.usrconectado = this.propiedadesclave.conectado;
  }

  /** VALIDA QUE AMBOS EMAIL SEAN IGUALES */
  async validaEmail(value: string, pass: number) {
    switch (pass) {
      case 1:
        this.email = this.lForm.controls.remail.value;
        break;
      case 2:
        this.email = this.lForm.controls.email.value;
        break;
    }
    if (value !== this.email) {
      this.lForm.controls.remail.setErrors(this.lForm.controls.remail.markAsDirty);
    } else {
      this.lForm.controls.remail.setErrors(null);
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onGuardaremail() {
    this.loading = true;
    this.cambioemail.rutusuario = this.userprofile.rutusuario;
    this.cambioemail.email = this.lForm.controls.email.value;
    console.log(this.cambioemail);
    this.loading = false;
    // this.cambioService.postCambioClave(this.cambioemail).subscribe(res => {
    //     this.load = false;
    //     this.loading = false;
    //     this.alertSwal.title = 'Contraseña Cambiada';
    //     this.alertSwal.show().then( ok => {
    //       if (ok.value) {
    //         /** registrar success log <--- */
    //         this.successlog(this.rutusuario, 1);
    //         this.router.navigate(['home']);
    //       }
    //     });

    //   }, err => {
    //     console.log(err);
    //     this.load = false;
    //     this.loading = false;
    //     if (err.error !== null) {
    //       if (err.error.mensaje === 'claveusada') {
    //         this.uimensaje('danger', `No debe usar sus últimas ${ this.cantpassusadas } contraseñas`, 3000);
    //       } else {
    //         this.uimensaje('danger', err.error.mensaje, 3000);
    //       }
    //     } else {
    //       this.uimensaje('danger', 'Error en el proceso', 3000);
    //     }
    //   }
    // );
  }

  /** Funcion que registra las conexiones exitosas */
  /* Este registro en conjunto con las conexiones fallidas sirven para el bloqueo de cuenta */
  /** @MLobos */
  async successlog(rutusuario: string, connexitosa: number) {
    this.usuarioService.getIntentoslog(this.aplicativo, rutusuario, connexitosa).subscribe(async res => {
      }, err => {
        this.uimensaje('danger', err.message, 3000);
      });
  }

  onCerrar() {
    if (this.usrconectado === true) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
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


