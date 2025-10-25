import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetawidgetWrapperComponent } from './metawidget-wrapper';

describe('MetawidgetWrapper', () => {
  let component: MetawidgetWrapperComponent;
  let fixture: ComponentFixture<MetawidgetWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetawidgetWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetawidgetWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
