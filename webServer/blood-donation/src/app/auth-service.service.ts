import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

constructor(private http: HttpClient ) { }

signupUser(data: any){
  const apiUrl : string = `https://localhost:8080/api/`;
  return this.http.post(apiUrl, data)
}

getLoginUser(){
  const apiUrl : string = `https://localhost:8080/api/`;
  return this.http.get(apiUrl)
}



}
