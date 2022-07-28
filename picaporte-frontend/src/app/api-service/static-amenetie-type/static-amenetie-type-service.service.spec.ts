import { TestBed } from '@angular/core/testing';

import { StaticAmenetieTypeService } from './static-amenetie-type-service.service';

describe('StaticAmenetieTypeServiceService', () => {
  let service: StaticAmenetieTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticAmenetieTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
