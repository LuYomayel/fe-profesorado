import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { DTOAlumno, IAlumno, Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/product.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

// import { MessageService }
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [ AlumnoService, ProductService]
})
export class AlumnosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  // constructor(
  //   private alumnoService: AlumnoService
  // ) { }

  // ngOnInit(): void {
  //   const me = this;
  //   me.alumnoService.getAlumnos().subscribe(result => console.log(result))
  // }
  alumnos: IAlumno[] = [];

  productDialog!: boolean;
  alumnoDialog:boolean = false;
  products: Product[] = [];
  email: string = '';
  fechaNac!: Date ;
  product!: Product;
  alumno!: IAlumno;
  selectedProducts: Product[] = [];
  selectedAlumnos: IAlumno[] = [];
  submitted !: boolean;

  constructor(
    private productService: ProductService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private alumnosService: AlumnoService
    )
     { }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);
      this.alumnosService.getAlumnos().subscribe(data => this.alumnos = data)
  }
  applyFilterGlobal($event:any, stringVal:string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  openNew() {
      this.alumno = {
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        dni: '',
        id: 0,
        // fechaNac: new Date(1990,1,1),
        estado: 0
      }
      // this.product = {};
      this.submitted = false;
      this.alumnoDialog = true;
  }

  deleteSelectedProducts() {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete the selected products?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      //         this.selectedProducts = null;
      //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      //     }
      // });
  }

  

  editAlumno(alumno: IAlumno) {
    this.alumno = {...alumno};
    this.alumnoDialog = true;
  }

  deleteAlumno(alumno: IAlumno) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + alumno.nombre + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              // this.products = this.products.filter(val => val.id !== product.id);
              // this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialogAlumno() {
    this.alumnoDialog = false;
    this.submitted = false;
  }
  
  saveAlumno() {
      this.submitted = true;

      if (this.alumno.nombre.trim()) {
          if (this.alumno.id) {
              // this.products[this.findIndexById(this.alumno.id)] = this.product;                
              // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.alumno.fechaNac = this.fechaNac.toISOString().split('T')[0]
              const alumno: DTOAlumno = { ... this.alumno, email: this.email}
              this.alumnosService.addAlumno(alumno).subscribe(result => console.log(result));
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }
          this.alumno = {
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            dni: '',
            id: 0,
            // fechaNac: new Date(1990,1,1),
            estado: 0
          }
          this.alumnosService.getAlumnos().subscribe(data => this.alumnos = data) 
          this.alumnoDialog = false;
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  // findIndexByIdAlumno(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.alumnos.length; i++) {
  //       if (this.alumnos[i].id === id) {
  //           index = i;
  //           break;
  //       }
  //   }

  //   return index;
  // }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
