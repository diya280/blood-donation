import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

constructor(private http: HttpClient ) { }

signupUser(data: any) {
  const apiUrl: string = `http://localhost:8080/api/add/organisation`;
  return this.http.post(apiUrl, data)
}


loginUser(data:any){
  const apiUrl : string = `http://localhost:8080/api/login/organisation`;
  return this.http.post(apiUrl, data)
}


getLoginUser(): Observable<any> {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('Token is missing');
  }

  return from(
    fetch('http://localhost:8080/api/get/login/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error; 
    })
  );
}




}
