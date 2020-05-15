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
import { MantencionusuariosService } from 'src/app/services/administradorusuarios/mantencionusuarios.service';
/* MODELS */
import { MensajeSweetAlert } from 'src/app/models/utils/mensaje';
import { Perfildisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/perfildisponible';
import { Compindisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/compindiponible';
import { Utils } from 'src/app/models/utils/utils';

@Component({
  selector: 'app-mantencionusuarios',
  templateUrl: './mantencionusuarios.component.html',
  styleUrls: ['./mantencionusuarios.component.css']
})
export class MantencionusuariosComponent implements OnInit, AfterViewInit {
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

  public perfilasiggrilla: Array<Perfildisponible> = [];
  public arrperfilasig: Array<Perfildisponible> = [];

  public perfilasignados: Array<Perfildisponible> = [];

  public perfildisponibles: Array<Perfildisponible> = [];
  public arrperfildisp: Array<Perfildisponible> = [];

  public compinasignados: Array<Compindisponible> = [];
  public compindisponibles: Array<Compindisponible> = [];

  public cabecera = 'Mantención de Usuarios';
  public btnGrabar = false;

  public mensajeSweetAlert: MensajeSweetAlert = new MensajeSweetAlert();
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public mantencionService: MantencionusuariosService,
    private activatedRoute: ActivatedRoute
  ) {

    this.uForm = this.formBuilder.group(
      {
        rutusuario: [{ value: null, disabled: false }, Validators.required],
        nomusuario: [{ value: null, disabled: true }, Validators.required]
      });

    this.mForm = this.formBuilder.group(
      {
        perfildisplist: [{ value: null, disabled: false }, Validators.required],
        perfilasiglist: [{ value: null, disabled: false }, Validators.required],
        compindisplist: [{ value: null, disabled: false }, Validators.required],
        compinasiglist: [{ value: null, disabled: false }, Validators.required],
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
    });
  }

  checkDocumentos() {
    /* Muestra y agrega los documentos ya cargados en listado*/
    // this.documentosgrilla.forEach(e => {
    //   const arrDoc: Arrdocumento = new Arrdocumento();
    //   if (e.Seleccionado_1 === true) {
    //     // tslint:disable-next-line: radix
    //     arrDoc.id = parseInt(e.CodPendiente_1);
    //     this.arrdocumento.push(arrDoc);
    //   }
    // });
  }

  inPerfil(perfil: Perfildisponible) {
    let index = 0;
    for (const lista of this.arrperfildisp) {
      if (perfil.id_rollm === lista.AccionPen_1) {
        return index;
      } else {
        return index++;
      }
    }
    return -1;
  }

  async onBuscarusuario(value: any) {
    // Rut testing:
    // 11230223-9
    // 18058988-0
    if (value == null || value === '') {
      return;
    } else {
      this.progressBar.start();
      this.load = true;
      const rutusuario = Utils.formatRut(this.uForm.controls.rutusuario.value);
      console.log(rutusuario);
      this.mantencionService.getNombreUsuario(rutusuario).subscribe( res => {
        this.uForm.controls.nomusuario.setValue(res);
        console.log(JSON.stringify(res));
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getPerfilesDisponibles(rutusuario).subscribe( res => {
        this.perfildisponibles = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getPerfilesUsuario(rutusuario).subscribe( res => {
        this.perfilasignados = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getCompinesDisponibles(rutusuario).subscribe( res => {
        this.compindisponibles = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getCompinesUsuario(rutusuario).subscribe( res => {
        this.compinasignados = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      this.progressBar.complete();
      this.load = false;
    }
  }

  setGrabar() {
  }

  async onGuardar() {
    this.setGrabar();
    if ((await this.mensajeSweetAlert.Msgconfirm('¿Desea guardar los cambios?')).value) {
      this.loading = true;
      // this.pendienteService.postGrabarsolicitud(this.grabarsolicitud).subscribe(res => {
      //   this.alertSwal.title = 'Proceso exitoso!';
      //   this.alertSwal.show();
      //   this.loading = false;
      // }, err => {
      //   this.alertSwalAlert.text = err.error.mensaje;
      //   this.alertSwalAlert.show();
      //   this.loading = false;
      // });
    }
  }

  onAgregarperfil(value: any) {
    console.log('click Agrega Perfil!');
  }

  onQuitarperfil(value: any) {
    console.log('click Quitar Perfil!');
  }

  onAgregarcompin(value: any) {
    console.log('click Agrega Compin!');
  }

  onQuitarcompin(value: any) {
    console.log('click Quitar Compin!');
  }

  onLimpiar() {
    this.mForm.reset();
    this.perfilasignados = [];
    this.perfildisponibles = [];
    this.compinasignados = [];
    this.compindisponibles = [];
  }

  onCerrar() {
      this.router.navigate(['/home']);
  }

  onChangePerfilasig(event: any, value: Perfildisponible) {
    // tslint:disable-next-line: radix
    // documentoid.id = parseInt(value.CodPendiente_1);
    if (event.target.checked) {
      console.log(value);
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onChangePerfildisp(event: any, value: Perfildisponible) {
    // tslint:disable-next-line: radix
    // const codperfildisp = parseInt(value.id_rollm);
    if (event.target.checked) {
      this.arrperfildisp.push(value);
    } else {
      // this.arrperfildisp.splice(this.inPerfil(value), 1);
      this.arrperfildisp.splice(this.arrperfildisp.findIndex( x => x.id_rollm === value.id_rollm), 1);
    }
    console.log(this.arrperfildisp);
  }

  onChangeCompinasig(event: any, value: Compindisponible) {
    // tslint:disable-next-line: radix
    // documentoid.id = parseInt(value.CodPendiente_1);
    if (event.target.checked) {
      console.log(value);
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onChangeCompindisp(event: any, value: Compindisponible) {
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

