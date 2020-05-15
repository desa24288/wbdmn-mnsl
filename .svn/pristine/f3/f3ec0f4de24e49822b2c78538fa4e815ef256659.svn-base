import swal, {SweetAlertType } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Buttons } from 'src/app/models/entity/buttons';
@Injectable({
  providedIn: 'root'
})
export class MensajeSweetAlert {

  constructor(private buttons?: Buttons) {}

  async Msgconfirm(vmensaje: string, vtextBtnAcept: string= 'Aceptar', vtextBtnCancel: string= 'Cancelar', vtype: SweetAlertType= 'question') {
    const respose = await swal.fire({
        position: 'center',
        text: vmensaje,
        type: vtype,
        confirmButtonText: vtextBtnAcept,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: vtextBtnCancel,
        cancelButtonColor: '#d33'
      });
    return respose;
   }

   async MsgconfirmOptions(vmensaje: string, buttons: Array<Buttons>, vtype: SweetAlertType= 'question') {

    if (buttons.length === 0) {
      swal.fire('Botones no especificados');
      return;
    }
    let div = '';
    // const div = this.renderer.createElement('div');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < buttons.length; i++) {
      const style = '';
      // let splitcsss:Array<string>=buttons[i].cssclass.split(' ');
      // splitcsss.forEach(x=>{ style=style.concat(x).concat(' ') });
      // tslint:disable-next-line: max-line-length
      div += '<button type="button" class="btn-sm swal2-confirm swal2-styled" id=' + buttons[i].texto + ' (click)=' + buttons[i].actions + '>' + buttons[i].texto + '</button>';
      //div+='<button type="button" click='+ buttons[i].actions+';>'+ buttons[i].texto+'</button>';


    }
    const respose = await swal.fire({
      title: vmensaje,
      type: vtype,
      html: div ,
      showCloseButton: false,
      showCancelButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      preConfirm: (login) => {
         console.log(login);
      },
    }).then( (res) => {console.log(res); });
    return respose;
   }
   Todas() {
     console.log('asas');
   }
}
