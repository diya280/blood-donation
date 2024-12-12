import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-camp-details',
  templateUrl: './camp-details.component.html',
  styleUrls: ['./camp-details.component.scss']
})
export class CampDetailsComponent implements OnInit {
  status: string = '';
  camps: any[] = [];
  isModalOpen: boolean = false;
  selectedUser: any = null;
  userId: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  isDropdownOpen: boolean = false;
  selectedOption: string = 'All categories';  
  searchQuery: string = '';  


  constructor(private service: AuthServiceService,private toast: ToastrService,private route: ActivatedRoute) {}
 

  ngOnInit(): void {
  this.getLoginUser();
  this.getAllCamps();
  }

getLoginUser(){
   this.service.getLoginUser().subscribe(
    (res: any) => {
      this.userId = res.data?._id;
      console.log('user-id', this.userId);
    },
    (error: any) => {
      console.error('Error in getting logged-in user:', error);
    });
}

getAllCamps(): void {
  this.service.getAllCamp(this.currentPage).subscribe(
    (res: any) => {
      this.camps = res.data;
      this.totalPages = res.totalPages;
    },
    (error: any) => {
      console.error('Error fetching all camps:', error);
    }
  );
}

refresh(){
  this.getAllCamps()
  this.searchQuery = '';
  this.currentPage = 1;
}


onKeydown(event: KeyboardEvent) {
  console.log('event-called', event, event.key);
  
  if (event.key === 'Enter') {
    this.filterByCity();
  }
}


filterByCity() {
  const city = this.searchQuery;
   this.service.searchCity(city, this.currentPage).subscribe((res: any) => {  
     this.camps = res.data;
     this.totalPages = res.pagination.totalPages; 
   },(error:any)=>{
     console.error('error in search', error)
     this.toast.error(error.error.message || "Error in search by address")
   });
 }

 changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getAllCamps();
  }
}

  openModal(user: any): void {
    this.selectedUser = user;
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
    document.body.classList.remove('modal-open');
  }






}
