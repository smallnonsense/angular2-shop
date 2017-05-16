import { Input, Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightClick]'
})
export class HighlightClickDirective {

  private originalWeight: string = null;
  private originalColor: string = null;

  @Input('appHighlightClick')
  private definedColor: string;

  @HostBinding('style.font-weight')
  private weight: string;
  @HostBinding('style.color')
  private color: string;

  @HostListener('click')
  private onClick() {
    if (this.originalWeight === null) {
      this.originalWeight = this.weight;
      this.weight = 'bold';
    } else {
      this.weight = this.originalWeight;
      this.originalWeight = null;
    }
    if (this.originalColor === null) {
      this.originalColor = this.color;
      this.color = this.definedColor;
    } else {
      this.color = this.originalColor;
      this.originalColor = null;
    }
    console.log('HighlightClickDirective.weight.old:' + this.originalWeight);
    console.log('HighlightClickDirective.weight.new:' + this.weight);
    console.log('HighlightClickDirective.color.defined:' + this.definedColor);
    console.log('HighlightClickDirective.color.old:' + this.originalColor);
    console.log('HighlightClickDirective.color.new:' + this.color);
  }
}
