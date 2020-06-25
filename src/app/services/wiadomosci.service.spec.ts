import { TestBed } from '@angular/core/testing';

import { WiadomosciService } from './wiadomosci.service';

describe('WiadomosciService', () => {
  let service: WiadomosciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiadomosciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
