import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, delay } from 'rxjs/operators';
import { Heroe } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://login-ap-83a95-default-rtdb.firebaseio.com';
  list: Heroe[];
  

   

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    poder: new FormControl('', Validators.required),
    
   
  });


  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nombre: '',
      poder: ''
      
    });
  }

  crearHeroe( form ) {

    return this.http.post(`${ this.url }/heroes.json`, form)
            .pipe(
              map( (resp: any) => {
                form.id = resp.name;
                return form;
              })
            );

  }

  actualizarHeroe( form  ) {

    const heroeTemp = {
      ...form 
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ form.id }.json`, heroeTemp);


  }



  deleteEmployee(id : number){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  
  }


  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }
  

  putEmployee(form){
    const heroeTemp = {
      ...form
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ form.id }.json`, heroeTemp);
   
    
  }


  refreshList(){
    this.http.get(`${ this.url }/heroes.json`).toPromise().then(res => this.list = res as Heroe[]);
    
  }


  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



private crearArreglo( heroesObj: object ) {

  const heroes: Heroe[] = [];

  Object.keys( heroesObj ).forEach( key => {

    const heroe: Heroe = heroesObj[key];
    heroe.id = key;

    heroes.push( heroe );
  });


  return heroes;

}

 






}
