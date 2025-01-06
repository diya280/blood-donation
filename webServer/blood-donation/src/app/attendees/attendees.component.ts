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
currentPage: number = 1;
totalPages: number = 0;
limit: number = 5;


ngOnInit(): void {
      this.routeId = this.route.snapshot.paramMap.get('id'); 
      this.getAttendees();  
  }

getAttendees(){
  this.service.getAttendees(this.routeId, this.currentPage).subscribe((res:any)=>{
    this.attendees = res.data
    this.title = this.attendees[0].campId.title,
    this.date = this.attendees[0].campId.date,
    this.streetAddress = this.attendees[0].campId.address.streetAddress,
    this.city = this.attendees[0].campId.address.city,
    this.district = this.attendees[0].campId.address.district,
    this.block = this.attendees[0].campId.address.block,
    this.zipCode = this.attendees[0].campId.address.zipCode,
    this.state = this.attendees[0].campId.address.state,

    this.totalPages = res.pagination.totalPages;
    console.log('attendess', res);
  },(error:any)=>{
    console.error('error in getting attendees', error)
  })
}


nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.getAttendees();
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getAttendees();
  }
}

}
