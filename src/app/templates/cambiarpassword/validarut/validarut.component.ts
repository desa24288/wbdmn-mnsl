import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
/* LIBRERIAS */
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
/** COMPONENTS */
import { RestablecerpasswordComponent } from 'src/app/templates/cambiarpassword/restablecerpassword/restablecerpassword.component';
/*SERVICES */
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { CambiarpasswordService } from 'src/app/services/cambiarpassword/cambiarpassword.service';
/*MODELS */
import { Utils } from 'src/app/models/utils/utils';
import { Crearusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/crearusuario';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-validarut',
  templateUrl: './validarut.component.html',
  styleUrls: ['./validarut.component.css']
})
export class ValidarutComponent implements OnInit, AfterViewInit {
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

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public parametroService: ParametroService,
    public cambioService: CambiarpasswordService,
    public bsModalService: BsModalService
  ) {
    this.lForm = this.formBuilder.group(
      {
        rutusuario: [null, [Validators.required, rutValidator]],
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

  async onValidarut() {
    const rutusuario = Utils.formatRut(this.lForm.controls.rutusuario.value);
    console.log(rutusuario);
    this.loading = true;
    if (this.lForm.valid) {
      this.cambioService.getValidarut(rutusuario).subscribe(res => {
        /** Si rut es correcto envia a siguiente modal */
        this.loading = false;
        console.log('OK');
        this.onCerrar();
        this.onValidamail();
      }, err => {
        console.log(err);
        if (err.error === null || err.error.mensaje === null || err.error.mensaje === undefined) {
          this.loading = false;
          this.alertSwalError.title = 'Ocurrio un error';
          this.alertSwalError.show();
          return;
        } else {
          this.loading = false;
          this.alertSwalError.title = err.error.mensaje;
          this.alertSwalError.show();
          return;
        }
      });
    }
  }

  onValidamail() {
    this.bsModalRef = this.bsModalService.show(RestablecerpasswordComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
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
}


