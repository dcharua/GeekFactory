import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Criterio } from './criterio.model';

declare var $: any;
@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {
  @ViewChild('criterioInput') criterioInput: ElementRef;
  @ViewChild('tipoInput') tipoInput: ElementRef;
  @ViewChild('ponderacionInput') ponderacionInput: ElementRef;
  criterios: Criterio[] = [
    new Criterio('Duracion (en meses)', 'Cuantitativo', '0'),
    new Criterio('Valor presente neto', 'Cuantitativo', '0'),
    new Criterio('Período de recuperación de la inversión ', 'Cuantitativo', '0'),
    new Criterio('Riesgo', 'Cuantitativo', '0'),
    new Criterio('Generacion de tecnologia propitaria', 'Cuantitativo', '0')
  ];

  constructor() { }

  ngOnInit() {
  }

  popAdd(){
    $("#add").fadeIn();
  }

  closeAdd(){
    $("#add").fadeOut();
  }

  add(){
    this.criterios.push(new Criterio(this.criterioInput.nativeElement.value, this.tipoInput.nativeElement.value, this.ponderacionInput.nativeElement.value));
    this.closeAdd();
  }

}
