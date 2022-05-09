import { TestBed } from '@angular/core/testing';

import { QueriesEntityReferenceService } from './queries-entity-reference.service';

describe('QueriesEntityReferenceService', () => {
  let service: QueriesEntityReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesEntityReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
