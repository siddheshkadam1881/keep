
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
import { ISubscription } from "rxjs/Subscription";
// import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
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
  private viewContainerRef: ViewContainerRef;
  private subscription: ISubscription;

  constructor(private userService: UserService,private authService: AuthService,private route: ActivatedRoute, private router: Router , private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef)
  {
    this.toastr.setRootViewContainerRef(vcr);
   }
  //password validation
  hide = true;
  //declare object of FormControl for email validator
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value like john@abc.com' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

  // startLoading() {
  //       this.slimLoadingBarService.start(() => {
  //           console.log('Loading complete');
  //       });
  //   }

  showSuccess() {
       this.toastr.success('Login Successfully!');
     }

      signInUser(data)
      {
        localStorage.setItem('email',data.email);
        this.commonService.postServiceData('signin',data)
                                             .subscribe(data => {

                                                   localStorage.setItem('token',data.token);
                                                   this.showSuccess();
                                                   setTimeout (() => {
                                                   this.router.navigate(['/home']);
                                                    }, 2000)
                                                   });
     }


ngOnInit() {
 }


   fbLogin() {
   this.userService.fbLogin().then(() => {

                                   this.showSuccess();
                                   setTimeout (() => {
                                   this.router.navigate(['/home']);
                                }, 2000)
                              });
   }


signOut(): void {
    this.authService.signOut();
  }
}
