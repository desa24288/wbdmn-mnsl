export class Utils {
    constructor(
    ) { }

    static formatRut(rut: string): string {
      if (rut !== null && rut.toString().trim() !== '') {
        if (rut.indexOf('-') < 0) {
          const entero = Number(rut.toString().substr(0, rut.toString().length - 1));
          const dv = rut.toString().substr(rut.toString().length - 1, rut.length);
          return entero.toString().concat('-').concat(dv.toUpperCase());
        } else {
          const entero = Number(rut.toString().substr(0, rut.toString().length - 2));
          const dv = rut.toString().substr(rut.toString().length - 1, rut.length);
          return entero.toString().concat('-').concat(dv.toUpperCase());
        }
      } else {
        return '';
      }
    }
  }
