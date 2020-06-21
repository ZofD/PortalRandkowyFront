import { TestBed } from '@angular/core/testing';

import { ZwiazekService } from './zwiazek.service';

describe('ZwiazekService', () => {
  let service: ZwiazekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZwiazekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
