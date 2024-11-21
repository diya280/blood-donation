import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

signUp(data:any){
  console.log('sign-up data', data)
  const url = `http://localhost:8080/api/add/organisation`;
  return this.http.post( url, data);
}

}