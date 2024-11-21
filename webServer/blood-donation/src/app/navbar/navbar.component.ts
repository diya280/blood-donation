import { Component , OnInit} from '@angular/core';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(private service: AuthServiceService){}

  loginUser: any[] =[];
  isModalOpen: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 


  openModal() {
    console.log('open click')
    this.isModalOpen = true;
  }

  closeModal() {
    console.log('close click')
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.service.getLoginUser().subscribe((res:any)=>{
      console.log('res-data', res)
      this.loginUser = res.data
      console.log('login-user', this.loginUser)
    },(error:any)=>{
      console.log('error in getting user', error)
    })
  }
  
  loginOrganisation(event: Event): void {
    event.preventDefault();
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    const data ={
      email: this.email,
      password: this.password,
    }

    console.log('data',data)
    this.service.loginUser(data).subscribe((res:any)=>{
      console.log('response-login', res)
      if (res.status === 'Success') {
        localStorage.setItem('authToken', res.token);
        console.log('Token saved:', res.token);
      }
      this.getUser();
      this.closeModal();
      this.clearData();
    },(error:any)=>{
      console.log('error in login organisation', error)
    })
  }

clearData(){
  this.email = '',
  this.password = ''
}

}
