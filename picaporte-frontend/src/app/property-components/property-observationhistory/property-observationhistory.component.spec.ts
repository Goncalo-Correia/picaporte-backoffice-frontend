import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyObservationhistoryComponent } from './property-observationhistory.component';

describe('PropertyObservationhistoryComponent', () => {
  let component: PropertyObservationhistoryComponent;
  let fixture: ComponentFixture<PropertyObservationhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyObservationhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyObservationhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
