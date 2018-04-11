import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ViewContainerRef} from '@angular/core';
//import { Todo } from("../model/Todomodel");
import { Response} from '@angular/http';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class BackendApiService {

    private labelSubjectObj = new Subject<any>();
    private noteSubjectObj = new Subject<any>();
    private profileSubjectObj = new Subject<any>();
    base_url="http://localhost:3000/";
    result:any;
    public urlpath;

    constructor(private http: Http ) {  }

    /* post service */
      postServiceData(path,model) {
          //console.log(model,path);
          let token = localStorage.getItem("token");
          //console.log("token", token);

          //set the token to header
          const headers = new Headers();
          headers.append('token', token);

          this.urlpath= this.base_url.concat(path);
          return this.http.post(this.urlpath,model,{ headers: headers })
          .map(res=>res.json());

          //this.toastr.success('You are awesome!', 'Success!', 'timeout: 3000');
      }

      ////////////////////////////////////////
      /* get service  */
      /////////////////////////

      getData(path) {
        //get url from the ts and concate it.
        let urlpath = this.base_url.concat(path);
        //get token from the local storage
        let email=localStorage.getItem("email");
        //get token from the local storage
        let token = localStorage.getItem("token");
        console.log("token", token);

        //set the token to header
        const headers = new Headers();
        headers.append('token', token);

        //http get call to the server
        return this.http.get(urlpath, { headers: headers })
                          .map((response: Response) => {
                                let resData = response.json();
                                return resData;
                              })
      }

    //read notes here
      loadAllNotes():void{
         let path = "readTodos";
         let urlpath = this.base_url.concat(path);
         let token = localStorage.getItem("token");
         //set the token to header
         const headers = new Headers();
         headers.append('token', token);
         this.http.get(urlpath, { headers: headers })
                     .toPromise()
                       .then((response: Response)=>{
                          this.noteSubjectObj.next(response.json());
                        });
       }


       getAllNotes(): Observable<any>{
          this.loadAllNotes();
          return this.noteSubjectObj.asObservable();
         }



         loadAllLabels():void{
            let path = "readLabel";
            let urlpath = this.base_url.concat(path);
            let token = localStorage.getItem("token");
            //set the token to header
            const headers = new Headers();
            headers.append('token', token);
            this.http.get(urlpath, { headers: headers })
                        .toPromise()
                          .then((response: Response)=>{
                              this.labelSubjectObj.next(response.json());
                           });
          }

          getAllLabels(): Observable<any>{
             this.loadAllLabels();
             return this.labelSubjectObj.asObservable();
            }

          loadProfile() : void {
             let path = "readActiveUser";
             let urlpath = this.base_url.concat(path);
             let token = localStorage.getItem("token");
             //set the token to header
             const headers = new Headers();
             headers.append('token', token);
             this.http.get(urlpath, { headers: headers })
                         .toPromise().then((response: Response)=>{
                          this.profileSubjectObj.next(response.json());
                          });
           }

             getprofile(): Observable<any>{
                this.loadProfile();
                return this.profileSubjectObj.asObservable();
               }




      /***********************************
       *** update service
      **********************************/
      updateData(path,data) {
        console.log(data);
        //var headers = this.getTokenLocalStorage();
        //return this.http.post(this.updateNotesUrl, note, { headers: headers });
         console.log("path", path);
         let token = localStorage.getItem("token");
         const headers = new Headers();
         headers.append('token', token);
         this.urlpath= this.base_url.concat(path);
         return this.http.put(this.urlpath,data,{ headers: headers })
         .map(res=>res.json());
      }
      /***********************************
       *** delete service
      **********************************/
      deleteData(path)
      {
        console.log("path", path);
        let token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append('token', token);
        this.urlpath= this.base_url.concat(path);
        return this.http.delete(this.urlpath,{ headers: headers })
        .map(res=>res.json());
      }

}
