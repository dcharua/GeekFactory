import { Pipe, PipeTransform } from '@angular/core';
import {Proyecto} from './criterios/proyecto.model';
import * as _ from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(proyectos: Proyecto[], searchText: number): Proyecto[] {
    if(!proyectos) return [];
    if(!searchText) return proyectos;
    return _(proyectos)
           .dropWhile(function(proyecto) {return proyecto.presupuesto > searchText; })
           .takeWhile(function(proyecto) {return proyecto.presupuesto <= searchText; })
           .value();
    /*
    return proyectos.filter( pro => {
      if (pro.presupuesto <= searchText)
        return pro;
    });
    */
  }
}
