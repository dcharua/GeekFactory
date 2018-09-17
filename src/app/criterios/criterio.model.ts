export class Criterio {
  public nombre: string;
  public tipo: string;
  public ponderacion: string;

  constructor(nombre: string, tipo: string, ponderacion: string) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.ponderacion = ponderacion;
  }
}
