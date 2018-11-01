export class Criterio {
  public nombre: string;
  public tipo: string;
  public ponderacion: number;
  public interpretacion: Interpetacion;
  public valor: any;

  constructor(nombre: string, tipo: string, ponderacion: number, interpretacion: Interpetacion, valor:any) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.ponderacion = ponderacion;
    this.interpretacion = interpretacion;
    this.valor = valor;
  }
}

export enum Interpetacion {
  mayor,
  menor
}
