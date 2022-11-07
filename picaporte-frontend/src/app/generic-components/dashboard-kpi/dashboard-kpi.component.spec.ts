import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKpiComponent } from './dashboard-kpi.component';

describe('AmenetieTypeKpiComponent', () => {
  let component: DashboardKpiComponent;
  let fixture: ComponentFixture<DashboardKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
