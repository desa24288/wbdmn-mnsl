export class Serviciosalud {
    CodEstablecimiento: string;
    GloEstablecimiento: string;
  
    constructor(
      CodEstablecimiento?: string,
      GloEstablecimiento?: string
    ) {
      this.CodEstablecimiento = CodEstablecimiento;
      this.GloEstablecimiento = GloEstablecimiento;
    }
  }
  