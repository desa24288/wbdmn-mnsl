import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PropiedadescuentaService } from 'src/app/services/administradorusuarios/propiedadescuenta.service';
/** MODELS */
import { Login } from 'src/app/models/entity/usuario/login';
import { Utils } from 'src/app/models/utils/utils';
import { Propiedadesclave } from 'src/app/models/entity/adminusuarios/propiedadescuenta/propiedadesclave';

@Component({
  selector: 'app-cambiopassword',
  templateUrl: './cambiopassword.component.html',
  styleUrls: ['./cambiopassword.component.css']
})
export class CambiopasswordComponent implements OnInit {
  public bsModalRefRecovery: BsModalRef;
  public bsModalRefCambiar: BsModalRef;
  public alerts: any[] = [];
  public lForm: FormGroup;
  public load = false;
  public propiedadesclave: Propiedadesclave = new Propiedadesclave();
  public mincaracteres = 30;
  public letrasnum = '1';
  public passwordusadas = 0;
  public passpattern = null;

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public propiedadesService: PropiedadescuentaService,
  ) {
    this.cargaPropiedades();
    console.log(this.passpattern);
    this.lForm = this.formBuilder.group({
      temporalpass: [null, Validators.required],
      newpass1: [null, Validators.compose([Validators.required, Validators.minLength(this.mincaracteres),
        Validators.pattern(this.passpattern), Validators.maxLength(30)])],
      newpass2: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    localStorage.removeItem('uiwebadminminsal');
  }

  async cargaPropiedades() {
    this.propiedadesclave = JSON.parse(localStorage.getItem('propiedadesclave'));
    this.mincaracteres = this.propiedadesclave.mincaracteres;
    this.letrasnum = this.propiedadesclave.letrasnum;
    /** Si propiedadesclave.letrasnum==2 newpass1 debe tener solo Letras y Números */
    if (this.letrasnum === '2') {
      this.passpattern = `^[a-zA-Z0-9_]{${this.mincaracteres},30}$`;
    }
    this.passwordusadas = this.propiedadesclave.passwordusadas;
    console.log(this.propiedadesclave);
    console.log(this.mincaracteres);
    console.log(this.letrasnum);
    console.log(this.passwordusadas);
  }
  onValidarpassword(value: any) {
     console.log('SE VALIDA PASSWORD');
     this.cambiarpassword(value);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  cambiarpassword(value: any) {
    console.log(value);
    this.router.navigate(['home']);
    // this.load = true;
    // se autentica con el servidor
    // const rutusuario = Utils.formatRut(this.lForm.controls.rutbeneficiario.value);
    // this.usuarioService.auth(new Login(rutusuario, value.password)).subscribe(
    //   data => {
    //     const uiwebadminminsal = {
    //       token: data.token
    //     };
    //     localStorage.setItem('uiwebadminminsal', JSON.stringify(uiwebadminminsal));
    //     this.load = false;
    //     this.router.navigate(['home']);
    //   }, err => {
    //     this.load = false;
    //     if (err.error === null) {
    //       this.uimensaje('danger', err, 3000);
    //     } else {
    //       this.uimensaje('danger', err, 3000);
    //     }
    //   }
    // );
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

