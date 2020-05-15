import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutformat'
})
export class RutformatPipe implements PipeTransform {
  transform(value: string): string {
    /* Elimina los 0 al inicio del rut */
    for (let i = 0; i < 20; i++) {
      if (value.charAt(i) === '0') {
        continue;
      } else {
        return value.slice(i);
      }
    }
  }
}
