import { Component, OnInit } from "@angular/core";
import { Criterio, Interpetacion } from "./criterio.model";
import { Proyecto } from "./proyecto.model";
//import {FilterPipe } from "../fliter.pipe";
//import { FilterProjects } from "./custom.pipe";
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-criterios",
  templateUrl: "./criterios.component.html",
  styleUrls: ["./criterios.component.css"]
})

export class CriteriosComponent implements OnInit {
  filterPrice = "";
  criterioForm: FormGroup;
  proyectoForm: FormGroup;
  help = false;
  error = "";
  total = 100;
  disabledSave = false;

  criterios: Criterio[] = [
    new Criterio(
      "Duración (en meses)",
      "Cuantitativo",
      20,
      Interpetacion.menor,
      0
    ),
    new Criterio(
      "Valor presente neto",
      "Cuantitativo",
      20,
      Interpetacion.mayor,
      0
    ),
    new Criterio(
      "Período de recuperación de la inversión ",
      "Cuantitativo",
      20,
      Interpetacion.menor,
      0
    ),
    new Criterio("Riesgo", "Cualitativo", 20, Interpetacion.menor, null),
    new Criterio(
      "Generación de tecnología propitaria",
      "Cualitativo",
      20,
      Interpetacion.mayor,
      null
    )
  ];



  proyectos: Proyecto[] = [];




  constructor() {}

