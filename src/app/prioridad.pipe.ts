import { Pipe, PipeTransform } from "@angular/core";
import {Proyecto} from './criterios/proyecto.model';

@Pipe({
  name: "sort"
})
export class SortPipe  implements PipeTransform {
  transform(array: Proyecto[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a.prioridad > b.prioridad) {
        return 1;
      } else if (a.prioridad < b.prioridad) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
