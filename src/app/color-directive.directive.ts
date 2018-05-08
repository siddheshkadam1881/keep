
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorDirective]'
})
export class ColorDirectiveDirective {

  constructor(private el: ElementRef) { }

  @Input() defaultColor: string;

   @Input('appColorDirective') highlightColor: string;

   @HostListener('mouseenter') onMouseEnter() {
     this.highlight(this.highlightColor || this.defaultColor || 'red');
   }

   @HostListener('mouseleave') onMouseLeave() {
     this.highlight("blue");
   } 

   @HostListener('document:click', ['$event'])
    handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.highlight('red');
    } else {
      this.highlight(null);
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}



export class HighlightDirective {

  constructor(private el: ElementRef) { }


  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
