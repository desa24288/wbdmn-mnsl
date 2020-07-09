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
import { Claves } from 'src/app/models/entity/usuario/claves';
import { ContadorBlq } from 'src/app/models/entity/bloqueo/contadorBlq';
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
  public claves: Array<Claves> = [];
  public loading = false;

  public diascambiopass = 0;
  public mincaracteres = 0;
  public letrasnum = 0;
  public intentosbloq = 0;
  public contadorintbloq = 0;
  public passwordusadas = 0;
  public diffdias = 0;
  public registros: ContadorBlq = new ContadorBlq();
  public aplicativo = 'webadmin-minsal';
  public intentoslog = 0;

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
      this.diascambiopass = this.propiedades.SW_UPD_PWD2;
      this.mincaracteres = this.propiedades.SW_LEN_PWD;
      /** 1 = No ; 2 = Si */
      this.letrasnum = this.propiedades.SW_TYP_PWD;
      this.intentosbloq = this.propiedades.SW_INT_BLQ;
      this.contadorintbloq = this.intentosbloq;
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
    // se autentica con el servid
    const rutusuario = Utils.formatRut(this.lForm.controls.rutbeneficiario.value);
    this.usuarioService.auth(new Login(rutusuario, value.password)).subscribe(
      data => {
        if (data === '3') {
          this.alertSwalAlert.title = 'Cuenta Bloqueada favor comunicarse con Adminstrador';
          this.alertSwalAlert.show();
          this.load = false;
          return;
        } else {
          const uiwebadminminsal = {
            token: data.token
          };
          localStorage.setItem('uiwebadminminsal', JSON.stringify(uiwebadminminsal));
          this.load = false;
          this.profile =  this.getDecodedAccessToken(data.token);
          console.log(this.profile);
          this.validaDias();
        }
      }, err => {
        this.load = false;
        if (err.statusText === null || err.statusText === undefined || err.statusText === 'Unauthorized') {
          this.uimensaje('danger', 'Error en Usuario u Contraseña', 4000);
          this.usuarioService.getIntentosbloq(rutusuario, this.aplicativo).subscribe(res => {
            console.log(res.CantidadReintento);
            this.loading = true;
            this.intentoslog = res.CantidadReintento;
            this.validaIntentos(rutusuario);
            // tslint:disable-next-line: no-shadowed-variable
            }, err => {
            console.log(err);
          });
        } else {
          this.uimensaje('danger', err.message, 3000);
        }
      }
    );
  }

  validaIntentos(rut: string) {
    if (this.intentoslog >= this.intentosbloq) {
      this.claveService.postBloquearUsuario(rut).subscribe(res => {
        console.log(res);
        this.alertSwalAlert.title = 'Su cuenta se ha bloqueado, favor comunicarse con el administrador';
        this.alertSwalAlert.show();
        this.loading = false;
      });
    } else {
      this.intentosmsj('danger', `Tiene hasta ${ this.intentosbloq } intentos o se bloqueara su cuenta`, 4000);
      this.loading = false;
    }
  }

  validaDias() {
    /** Convierte fecha actual y de última contraseña Vigente a milisegundos para obtener la diferencia en días */
    const fechaclave = new Date(this.profile.fechaupd);
    const inicio = Date.UTC(fechaclave.getFullYear(), fechaclave.getMonth(), fechaclave.getDate());
    const fechactual = new Date();
    const fin = Date.UTC(fechactual.getFullYear(), fechactual.getMonth(), fechactual.getDate());
    const undia = 1000 * 60 * 60 * 24;
    this.diffdias = (fin - inicio) / undia;
    this.validaUsuario();
  }

  validaUsuario() {
    if (this.profile.estado === '5' || this.diffdias > this.diascambiopass ) {
      const propiedadesclave = {
        mincaracteres: this.mincaracteres,
        letrasnum: this.letrasnum,
        passwordusadas: this.passwordusadas
      };
      localStorage.setItem('propiedadesclave', JSON.stringify(propiedadesclave));
      this.router.navigate(['cambiopass']);
    } else {
      this.router.navigate(['home']);
    }
  }

  async contador(rutregistro: string) {
    const fechaintento = new Date();
    console.log(new Date());
    const registrosarr: Array<any> = [];
    registrosarr.push(JSON.stringify(localStorage.getItem('bloqcount')));
    console.log(registrosarr);
    this.registros.registro = fechaintento;
    this.registros.rutusuario = rutregistro;
    console.log(this.registros);
    registrosarr.push(this.registros);
    console.log(registrosarr);
    localStorage.setItem('bloqcount', JSON.stringify(registrosarr));
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
