import { TestBed } from '@angular/core/testing';

import { StaticAmenetieTypeServiceService } from './static-amenetie-type-service.service';

describe('StaticAmenetieTypeServiceService', () => {
  let service: StaticAmenetieTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticAmenetieTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
