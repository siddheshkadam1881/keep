import { Component,OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http'
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
 responseStatus:Object= [];
 status:boolean ;
 loading = false;
 returnUrl: string;
  user: SocialUser;
  invalidCredentialMsg: string;
  constructor(private userService: UserService,private authService: AuthService,private route: ActivatedRoute, private router: Router , private commonService:BackendApiService, public toastr: ToastsManager, vcr: ViewContainerRef)
  { this.toastr.setRootViewContainerRef(vcr); }
  //password validation
  hide = true;
  //declare object of FormControl for email validator
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value like john@abc.com' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

      signInUser(data) {
         console.log(data.email);

                localStorage.setItem('email',data.email);

                this.commonService.postServiceData('signin',data)
                .subscribe(data => {
                   console.log(data);
                   localStorage.setItem('token',data.token);
                   this.router.navigate(['/home']);
                  // this.toastr.success( 'Success!');
                  // this.router.navigate(['/home']);

                //console.log(this.responseStatus = data),
                err =>{
                         console.log(err);
                        //this.toastr.error(err);
                        this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
                () => console.log('Request Completed')
                       this.toastr.error(err);

              };
         });
}


ngOnInit() {
 }


 fbLogin() {
   this.userService.fbLogin().then(() => {
     console.log('User has been logged in');
     this.router.navigate(['/home']);
   });  }


signOut(): void {
    this.authService.signOut();
  }






}

// signInWithGoogle(): void {
//    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
//      this.router.navigate(["'http://localhost:3000/auth/facebook'"]);
//  }
