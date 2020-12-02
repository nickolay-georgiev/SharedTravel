import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appHideElement]'
})
export class HideElementDirective {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private route: Router
  ) { }

  ngOnInit() {
    const url = this.route.url;
    const el = this.elementRef.nativeElement;

    if (url.endsWith('user/profile') && el.textContent === 'Save Changes'){
      this.renderer2.setStyle(el, 'display', 'none');
    }

    if(url.endsWith('user/edit') && el.textContent === 'Edit profile' )
    this.renderer2.setStyle(el, 'display', 'none');

    if(url.endsWith('user/profile') && el.textContent === 'Change Photo' )
    this.renderer2.setStyle(el, 'display', 'none');
  }
}
