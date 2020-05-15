import { AbstractControl } from '@angular/forms';

export class Validations {

  static ValidationRutEmpleadorN(AC: AbstractControl) {
    if (AC.get('rutempleadorn').value === null) {
      return null;
    } else {
      let campo: string = AC.get('rutempleadorn').value;
      campo = campo.trim();

      if (campo.length === 0) {
        return null;
      }

      campo = campo.replace('-', '');
      campo = campo.replace(/\./g, '');

      let suma = 0;
      const caracteres = '1234567890kK';
      let contador = 0;
      let u;

      for (let i = 0; i < campo.length; i++) {
        u = campo.substring(i, i + 1);
        if (caracteres.indexOf(u) !== -1) {
          contador++;
        }
      }
      if (contador === 0) {
        return null;
      }

      const rut = campo.substring(0, campo.length - 1);
      const drut = campo.substring(campo.length - 1);
      let dvr = '0';
      let mul = 2;

      for (let i = rut.length - 1; i >= 0; i--) {
        suma = suma + Number(rut.charAt(i)) * mul;
        if (mul === 7) {
          mul = 2;
        } else {
          mul++;
        }
      }
      let res;
      let dvi;

      res = suma % 11;
      if (res === 1) {
        dvr = 'k';
      } else if (res === 0) {
        dvr = '0';
      } else {
        dvi = 11 - res;
        dvr = dvi + '';
      }
      if (dvr !== drut.toLowerCase()) {
        AC.get('rutempleadorn').setErrors({ ValidationRut: true });
      } else {
        return null;
      }
    }
  }

  static ValidationRutBeneficiario(AC: AbstractControl) {
    if (AC.get('rutbeneficiario').value === null) {
      return null;
    } else {
      let campo: string = AC.get('rutbeneficiario').value;
      campo = campo.trim();

      if (campo.length === 0) {
        return null;
      }

      campo = campo.replace('-', '');
      campo = campo.replace(/\./g, '');

      let suma = 0;
      const caracteres = '1234567890kK';
      let contador = 0;
      let u;

      for (let i = 0; i < campo.length; i++) {
        u = campo.substring(i, i + 1);
        if (caracteres.indexOf(u) !== -1) {
          contador++;
        }
      }
      if (contador === 0) {
        return null;
      }

      const rut = campo.substring(0, campo.length - 1);
      const drut = campo.substring(campo.length - 1);
      let dvr = '0';
      let mul = 2;

      for (let i = rut.length - 1; i >= 0; i--) {
        suma = suma + Number(rut.charAt(i)) * mul;
        if (mul === 7) {
          mul = 2;
        } else {
          mul++;
        }
      }
      let res;
      let dvi;

      res = suma % 11;
      if (res === 1) {
        dvr = 'k';
      } else if (res === 0) {
        dvr = '0';
      } else {
        dvi = 11 - res;
        dvr = dvi + '';
      }
      if (dvr !== drut.toLowerCase()) {
        AC.get('rutbeneficiario').setErrors({ ValidationRut: true });
      } else {
        return null;
      }
    }
  }

  static ValidationRutDestinatario(AC: AbstractControl) {
    if (AC.get('rutdestinatario').value === null) {
      return null;
    } else {
      let campo: string = AC.get('rutdestinatario').value;
      campo = campo.trim();

      if (campo.length === 0) {
        return null;
      }

      campo = campo.replace('-', '');
      campo = campo.replace(/\./g, '');

      let suma = 0;
      const caracteres = '1234567890kK';
      let contador = 0;
      let u;

      for (let i = 0; i < campo.length; i++) {
        u = campo.substring(i, i + 1);
        if (caracteres.indexOf(u) !== -1) {
          contador++;
        }
      }
      if (contador === 0) {
        return null;
      }

      const rut = campo.substring(0, campo.length - 1);
      const drut = campo.substring(campo.length - 1);
      let dvr = '0';
      let mul = 2;

      for (let i = rut.length - 1; i >= 0; i--) {
        suma = suma + Number(rut.charAt(i)) * mul;
        if (mul === 7) {
          mul = 2;
        } else {
          mul++;
        }
      }
      let res;
      let dvi;

      res = suma % 11;
      if (res === 1) {
        dvr = 'k';
      } else if (res === 0) {
        dvr = '0';
      } else {
        dvi = 11 - res;
        dvr = dvi + '';
      }
      if (dvr !== drut.toLowerCase()) {
        AC.get('rutdestinatario').setErrors({ ValidationRut: true });
      } else {
        return null;
      }
    }
  }

  static ValidationRutPrestador(AC: AbstractControl) {
    if (AC.get('rutprestador').value === null) {
      return null;
    } else {
      let campo: string = AC.get('rutprestador').value;
      campo = campo.trim();

      if (campo.length === 0) {
        return null;
      }

      campo = campo.replace('-', '');
      campo = campo.replace(/\./g, '');

      let suma = 0;
      const caracteres = '1234567890kK';
      let contador = 0;
      let u;

      for (let i = 0; i < campo.length; i++) {
        u = campo.substring(i, i + 1);
        if (caracteres.indexOf(u) !== -1) {
          contador++;
        }
      }
      if (contador === 0) {
        return null;
      }

      const rut = campo.substring(0, campo.length - 1);
      const drut = campo.substring(campo.length - 1);
      let dvr = '0';
      let mul = 2;

      for (let i = rut.length - 1; i >= 0; i--) {
        suma = suma + Number(rut.charAt(i)) * mul;
        if (mul === 7) {
          mul = 2;
        } else {
          mul++;
        }
      }
      let res;
      let dvi;

      res = suma % 11;
      if (res === 1) {
        dvr = 'k';
      } else if (res === 0) {
        dvr = '0';
      } else {
        dvi = 11 - res;
        dvr = dvi + '';
      }
      if (dvr !== drut.toLowerCase()) {
        AC.get('rutprestador').setErrors({ ValidationRut: true });
      } else {
        return null;
      }
    }
  }
}

