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

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.service.getLoginUser().subscribe((res:any)=>{
      console.log('res-data', res)
      this.loginUser = res.data
    },(error:any)=>{
      console.log('error in getting user', error)
    })
  }

}
