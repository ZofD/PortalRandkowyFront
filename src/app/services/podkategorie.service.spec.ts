import { TestBed } from '@angular/core/testing';

import { PodkategorieService } from './podkategorie.service';

describe('PodkategorieService', () => {
  let service: PodkategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodkategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
