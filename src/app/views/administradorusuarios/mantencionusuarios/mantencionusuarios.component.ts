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
/* MODELS */
import { MensajeSweetAlert } from 'src/app/models/utils/mensaje';
import { Userprofile } from 'src/app/config/userprofile';
import { Perfilasignado } from 'src/app/models/entity/adminusuarios/mantencionusuarios/perfilasignado';
import { Perfildisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/perfildisponible';
import { Compinasignado } from 'src/app/models/entity/adminusuarios/mantencionusuarios/compingasignado';
import { Compindisponible } from 'src/app/models/entity/adminusuarios/mantencionusuarios/compindiponible';

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

  // public datasolicitud: Obtienesolicitud = new Obtienesolicitud();
  // public obtienesolicitud: Obtienesolicitud = new Obtienesolicitud();
  // public solicitud: Solicitud = new Solicitud();
  // public grabarsolicitud: Grabarsolicitud = null;

  public perfilasignados: Array<Perfilasignado> = [];
  public perfilasiggrilla: Array<Perfilasignado> = [];
  public arrperfilasig: Array<Perfilasignado> = [];
  public perfildisponibles: Array<Perfildisponible> = [];
  public compinasignados: Array<Compinasignado> = [];
  public compindisponibles: Array<Compindisponible> = [];

  public cabecera = 'Mantención de Usuarios';
  public btnGrabar = false;
  public profile: Userprofile = new Userprofile();
  public mensajeSweetAlert: MensajeSweetAlert = new MensajeSweetAlert();
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {

    this.uForm = this.formBuilder.group(
      {
        rutusuario: [{ value: null, disabled: true }, Validators.required],
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
    console.log(this.profile.rutusuario);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setData();
    });
  }

  async setData() {
    try {
      this.progressBar.start();
      // this.xFolioCompin = this.paramLicencia.NumServicioSalud + '-' +
      //                      this.paramLicencia.AnoRecepcion + '-' +
      //                      this.paramLicencia.FolioCompin + '-' +
      //                      this.paramLicencia.CorrelHijo;
      // this.uForm.controls.nrolicencia.setValue(this.paramLicencia.NumServicio + '-' +
      //   this.paramLicencia.NumFormulario);
      // this.uForm.controls.foliocompin.setValue(this.xFolioCompin);
      // this.uForm.controls.ruttrabajador.setValue(this.paramLicencia.RutTrabajador);
      // this.uForm.controls.nomtrabajador.setValue(this.paramLicencia.NombresTra);

      // this.datasolicitud =
      // await this.pendienteService.postObtienesolicitud(this.obtienesolicitud).toPromise();
      // this.perfilasiggrilla = this.datasolicitud.perfilasignadas;
      this.checkDocumentos();
      this.progressBar.complete();
    } catch (err){
      this.progressBar.complete();
    }
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

  inDocumento(perfil: Perfilasignado) {
    let index = 0;
    for (const lista of this.arrperfilasig) {
      if (perfil.CodPerfilasig === lista.AccionPen_1) {
        return index;
      } else {
        return index++;
      }
    }
    return -1;
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

  onChangePerfilasig(event: any, value: Perfilasignado) {
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
    // documentoid.id = parseInt(value.CodPendiente_1);
    if (event.target.checked) {
      console.log(value);
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onChangeCompinasig(event: any, value: Compinasignado) {
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

