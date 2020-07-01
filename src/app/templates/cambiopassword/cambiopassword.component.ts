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

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public propiedadesService: PropiedadescuentaService,
  ) {
    this.lForm = this.formBuilder.group({
      temporalpass: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      newpass1: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      newpass2: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
    });
  }

  ngOnInit() {
    localStorage.removeItem('uiwebadminminsal');
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

