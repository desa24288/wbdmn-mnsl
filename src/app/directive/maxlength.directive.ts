import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxlength]'
})
export class MaxlengthDirective {
  @Input() maxLength: number;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('input') onInput(event) {
    const length = this.el.nativeElement.value ? this.el.nativeElement.value.length : 0;
    if (length > this.maxLength) {
      this.el.nativeElement.value = this.el.nativeElement.value.substr(0, length - 1);
    }
  }
}
