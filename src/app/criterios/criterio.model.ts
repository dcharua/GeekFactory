export class Criterio {
  public nombre: string;
  public tipo: string;
  public ponderacion: number;
  public interpretacion: Interpetacion;

  constructor(nombre: string, tipo: string, ponderacion: number, interpretacion: Interpetacion) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.ponderacion = ponderacion;
    this.interpretacion = interpretacion;
  }
}

export enum Interpetacion {
  mayor,
  menor
}
