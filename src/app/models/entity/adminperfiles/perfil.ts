export class Perfil {
    // tslint:disable-next-line: variable-name
    ds_rolLM: string;
    // tslint:disable-next-line: variable-name
    id_tipoperfil: number;
    // tslint:disable-next-line: variable-name
    id_estrol: number;

    constructor(
        // tslint:disable-next-line: variable-name
        ds_rolLM?: string,
        // tslint:disable-next-line: variable-name
        id_tipoperfil?: number,
        // tslint:disable-next-line: variable-name
        id_estrol?: number
    ) {
        this.ds_rolLM = ds_rolLM;
        this.id_tipoperfil = id_tipoperfil;
        this.id_estrol = id_estrol;
    }
}
