import { TestBed } from '@angular/core/testing';

import { QueriesCustomerService } from './queries-customer.service';

describe('QueriesCustomerService', () => {
  let service: QueriesCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
