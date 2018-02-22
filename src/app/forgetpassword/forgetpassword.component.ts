import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
 options: FormGroup;
//hide password
 hide = true;
 invalidCredentialMsg: string;
 token:string;
  constructor(private route: ActivatedRoute, private router: Router ,private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef)
   {
     this.token = route.snapshot.params['token']
     //this.toastr.setRootViewContainerRef(vcr); }
}

  submitpassword(data) {
            console.log(data);
           // console.log("submit Post click happend " + this.model.name)
           //

            this.commonService.postServiceData('reset_password/'+ this.token,data).subscribe(
            data => {
                     // this.router.navigate(['/home']);
                     this.toastr.success( 'Success!', 'timeout: 6000');
                     this.router.navigate(['/signin']);
                     //console.log(this.responseStatus = data),
                     err =>{
                     console.log(err);
                     //this.toastr.error(err);
                     this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
                     () => console.log('password reset')
                     this.toastr.error(err);
          };
     });
  }




}
