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
import { Perfil } from 'src/app/models/entity/adminperfiles/perfil';
import { Menuperfilamiento } from 'src/app/models/entity/adminperfiles/menuperfilamiento';
import { Ejecutable } from 'src/app/models/entity/adminperfiles/ejecutable';

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

  // public datasolicitud: Obtienesolicitud = new Obtienesolicitud();
  // public obtienesolicitud: Obtienesolicitud = new Obtienesolicitud();
  // public solicitud: Solicitud = new Solicitud();
  // public grabarsolicitud: Grabarsolicitud = null;

  public perfiles: Array<Perfil> = [];
  public ejecutables: Array<Ejecutable> = [];
  public menus: Array<Menuperfilamiento> = [];

  public cabecera = 'Perfilamiento de Módulo';
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

  onSelectPerfil(value: any) {
    console.log(value);
  }

  onChangeEjecutable(event: any, value: Ejecutable) {
    // tslint:disable-next-line: radix
    // documentoid.id = parseInt(value.CodPendiente_1);
    if (event.target.checked) {
      console.log(value);
    } else {
      // this.arrdocumento.splice(this.inDocumento(documentoid), 1);
    }
  }

  onChangeMenu(event: any, value: Menuperfilamiento) {
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

