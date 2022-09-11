import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { AlumnosComponent } from "./components/alumnos/alumnos.component";
import { CarrerasComponent } from "./components/carreras/carreras.component";

import { HomeComponent } from "./components/home/home.component";
import { MateriasComponent } from "./components/materias/materias.component";
import { ProfesoresComponent } from "./components/profesores/profesores.component";

const appRoutes:Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'alumnos', component: AlumnosComponent
    },
    {
        path: 'profesores', component: ProfesoresComponent
    },
    {
        path: 'carreras', component: CarrerasComponent
    },
    {
        path: 'materias', component: MateriasComponent
    }
]

export const appRoutingProviders: any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);