import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders , HttpRequest  } from '@angular/common/http';

import {map} from 'rxjs/operators';
// import { Producto } from '../models/producto';
import { global } from "./global";
import { Observable } from "rxjs";
import { DTOAlumno, IAlumno, IResultAlumno } from '../interfaces'

@Injectable()

export class AlumnoService{
    public url:string;

    constructor(
        public _http:HttpClient
    ){
        this.url = global.url
    }

    getAlumnos(): Observable<IAlumno[]>{
        console.log(this.url)
        return this._http.get<IAlumno[]>(`${this.url}/students`).pipe(
            map(
                result => result
            )
        )
    }

    addAlumno(Alumno: DTOAlumno):Observable<IResultAlumno>{
        let json = JSON.stringify(Alumno);
        let params = 'json='+json;
        let headers = new HttpHeaders('application/x-www-form-urlencoded');
        console.log(Alumno)
        return this._http.post<IResultAlumno>(`${this.url}/students`, json, {headers: {"Content-type":"application/json"}}).pipe(
            map(
                result => result
            )
        )
    }

    putAlumno(alumno: IAlumno):Observable<IResultAlumno>{
        let json = JSON.stringify(alumno);
        let params = 'json='+json;
        let headers = new HttpHeaders('application/x-www-form-urlencoded');
        console.log(alumno)
        return this._http.put<IResultAlumno>(`${this.url}/students/${alumno.idAlumno}`, json, {headers: {"Content-type":"application/json"}}).pipe(
            map(
                result => result 
                
            )
        )
    }

    deleteAlumno(idAlumno: number):Observable<IResultAlumno>{
        console.log(idAlumno)
        return this._http.delete<IResultAlumno>(`${this.url}/students/${idAlumno}`).pipe(
            map(
                result => result 
            )
        )
    }
    
}