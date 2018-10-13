export class Criterio {
  public nombre: string;
  public tipo: string;
  public ponderacion: number;

  constructor(nombre: string, tipo: string, ponderacion: number) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.ponderacion = ponderacion;
  }
}
