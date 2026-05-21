import { Injectable, EnvironmentInjector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LightboxOverlayComponent, LightboxImage } from './lightbox-overlay.component';

export { LightboxImage };

@Injectable({ providedIn: 'root' })
export class LightboxService {
  constructor(
    private overlay: Overlay,
    private environmentInjector: EnvironmentInjector
  ) {}

  open(images: LightboxImage[], startIndex = 0): void {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'lb-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    const portal = new ComponentPortal(LightboxOverlayComponent, null, null);
    const ref = overlayRef.attach(portal);
    ref.instance.images = images;
    ref.instance.currentIndex = startIndex;
    ref.instance.close = () => overlayRef.dispose();

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') overlayRef.dispose();
      else if (e.key === 'ArrowLeft') ref.instance.prev();
      else if (e.key === 'ArrowRight') ref.instance.next();
    });
  }
}
