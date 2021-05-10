import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Heroe } from 'src/app/models/heroe.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  resultado: string;
  heroe: Heroe[]=[]

  heroemodel: Heroe = new Heroe();
  

  constructor(public fb: FormBuilder,public service: ApiService){
   
  }

  ngOnInit() {
    
    
    this.refrescar();
    
   
    
  }


  refrescar(){
    
    this.service.getHeroes().subscribe(res => {
      this.heroe = res
    });
  }


 

  getid(id : string){
    console.log(id);

    if ( id !== 'nuevo' ) {

      this.service.getHeroe( id )
        .subscribe( (resp: Heroe) => {
          //this.form = resp;
         // this.heroemodel.id = id;
         this.service.form.setValue({id:id,nombre:resp.nombre,poder:resp.poder})  
         this.heroemodel.id = id;
         console.log(resp)
        });

    }
  }



  onSubmit() {
    if (this.service.form.valid) {

      let peticion: Observable<any>;
      console.log("este es el id que estoy recibiendo" + this.heroemodel.id)

    if ( this.heroemodel.id ) {
      peticion = this.service.actualizarHeroe( this.service.form.value);
    } else {
      peticion = this.service.crearHeroe(this.service.form.value);
    }
      peticion.subscribe(res =>{
        this.refrescar()
      });
    this.service.initializeFormGroup(); 
     
    }
  }

 
  onDelete(id : number){
    console.log(id);
    this.service.deleteEmployee(id).subscribe(res=>{this.refrescar() }  );
    this.refrescar();
      }





}


