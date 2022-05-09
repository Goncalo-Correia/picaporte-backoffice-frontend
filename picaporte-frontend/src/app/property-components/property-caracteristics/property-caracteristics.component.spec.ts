import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCaracteristicsComponent } from './property-caracteristics.component';

describe('PropertyCaracteristicsComponent', () => {
  let component: PropertyCaracteristicsComponent;
  let fixture: ComponentFixture<PropertyCaracteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCaracteristicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCaracteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
