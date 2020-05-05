import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Login } from 'src/app/models/entity/usuario/login';
import { Utils } from 'src/app/models/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public bsModalRefRecovery: BsModalRef;
  public bsModalRefCambiar: BsModalRef;
  public alerts: any[] = [];
  public lForm: FormGroup;
  public load = false;

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService
  ) {
    this.lForm = this.formBuilder.group({
      rutbeneficiario: [null, [Validators.required, rutValidator]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    });
  }

  ngOnInit() {
  }

  onLogin(value: any) {
    this.autenticacion(value);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  autenticacion(value: any) {
    this.load = true;
    // se autentica con el servidor
    const rutbeneficiario = Utils.formatRut(this.lForm.controls.rutbeneficiario.value);
    this.usuarioService.auth(new Login(rutbeneficiario, value.password)).subscribe(
      data => {
        const uiwebadmin = {
          token: data.token
        };
        localStorage.setItem('uiwebadmin', JSON.stringify(uiwebadmin));
        this.load = false;
        this.router.navigate(['home']);
      }, err => {
        this.load = false;
        if (err.error === null) {
          this.uimensaje('danger', err.statusText, 3000);
        } else {
          this.uimensaje('danger', err.error.mensaje, 3000);
        }
      }
    );
  }

  /*
  onRecovery() {

    this.bsModalRefRecovery = this.bsModalService.show(RecuperarpassComponent, this.setModalRecuperar());
    this.bsModalRefRecovery.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }
  */

  /*
  cambiarpassword() {
    this.bsModalRefCambiar = this.bsModalService.show(TransitoriapassComponent, this.setModalCambiar(this.lForm.controls['login'].value));
    this.bsModalRefCambiar.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  setModalRecuperar() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-md'
    };
    return dtModal;
  }

  setModalCambiar(login: string) {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-md',
      initialState: {
        'login': login
      }
    };
    return dtModal;
  }
  */

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
