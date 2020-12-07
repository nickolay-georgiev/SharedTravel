import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appReadOnly]'
})
export class ReadOnlyDirective {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private route: Router
  ) { }

  ngOnInit() {
    const url = this.route.url;
    const el = this.elementRef.nativeElement;
    if (url.endsWith('user/profile')) {
      this.renderer2.setAttribute(el, 'readonly', 'readonly');
      this.renderer2.setStyle(el, 'background', 'white');
    }
  }
}
