import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { DTOAlumno, IAlumno, Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/product.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [ AlumnoService, ProductService]
})
export class AlumnosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  
  email: string = '';
  fechaNac: string = '' ;
  value:Date = new Date();
  titulo:string = '';
  
  alumnos: IAlumno[] = [];
  alumno!: IAlumno;
  selectedAlumnos: IAlumno[] = [];
  
  alumnoDialog:boolean = false;
  submitted !: boolean;
  form: FormGroup;
  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private alumnosService: AlumnoService,
    private formBuilder: FormBuilder
    ) { 
      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        fechaNac: ['', Validators.required],
        email: ['', [Validators.email]],
      });
    }

  ngOnInit() {
    this.getAlumnos();
  }
  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(data => this.alumnos = data)
  }
  applyFilterGlobal($event:any, stringVal:string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  openNew() {
    this.fechaNac = '';
    this.alumno = {
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
      dni: '',
      idAlumno: 0,
      // fechaNac: new Date(1990,1,1),
      estado: 0,
      
    }
    const {idAlumno, estado, ...alu} = this.alumno;
    this.form.setValue({...alu, fechaNac:this.fechaNac, email: ''});
    this.titulo = 'Agregar Alumno'
    this.submitted = false;
    this.alumnoDialog = true;
  }

  

  editAlumno(alumno: IAlumno) {
    const {idAlumno, estado, ...alu} = alumno;
    this.alumno = alumno;
    let fechaNac;
    if(alu.fechaNac) {
      const newDate = new Date(alu.fechaNac)
      fechaNac = newDate.toISOString().split('T')[0];
      this.fechaNac = fechaNac;
    }
    this.form.setValue({...alu, email: '', fechaNac})
    this.titulo = 'Editar Alumno';
    this.alumnoDialog = true;
  }

  deleteAlumno(alumno: IAlumno) {
      this.confirmationService.confirm({
          message: 'Estás seguro que quieres eliminar a ' + alumno.nombre + ' ' + alumno.apellido + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            // console.log(this.alumno)  
            this.alumnosService.deleteAlumno(alumno.idAlumno).subscribe(data => {
              if(data.response == 'OK'){
                this.getAlumnos()
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Alumno eliminado', life: 3000});
              }else{
                this.messageService.add({severity:'error', summary: 'Server Error', detail: 'Hubo algun error al eliminar el alumno', life: 3000});
              }
            })
          }
      });
  }

  hideDialogAlumno() {
    this.alumnoDialog = false;
    this.submitted = false;
  }
  
  saveAlumno() {
      this.submitted = true;
      if (this.titulo === 'Editar Alumno') {

        const {fechaNac} = this.form.value;
        this.fechaNac = fechaNac;

        if(this.form.valid){

          if(this.fechaNac && !this.validarFecha()){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'La fecha de nacimiento debe ser menor a la fecha de hoy', life: 3000});
            return;
          }

          const alumno: IAlumno = {...this.form.value, idAlumno: this.alumno.idAlumno};
          this.alumnosService.putAlumno(alumno).subscribe(result => {
            if(result.response == 'OK'){
              this.getAlumnos();
              this.messageService.add({severity:'success', summary: 'Exitoso!', detail: 'Alumno actualizado', life: 3000});
            }else{
              this.messageService.add({severity:'error', summary: 'Server Error', detail: 'Hubo algun error al actualizar el alumno', life: 3000});
            }
          })            

        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Campos obligatorios vacíos', life: 3000});
          return;
        }
      }
      else {
        // Agregar alumno
        const {email, fechaNac} = this.form.value;
        this.alumno = this.form.value;
        const alumno: DTOAlumno = {...this.alumno, email};
        this.fechaNac = fechaNac;
        this.email = email;
        if(this.form.valid){
          // this.alumno.fechaNac = this.fechaNac;
          if(this.fechaNac && !this.validarFecha()){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'La fecha de nacimiento debe ser menor a la fecha de hoy', life: 3000});
            return;
          }
          if(!email){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'El campo email es obligatorio', life: 3000});
            return;
          }
          this.alumnosService.addAlumno(alumno).subscribe(result => {
            if(result.response == 'OK'){
              this.getAlumnos();
              this.messageService.add({severity:'success', summary: 'Exitoso!', detail: 'Alumno agregado', life: 3000});
            }else{
              this.messageService.add({severity:'error', summary: 'Server Error', detail: 'Hubo algun error al agregar el alumno', life: 3000});
            }
          });
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Campos obligatorios vacíos', life: 3000});
          return;
        }
      }

      this.alumno = {
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        dni: '',
        idAlumno: 0,
        // fechaNac: new Date(1990,1,1),
        estado: 0
      }
      this.fechaNac = '';
      this.alumnoDialog = false;
      
  }

  validarFecha(){
    const newDate = new Date();
    const parseFechaNac = new Date(this.fechaNac);
    if(newDate.getFullYear() < parseFechaNac.getFullYear()) return false;
    else return true;
  }
  
}
