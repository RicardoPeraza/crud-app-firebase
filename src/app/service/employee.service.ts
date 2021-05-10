import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  list: Employee[];

  private url = 'https://employee-2b1bd-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }


  postData( form ) {

    return this.http.post(`${ this.url }/employee.json`, form)
            .pipe(
              map( (resp: any) => {
                form.id = resp.name;
                return form;
              })
            );

  }

  getData() {
    return this.http.get(`${ this.url }/employee.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  deleteEmployee(id : number){
    return this.http.delete(`${ this.url }/employee/${ id }.json`);
  
  }

  putEmployee(form){
    const employeeTemp = {
      ...form
    };

    delete employeeTemp.id;

    return this.http.put(`${ this.url }/employee/${ form.id }.json`, employeeTemp);
   
    
  }


  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/employee/${ id }.json`);

  }



private crearArreglo( employeeObj: object ) {

  const employees: Employee[] = [];

  Object.keys( employeeObj ).forEach( key => {

    const employee:  Employee= employeeObj[key];
    employee.id = key;

    employees.push( employee );
  });


  return employees;

}

  
}
