import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public apiUrl = '';

  public enableDebug = true;
  
  constructor() { }
}
