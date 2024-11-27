import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.scss']
})
export class AddCampComponent implements OnInit{

constructor(private service: AuthServiceService, 
  private toast: ToastrService){
 this.minDate = new Date().toISOString().split('T')[0];
}

ngOnInit(): void { }

minDate: string = '';
date: string = '';
title: string = '';
streetAddress: string = '';
city: string = '';
district: string = '';
block: string = '';
zipCode: string = '';
state: string = '';
contact: string = '';

onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Submitted!', form.value);
  }
  console.log('method called - add camp')
  this.service.createCamp(form.value).subscribe((res:any)=>{
     console.log('response', res)
  },(error:any)=>{
    console.error('error in add camp', error)
  })

}


}
