import { Pipe, PipeTransform } from '@angular/core';
import {Proyecto} from './criterios/proyecto.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(proyecto: Proyecto[], searchText: number): Proyecto[] {
    if(!proyecto) return [];
    if(!searchText) return proyecto;
    return proyecto.filter( pro => {
      if (pro.presupuesto < searchText)
        return pro;
    });
  }
}
