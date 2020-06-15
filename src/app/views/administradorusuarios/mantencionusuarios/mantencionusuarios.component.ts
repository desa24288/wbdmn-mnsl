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
import { Actualizarperfil } from 'src/app/models/entity/adminusuarios/mantencionusuarios/actualizarperfil';
import { Actualizarcompin } from 'src/app/models/entity/adminusuarios/mantencionusuarios/actualizarcompin';

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
  public actualizarPerfil: Actualizarperfil = new Actualizarperfil();
  public actualizarCompin: Actualizarcompin = new Actualizarcompin();

  public perfilasignados: Array<Perfildisponible> = [];
  public arrperfilasig: Array<Perfildisponible> = [];
  public perfileliminados: Array<Perfildisponible> = [];
  public perfildisponibles: Array<Perfildisponible> = [];
  public arrperfildisp: Array<Perfildisponible> = [];

  public compinasignados: Array<Compindisponible> = [];
  public arrcompinasig: Array<Compindisponible> = [];
  public compineliminados: Array<Compindisponible> = [];
  public compindisponibles: Array<Compindisponible> = [];
  public arrcompindisp: Array<Compindisponible> = [];

  public cabecera = 'Mantención de Usuarios';
  public btnGrabar = false;
  public codupdate = 0;
  public breadroute = null;
  public breadname = null;
  public fromindex = 0;

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
    const indx = localStorage.getItem('from_indx');
    if (indx === '1') {
    this.logicaBread(indx);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getBusquedausuario();
    });
  }

  logicaBread(valor: any) {
    // tslint:disable-next-line: radix
    this.fromindex = parseInt(valor);
    console.log(this.fromindex);
    if (this.fromindex === 1) {
    this.breadname = 'Administrador de Claves de Usuario';
    this.breadroute = '/claveusuarios';
    }
  }

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
    this.progressBar.start();
    if (value == null || value === '') {
      return;
    } else {
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
        this.progressBar.complete();
        this.load = false;
      }, err => {
        this.alertSwalAlert.title = err.error.mensaje;
        this.alertSwalAlert.show();
        this.progressBar.complete();
        this.load = false;
      });
    }
    this.logicaGrabar();
  }

  async onGuardar() {
    console.log(this.compinasignados);
    if ((await this.mensajeSweetAlert.Msgconfirm('¿Desea guardar los cambios?')).value) {
      this.loading = true;
      let i = 1;
      let tipoPerfil = [];
      let tipoCompin = [];
      if (this.perfileliminados.length > 0 ||
        this.compineliminados.length > 0) {
        console.log('Hay Eliminados');
        i = 0;
      }
      for (i; i < 2; i++) {
        if (i === 0) {
          tipoPerfil = this.perfileliminados;
          tipoCompin = this.compineliminados;
          console.log('Hay Eliminados');
          this.codupdate = 3;
          if (tipoPerfil.length === 0) {
            tipoPerfil = this.perfilasignados;
          }
          if (tipoCompin.length === 0) {
            console.log('No Hay Eliminados');
            tipoCompin = this.compinasignados;
          }
        } else {
          tipoPerfil = this.perfilasignados;
          tipoCompin = this.compinasignados;
          this.codupdate = 1;
        }
        this.actualizarPerfil.rutusuario = this.rutusuario;
        this.actualizarPerfil.idupd = this.codupdate;
        this.actualizarCompin.rutusuario = this.rutusuario;
        this.actualizarCompin.idupd = this.codupdate;
        const arrperfil: Array<any> = [];
        const arrcompin: Array<any> = [];
        /* Agregar los idrol de los Perfiles agregados */
        tipoPerfil.forEach( data => {
          // tslint:disable-next-line: radix
          const arrid  = { idrol: parseInt(data.id_rollm) };
          arrperfil.push(arrid);
        });
        /* Agregar los idnss de los Compin agregados */
        tipoCompin.forEach( data => {
          // tslint:disable-next-line: radix
          const arrid  = { idnss: parseInt(data.CodEstablecimiento) };
          arrcompin.push(arrid);
        });

        this.actualizarPerfil.perfiles = arrperfil;
        this.actualizarCompin.compines = arrcompin;
        this.mantencionService.putActualizarPerfiles(this.actualizarPerfil).subscribe(res => {
        }, err => {
          this.alertSwalAlert.text = err.error.mensaje;
          this.alertSwalAlert.show();
          this.loading = false;
        });
        this.mantencionService.putActualizarCompin(this.actualizarCompin).subscribe(res => {
        }, err => {
          this.alertSwalAlert.text = err.error.mensaje;
          this.alertSwalAlert.show();
          this.loading = false;
        });
        this.alertSwal.title = 'Proceso exitoso!';
        this.alertSwal.show();
        this.loading = false;
      }
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
          if (this.perfileliminados.findIndex(z => z.id_rollm === a.id_rollm) >= 0) {
            this.perfileliminados.splice(this.perfileliminados.findIndex(x => x.id_rollm === a.id_rollm), 1);
          }

        });
      }
      this.arrperfildisp = [];
      this.arrperfilasig = [];
      this.mForm.reset();
      this.logicaGrabar();
    }
    console.log(this.perfileliminados);
  }

  onQuitarperfil() {
    this.arrperfilasig.forEach( z => {
      const indx =  this.perfilasignados.findIndex(a => a.id_rollm === z.id_rollm);
      if ( indx >= 0) {
        this.perfilasignados.splice(indx, 1);
      }
      if (this.perfileliminados.length === 0) {
        this.perfileliminados = this.arrperfilasig;
      } else {
          if (this.perfileliminados.findIndex(a => a.id_rollm === z.id_rollm) < 0) {
            this.perfileliminados.push(z);
          }
      }
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
          if (this.compineliminados.findIndex(z => z.CodEstablecimiento === a.CodEstablecimiento) >= 0) {
            this.compineliminados.splice(this.compineliminados.findIndex(x => x.CodEstablecimiento === a.CodEstablecimiento), 1);
          }
        });
      }
      this.arrcompindisp = [];
      this.arrcompinasig = [];
      this.bForm.reset();
      this.logicaGrabar();
    }
    console.log(this.compineliminados);
  }

  onQuitarcompin() {
    this.arrcompinasig.forEach( z => {
      const indx =  this.compinasignados.findIndex(a => a.CodEstablecimiento === z.CodEstablecimiento);
      if ( indx >= 0) {
        this.compinasignados.splice(this.compinasignados.findIndex(x => x.CodEstablecimiento === z.CodEstablecimiento), 1);
      }
      if (this.compineliminados.length === 0) {
        this.compineliminados = this.arrcompinasig;
      } else {
          if (this.compineliminados.findIndex(a => a.CodEstablecimiento === z.CodEstablecimiento) < 0) {
            this.compineliminados.push(z);
          }
      }
    });
    this.logicaGrabar();
    console.log(this.compineliminados);
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
    switch (this.fromindex) {
      case 0:
        this.router.navigate(['/home']);
        break;
      case 1:
        this.router.navigate([this.breadroute]);
        break;
    }
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

