export interface IAlumno {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    telefono:string;
    direccion:string;
    fechaNac?:string;
    estado:number;
}

export interface DTOAlumno extends IAlumno{
    email:string;
}