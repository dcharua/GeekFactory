import { Pipe, PipeTransform} from '@angular/core';
import {Proyecto} from './proyecto.model';

@Pipe({name: 'filterProjects'})
export class FilterProjects implements PipeTransform {
  transform(proyectos: Proyecto[], value: string) {
    return proyectos.filter(proyecto => proyecto.valorTotal <= Number(value));
  }
}
