import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRentingComponent } from './property-renting.component';

describe('PropertyRentingComponent', () => {
  let component: PropertyRentingComponent;
  let fixture: ComponentFixture<PropertyRentingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRentingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
