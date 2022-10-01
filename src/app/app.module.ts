import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.rounting';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main/header/header.component';
import { MenuComponent } from './components/main/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimengModule } from 'src/primeng.module';
import { MaterialAngularModule } from '../material.module';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { MateriasComponent } from './components/materias/materias.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    AlumnosComponent,
    CarrerasComponent,
    ProfesoresComponent,
    MateriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    appRoutingProviders,
    BrowserAnimationsModule,
    MaterialAngularModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
