import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {

constructor(private route: ActivatedRoute,
   private service: AuthServiceService){
  
}

routeId: any;
attendees : any[] = [];
title: string = '';
date: string = '';
streetAddress: string = '';
city: string = '';
district: string = '';
block: string = '';
zipCode: string = '';
state: string = '';
page: number = 1;    
totalItems: any


  ngOnInit(): void {
      this.routeId = this.route.snapshot.paramMap.get('id'); 
      this.getAttendees();  
  }

getAttendees(){
  this.service.getAttendees(this.routeId).subscribe((res:any)=>{
    this.attendees = res.data


    this.title = this.attendees[0].campId.title,
    this.date = this.attendees[0].campId.date,
    this.streetAddress = this.attendees[0].campId.address.streetAddress,
    this.city = this.attendees[0].campId.address.city,
    this.district = this.attendees[0].campId.address.district,
    this.block = this.attendees[0].campId.address.block,
    this.zipCode = this.attendees[0].campId.address.zipCode,
    this.state = this.attendees[0].campId.address.state,

    console.log('attendess', this.attendees);
  },(error:any)=>{
    console.error('error in getting attendees', error)
  })
}

}
