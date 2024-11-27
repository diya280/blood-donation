import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AddCampComponent } from './add-camp/add-camp.component';
import { CampDetailsComponent } from './camp-details/camp-details.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AttendeesComponent } from './attendees/attendees.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-camp', component: AddCampComponent},
  { path: 'camp-details', component: CampDetailsComponent},
  { path: 'add-member', component: AddMemberComponent },
  { path: 'attendees/:id', component: AttendeesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
