import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent  {

  invalidCredentialMsg: string;
  //declare object of FormControl for email validator
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value like john@abc.com' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

  constructor(private route: ActivatedRoute, private router: Router ,private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef) { this.toastr.setRootViewContainerRef(vcr); }
  forgetUser(data) {
    console.log(data);

           // console.log("submit Post click happend " + this.model.name)

            this.commonService.postServiceData('forgot_password',data).subscribe(
            data => {
               console.log(data);

              // this.toastr.success( 'Success!', 'timeout: 6000');
               this.router.navigate(['/forget']);
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
}
