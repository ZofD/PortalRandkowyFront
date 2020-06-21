import { TestBed } from '@angular/core/testing';

import { ZgloszenieService } from './zgloszenie.service';

describe('ZgloszenieService', () => {
  let service: ZgloszenieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZgloszenieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
