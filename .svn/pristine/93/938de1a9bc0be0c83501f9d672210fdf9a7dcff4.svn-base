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
import { PropiedadescuentaService } from 'src/app/services/administradorusuarios/propiedadescuenta.service';
/*MODELS */
import { Actualizarpropiedades } from 'src/app/models/entity/adminusuarios/propiedadescuenta/actualizarpropiedades';

@Component({
  selector: 'app-propiedadescuenta',
  templateUrl: './propiedadescuenta.component.html',
  styleUrls: ['./propiedadescuenta.component.css']
})
export class PropiedadescuentaComponent implements OnInit, AfterViewInit {
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
  public cabecera = 'Propiedades Cuenta Usuario SLM';
  public actpropiedades: Actualizarpropiedades = new Actualizarpropiedades();
  public idregla = 1;
  public idcomponente = 'LICENCIA';
  public SW_UPD_PWD1_ = null;
  public SW_TYP_PWD_ = null;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public propiedadesService: PropiedadescuentaService,
  ) {
    this.lForm = this.formBuilder.group(
      {
        cantidad: [{ value: null }],
        cantidaddia: [{ value: null }],
        caracterminimo: [{ value: null }],
        bloquearcuenta: [{ value: null }],
        ultimasusadas: [{ value: null }]
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
    this.propiedadesService.getPropiedades(this.idregla).subscribe( res => {
      this.actpropiedades = res;
      this.lForm.controls.cantidaddia.setValue(this.actpropiedades.SW_UPD_PWD2);
      this.lForm.controls.caracterminimo.setValue(this.actpropiedades.SW_LEN_PWD);
      this.lForm.controls.bloquearcuenta.setValue(this.actpropiedades.SW_INT_BLQ);
      this.lForm.controls.ultimasusadas.setValue(this.actpropiedades.SW_PWD_UNI);
      this.SW_TYP_PWD_ = this.actpropiedades.SW_TYP_PWD;
      this.SW_UPD_PWD1_ = this.actpropiedades.SW_UPD_PWD1;
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onGuardar() {
    if (this.lForm.valid) {
      this.loading = true;
      try {
        const propiedades: Actualizarpropiedades = new Actualizarpropiedades();
        propiedades.ID_Componente = this.idcomponente;
        propiedades.ID_REGLA = this.idregla;
        propiedades.SW_UPD_PWD1 = this.SW_UPD_PWD1_;
        propiedades.SW_UPD_PWD2 = this.lForm.controls.cantidaddia.value;
        propiedades.SW_LEN_PWD = this.lForm.controls.caracterminimo.value;
        propiedades.SW_TYP_PWD = this.SW_TYP_PWD_;
        propiedades.SW_INT_BLQ = this.lForm.controls.bloquearcuenta.value;
        propiedades.SW_PWD_UNI = this.lForm.controls.ultimasusadas.value;
        this.propiedadesService.putActualizarpropiedades(propiedades).subscribe( res => {
          this.alertSwal.title = 'Guardado con éxito';
          this.alertSwal.show();
        });
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.alertSwalError.title = 'Error al guardar';
        this.alertSwalError.show();
        return;
      }
    }
  }

  async onCheckPrimeracon(event: any) {
    let checkupdpass = null;
    if (event.target.checked) {
      checkupdpass = 'S';
    } else {
      checkupdpass = 'N';
    }
    this.SW_UPD_PWD1_ = checkupdpass;
  }

  onCheckLetrasynumeros(event: any) {
    let checkletrasynum = null;
    if (event.target.checked) {
      checkletrasynum = '2';
    } else {
      checkletrasynum = '1';
    }
    this.SW_TYP_PWD_ = checkletrasynum;
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

