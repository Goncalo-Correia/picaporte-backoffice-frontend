import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBusinesscardsComponent } from './customer-businesscards.component';

describe('CustomerBusinesscardsComponent', () => {
  let component: CustomerBusinesscardsComponent;
  let fixture: ComponentFixture<CustomerBusinesscardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBusinesscardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBusinesscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