  ngOnInit() {
    this.criterioForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      tipo: new FormControl("", Validators.required),
      ponderacion: new FormControl("", Validators.required),
      interpretacion: new FormControl("", Validators.required)
    });

    this.proyectoForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      costo: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });

    this.criterios[0].ponderacion = 15;
    this.criterios[1].ponderacion = 25;
    this.criterios[4].ponderacion = 15;

  }

  popAddPro() {
    $("#addProyecto").fadeIn();
  }

  closeAddPro() {
    $("#addProyecto").fadeOut();
  }

  popAddCri() {
    $("#addCriterio").fadeIn();
  }

  closeAddCri() {
    $("#addCriterio").fadeOut();
  }

  updateDummy() {
    this.proyectos.forEach(proyecto => {
      if (proyecto.criterios.length != this.criterios.length)
        proyecto.criterios = JSON.parse(JSON.stringify(this.criterios));
    });
  }

  addPro() {
    if (this.proyectoForm.valid) {
      this.proyectos.push(
        new Proyecto(
          this.proyectoForm.get("nombre").value,
          this.proyectoForm.get("costo").value,
          this.proyectoForm.get("descripcion").value,
          JSON.parse(JSON.stringify(this.criterios))
        )
      );
      this.closeAddPro();
      this.proyectoForm.reset();
      // $('#proyectos').css({'display': 'none'});
      // $('#criteriosProyectos').fadeIn();
    } else {
      this.validateAllFormFields(this.criterioForm);
    }
  }

  addCri() {
    if (this.criterioForm.valid) {
      const rest =
        this.criterioForm.get("ponderacion").value / this.criterios.length;
      for (const criterio of this.criterios) {
        criterio.ponderacion = criterio.ponderacion - rest;
      }
      let interpretacion: Interpetacion;
      const ponderacion: number = +this.criterioForm.get("ponderacion").value;
      if (this.criterioForm.get("interpretacion").value === "Mayor") {
        interpretacion = Interpetacion.mayor;
      } else {
        interpretacion = Interpetacion.menor;
      }
      this.criterios.push(
        new Criterio(
          this.criterioForm.get("nombre").value,
          this.criterioForm.get("tipo").value,
          ponderacion,
          interpretacion,
          null
        )
      );
      this.calcCriPond();
      this.closeAddCri();
      this.updateDummy();
      this.criterioForm.reset();
    } else {
      this.validateAllFormFields(this.criterioForm);
    }
  }

  getExecutable(value: Number) {

  }

  backCri() {
    $("#proyectos").css({ display: "none" });
    $("#criterios").fadeIn();
  }

  goCriPro() {
    $("#proyectos").css({ display: "none" });
    this.updateDummy();
    $("#criteriosProyectos").fadeIn();
  }

  backPro() {
    $("#criteriosProyectos").css({ display: "none" });
    $("#proyectos").fadeIn();
  }
  backCriPro() {
    $("#matrizPesos").css({ display: "none" });
    $("#criteriosProyectos").fadeIn();
  }
  backMatriz() {
    $("#analisis").css({ display: "none" });
    $("#matrizPesos").fadeIn();
  }
  goAnalisis() {
    $("#matrizPesos").css({ display: "none" });
    $("#analisis").fadeIn();
  }

  addCriPro() {
    for (const proyecto of this.proyectos) {
      for (const criterio of proyecto.criterios) {
        if (criterio.valor == null) {
          this.showError("Llenar todos los valores");
          return;
        }
        if (!this.isNumber(criterio.valor) && Object.values(ValorCualitativo).includes(criterio.valor)) {
          criterio.valor = ValorCualitativo[criterio.valor];
        }
      }
    }

    this.hideError();
    this.calcularPeso();
    $("#criteriosProyectos").css({ display: "none" });
    $("#matrizPesos").fadeIn();
  }

  calcularPeso() {
    for (let k = 0; k < this.proyectos.length; k++) {
      this.proyectos[k].valorTotal = 0;
    }

    // Para cada criterio
    for (let i = 0; i < this.proyectos[0].criterios.length; i++) {
      let posiciones = new Array();
      let posicionesDict : {[key: number]: number; } = {};

      // Para cada proyecto
      for (let k = 0; k < this.proyectos.length; k++) {
        const valor = Number(this.proyectos[k].criterios[i].valor);
        posiciones.push(valor);
        posicionesDict[valor] = k;
      }

      posiciones.sort((a, b) => a - b); // For ascending sort
      if (this.proyectos[0].criterios[i].interpretacion === Interpetacion.menor) {
        posiciones.reverse();
      }
      //console.log(posiciones);
      //console.log(posicionesDict);

      for (let k = 0; k < posiciones.length; k++) {
        //console.log(2 * k + 1);
        //console.log(this.proyectos[posicionesDict[posiciones[k]]]);
        this.proyectos[posicionesDict[posiciones[k]]].criterios[i].peso = 2 * k + 1;
      }

      // Calcular el total
      for (let k = 0; k < this.proyectos.length; k++) {
        console.log(this.proyectos[k].criterios[i].ponderacion);
        this.proyectos[k].valorTotal += this.proyectos[k].criterios[i].peso * this.proyectos[k].criterios[i].ponderacion / 100;
      }
      //console.log("\n");
      /*
      posiciones.sort();
      console.log(posiciones);
      if (this.proyectos[0].criterios[i].interpretacion == Interpetacion.mayor)
        posiciones.reverse();
      console.log(posiciones);
      console.log("proyectos " + this.proyectos.length);
      for (let k = 0; k < this.proyectos.length; k++) {
        this.proyectos[k].criterios[i].peso =
          this.proyectos.length +
          1 -
          posiciones.indexOf(this.proyectos[k].criterios[i].valor) * 2;
        this.proyectos[k].valorTotal += this.proyectos[k].criterios[i].peso;
      }
      */
    }

    // Calcular la prioridad
      let posicionesDict : {[key: number]: number; } = {};
      let posiciones = new Array();
      // Para cada proyecto
      for (let k = 0; k < this.proyectos.length; k++) {
        const valor = Number(this.proyectos[k].valorTotal);
        posiciones.push(valor);
        posicionesDict[valor] = k;
      }
      posiciones.sort((a, b) => b - a ); // For descending order
      console.log(posiciones);

      for (let k = 0; k < posiciones.length; k++) {
        //console.log(2 * k + 1);
        //
        console.log(this.proyectos[posicionesDict[posiciones[k]]]);
        this.proyectos[posicionesDict[posiciones[k]]].prioridad = k + 1;
      }
  }

  showError(message: string) {
    this.error = message;
    $(".error").css({ display: "inherit" });
    this.disabledSave = true;
  }

  hideError() {
    this.error = "";
    $(".error").css({ display: "none" });
    this.disabledSave = false;
  }

  calcCriPond() {
    let tmp = 0;
    for (const criterio of this.criterios) {
      tmp += criterio.ponderacion;
    }
    //console.log(tmp);
    this.total = tmp;
    if (this.total === 100) {
      this.error = "";
      $(".error").css({ display: "none" });
      this.disabledSave = false;
    }
    if (this.total < 99.9) {
      this.error = "La suma de ponderaciones es menor a 100";
      $(".error").css({ display: "inherit" });
      this.disabledSave = true;
    }
    if (this.total > 100.1) {
      this.error = "La suma de ponderaciones es mayor a 100";
      $(".error").css({ display: "inherit" });
      this.disabledSave = true;
    }
  }

  goProyectos() {
    $("#criterios").css({ display: "none" });
    $("#proyectos").fadeIn();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isNumber(value: string | number): boolean {
   return !isNaN(Number(value.toString()));
  }
}

 enum ValorCualitativo {
  'Muy Bajo',
  'Bajo',
  'Medio',
  'Alto',
  'Muy Alto',
  }
