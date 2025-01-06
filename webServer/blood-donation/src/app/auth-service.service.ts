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

createCamp(data: any) {
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    throw new Error('Unauthorized: Token is missing'); 
  }

  const apiUrl: string = `http://localhost:8080/api/create/camp`;
  return this.http.post(apiUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}

getCampById(page: any): Observable<any> {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('Token is missing');
  }

  return from(
    fetch(`http://localhost:8080/api/get/camp/id?page=${page}&size=4`, {
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

getAllCamp(page:any){
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token is missing');
  }
  return from(
    fetch(`http://localhost:8080/api/get/camp?page=${page}&size=6`, {
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

AddMember(data:any){
  const apiUrl: string = `http://localhost:8080/api/add/members`;
  return this.http.post(apiUrl, data)
}

getAttendees(id:any,page: any){
  const apiUrl: string = `http://localhost:8080/api/get/attendees?id=${id}&page=${page}&size=5`;
  return this.http.get(apiUrl)
}

searchCity(city:any, page:any){
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token is missing');
  }
  return from(
    fetch(`http://localhost:8080/api/get/filterKeywords?city=${city}&page=${page}&size=6`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error; 
    })
  );
}

}
