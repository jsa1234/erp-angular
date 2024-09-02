
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { OrderStatus } from '@core/domain-classes/enums/order-status.enum';

@Directive({
  selector: '[appOrderStatus]'
})
export class OrderStatusDirective implements OnInit {
  @Input() appOrderStatus: OrderStatus;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.updateStatus();
  }

  private updateStatus() {
    let label: string;
    let badgeClass: string;

    switch (this.appOrderStatus) {
      case 0:
        label = 'Pending';
        badgeClass = 'badge-warning';
        break;
      case 1:
        label = 'Success';
        badgeClass = 'badge-success';
        break;
      case 2:
        label = 'Failed';
        badgeClass = 'badge-danger';
        break;
      default:
        label = 'Unknown';
        badgeClass = 'badge-secondary';
        break;
    }

    this.renderer.addClass(this.el.nativeElement, badgeClass);
    this.el.nativeElement.textContent = label;
  }
}
