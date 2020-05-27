export class Actualizarperfil {
    rutusuario: string;
    idupd: number;
    perfiles: Array<any>;

    constructor(
        rutusuario?: string,
        idupd?: number,
        perfiles?: Array<any>
    ) {
        this.rutusuario = rutusuario;
        this.idupd = idupd;
        this.perfiles = perfiles;
    }

}
