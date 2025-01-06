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
contact: string = '';
selectedState: string = '';
states: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Submitted!', form.value);
    this.service.createCamp(form.value).subscribe(
      (res: any) => {
        console.log('response', res);
        this.toast.success(res.message || 'Camp added successfully');
        
        form.resetForm(); 
        form.submitted = false; 
      },
      (error: any) => {
        console.error('error in add camp', error);
      }
    );
  }
}



}
