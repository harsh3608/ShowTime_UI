import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PunchService {
  userBaseServerLink: string = 'https://localhost:7231/api/Punch/';

  constructor(
    private http: HttpClient
  ) { }

  
  
}
