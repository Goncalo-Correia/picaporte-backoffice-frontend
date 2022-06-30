import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOnlineComponent } from './property-online.component';

describe('PropertyOnlineComponent', () => {
  let component: PropertyOnlineComponent;
  let fixture: ComponentFixture<PropertyOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
