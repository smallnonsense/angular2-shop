import {
  Directive, HostBinding, HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  private originalColor: string;
  @HostBinding('style.backgroundColor') color;

  @HostListener('mouseenter') onEnter() {
    this.originalColor = this.color;
    this.color = 'red';
    this.el.nativeElement.style.backgroundColor = this.color;
    console.log('HoverDirective.old:' + this.originalColor);
    console.log('HoverDirective.new:' + this.color);
  }

  @HostListener('mouseleave') onLeave() {
    this.color = this.originalColor;
    console.log('HoverDirective.back:' + this.color);
  }

  constructor(private el: ElementRef) {
    console.log('HoverDirective.originalColor:' + this.originalColor);
    console.log('HoverDirective.color:' + this.color);
  }
}
