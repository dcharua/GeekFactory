import { Criterio } from './criterio.model';

export class Proyecto {
  public nombre: string;
  public descripcion: string
  public presupuesto: number;
  public criterios: Criterio[];
  public valorTotal:number;
  public prioridad:number;

  constructor(nombre: string, presupuesto: number, descripcion: string, criterios: Criterio[]) {
    this.nombre = nombre;
    this.presupuesto = presupuesto;
    this.descripcion = descripcion;
    this.criterios = criterios;
    this.valorTotal = 0;
    this.prioridad = 0;
  }
}
