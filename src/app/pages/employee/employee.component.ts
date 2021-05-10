import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  form: FormGroup;
  employee: Employee[]=[]
  employeemodel: Employee = new Employee();

  constructor(private readonly fb: FormBuilder, private service:EmployeeService) {
    
    this.form = new FormGroup({
      id: new FormControl(null),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),      
    });

  }

  ngOnInit(): void {
    this.CargarLista();
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      username: '',
      password: ''
      
    });
  }


  CargarLista(){
    
    this.service.getData().subscribe(res => {
      this.employee = res
    });
  }

  getid(id : string){
    console.log(id);

    if ( id !== 'nuevo' ) {

      this.service.getHeroe( id )
        .subscribe( (resp: Employee) => {
          //this.form = resp;
         // this.heroemodel.id = id;
         this.form.setValue({id:id,username:resp.username,password:resp.password})  
         this.employeemodel.id = id;
         
        });

    }
  }


  onSubmit() {
    if (this.form.valid) {

      let peticion: Observable<any>;
      

    if ( this.employeemodel.id ) {
      peticion = this.service.putEmployee( this.form.value);
    } else {
      peticion = this.service.postData(this.form.value);
    }
      peticion.subscribe(res =>{
        this.CargarLista();
      });
    this.initializeFormGroup(); 
     
    }
  }


  onDelete(id : number){
    console.log(id);
    this.service.deleteEmployee(id).subscribe(res=>{this.CargarLista()}  );
    this.CargarLista();
      }
 

}
