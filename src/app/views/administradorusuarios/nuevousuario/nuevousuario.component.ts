import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
/* LIBRERIAS */
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { Userprofile } from 'src/app/config/userprofile';
/*SERVICES */
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { ClaveusuariosService } from 'src/app/services/administradorusuarios/claveusuarios.service';
/*MODELS */
import { Crearusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/crearusuario';
import { RutValidator } from 'ng2-rut';
import { Utils } from 'src/app/models/utils/utils';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit, AfterViewInit {
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

  public profile: Userprofile = new Userprofile();
  public cabecera = 'Nuevo Usuario';
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
        rutusuario: [null, [Validators.required, rutValidator]],
        nomusuario: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])]
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

  async onGuardar() {
    this.loading = true;
    const rut = Utils.formatRut(this.lForm.controls.rutusuario.value);
    const nombre = this.lForm.controls.nomusuario.value;
    this.nuevousuario.rutusuario = rut;
    this.nuevousuario.nombre = nombre;
    if (this.lForm.valid) {
      this.claveusuarioService.postCrearUsuario(this.nuevousuario).subscribe(res => {
        this.loading = false;
        this.alertSwal.title = 'Usuario creado';
        this.alertSwal.show();
      }, err => {
        this.loading = false;
        this.alertSwalError.title = err.error.mensaje;
        this.alertSwalError.show();
        return;
      });
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
