import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
/* LIBRERIAS */
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { NgProgressComponent } from '@ngx-progressbar/core';
/* SERVICES */
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { PerfilamientomodulosService } from 'src/app/services/administradorusuarios/perfilamientomodulos.service';
/* MODELS */
import { MensajeSweetAlert } from 'src/app/models/utils/mensaje';
import { Userprofile } from 'src/app/config/userprofile';
import { Perfil } from 'src/app/models/entity/adminperfiles/perfil';
import { Menuperfilamiento } from 'src/app/models/entity/adminperfiles/menuperfilamiento';
import { Ejecutable } from 'src/app/models/entity/adminperfiles/ejecutable';
import { Perfildisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/perfildisponible';

@Component({
  selector: 'app-perfilamientomodulos',
  templateUrl: './perfilamientomodulos.component.html',
  styleUrls: ['./perfilamientomodulos.component.css']
})
export class PerfilamientomodulosComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalConfirmar') alertSwalConfirmar: SwalComponent;

  public uForm: FormGroup;
  public mForm: FormGroup;
  public onClose: Subject<boolean>;
  public alerts: any[] = [];
  public load = false;
  public estado = false;
  public loading = false;

  public perfiles: Array<Perfil> = [];
  public ejecutables: Array<Ejecutable> = [];
  public menus: Array<Menuperfilamiento> = [];

  public cabecera = 'Perfilamiento de Módulo';
  public btnGrabar = false;
  public profile: Userprofile = new Userprofile();
  public mensajeSweetAlert: MensajeSweetAlert = new MensajeSweetAlert();
  public idrol = 1;
  public execname = null;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public perfilamientoService: PerfilamientomodulosService,
    private activatedRoute: ActivatedRoute
  ) {

    this.uForm = this.formBuilder.group(
      {
        perfil: [{ value: null, disabled: false }, Validators.required],
      });

    this.mForm = this.formBuilder.group(
      {
        ejecutablelist: [{ value: null, disabled: false }, Validators.required],
        menulist: [{ value: null, disabled: false }, Validators.required],
      });
  }

  ngOnInit() {
    console.log(this.profile.rutusuario);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setData();
    });
  }

  async setData() {
    this.load = true;
    this.progressBar.start();
    this.perfilamientoService.getPerfiles().subscribe( res => {
      this.perfiles = res;
      this.load = false;
      this.progressBar.complete();
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  getPerfil() {
  }

  inDocumento(perfil: Perfil) {
    // let index = 0;
    // for (const lista of this.arrperfilasig) {
    //   if (perfil.CodPerfilasig === lista.AccionPen_1) {
    //     return index;
    //   } else {
    //     return index++;
    //   }
    // }
    // return -1;
  }

  onCerrar() {
      this.router.navigate(['/home']);
  }

  onNuevoperfil() {
    console.log('click Nuevo Perfil');
  }

  onModificarperfil() {
    console.log('click Modificar Perfil');
  }

  async onSelectPerfil(rolid: any) {
    this.idrol = rolid;
    this.load = true;
    this.progressBar.start();
    this.perfilamientoService.getEjecutables(this.idrol).subscribe( res => {
      this.ejecutables = res;
      this.progressBar.complete();
      this.load = false;
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  onCheckEjecutable(event: any, value: any) {
    this.execname = value;
    if (event.target.checked) {
      this.perfilamientoService.getMenu(this.execname, this.idrol).subscribe( res => {
        this.menus = res;
        console.log(this.menus);
        this.progressBar.complete();
        this.load = false;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onCheckMenu(event: any, value: Menuperfilamiento) {
    // tslint:disable-next-line: radix
    // documentoid.id = parseInt(value.CodPendiente_1);
    if (event.target.checked) {
      console.log(value);
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  compare_perfil(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.CodPerfil === c2.CodPerfil : c1 === c2;
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

