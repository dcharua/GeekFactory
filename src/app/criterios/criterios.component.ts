import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Criterio} from './criterio.model';
import {Proyecto} from './proyecto.model';

declare var $: any;

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})

export class CriteriosComponent implements OnInit {
  @ViewChild('proyectoNombre') proyectoNombre: ElementRef;
  @ViewChild('proyectoCosto') proyectoCosto: ElementRef;
  @ViewChild('proyectoDescripcion') proyectoDescripcion: ElementRef;
  @ViewChild('criterioInput') criterioInput: ElementRef;
  @ViewChild('tipoInput') tipoInput: ElementRef;
  @ViewChild('ponderacionInput') ponderacionInput: ElementRef;
  help: boolean = false;
  total = 100;

  criterios: Criterio[] = [
    new Criterio('Duración (en meses)', 'Cuantitativo', 20),
    new Criterio('Valor presente neto', 'Cuantitativo', 20),
    new Criterio('Período de recuperación de la inversión ', 'Cuantitativo', 20),
    new Criterio('Riesgo', 'Cualitativo', 20),
    new Criterio('Generación de tecnología propitaria', 'Cualitativo', 20)
  ];

  proyectos: Proyecto[] = [new Proyecto('GeekFactory', '10000', 'Administrador de Proyectos')];

  constructor() {
  }

  ngOnInit() {
  }

  popAddPro() {
    $('#addProyecto').fadeIn();
  }

  closeAddPro() {
    $('#addProyecto').fadeOut();
  }


  popAddCri() {
    $('#addCriterio').fadeIn();
  }

  closeAddCri() {
    $('#addCriterio').fadeOut();
  }

  addPro() {
    this.proyectos.push(new Proyecto(this.proyectoNombre.nativeElement.value, this.proyectoCosto.nativeElement.value, this.proyectoDescripcion.nativeElement.value));
    this.closeAddPro();
    $('#proyectos').css({'display': 'none'});
    $('#criterios').fadeIn();
  }

  addCri() {
    let rest = this.ponderacionInput.nativeElement.value / 5;
    for (let criterio of this.criterios) {
      criterio.ponderacion = criterio.ponderacion - rest;
    }
    this.criterios.push(new Criterio(this.criterioInput.nativeElement.value, this.tipoInput.nativeElement.value, this.ponderacionInput.nativeElement.value));
    this.calcCriPond();
    this.closeAddCri();
  }

  calcCriPond() {
    let tmp = 0;
    for (const criterio of this.criterios) {
      tmp += criterio.ponderacion;
    }
    console.log(tmp);
    this.total = tmp;
  }

  regresar() {
    $('#criterios').css({'display': 'none'});
    $('#proyectos').fadeIn();
  }

}
