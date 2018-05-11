import {ElementRef,Directive,OnInit} from '@angular/core';
import {Router,NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
@Directive({
  selector:'[appColor]'
})

export class NavbarDirective
{
constructor(private _el:ElementRef,private _router:Router)
{

}

public routerArray:Array<string>=["/home","/home/Trash","/home/Archieve"];
public colorArray:Array<string>=["#ffbb00","gray","green"];


ngOnInit()
{
this.onRouterColorChange();
}
onRouterColorChange():void
{
this._router.events.pipe
(
  filter(events=>events instanceof NavigationEnd)
)
.subscribe(({url}:NavigationEnd)=>
{

  let index=this.routerArray.indexOf(url);
  //console.log("Router url:"+[url,index,this.colorArray[index]]);
  this.colorChange(this.colorArray[index]);
})
}


colorChange(color)
{
 this._el.nativeElement.style.backgroundColor=color;
 //this._el.nativeElement.style.innerHTML="Google";
}


}
