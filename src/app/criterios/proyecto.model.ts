import { Criterio } from './criterio.model';

export class Proyecto {
  public nombre: string;
  public descripcion: string
  public presupuesto: string;
  public criterios: Criterio[];
  public valorTotal:number;

  constructor(nombre: string, presupuesto: string, descripcion: string, criterios: Criterio[]) {
    this.nombre = nombre;
    this.presupuesto = presupuesto;
    this.descripcion = descripcion;
    this.criterios = criterios;
    this.valorTotal = 0;
  }
}
