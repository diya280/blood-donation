import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

constructor(private service: AuthServiceService, 
              private route: Router, private toast: ToastrService){}


@ViewChild('memberForm') memberForm! : NgForm;              
camps: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 8;
isModalOpen = false;
memberData = {
    firstName: '',
    lastName: '',
    bloodGroup: '',
    streetAddress: '',
    city: '',
    district: '',
    contact: '',
    quantity: '',
  };
  modalId: string | null = null;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  Quantity: string[] = ['0.5 Unit','1 Unit',];

  openModal(id: string) { 
    this.modalId = id;
    this.isModalOpen = true;  
  }
  
  closeModal() {
    this.modalId = null;
    this.isModalOpen = false;

    if (this.memberForm) {
      this.memberForm.resetForm();  
    }
  }
  

  onSubmit(): void {
  if(this.memberData && this.modalId){
    const data = {
      userData: this.memberData,
      id: this.modalId
    }
    this.service.AddMember(data).subscribe((res:any)=>{
     this.toast.success(res.message || 'Member added successfully')
     this.closeModal();
     this.clearForm();
     this.memberForm.reset();
    },(error:any)=>{
      console.error('Error in adding member', error)
      this.toast.error(error.error.message)
    })
   }
  }

  clearForm(){
    this.memberData.firstName = '';
    this.memberData.lastName = '';
    this.memberData.bloodGroup = '';
    this.memberData.quantity = '';
    this.memberData.streetAddress = '';
    this.memberData.city = '';
    this.memberData.district = '';
    this.memberData.contact = '';
  }



get paginatedCamps() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.camps.slice(startIndex, startIndex + this.itemsPerPage);
}

goToPage(page: number): void {
  this.currentPage = page;
}

ngOnInit(): void {
    this.getUserCamp();
}

getUserCamp(){
  this.service.getCampById().subscribe((res:any)=>{
    this.camps = res.data 
  },(error:any)=>{
    console.error('error in getting camp', error)
    this.toast.error('Getting error, try after sometime')
  })
}

showAddedmembers(id: any) {
  this.route.navigate([`/attendees/${id}`]);
}


}
