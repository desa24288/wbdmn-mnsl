import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgProgressComponent } from '@ngx-progressbar/core';
/*COMPONENTES*/

/*SERVICIOS*/
import { CargainvalidezService } from 'src/app/services/adminvalidez/cargainvalidez.service';
import * as XLSX from 'xlsx';
import { Archivoxls } from 'src/app/models/entity/adminvalidez/archivoxls';

const { read, write, utils } = XLSX;
type AOA = any[][];

@Component({
  selector: 'app-cargainvalidez',
  templateUrl: './cargainvalidez.component.html',
  styleUrls: ['./cargainvalidez.component.css']
})
export class CargainvalidezComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  @ViewChild('alertSwal') private alertSwal: SwalComponent;
  @ViewChild('alertSwalAlert') alertSwalAlert: SwalComponent;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  public lForm: FormGroup;
  public onClose: Subject<boolean>;
  public alerts: any[] = [];
  public load = false;
  public estado = false;
  public cabecera = 'Carga Masiva';
  public titulo = 'Favor seleccione un archivo';
  public loading = false;
  fileToUpload: File = null;
  public filename = null;
  public preload = false;
  public archivoxls: Array<Archivoxls> = [];

  constructor(
    public formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private cargaplanillaService: CargainvalidezService) {
    this.lForm = this.formBuilder.group(
      {
        nomarchivo: [{ value: '', disabled: true }],
        previsualizacion: [{ value: '', disabled: true }]
      }
    );
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  ngAfterViewInit() {
  }

  async handleFileInput(evt: any) {
    this.loading = true;
    let cabeceraxls: Array<any> = [];
    try {
      this.filename = evt.target.files.item(0).name;
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = async (e: any) => {
        /* read workbook */
        const bstr: string = await e.target.result;
        const wb: XLSX.WorkBook = await XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = await wb.SheetNames[1];
        const ws: XLSX.WorkSheet =  await wb.Sheets[wsname];

        /* save data */
        this.data =  await <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.preload =  true;
        cabeceraxls = this.data[0];
        const arr: Array<any> = this.data;
        await this.setModelplanilla(arr);
        this.data.unshift(cabeceraxls);
        this.loading = await false;
      };
      reader.readAsBinaryString(target.files[0]);
    } catch (err) {
      this.loading = false;
      this.mensaje('danger', 'Error en la visualización', 3000);
    }
  }

  async setModelplanilla(arr: Array<any>) {
    arr.splice(0, 1); /*<- elimina cabecera de planilla */
    for (const row of arr) {
      const excelobj: Archivoxls = new Archivoxls();
      let i = 0;
      for (const element of row) {
        /* crea objeto con los campos de planilla luego inserta en array */
        if (i === 0) {
          excelobj.CorrelArchivo = element;
        } else if (i === 1) {
          excelobj.Fecha = element;
        } else if (i === 2) {
          excelobj.Emisor = element;
        } else if (i === 3) {
          excelobj.RutTrabajador = element;
        }  else if (i === 4) {
          excelobj.NomTrabajador = element;
        } else if (i === 5) {
          excelobj.NroDictamen = element;
        } else if (i === 6) {
          excelobj.CodTipoInvalidez = element;
        } else if (i === 7) {
          excelobj.PorcentajeInvalidez = element;
        } else if (i === 8) {
          excelobj.FechaEjecutoriado = element;
        } else if (i === 9) {
          excelobj.FechaMaxApelacion = element;
        } else if (i === 10) {
          excelobj.TieneDiagnostico = element;
        } else if (i === 11) {
          excelobj.CIE10_Codigo1 = element;
        } else if (i === 12) {
          excelobj.CIE10_Codigo2 = element;
        } else if (i === 13) {
          excelobj.CIE10_Codigo3 = element;
        } else if (i === 14) {
          excelobj.CIE10_Codigo4 = element;
        } else if (i === 15) {
          excelobj.CIE10_Codigo5 = element;
        } else if (i === 16) {
          excelobj.CIE10_Codigo6 = element;
        } else if (i === 17) {
          excelobj.CIE10_Codigo7 = element;
        } else if (i === 18) {
          excelobj.TipoReclamo = element;
        }
        i++;
      }
      this.archivoxls.push(excelobj);
    }
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  async onGrabarabd() {
     /* Elimina elementos vacíos del array*/
    this.archivoxls.forEach(i => {
      if (i.CorrelArchivo === undefined) {
        this.archivoxls.splice(this.archivoxls.findIndex(b => i.CorrelArchivo === b.CorrelArchivo), 1);
      }
    });
    this.loading = true;
    this.cargaplanillaService.insertar(this.archivoxls).subscribe( d => {
      this.loading = false;
      this.alertSwal.title = 'Acción realizada';
      this.alertSwal.show();
    }, err => {
      this.loading = false;
      this.alertSwalAlert.title = err.error.mensaje;
      this.alertSwalAlert.show();
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onCerrar() {
    this.onClose.next(this.estado);
    this.bsModalRef.hide();
  }

  mensaje(status: string, texto: string, time: number = 0) {
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

