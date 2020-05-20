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
import { Actualizarperfiles } from 'src/app/models/entity/adminusuarios/mantencionusuarios/actualizarperfiles';

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
  public bForm: FormGroup;
  public onClose: Subject<boolean>;
  public alerts: any[] = [];
  public load = false;
  public estado = false;
  public loading = false;
  public rutusuario = null;
  public actualizarPerfil: Actualizarperfiles = new Actualizarperfiles();

  public perfilasignados: Array<Perfildisponible> = [];
  public arrperfilasig: Array<Perfildisponible> = [];
  public perfildisponibles: Array<Perfildisponible> = [];
  public arrperfildisp: Array<Perfildisponible> = [];

  public compinasignados: Array<Compindisponible> = [];
  public arrcompinasig: Array<Compindisponible> = [];
  public compindisponibles: Array<Compindisponible> = [];
  public arrcompindisp: Array<Compindisponible> = [];

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
        perfildisponible: [{ value: null, disabled: false }, Validators.required],
        perfilasignado: [{ value: null, disabled: false }, Validators.required],
      });
    this.bForm = this.formBuilder.group(
      {
        compindisponible: [{ value: null, disabled: false }, Validators.required],
        compinasignado: [{ value: null, disabled: false }, Validators.required],
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getBusquedausuario();
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

  // inPerfil(perfil: Perfildisponible) {
  //   let index = 0;
  //   for (const lista of this.arrperfildisp) {
  //     if (perfil.id_rollm === lista.AccionPen_1) {
  //       return index;
  //     } else {
  //       return index++;
  //     }
  //   }
  //   return -1;
  // }

  logicaGrabar() {
    if (this.compinasignados.length > 0 ||
      this.perfilasignados.length > 0) {
        this.btnGrabar = true;
      } else {
        this.btnGrabar = false;
      }
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
      this.rutusuario = Utils.formatRut(this.uForm.controls.rutusuario.value);
      this.mantencionService.getNombreUsuario(this.rutusuario).subscribe( res => {
        this.uForm.controls.nomusuario.setValue(res);
        this.setParametros(this.rutusuario);
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getPerfilesDisponibles(this.rutusuario).subscribe( res => {
        this.perfildisponibles = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getPerfilesUsuario(this.rutusuario).subscribe( res => {
        this.perfilasignados = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getCompinesDisponibles(this.rutusuario).subscribe( res => {
        this.compindisponibles = res;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
      await this.mantencionService.getCompinesUsuario(this.rutusuario).subscribe( res => {
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
      const codupdate = 3;
      this.actualizarPerfil.rutusuario = this.rutusuario;
      this.actualizarPerfil.idupd = codupdate;
      const arrperfil: Array<any> = [];
      /* Agregar los idroll de los Perfiles agregados */
      this.perfilasignados.forEach( data => {
        // tslint:disable-next-line: radix
        const arrid  = { idroll: parseInt(data.id_rollm) };
        arrperfil.push(arrid);
      });
      this.actualizarPerfil.perfiles = arrperfil;
      this.mantencionService.postActualizarPerfiles(this.actualizarPerfil).subscribe(res => {
        this.alertSwal.title = 'Proceso exitoso!';
        this.alertSwal.show();
        this.loading = false;
      }, err => {
        this.alertSwalAlert.text = err.error.mensaje;
        this.alertSwalAlert.show();
        this.loading = false;
      });
    }
  }

  async getBusquedausuario() {
    const admusuarios = JSON.parse(localStorage.getItem('busquedarut'));
    if (admusuarios !== null) {
      const rutusuario = admusuarios.rutusuario;
      this.uForm.controls.rutusuario.setValue(rutusuario);
      // localStorage.setItem('busquedausuario', JSON.stringify(admusuarios));
      this.onBuscarusuario(rutusuario);
    }
  }

 setParametros(rut: string) {
    const paramusuario = {
      rutusuario: rut };
    localStorage.removeItem('busquedarut');
    localStorage.setItem('busquedarut', JSON.stringify(paramusuario));
  }

  async onAgregarperfil() {
    if (this.arrperfildisp.length > 0) {
      if (this.perfilasignados.length === 0) {
        this.perfilasignados = this.arrperfildisp;
      } else {
        this.arrperfildisp.forEach(a => {
          if (this.perfilasignados.findIndex(b => b.id_rollm === a.id_rollm) < 0) {
            this.perfilasignados.push(a);
          } else { }
        });
      }
      this.arrperfildisp = [];
      this.arrperfilasig = [];
      this.mForm.reset();
      this.logicaGrabar();
    }
  }

  onQuitarperfil() {
    this.arrperfilasig.forEach( z => {
      this.perfilasignados.splice(this.perfilasignados.findIndex(x => x.id_rollm === z.id_rollm), 1);
    });
    this.logicaGrabar();
  }

  async onAgregarcompin() {
    if (this.arrcompindisp.length > 0) {
      if (this.compinasignados.length === 0) {
        this.compinasignados = this.arrcompindisp;
      } else {
        this.arrcompindisp.forEach(a => {
          if (this.compinasignados.findIndex(b => b.CodEstablecimiento === a.CodEstablecimiento) < 0) {
            this.compinasignados.push(a);
          } else { }
        });
      }
      this.arrcompindisp = [];
      this.arrcompinasig = [];
      this.bForm.reset();
      this.logicaGrabar();
    }
  }

  onQuitarcompin() {
    this.arrcompinasig.forEach( z => {
      this.compinasignados.splice(this.compinasignados.findIndex(x => x.CodEstablecimiento === z.CodEstablecimiento), 1);
    });
    this.logicaGrabar();
  }

  onLimpiar() {
    this.uForm.reset();
    this.perfilasignados = [];
    this.arrperfilasig = [];
    this.perfildisponibles = [];
    this.arrperfildisp = [];
    this.compinasignados = [];
    this.arrcompinasig = [];
    this.compindisponibles = [];
    this.arrcompindisp = [];
  }

  onCerrar() {
      this.router.navigate(['/home']);
  }

  onChangePerfildisp(event: any, value: Perfildisponible) {
    if (event.target.checked) {
      this.arrperfildisp.push(value);
    } else {
      this.arrperfildisp.splice(this.arrperfildisp.findIndex( x => x.id_rollm === value.id_rollm), 1);
    }
  }

  onChangePerfilasig(event: any, value: Perfildisponible) {
    if (event.target.checked) {
      this.arrperfilasig.push(value);
    } else {
      this.arrperfilasig.splice(this.arrperfilasig.findIndex( x => x.id_rollm === value.id_rollm), 1);
    }
  }

  onChangeCompindisp(event: any, value: Compindisponible) {
    if (event.target.checked) {
      this.arrcompindisp.push(value);
    } else {
      // this.arrperfildisp.splice(this.inPerfil(value), 1);
      this.arrcompindisp.splice(this.arrcompindisp.findIndex( x => x.CodEstablecimiento === value.CodEstablecimiento), 1);
    }
  }

  onChangeCompinasig(event: any, value: Compindisponible) {
    if (event.target.checked) {
      this.arrcompinasig.push(value);
    } else {
      // this.arrperfildisp.splice(this.inPerfil(value), 1);
      this.arrcompinasig.splice(this.arrcompinasig.findIndex( x => x.CodEstablecimiento === value.CodEstablecimiento), 1);
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

