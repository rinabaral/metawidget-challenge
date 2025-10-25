import { AfterViewInit, Component, ElementRef, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetawidgetFallback } from './metawidget-fallback';

// Import Metawidget properly
declare const Metawidget: any;

@Component({
  selector: 'app-metawidget-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metawidget-wrapper.html',
  styleUrls: ['./metawidget-wrapper.css']
})
export class MetawidgetWrapperComponent implements AfterViewInit, OnDestroy {
  @Input() toInspect: any;
  @Input() config: any;
  
  private metawidgetInstance: any;
  private retryCount = 0;
  private maxRetries = 10;
  private useFallback = false;

  constructor(
    private host: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeMetawidget();
    }, 100);
  }

  ngOnDestroy() {
    if (this.metawidgetInstance) {
      try {
        this.metawidgetInstance.destroy();
      } catch (error) {
        console.warn('Error destroying Metawidget:', error);
      }
    }
  }

  private initializeMetawidget() {
    const container = this.host.nativeElement.querySelector('#mwContainer');
    if (!container) {
      console.error('Metawidget container not found!');
      return;
    }

    // Check if Metawidget is available globally
    if (typeof (window as any).Metawidget === 'undefined') {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Metawidget not loaded yet, retrying... (${this.retryCount}/${this.maxRetries})`);
        setTimeout(() => this.initializeMetawidget(), 200);
        return;
      } else {
        console.log('Metawidget not available, using fallback implementation');
        this.useFallback = true;
        this.initializeFallback();
        return;
      }
    }

    try {
      // Clear any existing content
      container.innerHTML = '';

      // Create new Metawidget instance
      this.metawidgetInstance = new (window as any).Metawidget(container, this.config || {});
      this.metawidgetInstance.toInspect = this.toInspect;
      this.metawidgetInstance.buildWidgets();

      console.log('Metawidget built successfully:', container.innerHTML);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing Metawidget:', error);
      console.log('Falling back to custom implementation');
      this.useFallback = true;
      this.initializeFallback();
    }
  }

  private initializeFallback() {
    const container = this.host.nativeElement.querySelector('#mwContainer');
    if (!container) {
      console.error('Container not found for fallback!');
      return;
    }

    try {
      // Clear any existing content
      container.innerHTML = '';

      // Create fallback instance
      this.metawidgetInstance = new MetawidgetFallback(container, this.config || {});
      this.metawidgetInstance.toInspect = this.toInspect;
      this.metawidgetInstance.buildWidgets();

      console.log('Metawidget fallback initialized successfully');
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing Metawidget fallback:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      container.innerHTML = `<div style="color: red; padding: 20px;">Error initializing form: ${errorMessage}</div>`;
    }
  }
}

