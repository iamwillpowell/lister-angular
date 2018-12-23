import { TestBed } from '@angular/core/testing';

import { ListerService } from './lister.service';

describe('ListerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListerService = TestBed.get(ListerService);
    expect(service).toBeTruthy();
  });
});
