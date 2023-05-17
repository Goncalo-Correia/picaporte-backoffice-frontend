import { TestBed } from '@angular/core/testing';

import { QueriesTaskService } from './queries-task.service';

describe('QueriesTaskService', () => {
  let service: QueriesTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
