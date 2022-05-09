import { TestBed } from '@angular/core/testing';

import { QueriesPropertyService } from './queries-property.service';

describe('QueriesPropertyService', () => {
  let service: QueriesPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
