import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersona } from '../models/IPersona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiURL = this.baseUrl + 'api/persona';

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  getPersonas():Observable<IPersona[]>{
    return this.http.get<IPersona[]>(this.apiURL);
  }

  getPersona(id:string):Observable<IPersona>{
    return this.http.get<IPersona>(this.apiURL + "/" + id);
  }

  createPersona(persona:IPersona):Observable<IPersona>{
    return this.http.post<IPersona>(this.apiURL, persona);
  }

  actualizarPersona(persona:IPersona):Observable<IPersona>{
    return this.http.put<IPersona>(this.apiURL + "/" + persona.id, persona);
  }

  eliminarPersona(idPersona: string):Observable<IPersona>{
    return this.http.delete<IPersona>(this.apiURL + "/" + idPersona);
  }
}
