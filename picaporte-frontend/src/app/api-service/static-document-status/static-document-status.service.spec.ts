import { TestBed } from '@angular/core/testing';

import { StaticDocumentStatusService } from './static-document-status.service';

describe('StaticDocumentStatusService', () => {
  let service: StaticDocumentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticDocumentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
