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
import { Cambiarpass } from 'src/app/models/entity/usuario/cambiarpass';

@Component({
  selector: 'app-cambiopassword',
  templateUrl: './cambiopassword.component.html',
  styleUrls: ['./cambiopassword.component.css']
})
export class CambiopasswordComponent implements OnInit {
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
  public newpass = '';
  public aplicativo = 'webadmin-minsal';
  public intentoslog = 0;
  public cambiopass: Cambiarpass = new Cambiarpass();
  public rutusuario = '';

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public cambioService: CambiarpasswordService,
    public usuarioService: UsuarioService
  ) {
    this.cargaPropiedades();
    console.log(this.passpattern);
    this.lForm = this.formBuilder.group({
      temppass: [null, Validators.required],
      newpass: [null, Validators.compose([Validators.required, Validators.minLength(this.mincaracteres),
        Validators.pattern(this.passpattern), Validators.maxLength(30)])],
      renewpass: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    // localStorage.removeItem('uiwebadminminsal');
  }

  async cargaPropiedades() {
    this.propiedadesclave = JSON.parse(localStorage.getItem('propiedadesclave'));
    this.mincaracteres = this.propiedadesclave.mincaracteres;
    this.letrasnum = this.propiedadesclave.letrasnum;
    /** Si propiedadesclave.letrasnum==2 newpass1 debe tener solo Letras y Números */
    if (this.letrasnum === '2') {
      this.passpattern = `^[a-zA-Z0-9_]{${this.mincaracteres},30}$`;
    }
    this.cantpassusadas = this.propiedadesclave.passwordusadas;
    this.rutusuario = this.propiedadesclave.rutfuncionario;
  }

  /** VALIDA QUE NEW PASSWORD 1 Y 2 SEAN IGUALES */
  async validaNewpass(value: string, pass: number) {
    switch (pass) {
      case 1:
        this.newpass = this.lForm.controls.renewpass.value;
        break;
      case 2:
        this.newpass = this.lForm.controls.newpass.value;
        break;
    }
    if (value !== this.newpass) {
      this.lForm.controls.renewpass.setErrors(this.lForm.controls.renewpass.markAsDirty);
    } else {
      this.lForm.controls.renewpass.setErrors(null);
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onCambiarpassword() {
    this.loading = true;
    this.cambiopass.user = this.rutusuario;
    this.cambiopass.provisoria = this.lForm.controls.temppass.value;
    this.cambiopass.newpassword = this.lForm.controls.newpass.value;
    this.cambioService.postCambioClave(this.cambiopass).subscribe(res => {
        this.load = false;
        this.loading = false;
        this.alertSwal.title = 'Contraseña Cambiada';
        this.alertSwal.show().then( ok => {
          if (ok.value) {
            /** registrar success log <--- */
            this.successlog(this.rutusuario, 1);
            this.router.navigate(['home']);
          }
        });

      }, err => {
        this.load = false;
        this.loading = false;
        if (err.error !== null) {
          this.uimensaje('danger', `No debe usar sus últimas ${ this.cantpassusadas } contraseñas`, 3000);
        } else {
          this.uimensaje('danger', 'Error en el proceso', 3000);
        }
      }
    );
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
    this.router.navigate(['login']);
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

