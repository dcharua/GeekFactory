import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CriteriosComponent } from './criterios/criterios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterPipe }from './filter.pipe';
import { SortPipe }from './prioridad.pipe';
import { FilterProjects } from './criterios/customPipe';

@NgModule({
  declarations: [
    AppComponent,
    CriteriosComponent,
    NavbarComponent,
    FilterPipe,
    SortPipe,
    FilterProjects
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
