import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as jwt_decode from 'jwt-decode';
import { Userprofile } from 'src/app/config/userprofile';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PropiedadescuentaComponent } from 'src/app/views/administradorusuarios/propiedadescuenta/propiedadescuenta.component';
import { MantenedorperfilesComponent } from 'src/app/views/administradorperfiles/mantenedorperfiles/mantenedorperfiles.component';
import { PropiedadescuentaService } from 'src/app/services/administradorusuarios/propiedadescuenta.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  public profile: Userprofile =  new Userprofile();
  public bsModalRef: BsModalRef;
  public idregla = 1;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private bsModalService: BsModalService,
    public propiedadesService: PropiedadescuentaService
  ) { 
    this.loadPropiedadesclave();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
    });
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  private loadPropiedadesclave() {
    this.propiedadesService.getPropiedades(this.idregla).subscribe(res => {
      const propiedadesclave = {
          mincaracteres: res.SW_LEN_PWD,
          letrasnum: res.SW_TYP_PWD,
          passwordusadas: res.SW_PWD_UNI,
          rutusuario: this.profile.rutusuario,
          conectado: true
        };
      localStorage.removeItem('propiedadesclave');
      localStorage.setItem('propiedadesclave', JSON.stringify(propiedadesclave));
    }, err => { });
  }

  modalPropiedadcuenta() {
    this.bsModalRef = this.bsModalService.show(PropiedadescuentaComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  modalMantenedorperfiles() {
    this.bsModalRef = this.bsModalService.show(MantenedorperfilesComponent, this.setModal());
    this.bsModalRef.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  setModal() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered',
    };
    return dtModal;
  }

  onPerfilamiento() {
    localStorage.removeItem('from_indx');
  }

  async onCambiarpass() {
    // await this.loadPropiedadesclave();
    this.router.navigate(['cambiopass']);
  }

  onCerrar() {
    this.cerrarsesion();
  }

  cerrarsesion() {
    // cierra la sesion del usuario
    this.usuarioService.logout().subscribe(
      data => {
        localStorage.removeItem('uiwebadminminsal');
        this.router.navigate(['login']);
      }, err => {
        console.log(err.statusText);
      }
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return console.log(err);
    }
  }
}
