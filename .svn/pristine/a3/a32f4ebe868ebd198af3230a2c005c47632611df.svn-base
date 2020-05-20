import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelecttext]'
})
export class SelecttextDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('click')
  public onClick(): void {
    this.elementRef.nativeElement.select();
  }
}
