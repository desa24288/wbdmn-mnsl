import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
/* LIBRERIAS & SERVICES */
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { ParametroService } from 'src/app/services/parametros/parametro.service';
import { MantenedorperfilesService } from 'src/app/services/administradorusuarios/mantenedorperfiles.service';
/*MODELS */
import { Tipo } from 'src/app/models/entity/adminperfiles/tipo';
import { Estado } from 'src/app/models/entity/adminperfiles/estado';
import { Modificarperfil } from 'src/app/models/entity/adminperfiles/modificarperfil';
import { Perfil } from 'src/app/models/entity/adminperfiles/perfil';

@Component({
  selector: 'app-mantenedorperfiles',
  templateUrl: './mantenedorperfiles.component.html',
  styleUrls: ['./mantenedorperfiles.component.css']
})
export class MantenedorperfilesComponent implements OnInit, AfterViewInit {
  @ViewChild('alertSwal') alertSwal: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;
  @ViewChild('alertSwalConfirmar') alertSwalConfirmar: SwalComponent;
  @ViewChild('alertSwalError') alertSwalError: SwalComponent;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @Input() rolid: any;
  @Input() tipomodal: number;

  public lForm: FormGroup;
  public onClose: Subject<boolean>;
  public alerts: any[] = [];
  public load = false;
  public estado = false;
  public loading = false;
  public acepta = false;

  public cabecera = 'Mantenedor Perfiles de Usuarios';
  public tipoperfiles: Array<Tipo> = [];
  public estadosperfiles: Array<Estado> = [];
  public perfil: Perfil = new Perfil();
  public modificarperfil: Modificarperfil = new Modificarperfil();


  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public parametroService: ParametroService,
    public mantenedorServices: MantenedorperfilesService
  ) {
    this.lForm = this.formBuilder.group(
      {
        codperfil: [{ value: null, disabled: false }, Validators.required],
        descperfil: [{ value: null }, Validators.required],
        tipoperfil: [{ value: null }, Validators.required],
        estadoperfil: [{ value: null }, Validators.required],
      });
  }

  ngOnInit() {
    this.lForm.controls.descperfil.setValue('');
    this.loading = true;
    this.loadInit();
    this.setData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
    });
  }

  onCerrar() {
    this.onClose.next(this.acepta);
    this.bsModalRef.hide();
  }

  loadInit() {
    this.onClose = new Subject();
  }

  async setData() {
    console.log(this.lForm.controls.descperfil.value);
    try {
      this.tipoperfiles = await this.mantenedorServices.getTipos().toPromise();
      console.log(this.tipoperfiles);
      this.estadosperfiles = await this.mantenedorServices.getEstados().toPromise();
      console.log(this.estadosperfiles);
      /*Verifica si es Editable o Nuevo Perfil */
      this.logicaModal();
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.alertSwalError.title = `Error: ${ err.error.mensaje }`;
      this.alertSwalError.show();
    }
  }

  logicaModal() {
    if (this.tipomodal === 2) {
      console.log('MODIFICAR');
      this.lForm.controls.codperfil.disable();
      this.mantenedorServices.getPerfil(this.rolid).subscribe( res => {
        this.perfil = res;
        console.log(this.perfil);
        this.lForm.controls.codperfil.setValue(this.rolid);
        this.lForm.controls.descperfil.setValue(this.perfil.ds_rolLM);
        this.lForm.controls.tipoperfil.setValue(this.perfil.id_tipoperfil);
        this.lForm.controls.estadoperfil.setValue(this.perfil.id_estrol);
      }, err => {
        this.loading = false;
        this.alertSwalError.title = err.error.mensaje;
        this.alertSwalError.show();
      });
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onGuardar() {
    this.modificarperfil.ds_rolLM = this.lForm.controls.descperfil.value;
    this.modificarperfil.id_RolLM = this.lForm.controls.codperfil.value;
    this.modificarperfil.id_estrol = this.lForm.controls.estadoperfil.value;
    this.modificarperfil.id_tipoperfil = this.lForm.controls.tipoperfil.value;
    console.log(this.modificarperfil);
    this.mantenedorServices.putActualizarperfil(this.modificarperfil).subscribe( res => {
      this.acepta = true;
      this.alertSwal.title = 'Proceso exitoso';
      this.alertSwal.show();
      this.loading = false;
    }, err => {
      this.loading = false;
      this.alertSwalError.title = err.error.mensaje;
      this.alertSwalError.show();
    });
  }

  onAceptar() {
    this.loading = true;
    if (this.lForm.valid) {
      if (this.tipomodal === 2) {
        this.alertSwalConfirmar.title = `¿Desea Modificar Perfil ?`;
        this.alertSwalConfirmar.show().then(ok => {
          if (ok.value) {
            this.onGuardar();
          } else { this.loading = false; }
        });
      } else {
        this.onGuardar();
      }
    } else {
      this.loading = false;
      this.alertSwalError.title = 'Campos Faltantes';
      this.alertSwalError.show();
    }
  }

  onFocusDescperfil() {
    console.log(this.lForm.controls.descperfil.value);
  }

  onChangeTipoperfil(value: any) {
    console.log(value);
  }

  onChangeEstadoperfil(value: any) {
    console.log(value);
  }

  compare_tipo(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id_tipoperfil === c2.id_tipoperfil : c1 === c2;
  }

  compare_estado(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id_estrol === c2.id_estrol : c1 === c2;
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

