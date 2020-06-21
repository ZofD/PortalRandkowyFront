import { TestBed } from '@angular/core/testing';

import { ZdjeciaService } from './zdjecia.service';

describe('ZdjeciaService', () => {
  let service: ZdjeciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZdjeciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
