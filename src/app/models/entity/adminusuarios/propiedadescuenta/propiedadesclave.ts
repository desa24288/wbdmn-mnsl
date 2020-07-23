export class Propiedadesclave {
    letrasnum: string;
    mincaracteres: number;
    passwordusadas: number;
    rutusuario: string;

    constructor(
        letrasnum?: string,
        mincaracteres?: number,
        passwordusadas?: number,
        rutusuario?: string
    ) {
        this.letrasnum = letrasnum;
        this.mincaracteres = mincaracteres;
        this.passwordusadas = passwordusadas;
        this.rutusuario = rutusuario;
    }
}
