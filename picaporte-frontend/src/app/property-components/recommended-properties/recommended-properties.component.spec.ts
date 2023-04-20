import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPropertiesComponent } from './recommended-properties.component';

describe('RecommendedPropertiesComponent', () => {
  let component: RecommendedPropertiesComponent;
  let fixture: ComponentFixture<RecommendedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
