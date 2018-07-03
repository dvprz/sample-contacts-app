import { TestBed, inject } from '@angular/core/testing';

import { CheckFormGroupAgainstModelService } from './check-form-group-against-model.service';

describe('CheckFormGroupAgainstModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFormGroupAgainstModelService]
    });
  });

  it('should be created', inject([CheckFormGroupAgainstModelService], (service: CheckFormGroupAgainstModelService) => {
    expect(service).toBeTruthy();
  }));
});
