import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as jwt_decode from 'jwt-decode';
import { Userprofile } from 'src/app/config/userprofile';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PropiedadescuentaComponent } from 'src/app/views/administradorusuarios/propiedadescuenta/propiedadescuenta.component';
import { MantenedorperfilesComponent } from 'src/app/views/administradorperfiles/mantenedorperfiles/mantenedorperfiles.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  public profile: Userprofile =  new Userprofile();
  public bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private bsModalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {

    });
  }

  onHome() {
    this.router.navigate(['/home']);
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
