import { Component, OnInit } from '@angular/core';
import { IPersona } from '../models/IPersona';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  ListadoPersonas : IPersona[];

  ngOnInit() {
    this.cargarData();
  }

  delete(persona: IPersona){
    this.personaService.eliminarPersona(persona.id.toString())
      .subscribe(persona => this.cargarData(), 
      error => console.error(error))
  }

  cargarData(){
    this.personaService.getPersonas()
      .subscribe(personas => this.ListadoPersonas = personas,
        error => console.error(error));
  }
}
