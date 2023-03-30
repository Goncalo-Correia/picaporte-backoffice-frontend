import { TestBed } from '@angular/core/testing';

import { FontawesomeServiceService } from './fontawesome-service.service';

describe('FontawesomeServiceService', () => {
  let service: FontawesomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontawesomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
