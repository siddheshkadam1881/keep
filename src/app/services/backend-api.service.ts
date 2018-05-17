import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ViewContainerRef} from '@angular/core';
import { Response} from '@angular/http';
@Injectable()
export class BackendApiService {

    private labelSubjectObj = new Subject<any>();
    private noteSubjectObj = new Subject<any>();
    private profileSubjectObj = new Subject<any>();
    status:boolean = true;
    private brotherSource = new Subject<string>();
    brotherObservable$ = this.brotherSource.asObservable();

    private viewSubject = new Subject<any>();
    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

    base_url="http://localhost:3000/api/";
    result:any;
    public urlpath;
    options: RequestOptions;
    private changeColorSource = new Subject<any>();
    currentMessage = this.changeColorSource.asObservable();

    //changeColorObservable$ = this.changeColorSource.asObservable();

    //  const requestOptions = {
    //     params: new HttpParams()
    //  };
    // requestOptions.params.set('pull', 'push');
//const params = new HttpParams().set('page', '1');
//this.http.get(environment.api+ '.feed.json', requestOptions );

    constructor(private http: Http ) {
      this.myMethod$ = this.myMethodSubject.asObservable();
      }

      changeColor(message: string) {

      this.changeColorSource.next(message)
      }


      // getcssColor(): Observable<any>{
      //    this.changeColor(data);
      //    //return this.labelSubjectObj.asObservable();
      //    return this.changeColorSource.asObservable();
      //   }

      onDataChangeInBrother(data: any) {
      this.brotherSource.next(data);
      }

      myMethod(data) {
       // we can do stuff with data if we want
       this.myMethodSubject.next(data);
   }



       toggleView()
       {
          this.status = !this.status;
          this.viewSubject.next(this.status);
       }
        getStatus()
       {
          setTimeout(this.toggleView.bind(this));
          return this.viewSubject.asObservable();
       }





    /* post service */
         postServiceData(path,model,params?)
       {

          let httpParams = new HttpParams();
          if (params)
           Object.keys(params).forEach(function(key)
          {
              httpParams.append(key, params[key]);
          });

            let token = localStorage.getItem("token");

              // this.map = new Map<string, string[]>();
              // Object.keys(options.model).forEach(key => {
              // const value = (options.model as any)[key];
              // this.map !.set(key, Array.isArray(value) ? value : [value]);
              // });

            //set the token to header
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('token', token);
            // let myParams = HttpParams().set("params", params);
            let options = new RequestOptions({ headers: headers });

            this.urlpath = this.base_url.concat(path);
            return this.http.post(this.urlpath, model, options)
                             .map(res => res.json());

      }


      /**
      * get service
      */


      getData(path) {
        //get url from the ts and concate it.
        let urlpath = this.base_url.concat(path);
        //get token from the local storage
        let email=localStorage.getItem("email");
        //get token from the local storage
        let token = localStorage.getItem("token");

        console.log( localStorage.getItem("token"));


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



       getAllUsers(path): Observable<any>{
          this.loadAllUsers(path);
          return this.noteSubjectObj.asObservable();
         }

         loadAllUsers(path):void{
                //let path = "readTodos";
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
        //var headers = this.getTokenLocalStorage();
        //return this.http.post(this.updateNotesUrl, note, { headers: headers });

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
