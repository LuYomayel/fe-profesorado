export interface IAlumno {
    idAlumno:number;
    nombre:string;
    apellido:string;
    dni:string;
    telefono:string;
    direccion:string;
    fechaNac?:Date;
    estado:number;
}

export interface DTOAlumno extends IAlumno{
    email:string;
}

export interface IResultAlumno {
    response: string;
}