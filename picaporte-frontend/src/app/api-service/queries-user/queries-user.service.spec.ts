import { TestBed } from '@angular/core/testing';

import { QueriesUserService } from './queries-user.service';

describe('QueriesUserService', () => {
  let service: QueriesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
