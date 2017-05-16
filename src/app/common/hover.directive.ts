import {
  Directive, HostBinding, HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  private originalColor: string;
  @HostBinding('style.backgroundColor')
  private color : string;

  @HostListener('mouseenter')
  private onEnter() {
    this.originalColor = this.color;
    this.color = 'lightgrey';
    console.log('HoverDirective.old:' + this.originalColor);
    console.log('HoverDirective.new:' + this.color);
  }

  @HostListener('mouseleave')
  private onLeave() {
    this.color = this.originalColor;
    console.log('HoverDirective.back:' + this.color);
  }
}
