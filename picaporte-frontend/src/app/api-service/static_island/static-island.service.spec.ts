import { TestBed } from '@angular/core/testing';

import { StaticIslandService } from './static-island.service';

describe('StaticIslandService', () => {
  let service: StaticIslandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticIslandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
