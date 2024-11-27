import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-camp-details',
  templateUrl: './camp-details.component.html',
  styleUrls: ['./camp-details.component.scss']
})
export class CampDetailsComponent implements OnInit, OnDestroy {
  status: string = '';
  camps: any[] = [];
  isModalOpen: boolean = false;
  selectedUser: any = null;
  userId: string = '';
  queryParamsSubscription!: Subscription;
  currentPage: number = 1;
  itemsPerPage: number = 9; 

  constructor(private service: AuthServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.getLoginUser();

    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
      this.status = params['status'];
      console.log('Received status:', this.status);
      this.loadCampsBasedOnStatus();
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

getLoginUser(){
   this.service.getLoginUser().subscribe(
    (res: any) => {
      this.userId = res.data?._id;
      console.log('user-id', this.userId);
    },
    (error: any) => {
      console.error('Error in getting logged-in user:', error);
    }
  );
}

  loadCampsBasedOnStatus(): void {
    if (this.status === 'id') {
      this.getLoginUser();
      this.getCampById();
    } else if (this.status === 'all') {
      this.getLoginUser();
      this.getAllCamps();
    } else {
      console.log('Invalid status value:', this.status);
    }
  }

  getCampById(): void {
    console.log('Fetching camps by ID...');
    this.service.getCampById().subscribe(
      (res: any) => {
        console.log('Camps by ID:', res);
        this.camps = res.data;
        this.camps.reverse();
      },
      (error: any) => {
        console.error('Error fetching camps by ID:', error);
      }
    );
  }

  getAllCamps(): void {
    console.log('Fetching all camps...');
    this.service.getAllCamp().subscribe(
      (res: any) => {
        this.camps = res.data.filter((data: any) => data.createdId !== this.userId);
        console.log('All camps:', this.camps);
        this.camps.reverse();
      },
      (error: any) => {
        console.error('Error fetching all camps:', error);
      }
    );
  }

  openModal(user: any): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

get paginatedCamps() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.camps.slice(startIndex, startIndex + this.itemsPerPage);
}

goToPage(page: number): void {
  this.currentPage = page;
}



}
