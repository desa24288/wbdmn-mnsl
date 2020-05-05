import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import * as jwt_decode from 'jwt-decode';

import { AlertComponent } from 'ngx-bootstrap/alert';
// import { OrigenVenta } from 'src/app/models/entity/bloqueo/origenventa';
// import { ParametrosService } from 'src/app/services/parametros.service';
// import { BloqueoprestacionService } from 'src/app/services/bloqueoprestacion.service';
// import { Bloqueoprestacion } from 'src/app/models/entity/bloqueo/bloqueoprestacion';
// import { EstBloPrestacion } from 'src/app/models/entity/bloqueo/estbloprestacion';
// import { DescripcionPrestacion } from 'src/app/models/entity/bloqueo/descripcionprestacion';
import { Profile } from 'src/app/models/entity/usuario/profile';

@Component({
  selector: 'app-editarbloqueo',
  templateUrl: './editarbloqueo.component.html',
  styleUrls: ['./editarbloqueo.component.css']
})
export class EditarbloqueoComponent implements OnInit, AfterViewInit {
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild('alertSwalOK') alertSwalOK: SwalComponent;
  @ViewChild('alertSwalInfo') alertSwalInfo: SwalComponent;

  @Input() titulo: string;
  @Input() idbloprestacion: number;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  public resp: any = {};
  public onClose: Subject<boolean>;
  public fForm: FormGroup;
  public alerts: any[] = [];

  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-blue';

  public profile: Profile;
  public loading = false;
  public isbloqueo = true;
  public isenabled = true;
  // public bloqueoprestacion: Bloqueoprestacion = new Bloqueoprestacion();
  // public canales: Array<OrigenVenta> = [];
  // public descripcionPrestacion: DescripcionPrestacion;

