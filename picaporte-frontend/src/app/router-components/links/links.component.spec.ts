import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAnalyticsComponent } from './links.component';

describe('MonitoringAnalyticsComponent', () => {
  let component: MonitoringAnalyticsComponent;
  let fixture: ComponentFixture<MonitoringAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
