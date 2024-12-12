import { Component , OnInit} from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  constructor(private service: AuthServiceService, private toast: ToastrService, private route: Router){}

  loginUser: any;
  isModalOpen: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 
  activeButton: string = 'home'; 
  showPassword: boolean = false;
  isProfileModal: boolean = false;

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
      this.loginUser = res.data
      console.log('login-user', this.loginUser);
    },(error:any)=>{
      console.log('error in getting user', error)
    })
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  loginOrganisation(event: Event): void {
    event.preventDefault();

    if (!this.email || !this.password) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Logging in with:', this.email, this.password);
    const data ={
      email: this.email,
      password: this.password,
    }

    this.service.loginUser(data).subscribe((res:any)=>{
      if (res.status === 'Success') {
        localStorage.setItem('authToken', res.token);
        console.log('Token saved:', res.token);
      }
      this.toast.success('Logged in successfully!', 'Success'); 
      this.closeModal();
      this.clearData();
      this.getUser();
      },(error:any)=>{
      console.log('error in login organisation', error)
      this.toast.error( error.error.message||'Error in login, try after sometime'); 
    })
  }

clearData(){
  this.email = '',
  this.password = ''
}

navigateToAdd(){
  this.route.navigate(['/add-camp']);
}

navigateToHome(){
  this.route.navigate(['/']);
}

navigateToDetails(status: string) {
  console.log('status', status);
  this.route.navigate(['/camp-details'], 
    { queryParams: { status: status } });
}

navigateToMember(){
  this.route.navigate(['/add-member']);
}

setActiveButton(button: string): void {
  console.log('button', button);
  this.activeButton = button; 
}


openProfileModal(){
  console.log('profile open');
  
this.isProfileModal = true;
}

closeProfileModal(){
  console.log("profile close");
  
this.isProfileModal = false;
}

}