  constructor(
    public datePipe: DatePipe,
    private bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    public localeService: BsLocaleService,
    // public parametrosService: ParametrosService,
    // public bloqueoprestacionService: BloqueoprestacionService
  ) {
    this.fForm = this.formBuilder.group({
      codprestacion: ['', Validators.required],
      gloprestacion: [{ value: null, disabled: true }, Validators.required],
      canal: [null, Validators.required],
      grupo: [{ value: null, disabled: true }, Validators.required],
      subgrupo: [{ value: null, disabled: true }, Validators.required],
      rutusuariobloqueo: [{ value: null, disabled: true }, Validators.required],
      nombreusuariobloqueo: [{ value: null, disabled: true }],
      rutusuariodesbloqueo: [{ value: null, disabled: true }, Validators.required],
      fechabloqueo: [{ value: null, disabled: true }]
    });
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.setInit();
    this.setDate();
    this.setData(false);
    this.loadprofile();
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      await this.loadData();
    });
  }

  setInit() {
    // this.bloqueoprestacion.FechaBloqueo = new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy');
  }

  setDate() {
    defineLocale(this.locale, esLocale);
    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onDesbloquear() {
    this.desbloquear();
  }

  /*
  async onLostfocusCodPrestacion(event: any) {
    try {
      this.loading = true;

      const codprestacion: string = event.target.value;
      if (codprestacion.toString().trim() === '') {
        return;
      }

      this.descripcionPrestacion = await this.bloqueoprestacionService.getBloPrestacionSGP(codprestacion).toPromise();
      if (this.descripcionPrestacion !== null) {
        this.fForm.controls.gloprestacion.setValue(this.descripcionPrestacion.GloPrestLarga);
      } else {
        this.fForm.controls.codprestacion.setValue('');
        this.fForm.controls.gloprestacion.setValue('');
        this.alertSwalError.title = 'Prestación no existe';
        this.alertSwalError.show();
      }

      this.loading = false;
    } catch (err) {
      this.loading = false;
      if (err.error === null) {
        this.alertSwalError.title = err.statusText;
        this.alertSwalError.show();
      } else {
        this.alertSwalError.title = err.error.mensaje;
        this.alertSwalError.show();
      }
    }
  }
  */

  async onChangeCodPrestacionCanal() {
    // try {
    //   if (this.fForm.controls.canal.enabled === false ||
    //     this.fForm.controls.codprestacion.enabled === false) {
    //     return;
    //   }
    //   const codprestacion: string = this.fForm.controls.codprestacion.value;
    //   if (codprestacion.toString().trim() === '') {
    //     return;
    //   }
    //   const origenventa: OrigenVenta = this.fForm.controls.canal.value;
    //   if (origenventa === null) {
    //     return;
    //   }

    //   this.loading = true;

    //   // verifica si ya esta bloqueada la prestación
    //   this.bloqueoprestacion = await this.bloqueoprestacionService.getBloPrestacionSCPO(
    //     codprestacion, origenventa.CodOrigenVenta
    //   ).toPromise();

    //   if (this.bloqueoprestacion !== null) {
    //     this.isenabled = true;
    //     this.alertSwalInfo.title = 'Prestación ya se encuentra bloqueada';
    //     this.alertSwalInfo.show();
    //   } else {
    //     this.isenabled = false;
    //     // valida que exista la prestación
    //     this.descripcionPrestacion = await this.bloqueoprestacionService.getBloPrestacionSGP(codprestacion).toPromise();

    //     if (this.descripcionPrestacion !== null) {
    //       this.fForm.controls.gloprestacion.setValue(this.descripcionPrestacion.GloPrestLarga);
    //       this.fForm.controls.grupo.setValue(this.descripcionPrestacion.Grupo);
    //       this.fForm.controls.subgrupo.setValue(this.descripcionPrestacion.SubGrupo);
    //     } else {
    //       this.fForm.controls.codprestacion.setValue('');
    //       this.fForm.controls.gloprestacion.setValue('');
    //       this.fForm.controls.grupo.setValue('');
    //       this.fForm.controls.subgrupo.setValue('');
    //       this.alertSwalError.title = 'Prestación no existe';
    //       this.alertSwalError.show();
    //     }
    //   }

    //   this.loading = false;
    // } catch (err) {
    //   this.loading = false;
    //   if (err.error === null) {
    //     this.alertSwalError.title = err.statusText;
    //     this.alertSwalError.show();
    //   } else {
    //     this.alertSwalError.title = err.error.mensaje;
    //     this.alertSwalError.show();
    //   }
    // }
  }

  getBloqueoprestacion() {
    const form = this.fForm.getRawValue();
    // this.bloqueoprestacion = new Bloqueoprestacion();
    // this.bloqueoprestacion.CodPrestacion = this.fForm.controls.codprestacion.value;
    // this.bloqueoprestacion.GloPrestacion = this.fForm.controls.gloprestacion.value;
    // this.bloqueoprestacion.OrigenVenta = this.fForm.controls.canal.value;
    // this.bloqueoprestacion.RutUsuarioBloqueo = this.profile.RutUsuario;
    // this.bloqueoprestacion.NombreUsuarioBloqueo = this.profile.NombreUsuario;
    // this.bloqueoprestacion.EstBloPrestacion = new EstBloPrestacion(1, '');
  }

  async bloquear() {
    // try {
    //   this.loading = true;

    //   this.getBloqueoprestacion();
    //   await this.bloqueoprestacionService.postBloPrestacionI(this.bloqueoprestacion).toPromise();

    //   this.setData(true);

    //   this.alertSwalOK.title = 'Prestación Bloqueada';
    //   this.alertSwalOK.show();

    //   this.loading = false;
    // } catch (err) {
    //   this.loading = false;
    //   if (err.error === null) {
    //     this.alertSwalError.title = err.statusText;
    //     this.alertSwalError.show();
    //   } else {
    //     this.alertSwalError.title = err.error.mensaje;
    //     this.alertSwalError.show();
    //   }
    // }
  }

  async desbloquear() {
    // try {
    //   this.loading = true;
    //   const params = {
    //     IdBloPrestacion: Number(this.idbloprestacion),
    //     RutUsuarioDesBloqueo: this.profile.RutUsuario
    //   };
    //   await this.bloqueoprestacionService.postBloPrestacionUB(params).toPromise();

    //   this.setData(true);

    //   this.alertSwalOK.title = 'Prestación Desbloqueada';
    //   this.alertSwalOK.show();

    //   this.loading = false;
    // } catch (err) {
    //   this.loading = false;
    //   if (err.error === null) {
    //     this.alertSwalError.title = err.statusText;
    //     this.alertSwalError.show();
    //   } else {
    //     this.alertSwalError.title = err.error.mensaje;
    //     this.alertSwalError.show();
    //   }
    // }
  }

  async loadData() {
    try {
      this.loading = true;

    //   this.canales = [];
    //   this.canales = await this.parametrosService.getOrigenVenta().toPromise();

    //   if (this.idbloprestacion !== undefined) {
    //     this.bloqueoprestacion = await this.bloqueoprestacionService.getBloPrestacionSI(this.idbloprestacion).toPromise();
    //     this.loadBloqueoprestacion();
    //     this.isBloqueo();
    //     this.isbloqueo = false;
    //   } else {
      this.fForm.controls.rutusuariobloqueo.setValue(this.profile.RutUsuario);
      this.fForm.controls.nombreusuariobloqueo.setValue(this.profile.NombreUsuario);
    //     this.isbloqueo = true;
    //   }

      this.loading = false;
    } catch (err) {
      this.loading = false;
      if (err.error === null) {
        this.uimensaje('danger', err.statusText, 3000);
      } else {
        this.uimensaje('danger', err.error.mensaje, 3000);
      }
    }
  }

  onCerrar() {
    this.data.emit(this.resp);
    this.bsModalRef.hide();
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onBloquear() {
    this.bloquear();
  }

  setData(lestado: boolean, ldata: string = '') {
    this.resp = {
      estado: lestado,
      data: ldata
    };
  }

  loadBloqueoprestacion() {
    // this.fForm.controls.codprestacion.setValue(this.bloqueoprestacion.CodPrestacion);
    // this.fForm.controls.gloprestacion.setValue(this.bloqueoprestacion.GloPrestacion);
    // this.fForm.controls.canal.setValue(this.bloqueoprestacion.OrigenVenta);
    // this.fForm.controls.grupo.setValue(this.bloqueoprestacion.Grupo);
    // this.fForm.controls.subgrupo.setValue(this.bloqueoprestacion.SubGrupo);
    // this.fForm.controls.rutusuariobloqueo.setValue(this.bloqueoprestacion.RutUsuarioBloqueo);
    // this.fForm.controls.nombreusuariobloqueo.setValue(this.bloqueoprestacion.NombreUsuarioBloqueo);

    // if (this.bloqueoprestacion.FechaBloqueo !== '01-01-1900 00:00:00') {
    //   this.fForm.controls.fechabloqueo.setValue(this.bloqueoprestacion.FechaBloqueo);
    // }
  }

  isBloqueo() {
    // this.fForm.controls.codprestacion.disable();
    // this.fForm.controls.canal.disable();
    // if (this.bloqueoprestacion.EstBloPrestacion.CodEstBloPrestacion === 1) {
    //   this.isbloqueo = true;
    // } else {
    //   this.isbloqueo = false;
    // }
  }

  compare_canal(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.CodOrigenVenta === c2.CodOrigenVenta : c1 === c2;
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

  loadprofile() {
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadmin'));
    if (uiwebadmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiwebadmin.token);
      this.profile = new Profile();
      this.profile = decodedoken;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return console.log(err);
    }
  }
}
