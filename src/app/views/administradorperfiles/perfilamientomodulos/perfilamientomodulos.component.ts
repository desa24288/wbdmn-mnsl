import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
/* LIBRERIAS Y SERVICIOS*/
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { PerfilamientomodulosService } from 'src/app/services/administradorusuarios/perfilamientomodulos.service';
/* MODELS */
import { MensajeSweetAlert } from 'src/app/models/utils/mensaje';
import { Userprofile } from 'src/app/config/userprofile';
import { Perfiles } from 'src/app/models/entity/adminperfiles/perfiles';
import { Menuperfilamiento } from 'src/app/models/entity/adminperfiles/menuperfilamiento';
import { Ejecutable } from 'src/app/models/entity/adminperfiles/ejecutable';
import { Perfildisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/perfildisponible';
import { Actualizar } from 'src/app/models/entity/adminperfiles/actualizar';
import { Ejecutables } from 'src/app/models/entity/adminperfiles/ejecutables';
import { MantenedorperfilesComponent } from '../mantenedorperfiles/mantenedorperfiles.component';

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
  public bsModalRef: BsModalRef;

  public perfiles: Array<Perfiles> = [];
  public ejecutables: Array<Ejecutable> = [];
  public menus: Array<Menuperfilamiento> = [];
  public arrejecutable: Array<Ejecutables> = [];

  public cabecera = 'Perfilamiento de Módulo';
  public btnGrabar = false;
  public profile: Userprofile = new Userprofile();
  public mensajeSweetAlert: MensajeSweetAlert = new MensajeSweetAlert();
  public idrol = null;
  public execname = null;
  public accionmodal = 0;
  public existeperfil = false;
  public selectedRow: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public perfilamientoService: PerfilamientomodulosService,
    private bsModalService: BsModalService,
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
      const data = JSON.parse(localStorage.getItem('busquedaperfilamiento'));
      this.uForm.controls.perfil.setValue(data.rolid);
      this.onSelectPerfil();
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  onCerrar() {
      this.router.navigate(['/home']);
  }

  onLimpiar() {
    this.uForm.reset();
    this.mForm.reset();
    this.ejecutables = [];
    this.menus = [];
  }

  async onMantenedorEdit(accion: number) {
    this.accionmodal  = accion;
    this.bsModalRef = this.bsModalService.show(MantenedorperfilesComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
        this.setData();
      }
    });
  }

  setModal() {
    /* tipomodal=1 si corresponde a un nuevo perfil, 2 si es modificar perfil*/
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered',
      initialState: {
        rolid: this.idrol,
        tipomodal: this.accionmodal
      }
    };
    return dtModal;
  }

  async onModificarperfil(tipo: number) {
    // Graba a @Perfil los Exec con @CctlExecname indicando @AccionDcto = '1'
    // Borra a @Perfil los Exec con @CctlExecname indicando @AccionDcto = '2'
    // LiGraRolExes 1, 'licman', '2'
    this.alertSwalConfirmar.title = `¿Desea Modificar Perfil ?`; // <- poner rut usuario
    this.alertSwalConfirmar.show().then(ok => {
      if (ok.value) {
        this.modificarPerfil();
        this.alertSwal.title = `Perfil Modificado`;
        this.alertSwal.show();
      }
      // this.buscarUsuarios();
      // this.usuariosseleccionados = [];

      // this.onCerrar();
    });
  }

  modificarPerfil() {
    const ejecutable: Actualizar = new Actualizar();
    ejecutable.id_RolLM = this.idrol;
    ejecutable.ejecutable = this.arrejecutable;
    this.perfilamientoService.putActualizarPerfil(ejecutable).subscribe( res => {
      return true;
    });
  }

  async onSelectPerfil() {
    const perfil: any = this.uForm.controls.perfil.value;
    this.idrol = perfil;
    this.setBusqueda(perfil);
    this.existeperfil = true;
    this.load = true;
    this.progressBar.start();
    this.perfilamientoService.getEjecutables(this.idrol).subscribe( res => {
      this.ejecutables = res;
      this.logicaExec();
      this.onCheckObjecto(this.ejecutables[0]);
      this.progressBar.complete();
      this.load = false;
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  setBusqueda(perfil: any) {
    const paramperfilamiento = {
      rolid: perfil};
    localStorage.removeItem('busquedaperfilamiento');
    localStorage.setItem('busquedaperfilamiento', JSON.stringify(paramperfilamiento));
  }


  async logicaExec() {
    this.arrejecutable = [];
    const selecexec: Ejecutables = new Ejecutables();
    this.ejecutables.forEach( z => {
      if (z.AccionDcto === '1') {
        selecexec.CctlExecname = z.CCtlExeName;
        selecexec.AccionDcto = '1';
        this.arrejecutable.push(selecexec);
        z.Seleccionado_1 = true;

      } else {
        z.Seleccionado_1 = false;
      }
    });
  }

  async onCheckEjecutable(event: any, value: any) {
    this.execname = value;
    const selecexec: Ejecutables = new Ejecutables();
    if (event.target.checked) {
      // this.perfilamientoService.getMenu(this.execname, this.idrol).subscribe( res => {
      //   this.menus = res;
        selecexec.CctlExecname = value;
        selecexec.AccionDcto = '1';
        if (this.arrejecutable.length === 0) {
          this.arrejecutable.push(selecexec);
        } else {
          this.arrejecutable.forEach( e => {
            if (e.CctlExecname !== value) {
              // this.arrejecutable.splice(this.arrejecutable.findIndex(x => x.CctlExecname === value), 1);
              this.arrejecutable.push(selecexec);
            } else { return; }
          });
        }
        // this.logicaMenu();
        // this.progressBar.complete();
        // this.load = false;
      // }, err => {
      //   this.alertSwalAlert.title = err.error.mensaje;
      //   this.alertSwalAlert.show();
      //   this.progressBar.complete();
      //   this.load = false;
      // });
    } else {
      this.arrejecutable.forEach(e => {
        if (e.CctlExecname === value) {
          this.arrejecutable.splice(this.arrejecutable.findIndex(x => x.CctlExecname === value), 1);
          selecexec.CctlExecname = value;
          selecexec.AccionDcto = '2';
          this.arrejecutable.push(selecexec);
        }
      });
    }
  }

  async onCheckObjecto(ejecutable: Ejecutable) {
    this.selectedRow = ejecutable.CCtlExeName;
    this.execname = ejecutable.CCtlExeName;
    const selecexec: Ejecutables = new Ejecutables();
    this.selectedRow = ejecutable.CCtlExeName;
    this.perfilamientoService.getMenu(this.execname, this.idrol).subscribe( res => {
      this.menus = res;
      // selecexec.CctlExecname = this.selectedRow;
      // selecexec.AccionDcto = '1';
      // if (this.arrejecutable.length === 0) {
      //   this.arrejecutable.push(selecexec);
      // } else {
      //   this.arrejecutable.forEach( e => {
      //     if (e.CctlExecname !== this.selectedRow) {
      //       // this.arrejecutable.splice(this.arrejecutable.findIndex(x => x.CctlExecname === value), 1);
      //       this.arrejecutable.push(selecexec);
      //     } else { return; }
      //   });
      // }
      this.logicaMenu();
      this.progressBar.complete();
      this.load = false;
    }, err => {
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
      this.progressBar.complete();
      this.load = false;
    });
  }

  logicaMenu() {
    this.menus.forEach( z => {
      if (z.Estado === '1') {
        z.Seleccionado_1 = true;
      } else {
        z.Seleccionado_1 = false;
      }
    });
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

