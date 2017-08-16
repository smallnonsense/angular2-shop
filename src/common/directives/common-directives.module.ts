import { NgModule } from '@angular/core';

import { HighlightClickDirective, HoverDirective } from './';

@NgModule({
  declarations: [HighlightClickDirective, HoverDirective],
  exports: [HighlightClickDirective, HoverDirective],
  imports: [],
  providers: []
})
export class CommonDirectivesModule { }
