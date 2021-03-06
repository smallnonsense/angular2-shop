import { Input, Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightClick]'
})
export class HighlightClickDirective {

  private originalWeight: string = null;
  private originalColor: string = null;

  @Input()
  public appHighlightClick: string;

  @HostBinding('style.font-weight')
  public weight: string;
  @HostBinding('style.color')
  public color: string;

  @HostListener('click')
  public onClick() {
    if (this.originalWeight === null) {
      this.originalWeight = this.weight;
      this.weight = 'bold';
    } else {
      this.weight = this.originalWeight;
      this.originalWeight = null;
    }
    if (this.originalColor === null) {
      this.originalColor = this.color;
      this.color = this.appHighlightClick;
    } else {
      this.color = this.originalColor;
      this.originalColor = null;
    }
  }
}
