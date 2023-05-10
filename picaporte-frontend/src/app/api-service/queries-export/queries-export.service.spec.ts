import { TestBed } from '@angular/core/testing';

import { QueriesExportService } from './queries-export.service';

describe('QueriesExportService', () => {
  let service: QueriesExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
