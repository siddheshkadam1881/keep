import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { NgModule, LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http'
import io from 'socket.io-client';
import { BackendApiService } from './services/backend-api.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ForgetComponent } from './forget/forget.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';
import {LayoutModule} from '@angular/cdk/layout';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CommonComponent } from './common/common.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrashComponent } from './trash/trash.component';
import { ArchieveComponent } from './archieve/archieve.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatetimepickerModule,MatNativeDatetimeModule,MAT_DATETIME_FORMATS } from "@mat-datetimepicker/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatChipsModule} from '@angular/material/chips';
import { OpenDialogImageComponent } from './open-dialog-image/open-dialog-image.component';
import { OpenDialogProfileComponent } from './open-dialog-profile/open-dialog-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OpenDialogLabelComponent } from './open-dialog-label/open-dialog-label.component';
import { LabeldashboardComponent } from './labeldashboard/labeldashboard.component';
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent,
   children: [
       { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
       { path: 'Dashboard', component: DashboardComponent },
       { path: 'Trash', component: TrashComponent },
       { path: 'Archieve', component: ArchieveComponent },
       { path: 'Label/:id', component: LabeldashboardComponent }
    ],
},
  { path: 'forgetpass/:token', component: ForgetpasswordComponent },
  //{ path: 'forgetpass', component: ForgetpasswordComponent },
  { path: 'forget', component: ForgetComponent }
];

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('209419629801960')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations:
  [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ForgetpasswordComponent,
    ForgetComponent,
    CommonComponent,
    DashboardComponent,
    TrashComponent,
    ArchieveComponent,
    OpenDialogImageComponent,
    OpenDialogProfileComponent,
    OpenDialogLabelComponent,
    LabeldashboardComponent
  ],
  imports: [
    ImageCropperModule,
    MatChipsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    //MatNativeDatetimeModule,
    //MatDatepickerModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    LayoutModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastModule.forRoot(),
    // RouterModule.forChild(routes),
    SocialLoginModule.initialize(config)
  ],
  entryComponents: [

     CommonComponent,
     OpenDialogImageComponent,
     OpenDialogProfileComponent,
     OpenDialogLabelComponent
   ],

  providers: [BackendApiService, { provide: AuthServiceConfig, useFactory: provideConfig }, {
      provide: LOCALE_ID,
      useValue: "de-DE"
    },

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
