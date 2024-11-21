import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  ngOnInit(): void {}
  signupForm: FormGroup;

 constructor(private service: AuthServiceService,private toast: ToastrService,
    private route: Router, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      organisationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      password: ['', [Validators.required, Validators.minLength(8)]], 
      confirmPassword: ['', Validators.required], 
      streetAddress: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      district: ['', [Validators.required, Validators.minLength(2)]],
      block: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]], 
      state: ['', [Validators.required, Validators.minLength(2)]],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator for matching passwords
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = new FormData();
      formData.append('organisationName', this.signupForm.get('organisationName')?.value);
      formData.append('email', this.signupForm.get('email')?.value);
      formData.append('contact', this.signupForm.get('contact')?.value);
      formData.append('password', this.signupForm.get('password')?.value);
      formData.append('streetAddress', this.signupForm.get('streetAddress')?.value);
      formData.append('city', this.signupForm.get('city')?.value);
      formData.append('district', this.signupForm.get('district')?.value);
      formData.append('block', this.signupForm.get('block')?.value);
      formData.append('zipCode', this.signupForm.get('zipCode')?.value);
      formData.append('state', this.signupForm.get('state')?.value);
  
      this.service.signupUser(formData).subscribe(
        (res: any) => {
          console.log('Form submitted successfully:', res);
          this.toast.success(res.message);
          if (res.status === 'Success') {
            localStorage.setItem('authToken', res.token);
            console.log('Token saved:', res.token);
            this.navigateToDashboard();
          }
        },
        (error: any) => {
          console.error('Error during signup:', error);
          this.toast.error('Signup failed. Please try again.', 'Error');
        }
      );
    } else {
      console.error('Form is invalid');
      this.toast.error('Please fill in all the fields!', 'Form Incomplete');
    }
  }
  
  
navigateToDashboard(){
  this.route.navigate(['/']);
}

}
