import { Ejecutables } from './ejecutables';

export class Actualizar {
// tslint:disable-next-line: variable-name
    id_RolLM: number;
    ejecutable: Array<Ejecutables>;

    constructor(// tslint:disable-next-line: variable-name
        id_RolLM?: number,
        ejecutable?: Array<Ejecutables>) {
            this.id_RolLM = id_RolLM;
            this.ejecutable = ejecutable;

    }
}