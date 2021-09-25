import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { IPersona } from '../../models/IPersona';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  formGroup: FormGroup;
  edicion:boolean;
  personaId: number;

  ngOnInit() {
    this.formGroup =  this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required] ],
      telefono: ['', [Validators.required, Validators.maxLength(10)] ],
      celular: ['', [Validators.required, Validators.maxLength(10)] ] ,
      correo: ['', [Validators.required, Validators.email] ]
    });

    this.activatedRoute.params.subscribe(params => {
      if(params["id"] == undefined){
        return;
      }

      this.edicion=true;
      this.personaId = params["id"];
      this.personaService.getPersona(this.personaId.toString())
        .subscribe(persona => this.cargarPersona(persona),
          error => this.redirectList());
    });
  }

  cargarPersona(persona :IPersona){
    this.formGroup.patchValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      telefono: persona.telefono,
      celular: persona.celular,
      correo: persona.correo
    });
  }

  save(){
    let persona : IPersona = Object.assign({}, this.formGroup.value);

    if(this.edicion){
      persona.id = this.personaId;
      this.personaService.actualizarPersona(persona)
        .subscribe(persona => this.redirectList(),
      error => console.error(error));  
    }else{
      this.personaService.createPersona(persona)
        .subscribe(persona => this.redirectList(),
      error => console.error(error));
    }
  }

  redirectList(){
    this.router.navigate(["/personas"]);
  }

}
