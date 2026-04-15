import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[scrollFloat]',
  standalone: true,
})
export class ScrollFloatDirective implements AfterViewInit, OnDestroy {
  /** Delay in ms before the animation plays (for staggering) */
  @Input() scrollFloatDelay = 0;
  /** translateY starting distance in px */
  @Input() scrollFloatOffset = 40;

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;

    el.style.opacity = '0';
    el.style.transform = `translateY(${this.scrollFloatOffset}px)`;
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`;
    el.style.transitionDelay = `${this.scrollFloatDelay}ms`;
    el.style.willChange = 'opacity, transform';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          this.observer?.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}