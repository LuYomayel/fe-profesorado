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
        email: ['', [Validators.required, Validators.email]],
      });
    }

  ngOnInit() {
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
        estado: 0
      }
      this.titulo = 'Agregar Alumno'
      // this.product = {};
      this.submitted = false;
      this.alumnoDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {

              // this.alumnos = this.alumnos.filter(val => !this.selectedAlumnos.includes(val));
              // console.log(this.selectedAlumnos)
              // this.selectedAlumnos = [];
              // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Alumnos eliminados', life: 3000});
          }
      });
  }

  

  editAlumno(alumno: IAlumno) {
    const {idAlumno, estado, ...alu} = alumno;
    let fechaNac;
    if(alu.fechaNac) {
      const newDate = new Date(alu.fechaNac)
      fechaNac = newDate.toISOString().split('T')[0];
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
              // this.products = this.products.filter(val => val.id !== product.id);
              // this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Alumno eliminado', life: 3000});
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
        if(this.form.valid){
          const alumno: IAlumno = { ... this.alumno }
          this.alumnosService.putAlumno(alumno).subscribe(result => {
            console.log(result)
            this.alumnosService.getAlumnos().subscribe(data => this.alumnos = data) 
          })
          // this.products[this.findIndexById(this.alumno.id)] = this.product;                
          this.messageService.add({severity:'success', summary: 'Exitoso!', detail: 'Alumno actualizado', life: 3000});
        }else{
          console.log('Form invalido', this.form.valid)
        }
      }
      else {
        if(this.form.valid){
          // this.alumno.fechaNac = this.fechaNac;
          const alumno: DTOAlumno = { ... this.alumno, email: this.email}
          this.alumnosService.addAlumno(alumno).subscribe(result => {
            console.log(result)
            this.alumnosService.getAlumnos().subscribe(data => this.alumnos = data) 
          });
          this.messageService.add({severity:'success', summary: 'Exitoso!', detail: 'Alumno agregado', life: 3000});
        }else{
          console.log('Form invalido', this.form.valid)
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

  invertir(dia:number, mes:number, anio:number) {
    const date=  dia.toString().padStart(2, '0');
    const month=  mes.toString().padStart(2, '0');
    // const year=  anio.toString().padStart(2, '0');
    return `${date}/${month}/${anio}`
  }
  
}
