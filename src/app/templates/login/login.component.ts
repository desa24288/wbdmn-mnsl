import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as jwt_decode from 'jwt-decode';
import { PropiedadescuentaService } from 'src/app/services/administradorusuarios/propiedadescuenta.service';
import { DatePipe } from '@angular/common';
import { ClaveusuariosService } from 'src/app/services/administradorusuarios/claveusuarios.service';
/** COMPONENTS */
import { RestablecerpasswordComponent } from '../cambiarpassword/restablecerpassword/restablecerpassword.component';
/** MODELS */
import { Login } from 'src/app/models/entity/usuario/login';
import { Utils } from 'src/app/models/utils/utils';
import { Profile } from 'src/app/models/entity/usuario/profile';
import { Actualizarpropiedades } from 'src/app/models/entity/adminusuarios/propiedadescuenta/actualizarpropiedades';
import { exit } from 'process';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  public bsModalRef: BsModalRef;
  public alerts: any[] = [];
  public alertintentos: any[] = [];
  public load = false;
  public lForm: FormGroup;
  public idregla = 1;
  public propiedades: Actualizarpropiedades = new Actualizarpropiedades();
  public loading = false;

  public diascambiopass = 0;
  public mincaracteres = 0;
  public letrasnum = 0;
  public intentosbloq = 0;
  public passwordusadas = 0;
  public aplicativo = 'webadmin-minsal';
  public rutfuncionario = '';

  public profile: Profile = new Profile();

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public bsModalService: BsModalService,
    public usuarioService: UsuarioService,
    public propiedadesService: PropiedadescuentaService,
    public datePipe: DatePipe,
    public claveService: ClaveusuariosService
  ) {
    this.lForm = this.formBuilder.group({
      rutbeneficiario: [null, [Validators.required, rutValidator]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    });
  }

  ngOnInit() {
    localStorage.removeItem('uiwebadminminsal');
    this.validaPropiedades();
  }

  onLogin(value: any) {
     this.autenticacion(value);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async validaPropiedades() {
    this.propiedadesService.getPropiedades(this.idregla).subscribe(res => {
      this.propiedades = res;
      console.log(this.propiedades);
      /** Cantidad de dias permitidos para cambiar contraseña */
      this.diascambiopass = this.propiedades.SW_UPD_PWD2;
      /** Devuelve la cantidad de caracteres permitidos */
      this.mincaracteres = this.propiedades.SW_LEN_PWD;
      /** verifica si solo acepta letras y números */
      /* 1 = No ; 2 = Si */
      this.letrasnum = this.propiedades.SW_TYP_PWD;
      /** Devuelve la cantidad de intentos permitidos */
      this.intentosbloq = this.propiedades.SW_INT_BLQ;
      /** Devuelve numero de ultimas contraseñas usadas permitidas */
      this.passwordusadas = this.propiedades.SW_PWD_UNI;
    }, err => {
      this.uimensaje('danger', 'Error al buscar propiedades de usuario', 3000);
    });
  }

  onRecovery() {
    this.bsModalRef = this.bsModalService.show(RestablecerpasswordComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  async autenticacion(value: any) {
    this.load = true;
    const rutusuario = Utils.formatRut(this.lForm.controls.rutbeneficiario.value);
    this.rutfuncionario = rutusuario;
    this.usuarioService.auth(new Login(rutusuario, value.password)).subscribe(
      data => {
        const uiwebadminminsal = {
          token: data.token
        };
        localStorage.setItem('uiwebadminminsal', JSON.stringify(uiwebadminminsal));
        this.load = false;
        this.profile =  this.getDecodedAccessToken(data.token);
        // this.validaUsr();
        this.successlog(this.rutfuncionario, 1);
        this.router.navigate(['home']);
      },  err => {
        /** Verifica primero si el error es por No Autorizado */
        /** @MLobos */
        if (err.statusText === null || err.statusText === undefined || err.statusText === 'Unauthorized') {
          if (err.error !== null) {
            if (err.error.mensaje === 'Bloqueado') {
              /** Luego si cuenta esta bloqueada */
              this.alertSwalAlert.title = 'Cuenta Bloqueada favor comunicarse con Administrador';
              this.alertSwalAlert.show();
              this.load = false;
            } else if (err.error.mensaje === 'CambiarClaveProv') {
               /** Si clave provisoria caducó */
              this.alertSwalAlert.title = 'Su Contraseña Provisoria ha expirado, debe Recuperar Password';
              this.alertSwalAlert.show();
              this.load = false;
            } else if (err.error.mensaje === 'CambiarClave') {
              /* Si hay diferencia de dias y si está en estado reiniciado */
              this.load = false;
              this.alertSwalAlert.title = 'Debe crear una nueva contraseña';
              this.alertSwalAlert.show().then( val => {
                if (val.value) {
                  const propiedadesclave = {
                    mincaracteres: this.mincaracteres,
                    letrasnum: this.letrasnum,
                    passwordusadas: this.passwordusadas,
                    rutusuario: this.rutfuncionario
                  };
                  localStorage.removeItem('propiedadesclave');
                  localStorage.setItem('propiedadesclave', JSON.stringify(propiedadesclave));
                  this.router.navigate(['cambiopass']);
                }
              });
            }
          } else {
            /** Funcion que guarda los registros fallidos y muestra intentos restantes previo a bloquear cuenta */
            /** @MLobos */
            this.usuarioService.getIntentoslog(this.aplicativo, rutusuario, 2).subscribe( res => {
            this.load = false;
            this.uimensaje('danger', 'Error en Usuario u Contraseña', 4000);
            if (res.intentos === '0') {
                this.intentosmsj('danger', 'Cuenta Bloqueada', 4000);
            } else {
              this.intentosmsj('danger', `Tiene hasta ${ res.intentos } intentos o se bloqueara su cuenta`, 4000);
            }
          // tslint:disable-next-line: no-shadowed-variable
          }, err => {
            this.uimensaje('danger', err.message, 3000);
          });
        }
      } else {
        this.uimensaje('danger', err.message, 3000);
      }
    });
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

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
    }
  }

  setModal() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg'
    };
    return dtModal;
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

  /** Funcion que muestra intentos restantes previo a bloquear cuenta */
  /** @MLobos */
  intentosmsj(status: string, texto: string, time: number = 0) {
    this.alertintentos = [];
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
