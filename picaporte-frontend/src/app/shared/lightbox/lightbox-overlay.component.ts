import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LightboxImage {
  src: string;
  caption?: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-lightbox-overlay',
  template: `
    <div class="lb-container" (click)="$event.stopPropagation()">
      <button class="lb-close" (click)="close()">
        <i class="fa-solid fa-xmark fa-xl"></i>
      </button>
      <button *ngIf="images.length > 1" class="lb-nav lb-prev" (click)="prev()">
        <i class="fa-solid fa-chevron-left fa-xl"></i>
      </button>
      <div class="lb-img-wrapper">
        <img [src]="images[currentIndex].src" [alt]="images[currentIndex].caption ?? ''" class="lb-img">
        <div *ngIf="images[currentIndex].caption" class="lb-caption">{{ images[currentIndex].caption }}</div>
      </div>
      <button *ngIf="images.length > 1" class="lb-nav lb-next" (click)="next()">
        <i class="fa-solid fa-chevron-right fa-xl"></i>
      </button>
      <div *ngIf="images.length > 1" class="lb-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>
  `,
  styles: [`
    .lb-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 90vw;
      max-height: 90vh;
    }
    .lb-close {
      position: absolute;
      top: -44px;
      right: 0;
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      z-index: 1;
    }
    .lb-close:hover { opacity: 0.8; }
    .lb-nav {
      background: rgba(0, 0, 0, 0.4);
      border: none;
      color: white;
      cursor: pointer;
      padding: 16px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .lb-nav:hover { background: rgba(0, 0, 0, 0.7); }
    .lb-prev { margin-right: 8px; }
    .lb-next { margin-left: 8px; }
    .lb-img-wrapper { position: relative; }
    .lb-img {
      max-width: 80vw;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 4px;
      display: block;
    }
    .lb-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      text-align: center;
      padding: 8px 12px;
      border-radius: 0 0 4px 4px;
    }
    .lb-counter {
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      white-space: nowrap;
    }
  `]
})
export class LightboxOverlayComponent {
  images: LightboxImage[] = [];
  currentIndex = 0;
  close!: () => void;

  prev(): void {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) this.currentIndex++;
  }
}
