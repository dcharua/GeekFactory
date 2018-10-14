import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Criterio, Interpetacion} from './criterio.model';
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
  @ViewChild('interpretacionInput') interpretacionInput: ElementRef;
  help = false;
  error = '';
  total = 100;
  disabledSave = false;

  criterios: Criterio[] = [
    new Criterio('Duración (en meses)', 'Cuantitativo', 20, Interpetacion.mayor),
    new Criterio('Valor presente neto', 'Cuantitativo', 20, Interpetacion.mayor),
    new Criterio('Período de recuperación de la inversión ', 'Cuantitativo', 20, Interpetacion.mayor),
    new Criterio('Riesgo', 'Cualitativo', 20, Interpetacion.mayor),
    new Criterio('Generación de tecnología propitaria', 'Cualitativo', 20, Interpetacion.mayor)
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
    this.proyectos.push(new Proyecto(this.proyectoNombre.nativeElement.value,
      this.proyectoCosto.nativeElement.value, this.proyectoDescripcion.nativeElement.value));
    this.closeAddPro();
    $('#proyectos').css({'display': 'none'});
    $('#criterios').fadeIn();
  }

  addCri() {
    const rest = this.ponderacionInput.nativeElement.value / 5;
    for (const criterio of this.criterios) {
      criterio.ponderacion = criterio.ponderacion - rest;
    }
    let interpretacion: Interpetacion;
    const ponderacion: number = +this.ponderacionInput.nativeElement.value
    if (this.interpretacionInput.nativeElement.value === 'Mayor') {
      interpretacion = Interpetacion.mayor;
    } else {
      interpretacion = Interpetacion.menor;
    }
    this.criterios.push(new Criterio(this.criterioInput.nativeElement.value, this.tipoInput.nativeElement.value,
      ponderacion, interpretacion));
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
    if (this.total === 100) {
      this.error = '';
      $('#error').css({'display': 'none'});
      this.disabledSave = false;
    }
    if (this.total < 100) {
      this.error = 'La suma de ponderaciones es menor a 100';
      $('#error').css({'display': 'inherit'});
      this.disabledSave = true;
    }
    if (this.total > 100) {
      this.error = 'La suma de ponderaciones es mayor a 100';
      $('#error').css({'display': 'inherit'});
      this.disabledSave = true;
    }
  }

  regresar() {
    $('#criterios').css({'display': 'none'});
    $('#proyectos').fadeIn();
  }

}
