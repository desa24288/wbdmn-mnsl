import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';
import { CambiarpasswordService } from 'src/app/services/cambiarpassword/cambiarpassword.service';
/** MODELS */
import { Login } from 'src/app/models/entity/usuario/login';
import { Utils } from 'src/app/models/utils/utils';
import { Propiedadesclave } from 'src/app/models/entity/adminusuarios/propiedadescuenta/propiedadesclave';
import { Claves } from 'src/app/models/entity/usuario/claves';
import { Userprofile } from 'src/app/config/userprofile';
import { exit } from 'process';
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
  public claves: Array<Claves> = [];
  /** DATOS USUARIO */
  public profile: Userprofile =  new Userprofile();
  public newpass = '';
  public aplicativo = 'webadmin-minsal';
  public intentoslog = 0;
  public cambiopass: Cambiarpass = new Cambiarpass();

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public cambioService: CambiarpasswordService
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
    console.log(this.profile.rutusuario);
    this.propiedadesclave = JSON.parse(localStorage.getItem('propiedadesclave'));
    this.mincaracteres = this.propiedadesclave.mincaracteres;
    this.letrasnum = this.propiedadesclave.letrasnum;
    /** Si propiedadesclave.letrasnum==2 newpass1 debe tener solo Letras y Números */
    if (this.letrasnum === '2') {
      this.passpattern = `^[a-zA-Z0-9_]{${this.mincaracteres},30}$`;
    }
    this.cantpassusadas = this.propiedadesclave.passwordusadas;
    this.getClaves();
    console.log(this.propiedadesclave);
    console.log(this.mincaracteres);
    console.log(this.letrasnum);
    console.log(this.cantpassusadas);
  }

  getClaves() {
    this.cambioService.getHistClaves(this.profile.rutusuario, this.cantpassusadas).subscribe(res => {
      this.claves = res;
      console.log(this.claves);
    }, err => {
      console.log(err);
    });
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

  async onValidarpassword() {
    this.loading = true;
    /** VALIDA QUE LA NUEVA CONTRASEÑA NO SEA IGUAL A X USADAS */
    const newpass = this.lForm.controls.newpass.value;
    let passexist = false;
    this.claves.forEach(res => {if (res.Clave === newpass) { passexist = true; }});
    if (passexist) {
      this.alertSwalAlert.title = `No debe usar las últimas ${this.cantpassusadas} contraseñas usadas`;
      this.alertSwalAlert.show();
      this.loading = false;
    } else {
        this.cambiarpassword();
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async cambiarpassword() {
    // this.router.navigate(['home']);
    this.loading = true;
    // this.cambiopass.user = Utils.formatRut(this.profile.rutusuario);
    this.cambiopass.user = this.profile.rutusuario;
    this.cambiopass.provisoria = this.lForm.controls.temppass.value;
    this.cambiopass.newpassword = this.lForm.controls.newpass.value;
    this.cambioService.postCambioClave(this.cambiopass).subscribe(res => {
        this.load = false;
        this.loading = false;
        this.alertSwal.title = 'Contraseña Cambiada';
        this.alertSwal.show().then( ok => {
          if (ok.value) {
            this.router.navigate(['home']);
          }
        });

      }, err => {
        this.load = false;
        this.loading = false;
        if (err.error.mensaje === null || err.error.mensaje === undefined) {
          this.uimensaje('danger', 'Error en el proceso', 3000);
        } else {
          this.uimensaje('danger', err.error.mensaje, 3000);
        }
      }
    );
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

