import { TestBed } from '@angular/core/testing';

import { StaticDocumentTypeService } from './static-document-type.service';

describe('StaticDocumentTypeService', () => {
  let service: StaticDocumentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticDocumentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
